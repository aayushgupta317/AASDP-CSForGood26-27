/* ==========================================================================
   Scan-A-Scam Master Logic & Neighborhood Feed Engine
   ========================================================================== */

(function (global) {
    "use strict";

    let activeFilterLoc = "All";

    const getCaregiver = function () {
        const saved = localStorage.getItem("scanAScam:caregiver");
        return saved ? JSON.parse(saved) : {
            name: "Sarah",
            phone: "(317) 555-0182",
            email: "sarah.caregiver@example.com",
            relationship: "Daughter"
        };
    };

    const saveCaregiver = function (data) {
        localStorage.setItem("scanAScam:caregiver", JSON.stringify(data));
    };

    const getCommunityPosts = function () {
        const saved = localStorage.getItem("scanAScam:communityAlerts");
        if (saved) return JSON.parse(saved);

        const defaultPosts = [
            {
                id: 1,
                title: "Fake Duke Energy Power Cutoff Text",
                desc: "Text message claiming electrical service will be disconnected in 2 hours unless $350 is paid via Zelle immediately.",
                location: "Sunblest",
                category: "Utilities",
                threatLevel: "high-threat",
                riskPercent: "92%",
                timeAgo: "2 hours ago"
            },
            {
                id: 2,
                title: "IRS Back Taxes Arrest Threat Call",
                desc: "Robocall alleging overdue federal taxes in Hamilton County. Demanded Target gift card codes over the phone.",
                location: "Nickel Plate",
                category: "Government Fraud",
                threatLevel: "high-threat",
                riskPercent: "88%",
                timeAgo: "5 hours ago"
            },
            {
                id: 3,
                title: "Fake Amazon $499 Order Confirmation Link",
                desc: "Phishing email stating a high-end laptop was ordered on your account. Clicking the link prompts user for credit card login.",
                location: "Geist",
                category: "Email Phishing",
                threatLevel: "high-threat",
                riskPercent: "85%",
                timeAgo: "Yesterday"
            },
            {
                id: 4,
                title: "Bail Money Emergency Grandparent Text",
                desc: "Claimed to be a grandson stuck in jail after a crash near Castleton. Requested $1,500 wire transfer without telling parents.",
                location: "Heritage Park",
                category: "Family Emergency",
                threatLevel: "high-threat",
                riskPercent: "95%",
                timeAgo: "2 days ago"
            },
            {
                id: 5,
                title: "USPS Package Delivery Failure Text",
                desc: "SMS claiming a parcel could not be delivered to a Fishers address due to invalid street number. Asks for redelivery fee.",
                location: "Fall Creek",
                category: "Postal Fraud",
                threatLevel: "med-threat",
                riskPercent: "76%",
                timeAgo: "3 days ago"
            }
        ];

        localStorage.setItem("scanAScam:communityAlerts", JSON.stringify(defaultPosts));
        return defaultPosts;
    };

    global.applySample = function (type) {
        const input = document.getElementById("scanner-input");
        if (!input) return;

        if (type === "duke") {
            input.value = "DUKE ENERGY URGENT NOTICE: Power disconnect scheduled in 2 hours for unpaid balance of $345.00. Call 1-800-555-0199 now and pay via Zelle to avoid shutoff.";
        } else if (type === "irs") {
            input.value = "INTERNAL REVENUE SERVICE: Federal arrest warrant issued in Hamilton County for tax fraud. Call officer immediately to settle back taxes.";
        } else if (type === "giftcard") {
            input.value = "Target Promotions: You won a $500 gift card! Click http://target-reward-claim.xyz to verify your identity and credit card now.";
        } else if (type === "grandparent") {
            input.value = "Grandma please help, I got arrested after a crash near Indianapolis. I need $2,000 for bail right now. Don't call mom or dad, send it via wire transfer!";
        }
    };

    global.handleImageFile = function (event) {
        const file = event.target.files[0];
        const label = document.getElementById("upload-label");
        const input = document.getElementById("scanner-input");

        if (file) {
            if (label) label.innerText = `Selected: ${file.name}`;
            if (input && !input.value) {
                input.value = `[Extracted Text from ${file.name}]: URGENT ALERT - Security compromised. Call support at 1-800-555-9011 to prevent account lock.`;
            }
        }
    };

    global.clearScannerForm = function () {
        const input = document.getElementById("scanner-input");
        const picker = document.getElementById("file-picker");
        const label = document.getElementById("upload-label");

        if (input) input.value = "";
        if (picker) picker.value = "";
        if (label) label.innerText = "Click to select a screenshot image";
    };

    global.executeScan = function () {
        const textInput = document.getElementById("scanner-input");
        const text = textInput ? textInput.value.trim() : "";

        if (!text) {
            alert("Please enter or paste message content first.");
            return;
        }

        let score = 25;
        let flags = [];
        let category = "Suspicious Message";
        const lower = text.toLowerCase();

        if (lower.includes("urgent") || lower.includes("immediately") || lower.includes("2 hours") || lower.includes("disconnect")) {
            score += 25;
            flags.push("Creates artificial time pressure to panic you into acting without checking.");
        }
        if (lower.includes("zelle") || lower.includes("gift card") || lower.includes("wire") || lower.includes("pay")) {
            score += 30;
            flags.push("Demands non-standard or untraceable payment methods (Zelle, gift cards, wire transfer).");
        }
        if (lower.includes("arrest") || lower.includes("warrant") || lower.includes("irs") || lower.includes("jail")) {
            score += 25;
            flags.push("Uses legal intimidation or legal threats to coerce money.");
            category = "Government Fraud";
        }
        if (lower.includes("http") || lower.includes(".xyz") || lower.includes("click")) {
            score += 15;
            flags.push("Includes unverified third-party links designed to capture login information.");
        }

        if (lower.includes("grandma") || lower.includes("bail")) category = "Family Emergency Scam";
        if (lower.includes("duke energy")) category = "Utility Disconnect Scam";

        score = Math.min(96, score);
        if (flags.length === 0) {
            flags.push("No obvious automated keywords found, but always verify unfamiliar senders.");
        }

        const steps = [
            "Do not click any links or reply directly to the sender.",
            "Never wire money, purchase gift cards, or send Zelle payments under pressure.",
            "Contact the official organization directly using a number from a bill or statement."
        ];

        const lastAnalysisResult = {
            score: score,
            flags: flags,
            steps: steps,
            rawText: text,
            category: category
        };

        sessionStorage.setItem("scanAScam:lastResult", JSON.stringify(lastAnalysisResult));
        window.location.href = "results.html";
    };

    window.addEventListener("DOMContentLoaded", function () {
        const scoreDisplay = document.getElementById("res-score-display");
        if (scoreDisplay) {
            const stored = sessionStorage.getItem("scanAScam:lastResult");
            if (stored) {
                const res = JSON.parse(stored);
                scoreDisplay.innerText = res.score + "%";

                const titleDisplay = document.getElementById("res-title-display");
                const banner = document.getElementById("risk-banner");
                const cgCard = document.getElementById("caregiver-alert-card");
                const cgContact = getCaregiver();

                if (res.score >= 75) {
                    banner.className = "risk-gauge high";
                    if (titleDisplay) titleDisplay.innerText = "High Risk Scam Detected";
                } else if (res.score >= 45) {
                    banner.className = "risk-gauge medium";
                    if (titleDisplay) titleDisplay.innerText = "Moderate Risk Flagged";
                } else {
                    banner.className = "risk-gauge low";
                    if (titleDisplay) titleDisplay.innerText = "Low Risk Found";
                }

                document.getElementById("res-flags-container").innerHTML = res.flags.map(f => `<li>${f}</li>`).join("");
                document.getElementById("res-steps-container").innerHTML = res.steps.map(s => `<li>${s}</li>`).join("");

                if (res.score >= 80 && cgCard) {
                    cgCard.style.display = "block";
                    document.getElementById("caregiver-contact-display").innerText = `Trusted Contact: ${cgContact.name} (${cgContact.relationship}) • ${cgContact.phone}`;
                    document.getElementById("caregiver-msg-preview").innerText = `Hi ${cgContact.name}, Scan-A-Scam flagged a ${res.score}% high-risk scam message asking for money. Can you check this before I respond?`;
                }
            }
        }

        const feedContainer = document.getElementById("alerts-feed-container");
        if (feedContainer) {
            renderCommunityFeed();
        }

        const cgNameInput = document.getElementById("cg-name");
        if (cgNameInput) {
            const cg = getCaregiver();
            cgNameInput.value = cg.name;
            document.getElementById("cg-phone").value = cg.phone;
            document.getElementById("cg-email").value = cg.email;
            document.getElementById("cg-rel").value = cg.relationship;
        }
    });

    global.renderCommunityFeed = function () {
        const container = document.getElementById("alerts-feed-container");
        if (!container) return;

        const posts = getCommunityPosts();
        const filtered = activeFilterLoc === "All" 
            ? posts 
            : posts.filter(p => p.location === activeFilterLoc);

        if (filtered.length === 0) {
            container.innerHTML = `<p style="text-align: center; color: var(--text-muted); padding: 2rem;">No recent scam reports for this location.</p>`;
            return;
        }

        container.innerHTML = filtered.map(alert => `
            <div class="alert-card ${alert.threatLevel}">
                <div class="alert-header">
                    <span class="alert-title">⚠️ ${alert.title}</span>
                    <span class="alert-tag">${alert.category}</span>
                </div>
                <p style="font-size: 0.925rem; color: var(--text-main);">${alert.desc}</p>
                <div class="alert-meta">
                    <span><i class="fa-solid fa-location-dot"></i> ${alert.location}, IN</span>
                    <span>•</span>
                    <span>${alert.timeAgo}</span>
                    <span>•</span>
                    <span style="font-weight: 700; color: var(--primary);">Risk: ${alert.riskPercent}</span>
                </div>
            </div>
        `).join("");

        const countBadge = document.getElementById("badge-count");
        if (countBadge) countBadge.innerText = posts.length;
    };

    global.applyFilter = function (loc, chipBtn) {
        activeFilterLoc = loc;
        document.querySelectorAll(".filter-chip").forEach(c => c.classList.remove("active"));
        if (chipBtn) chipBtn.classList.add("active");
        renderCommunityFeed();
    };

    global.sendCaregiverSMS = function () {
        const cg = getCaregiver();
        const status = document.getElementById("caregiver-sent-status");
        if (status) {
            status.style.display = "block";
            status.innerText = `✓ Instant SMS Alert dispatched to ${cg.name} at ${cg.phone}!`;
        }
    };

    global.sendCaregiverEmail = function () {
        const cg = getCaregiver();
        const status = document.getElementById("caregiver-sent-status");
        if (status) {
            status.style.display = "block";
            status.innerText = `✓ Email safety alert dispatched to ${cg.email}!`;
        }
    };

    global.saveCaregiverSettings = function (e) {
        e.preventDefault();
        const updated = {
            name: document.getElementById("cg-name").value,
            phone: document.getElementById("cg-phone").value,
            email: document.getElementById("cg-email").value,
            relationship: document.getElementById("cg-rel").value
        };
        saveCaregiver(updated);

        const status = document.getElementById("cg-save-status");
        if (status) {
            status.style.display = "inline";
            setTimeout(() => status.style.display = "none", 3000);
        }
    };

    // Interactive prompt window for location and details when sharing scan results
    global.openCustomPostModal = function () {
        const stored = sessionStorage.getItem("scanAScam:lastResult");
        if (!stored) {
            alert("No scan result found to share.");
            return;
        }
        const res = JSON.parse(stored);

        const locationInput = prompt("Enter Fishers neighborhood location (e.g., Sunblest, Nickel Plate, Geist, Heritage Park, Fall Creek):", "Sunblest");
        if (!locationInput) return;

        const detailsInput = prompt("Enter additional details or notes about this scam alert:", res.rawText.substring(0, 100));
        if (!detailsInput) return;

        const posts = getCommunityPosts();
        posts.unshift({
            id: Date.now(),
            title: `${res.category} Report`,
            desc: detailsInput,
            location: locationInput.trim(),
            category: res.category,
            threatLevel: res.score >= 75 ? "high-threat" : "med-threat",
            riskPercent: `${res.score}%`,
            timeAgo: "Just now"
        });

        localStorage.setItem("scanAScam:communityAlerts", JSON.stringify(posts));

        const msg = document.getElementById("post-status-msg");
        if (msg) {
            msg.style.display = "block";
            msg.innerText = `✓ Successfully posted anonymous alert for ${locationInput.trim()} to the Fishers Community Board!`;
        }
    };

    // Interactive prompt window for community board 'Post Alert' button
    global.openPostModal = function () {
        const title = prompt("Enter brief title for scam alert:");
        if (!title) return;

        const locationInput = prompt("Enter Fishers neighborhood (e.g., Sunblest, Nickel Plate, Geist, Heritage Park, Fall Creek):", "Nickel Plate");
        if (!locationInput) return;

        const desc = prompt("Describe the scam message details:");
        if (!desc) return;

        const posts = getCommunityPosts();
        posts.unshift({
            id: Date.now(),
            title: title,
            desc: desc,
            location: locationInput.trim(),
            category: "Resident Report",
            threatLevel: "high-threat",
            riskPercent: "88%",
            timeAgo: "Just now"
        });

        localStorage.setItem("scanAScam:communityAlerts", JSON.stringify(posts));
        renderCommunityFeed();
    };

    // Clear Community Feed Functionality
    global.clearCommunityFeed = function () {
        if (confirm("Are you sure you want to clear all community alerts?")) {
            localStorage.setItem("scanAScam:communityAlerts", JSON.stringify([]));
            renderCommunityFeed();
        }
    };

})(typeof globalThis !== "undefined" ? globalThis : window);
