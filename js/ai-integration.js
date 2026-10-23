(function (global) {
    "use strict";

    const MAX_MESSAGE_LENGTH = 20000;
    const URL_PATTERN = /https?:\/\/[^\s<>"']+/gi;
    const SHORTENER_HOSTS = new Set([
        "bit.ly",
        "goo.gl",
        "is.gd",
        "ow.ly",
        "t.co",
        "tinyurl.com"
    ]);

    const RULES = [
        {
            id: "urgency",
            title: "Pressure to act quickly",
            detail: "Scam messages often use urgency to discourage careful checking.",
            weight: 20,
            pattern: /\b(act now|immediately|urgent|right away|within \d+ hours?|expires today|final notice|account (?:will be|is about to be) suspended)\b/i
        },
        {
            id: "credentials",
            title: "Request for sensitive account information",
            detail: "Unexpected requests for passwords, verification codes, or recovery phrases are risky.",
            weight: 30,
            pattern: /\b(password|passcode|one[- ]time (?:code|password)|verification code|security code|recovery phrase|private key|sign in to verify|verify your account)\b/i
        },
        {
            id: "money",
            title: "Unusual payment request",
            detail: "Requests for gift cards, cryptocurrency, wire transfers, or unexpected payments are common scam tactics.",
            weight: 30,
            pattern: /\b(gift cards?|cryptocurrency|bitcoin|wire transfer|payment (?:is )?required|pay (?:a )?(?:fee|fine|tax)|send money)\b/i
        },
        {
            id: "secrecy",
            title: "Request to keep the message secret",
            detail: "Being told not to contact anyone else can be a sign of manipulation.",
            weight: 20,
            pattern: /\b(don't tell anyone|do not tell anyone|keep this (?:a )?secret|don't discuss this|do not discuss this)\b/i
        }
    ];

    function getUrls(message) {
        return message.match(URL_PATTERN) || [];
    }

    function inspectUrl(value) {
        const cleanedValue = value.replace(/[),.!?;:]+$/, "");

        try {
            const url = new URL(cleanedValue);
            const hostname = url.hostname.toLowerCase();

            if (SHORTENER_HOSTS.has(hostname)) {
                return {
                    id: "shortened-link",
                    title: "Shortened link",
                    detail: "Shortened links hide their destination. Visit the organization's official website directly instead.",
                    weight: 30
                };
            }

            if (
                url.protocol !== "https:" ||
                hostname.startsWith("xn--") ||
                /^\d{1,3}(?:\.\d{1,3}){3}$/.test(hostname)
            ) {
                return {
                    id: "unusual-link",
                    title: "Unusual web address",
                    detail: "This link uses an unusual address or does not use a secure connection. Do not open it unless you can verify it independently.",
                    weight: 25
                };
            }
        } catch (error) {
            if (!(error instanceof TypeError)) {
                throw error;
            }
            return {
                id: "unusual-link",
                title: "Unusual web address",
                detail: "This link could not be checked as a standard web address. Do not open it unless you can verify it independently.",
                weight: 25
            };
        }

        return null;
    }

    function getRiskLevel(score) {
        if (score >= 60) {
            return "high";
        }
        if (score >= 30) {
            return "medium";
        }
        return "low";
    }

    function analyzeMessage(message) {
        if (typeof message !== "string" || message.trim().length === 0) {
            throw new TypeError("Enter message text to analyze.");
        }
        if (message.length > MAX_MESSAGE_LENGTH) {
            throw new RangeError(`Message text must be ${MAX_MESSAGE_LENGTH} characters or fewer.`);
        }

        const findings = RULES
            .filter((rule) => rule.pattern.test(message))
            .map(({ id, title, detail, weight }) => ({ id, title, detail, weight }));

        for (const value of getUrls(message)) {
            const finding = inspectUrl(value);
            if (finding && !findings.some((existing) => existing.id === finding.id)) {
                findings.push(finding);
            }
        }

        const score = Math.min(
            95,
            findings.reduce((total, finding) => total + finding.weight, 0)
        );
        const riskLevel = getRiskLevel(score);

        return {
            score,
            riskLevel,
            verdict: {
                high: "Several warning signs found",
                medium: "Some warning signs found",
                low: "No obvious warning signs found"
            }[riskLevel],
            findings: findings.map(({ weight, ...finding }) => finding),
            recommendations: riskLevel === "low"
                ? [
                    "No obvious warning signs were detected, but this does not prove the message is safe.",
                    "Avoid unexpected links and verify requests using a contact method you already trust."
                ]
                : [
                    "Do not click links, reply, or share personal information in this message.",
                    "Contact the person or organization using a phone number or website you already trust."
                ],
            engine: "browser-heuristic-demo",
            disclaimer: "This text-only demo uses simple patterns, not AI. It may miss scams or flag legitimate messages. It does not open links or send your message anywhere."
        };
    }

    const scamAnalyzer = Object.freeze({ analyzeMessage });
    global.ScamAnalyzer = scamAnalyzer;

    if (typeof module !== "undefined" && module.exports) {
        module.exports = scamAnalyzer;
    }
})(typeof globalThis !== "undefined" ? globalThis : window);
