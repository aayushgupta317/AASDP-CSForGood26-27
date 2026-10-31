(function (global) {
    "use strict";

    const TESSERACT_URL =
        "https://cdn.jsdelivr.net/npm/tesseract.js@5/dist/tesseract.min.js";

    const MAX_TEXT_LENGTH = 20000;

    let libraryPromise = null;
    let activeWorker = null;
    let isReading = false;

    function loadTesseract() {
        if (global.Tesseract) {
            return Promise.resolve(global.Tesseract);
        }

        if (libraryPromise) {
            return libraryPromise;
        }

        libraryPromise = new Promise(function (resolve, reject) {
            const script = document.createElement("script");

            script.src = TESSERACT_URL;
            script.async = true;

            script.onload = function () {
                if (global.Tesseract) {
                    resolve(global.Tesseract);
                } else {
                    libraryPromise = null;
                    reject(
                        new Error("Screenshot reading could not be initialized.")
                    );
                }
            };

            script.onerror = function () {
                libraryPromise = null;

                reject(
                    new Error(
                        "Could not load the screenshot reader. Check your internet connection."
                    )
                );
            };

            document.head.appendChild(script);
        });

        return libraryPromise;
    }

    function readText(file, options) {
        options = options || {};

        if (isReading) {
            return Promise.reject(
                new Error("A screenshot is already being processed.")
            );
        }

        if (!file) {
            return Promise.reject(
                new Error("Please select a screenshot first.")
            );
        }

        const Security = global.ScanAScamSecurity;

        if (!Security) {
            return Promise.reject(
                new Error("The security module has not loaded.")
            );
        }

        const validation = Security.validateImage(file);

        if (!validation.valid) {
            return Promise.reject(
                new Error(validation.message)
            );
        }

        isReading = true;

        function reportProgress(percent) {
            if (typeof options.onProgress === "function") {
                options.onProgress(
                    Math.max(0, Math.min(100, Math.round(percent)))
                );
            }
        }

        return loadTesseract()
            .then(async function (Tesseract) {
                reportProgress(5);

                activeWorker = await Tesseract.createWorker(
                    "eng",
                    1,
                    {
                        logger: function (message) {
                            if (
                                message.status === "recognizing text" &&
                                typeof message.progress === "number"
                            ) {
                                reportProgress(
                                    10 + message.progress * 85
                                );
                            }
                        }
                    }
                );

                reportProgress(10);

                const result = await activeWorker.recognize(file);

                const extractedText =
                    result &&
                    result.data &&
                    typeof result.data.text === "string"
                        ? result.data.text.trim()
                        : "";

                reportProgress(95);

                if (!extractedText) {
                    throw new Error(
                        "No readable text was found. Try a clearer screenshot."
                    );
                }

                if (extractedText.length > MAX_TEXT_LENGTH) {
                    return extractedText.slice(0, MAX_TEXT_LENGTH);
                }

                reportProgress(100);

                return extractedText;
            })
            .catch(function (error) {
                throw new Error(
                    error && error.message
                        ? error.message
                        : "Could not extract text from the screenshot."
                );
            })
            .finally(async function () {
                if (activeWorker) {
                    try {
                        await activeWorker.terminate();
                    } catch (error) {
                        console.warn(
                            "Screenshot reader cleanup failed:",
                            error
                        );
                    }

                    activeWorker = null;
                }

                isReading = false;
            });
    }

    const imageReader = Object.freeze({
        readText: readText
    });

    global.ScanAScamImageReader = imageReader;

})(typeof globalThis !== "undefined" ? globalThis : window);
