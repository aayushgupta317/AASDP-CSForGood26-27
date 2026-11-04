// js/results.js - renders the saved Gemini result. All model text goes in via textContent (never innerHTML).
(function () {
    "use strict";

    const $ = function (id) { return document.getElementById(id); };

    function fillList(id, items, fallback) {
        const list = $(id);
        list.textContent = "";
        (items && items.length ? items : [fallback]).forEach(function (item) {
            const li = document.createElement("li");
            li.textContent = item;
            list.appendChild(li);
        });
    }

    document.addEventListener("DOMContentLoaded", function () {
        let data = null;
        try { data = JSON.parse(sessionStorage.getItem("scanAScam:lastResult")); } catch (e) { data = null; }

        if (!data || typeof data.score !== "number") {
            $("empty-state").classList.remove("hidden");
            return;
        }
        $("results").classList.remove("hidden");

        const tiers = {
            red:    { cls: "high",   icon: "fa-triangle-exclamation", title: "This is very likely a scam" },
            yellow: { cls: "medium",  icon: "fa-circle-exclamation",   title: "Be careful with this one" },
            green:  { cls: "low",     icon: "fa-circle-check",         title: "This looks low risk" }
        };
        const tier = tiers[data.riskLevel] || tiers.yellow;

        $("risk-banner").classList.add(tier.cls);
        $("res-icon").className = "fa-solid " + tier.icon;
        $("res-title-display").lastChild.textContent = tier.title;
        $("res-category").textContent = data.category || "";
        $("res-score-display").textContent = "Risk score: " + data.score + " out of 100";
        const fill = $("meter-fill");
        fill.style.width = data.score + "%";
        $("meter").setAttribute("aria-valuenow", String(data.score));

        $("res-summary").textContent = data.summary || "";
        const insight = $("ai-insight-card");
        insight.classList.add(tier.cls);
        $("ai-insight-heading").textContent = data.insightHeadline || "Pause and check before you respond.";
        fillList("ai-insight-points", data.insightPoints, "Take your time and verify the request using contact details you already trust.");
        fillList("res-flags-container", data.redFlags, "No major warning signs found.");
        fillList("res-steps-container", data.recommendations, "If you are unsure, check with the company using a phone number you already trust.");

        if (data.score >= 70 && typeof window.getCaregiver === "function") {
            const cg = window.getCaregiver();
            $("caregiver-alert-card").classList.remove("hidden");
            $("caregiver-contact-display").textContent = "Trusted contact: " + cg.name + " (" + cg.relationship + ") \u2022 " + cg.phone;
            $("caregiver-msg-preview").textContent = "Hi " + cg.name + ", Scan-A-Scam flagged a message as a likely scam (risk score " + data.score + "/100). Can you take a look before I respond?";
        }
    });
})();
