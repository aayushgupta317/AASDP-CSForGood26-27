(function () {
    "use strict";

    const MAX_MESSAGE_LENGTH = 20000;
    const STORAGE_KEY = "scanAScam:lastResult";

    function createElement(tag, className, text) {
        const element = document.createElement(tag);

        if (className) {
            element.className = className;
        }

        if (typeof text === "string") {
            element.textContent = text;
        }

        return element;
    }

    function initializeScanner() {
        const container = document.querySelector(".scanner-container");

        if (!container || container.dataset.scanInitialized === "true") {
            return;
        }

        container.dataset.scanInitialized = "true";

        // Locate the elements in the original upload.html.
        const messageInput = container.querySelector("textarea");

        const imageInput = container.querySelector(
            'input[type="file"]'
        );

        // The original Scan Content link is outside the scanner container.
        const scanButton = document.querySelector(".scan-button");

        if (!messageInput || !scanButton) {
            console.error(
                "Scan-A-Scam: Missing message input or scan button."
            );

            return;
        }

        const Security = window.ScanAScamSecurity;
        const analyzer = window.ScamAnalyzer;
        const imageReader = window.ScanAScamImageReader;

        const statusRegion = createElement(
            "p",
            "scanner-status",
            ""
        );

        statusRegion.setAttribute("role", "status");
        statusRegion.setAttribute("aria-live", "polite");

        statusRegion.style.gridColumn = "1 / -1";

        container.appendChild(statusRegion);

        let isScanning = false;

        const originalButtonText =
            scanButton.textContent.trim() || "Scan Content";

        function setStatus(message, isError) {
            statusRegion.textContent = message;

            statusRegion.classList.toggle(
                "is-error",
                Boolean(isError)
            );
        }

        function setBusy(value) {
            isScanning = value;

            scanButton.setAttribute(
                "aria-disabled",
                value ? "true" : "false"
            );

            scanButton.style.pointerEvents = value
                ? "none"
                : "";

            scanButton.textContent = value
                ? "Analyzing Message..."
                : originalButtonText;

            scanButton.setAttribute(
                "aria-busy",
                value ? "true" : "false"
            );
        }

        function validateDependencies() {
            if (
                !Security ||
                typeof Security.validateMessage !== "function" ||
                typeof Security.validateImage !== "function"
            ) {
                throw new Error(
                    "The security module could not be loaded."
                );
            }

            if (
                !analyzer ||
                typeof analyzer.analyzeMessage !== "function"
            ) {
                throw new Error(
                    "The scam analysis engine could not be loaded."
                );
            }
        }

        function validateAnalysisResult(result) {
            if (
                !result ||
                typeof result !== "object" ||
                !Number.isFinite(result.score) ||
                !["low", "medium", "high"].includes(result.riskLevel)
            ) {
                throw new Error(
                    "The analysis engine returned an invalid result."
                );
            }

            return {
                score: Math.max(
                    0,
                    Math.min(100, Math.round(result.score))
                ),

                riskLevel: result.riskLevel,

                verdict:
                    typeof result.verdict === "string"
                        ? result.verdict
                        : "Analysis complete",

                findings: Array.isArray(result.findings)
                    ? result.findings.map(function (finding) {
                        return {
                            title:
                                typeof finding.title === "string"
                                    ? finding.title
                                    : "Potential warning sign",

                            detail:
                                typeof finding.detail === "string"
                                    ? finding.detail
                                    : ""
                        };
                    })
                    : [],

                recommendations: Array.isArray(result.recommendations)
                    ? result.recommendations.filter(function (item) {
                        return typeof item === "string";
                    })
                    : [],

                disclaimer:
                    typeof result.disclaimer === "string"
                        ? result.disclaimer
                        : "Automated results are estimates and cannot guarantee whether a message is safe or fraudulent.",

                engine:
                    typeof result.engine === "string"
                        ? result.engine
                        : "browser-heuristic-demo",

                createdAt: new Date().toISOString()
            };
        }

        function saveResults(result) {
            try {
                sessionStorage.setItem(
                    STORAGE_KEY,
                    JSON.stringify(result)
                );

                return true;

            } catch (error) {
                console.error(
                    "Scan-A-Scam could not save results:",
                    error
                );

                return false;
            }
        }

        function getResultsPage() {
            // Preserve the original link's destination when available.
            const destination =
                scanButton.getAttribute("href") || "results.html";

            const resultURL = new URL(
                destination,
                document.baseURI
            );

            // Results should remain on the same website.
            if (resultURL.origin !== window.location.origin) {
                throw new Error(
                    "The results page must be on the same website."
                );
            }

            return resultURL.href;
        }

        async function analyzeMessage() {
            if (isScanning) {
                return;
            }

            setBusy(true);
            setStatus("Preparing your message for analysis...");

            try {
                validateDependencies();

                const typedText = messageInput.value;

                if (typedText.length > MAX_MESSAGE_LENGTH) {
                    throw new Error(
                        "Messages must contain 20,000 characters or fewer."
                    );
                }

                const selectedFile =
                    imageInput && imageInput.files
                        ? imageInput.files[0]
                        : null;

                let extractedText = "";

                // Handle screenshot uploads.
                if (selectedFile) {
                    const imageValidation =
                        Security.validateImage(selectedFile);

                    if (!imageValidation.valid) {
                        throw new Error(imageValidation.message);
                    }

                    if (
                        !imageReader ||
                        typeof imageReader.readText !== "function"
                    ) {
                        throw new Error(
                            "Screenshot text extraction is unavailable."
                        );
                    }

                    setStatus(
                        "Reading text from your screenshot..."
                    );

                    extractedText = await imageReader.readText(
                        selectedFile,
                        {
                            onProgress: function (percent) {
                                setStatus(
                                    "Reading screenshot... " +
                                    percent +
                                    "%"
                                );
                            }
                        }
                    );
                }

                // Combine typed text and screenshot text.
                const combinedText = [
                    typedText.trim(),
                    extractedText
                ]
                    .filter(Boolean)
                    .join("\n\n");

                // Validate the complete message.
                const validation =
                    Security.validateMessage(combinedText);

                if (!validation.valid) {
                    throw new Error(validation.message);
                }

                setStatus(
                    "Analyzing the message for suspicious patterns..."
                );

                // Run the original scam detection engine.
                const rawResult = analyzer.analyzeMessage(
                    validation.value
                );

                // Verify and prepare the returned analysis.
                const result = validateAnalysisResult(rawResult);

                // Save results before navigating.
                if (!saveResults(result)) {
                    throw new Error(
                        "Your results could not be saved. Please check your browser storage settings."
                    );
                }

                setStatus("Analysis complete. Opening your results...");

                // Navigate to the original results page.
                window.location.assign(getResultsPage());

            } catch (error) {
                console.error(
                    "Scan-A-Scam analysis error:",
                    error
                );

                setStatus(
                    error && error.message
                        ? error.message
                        : "Something went wrong. Please try again.",
                    true
                );

                setBusy(false);
            }
        }

        // Intercept the original Scan Content link.
        // It will analyze the message before navigating.
        const form = messageInput.closest("form");

        if (form) {
            form.addEventListener("submit", function (event) {
                event.preventDefault();
                analyzeMessage();
            });
        } else {
            scanButton.addEventListener("click", function (event) {
                event.preventDefault();
                analyzeMessage();
            });
        }

        // Support an optional clear button.
        const clearButton = document.querySelector(
            "#clearButton, .clear-button"
        );

        if (clearButton) {
            clearButton.addEventListener("click", function () {
                messageInput.value = "";

                if (imageInput) {
                    imageInput.value = "";
                }

                setStatus("");
                messageInput.focus();
            });
        }

        // Restrict screenshot uploads to supported image formats.
        if (imageInput) {
            imageInput.accept = "image/png,image/jpeg,image/webp";
        }
    }

    if (document.readyState === "loading") {
        document.addEventListener(
            "DOMContentLoaded",
            initializeScanner,
            { once: true }
        );
    } else {
        initializeScanner();
    }

})();
