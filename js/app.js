(function () {
    "use strict";

    function initializeHomePage() {
        // Keep homepage behavior lightweight; the scanner has its own script.
        document.querySelectorAll('a[href^="#"]').forEach(function (link) {
            link.addEventListener("click", function (event) {
                var targetId = link.getAttribute("href");
                if (!targetId || targetId === "#") return;

                var target = document.querySelector(targetId);

                if (target) {
                    event.preventDefault();

                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                    if (window.history && window.history.replaceState) {
                        window.history.replaceState(null, "", targetId);
                    }
                }
            });
        });

        // Hide a missing logo instead of showing a broken-image icon.
        document.querySelectorAll(
            'img[alt*="Scan-A-Scam"], img[alt*="logo" i]'
        ).forEach(function (image) {
            image.addEventListener("error", function () {
                image.hidden = true;
            }, { once: true });
        });

        // Secure links that open in new tabs.
        document.querySelectorAll('a[target="_blank"]').forEach(function (link) {
            var rel = (link.getAttribute("rel") || "")
                .split(/\s+/)
                .filter(Boolean);

            ["noopener", "noreferrer"].forEach(function (token) {
                if (!rel.includes(token)) {
                    rel.push(token);
                }
            });

            link.setAttribute("rel", rel.join(" "));
        });
    }

    if (document.readyState === "loading") {
        document.addEventListener(
            "DOMContentLoaded",
            initializeHomePage,
            { once: true }
        );
    } else {
        initializeHomePage();
    }
})();
