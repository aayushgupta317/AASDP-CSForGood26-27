// js/upload.js - upload page behaviour: validate input, call Gemini, hand the result to results.html.
(function () {
    "use strict";

    const STORAGE_KEY = "scanAScam:lastResult";
    const $ = function (id) { return document.getElementById(id); };
    const form = $("scan-form"), textArea = $("scam-text"), filePicker = $("scam-file");
    const preview = $("preview"), previewImg = $("preview-img"), errorBox = $("scan-error");
    const loading = $("loading-panel"), button = $("analyze-btn");
    const Security = window.ScanAScamSecurity;
    let previewUrl = null;

    function showError(message) {
        errorBox.textContent = message;
        errorBox.classList.remove("hidden");
        errorBox.scrollIntoView({ block: "nearest" });
    }
    function clearError() { errorBox.classList.add("hidden"); errorBox.textContent = ""; }
    function setBusy(busy) {
        form.classList.toggle("hidden", busy);
        loading.classList.toggle("hidden", !busy);
        button.disabled = busy;
    }
    function resetImage() {
        filePicker.value = "";
        preview.classList.add("hidden");
        if (previewUrl) { URL.revokeObjectURL(previewUrl); previewUrl = null; }
    }

    filePicker.addEventListener("change", function () {
        clearError();
        const file = filePicker.files[0];
        if (!file) { resetImage(); return; }
        const check = Security.validateImage(file);
        if (!check.valid) { resetImage(); showError(check.message); return; }
        if (previewUrl) URL.revokeObjectURL(previewUrl);
        previewUrl = URL.createObjectURL(file);
        previewImg.src = previewUrl;
        preview.classList.remove("hidden");
    });
    $("remove-image").addEventListener("click", resetImage);

    form.addEventListener("submit", async function (event) {
        event.preventDefault();
        clearError();

        const text = textArea.value.trim();
        const file = filePicker.files[0] || null;

        if (!text && !file) { showError("Paste a message or choose a screenshot first."); return; }
        if (text) {
            const check = Security.validateMessage(text);
            if (!check.valid) { showError(check.message); return; }
        }
        if (file) {
            const check = Security.validateImage(file);
            if (!check.valid) { showError(check.message); return; }
        }

        setBusy(true);
        try {
            const result = await window.analyzeScamContent({ text: text, file: file });
            result.rawText = text || "(screenshot)";
            sessionStorage.setItem(STORAGE_KEY, JSON.stringify(result));
            window.location.href = "results.html";
        } catch (error) {
            setBusy(false);
            showError(error.message || "Something went wrong. Please try again.");
        }
    });
})();
