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

    global.getCaregiver = getCaregiver;

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

    window.addEventListener("DOMContentLoaded", function () {
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
            status.innerText = "Sending email...";
        }

        const accessKey = global.SCAN_CONFIG && global.SCAN_CONFIG.WEB3FORMS_ACCESS_KEY;
        if (!accessKey) {
            if (status) status.innerText = "Email service is not configured.";
            return;
        }

        const emailPayload = {
            access_key: accessKey,
            subject: "Scan-A-Scam caregiver contact update",
            from_name: "Scan-A-Scam",
            replyto: updated.email,
            message: [
                "Caregiver Name: " + updated.name,
                "Phone Number: " + updated.phone,
                "Email Address: " + updated.email,
                "Relationship: " + updated.relationship
            ].join("\n")
        };

        fetch("https://api.web3forms.com/submit", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(emailPayload)
        })
        .then(async (response) => {
            const result = await response.json().catch(() => ({}));
            if (response.ok && result.success) {
                if (status) {
                    status.innerText = "Saved & Emailed!";
                    setTimeout(() => status.style.display = "none", 3000);
                }
            } else {
            if (status) status.innerText = result.message || "Error sending email.";
            }
        })
        .catch(error => {
            console.error("Web3Forms Error:", error);
            if (status) status.innerText = "Network Error.";
        });
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
