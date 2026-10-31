(function () {
    "use strict";

    var MAX_MESSAGE_LENGTH = 20000;

    function firstMatch(root, selectors) {
        for (var i = 0; i < selectors.length; i += 1) {
            var found = root.querySelector(selectors[i]);
            if (found) return found;
        }
        return null;
    }

    function make(tag, className, text) {
        var node = document.createElement(tag);
        if (className) node.className = className;
        if (typeof text === "string") node.textContent = text;
        return node;
    }

    function initializeScanner() {
        var container = document.querySelector("[data-scam-scanner], .scanner-container");
        if (!container) return;

        var Security = window.ScanAScamSecurity;
        var analyzer = window.ScamAnalyzer;

        var messageInput = firstMatch(container, [
            "#messageInput",
            "#message",
            "#messageText",
            "[name='message']",
            "textarea"
        ]);

        var imageInput = firstMatch(container, [
            "#imageInput",
            "#screenshotInput",
            "#imageUpload",
            "input[type='file']"
        ]);

        var scanButton = firstMatch(container, [
            "#scanButton",
            "#analyzeButton",
            ".scan-button",
            "button[type='submit']"
        ]);

        if (!messageInput || !scanButton) {
            console.warn(
                "Scan-A-Scam: the scanner needs a textarea and a scan button inside .scanner-container."
            );
            return;
        }

        var form = messageInput.closest("form");

        var resultRegion = make("section", "scan-results");
        resultRegion.id = "scanResults";
        resultRegion.setAttribute("aria-live", "polite");
        resultRegion.setAttribute("aria-atomic", "true");
        resultRegion.hidden = true;
        container.appendChild(resultRegion);

        var statusRegion = make("p", "scan-status");
        statusRegion.setAttribute("role", "status");
        statusRegion.setAttribute("aria-live", "polite");
        container.appendChild(statusRegion);

        var counter = make(
            "p",
            "scan-character-count",
            "0 / " + MAX_MESSAGE_LENGTH
        );

        counter.setAttribute("aria-live", "polite");
        messageInput.insertAdjacentElement("afterend", counter);

        var fileStatus = make("p", "scan-file-status", "");

        if (imageInput) {
            imageInput.insertAdjacentElement("afterend", fileStatus);
        }

        var clearButton = firstMatch(container, [
            "#clearButton",
            ".clear-button",
            "[data-action='clear']"
        ]);

        var busy = false;

        function updateCounter() {
            var length = messageInput.value.length;

            counter.textContent =
                length.toLocaleString() +
                " / " +
                MAX_MESSAGE_LENGTH.toLocaleString() +
                " characters";

            counter.classList.toggle(
                "is-over-limit",
                length > MAX_MESSAGE_LENGTH
            );
        }

        function setStatus(message, isError) {
            statusRegion.textContent = message || "";
            statusRegion.classList.toggle("is-error", Boolean(isError));
        }

        function setBusy(value, label) {
            busy = value;
            scanButton.disabled = value;

            if (!scanButton.dataset.originalLabel) {
                scanButton.dataset.originalLabel =
                    scanButton.textContent.trim() || "Scan message";
            }

            scanButton.textContent = value
                ? (label || "Scanning…")
                : scanButton.dataset.originalLabel;

            container.setAttribute(
                "aria-busy",
                value ? "true" : "false"
            );
        }

        function showError(message) {
            resultRegion.hidden = false;
            resultRegion.replaceChildren();

            resultRegion.appendChild(
                make("h2", "scan-results-heading", "Unable to scan message")
            );

            resultRegion.appendChild(
                make("p", "scan-error", message)
            );
        }

        function formatResultText(result) {
            var lines = [
                "Scan-A-Scam results",
                "Risk score: " + result.score + "/100",
                "Risk level: " + result.riskLevel.toUpperCase(),
                "Assessment: " + result.verdict,
                "",
                "Warning signs:"
            ];

            if (!result.findings.length) {
                lines.push(
                    "No specific warning signs matched the current checks."
                );
            }

            result.findings.forEach(function (finding) {
                lines.push(
                    "- " + finding.title + ": " + finding.detail
                );
            });

            lines.push("", "Recommended actions:");

            result.recommendations.forEach(function (item) {
                lines.push("- " + item);
            });

            lines.push(
                "",
                result.disclaimer ||
                "This result is an automated estimate, not proof that a message is safe or fraudulent."
            );

            return lines.join("\n");
        }

        function renderResult(result) {
            resultRegion.replaceChildren();
            resultRegion.hidden = false;

            resultRegion.classList.remove(
                "risk-low",
                "risk-medium",
                "risk-high"
            );

            resultRegion.classList.add("risk-" + result.riskLevel);

            resultRegion.appendChild(
                make("h2", "scan-results-heading", "Your scan results")
            );

            resultRegion.appendChild(
                make("p", "scan-verdict", result.verdict)
            );

            var badge = make("div", "scan-risk-badge");

            var score = make(
                "strong",
                "scan-risk-score",
                String(result.score)
            );

            var outOf = make(
                "span",
                "scan-risk-out-of",
                "/100"
            );

            var label = make(
                "span",
                "scan-risk-label",
                result.riskLevel.charAt(0).toUpperCase() +
                result.riskLevel.slice(1) +
                " risk"
            );

            badge.append(score, outOf, label);

            var meter = make("div", "scan-risk-meter");

            meter.setAttribute("role", "meter");
            meter.setAttribute("aria-label", "Estimated risk score");
            meter.setAttribute("aria-valuemin", "0");
            meter.setAttribute("aria-valuemax", "100");
            meter.setAttribute(
                "aria-valuenow",
                String(result.score)
            );

            var fill = make("span", "scan-risk-meter-fill");

            fill.style.width =
                Math.max(0, Math.min(100, result.score)) + "%";

            meter.appendChild(fill);
            badge.appendChild(meter);
            resultRegion.appendChild(badge);

            resultRegion.appendChild(
                make(
                    "h3",
                    "scan-section-heading",
                    "Warning signs found"
                )
            );

            if (result.findings.length) {
                var findingsList = make("ul", "scan-findings");

                result.findings.forEach(function (finding) {
                    var item = make("li", "scan-finding");

                    item.appendChild(
                        make("strong", "", finding.title)
                    );

                    item.appendChild(
                        make("p", "", finding.detail)
                    );

                    findingsList.appendChild(item);
                });

                resultRegion.appendChild(findingsList);
            } else {
                resultRegion.appendChild(
                    make(
                        "p",
                        "scan-no-findings",
                        "No warning signs matched the current checks. That does not guarantee the message is legitimate."
                    )
                );
            }

            resultRegion.appendChild(
                make(
                    "h3",
                    "scan-section-heading",
                    "What to do next"
                )
            );

            var recommendations = make(
                "ul",
                "scan-recommendations"
            );

            result.recommendations.forEach(function (recommendation) {
                recommendations.appendChild(
                    make("li", "", recommendation)
                );
            });

            resultRegion.appendChild(recommendations);

            resultRegion.appendChild(
                make(
                    "p",
                    "scan-disclaimer",
                    result.disclaimer ||
                    "This automated result can make mistakes. Verify unexpected requests independently."
                )
            );

            var actions = make("div", "scan-result-actions");

            var copyButton = make(
                "button",
                "scan-button scan-copy-button",
                "Copy results"
            );

            copyButton.type = "button";

            copyButton.addEventListener("click", async function () {
                var content = formatResultText(result);

                try {
                    if (
                        navigator.clipboard &&
                        window.isSecureContext
                    ) {
                        await navigator.clipboard.writeText(content);
                    } else {
                        var temporary = make(
                            "textarea",
                            "scan-copy-fallback"
                        );

                        temporary.value = content;
                        temporary.setAttribute("readonly", "readonly");
                        temporary.style.position = "fixed";
                        temporary.style.opacity = "0";

                        document.body.appendChild(temporary);
                        temporary.select();

                        var copied = document.execCommand("copy");

                        temporary.remove();

                        if (!copied) {
                            throw new Error(
                                "Copy is unavailable in this browser."
                            );
                        }
                    }

                    copyButton.textContent = "Copied!";

                    window.setTimeout(function () {
                        copyButton.textContent = "Copy results";
                    }, 1800);

                } catch (error) {
                    setStatus(
                        "Could not copy automatically. You can select the results and copy them manually.",
                        true
                    );
                }
            });

            actions.appendChild(copyButton);
            resultRegion.appendChild(actions);

            resultRegion.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }

        async function runScan(event) {
            if (event) event.preventDefault();

            if (busy) return;

            if (
                !Security ||
                !analyzer ||
                typeof analyzer.analyzeMessage !== "function"
            ) {
                setStatus(
                    "The scanner could not start. Check that security.js and ai-integration.js load before scanner.js.",
                    true
                );
                return;
            }

            var typedText = messageInput.value;
            var imageText = "";

            var selectedFile =
                imageInput && imageInput.files
                    ? imageInput.files[0]
                    : null;

            if (typedText.length > MAX_MESSAGE_LENGTH) {
                showError(
                    "Messages must be 20,000 characters or fewer."
                );
                return;
            }

            if (!typedText.trim() && !selectedFile) {
                showError(
                    "Paste a suspicious message or choose a screenshot to scan."
                );

                messageInput.focus();
                return;
            }

            setBusy(true, "Scanning…");

            setStatus(
                "Checking the message for common warning signs…"
            );

            resultRegion.hidden = true;

            try {
                if (selectedFile) {
                    var validation = Security.validateImage(selectedFile);

                    if (!validation.valid) {
                        throw new Error(validation.message);
                    }

                    if (
                        !window.ScanAScamImageReader ||
                        typeof window.ScanAScamImageReader.readText !== "function"
                    ) {
                        throw new Error(
                            "Screenshot reading is not available. You can still paste the message text instead."
                        );
                    }

                    setStatus(
                        "Reading text from your screenshot. The image is processed in your browser…"
                    );

                    imageText =
                        await window.ScanAScamImageReader.readText(
                            selectedFile,
                            {
                                onProgress: function (percent) {
                                    setStatus(
                                        "Reading screenshot text… " +
                                        percent +
                                        "%"
                                    );
                                }
                            }
                        );
                }

                var combinedText = [
                    typedText.trim(),
                    imageText
                ].filter(Boolean).join("\n\n");

                var messageValidation =
                    Security.validateMessage(combinedText);

                if (!messageValidation.valid) {
                    throw new Error(messageValidation.message);
                }

                var result =
                    analyzer.analyzeMessage(messageValidation.value);

                renderResult(result);

                setStatus(
                    "Scan complete. Review the warning signs and verify the message independently."
                );

            } catch (error) {
                showError(
                    error && error.message
                        ? error.message
                        : "Something went wrong while scanning. Please try again."
                );

                setStatus(
                    "The scan could not be completed.",
                    true
                );

            } finally {
                setBusy(false);
            }
        }

        messageInput.maxLength = MAX_MESSAGE_LENGTH + 1;

        messageInput.addEventListener("input", updateCounter);

        updateCounter();

        if (imageInput) {
            imageInput.accept = "image/png,image/jpeg,image/webp";

            imageInput.addEventListener("change", function () {
                var file =
                    imageInput.files && imageInput.files[0];

                if (!file) {
                    fileStatus.textContent = "";
                    return;
                }

                var validation = Security.validateImage(file);

                fileStatus.textContent = validation.valid
                    ? "Selected: " + file.name +
                      " (" +
                      (file.size / 1024 / 1024).toFixed(2) +
                      " MB)"
                    : validation.message;

                fileStatus.classList.toggle(
                    "is-error",
                    !validation.valid
                );
            });
        }

        if (
            form &&
            scanButton.form === form &&
            scanButton.type === "submit"
        ) {
            form.addEventListener("submit", runScan);
        } else {
            scanButton.addEventListener("click", runScan);
        }

        if (clearButton) {
            clearButton.addEventListener("click", function () {
                messageInput.value = "";

                if (imageInput) {
                    imageInput.value = "";
                }

                fileStatus.textContent = "";

                resultRegion.replaceChildren();
                resultRegion.hidden = true;

                setStatus("");
                updateCounter();

                messageInput.focus();
            });
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
