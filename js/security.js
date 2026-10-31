(function (global) {
    "use strict";

    const MAX_MESSAGE_LENGTH = 20000;
    const MAX_IMAGE_SIZE = 8 * 1024 * 1024;

    const ALLOWED_IMAGE_TYPES = new Set([
        "image/png",
        "image/jpeg",
        "image/webp"
    ]);

    function validateMessage(message) {
        if (typeof message !== "string") {
            return {
                valid: false,
                message: "Invalid message format."
            };
        }

        const cleanedMessage = message.trim();

        if (!cleanedMessage) {
            return {
                valid: false,
                message: "Please enter a message before scanning."
            };
        }

        if (cleanedMessage.length > MAX_MESSAGE_LENGTH) {
            return {
                valid: false,
                message: "Messages must be 20,000 characters or fewer."
            };
        }

        return {
            valid: true,
            value: cleanedMessage,
            message: "Message successfully validated."
        };
    }

    function validateImage(file) {
        if (!file) {
            return {
                valid: false,
                message: "Please select an image."
            };
        }

        if (!(file instanceof File)) {
            return {
                valid: false,
                message: "The selected file is not valid."
            };
        }

        if (!ALLOWED_IMAGE_TYPES.has(file.type)) {
            return {
                valid: false,
                message: "Only PNG, JPG, JPEG, and WEBP images are supported."
            };
        }

        if (file.size === 0) {
            return {
                valid: false,
                message: "The selected image is empty."
            };
        }

        if (file.size > MAX_IMAGE_SIZE) {
            return {
                valid: false,
                message: "Images must be 8 MB or smaller."
            };
        }

        return {
            valid: true,
            message: "Image successfully validated."
        };
    }

    function escapeHTML(value) {
        return String(value).replace(/[&<>"']/g, function (character) {
            const entities = {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#39;"
            };

            return entities[character];
        });
    }

    function isSafeText(value) {
        return typeof value === "string" &&
            value.trim().length > 0 &&
            value.length <= MAX_MESSAGE_LENGTH;
    }

    const security = Object.freeze({
        validateMessage: validateMessage,
        validateImage: validateImage,
        escapeHTML: escapeHTML,
        isSafeText: isSafeText,
        MAX_MESSAGE_LENGTH: MAX_MESSAGE_LENGTH,
        MAX_IMAGE_SIZE: MAX_IMAGE_SIZE
    });

    global.ScanAScamSecurity = security;

})(typeof globalThis !== "undefined" ? globalThis : window);
