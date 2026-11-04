// js/ai-integration.js

const GEMINI_API_KEY = 'YOUR_GEMINI_API_KEY'; // Replace with your actual Gemini API key from Google AI Studio
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;

async function analyzeScamContent(inputContent) {
    if (GEMINI_API_KEY === 'YOUR_GEMINI_API_KEY') {
        return {
            riskLevel: "yellow",
            score: 50,
            summary: "API Key Missing: Please replace 'YOUR_GEMINI_API_KEY' in js/ai-integration.js with your real Gemini API key.",
            redFlags: ["Placeholder API key detected in code."],
            recommendations: ["Get a free key from Google AI Studio and update ai-integration.js."]
        };
    }

    const prompt = `
You are an expert cybersecurity AI assistant for "Scan-A-Scam", protecting users from online fraud and scams.
Analyze the following text message or upload for scam indicators.

Input content:
"""
${inputContent}
"""

Return ONLY valid JSON with no markdown formatting outside the JSON block, using this exact structure:
{
  "riskLevel": "green", // Choose strictly one of: "green", "yellow", or "red"
  "score": 15, // Integer from 0 to 100
  "summary": "1-2 sentence explanation.",
  "redFlags": ["Flag 1", "Flag 2"], // Empty array [] if green
  "recommendations": ["Tip 1", "Tip 2"]
}
`;

    try {
        const response = await fetch(GEMINI_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }]
            })
        });

        if (!response.ok) {
            const errData = await response.json();
            throw new Error(errData.error?.message || `HTTP error ${response.status}`);
        }

        const data = await response.json();
        const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
        const cleanedJSON = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
        return JSON.parse(cleanedJSON);

    } catch (error) {
        console.error('Gemini API Error:', error);
        return {
            riskLevel: "red",
            score: 85,
            summary: `AI Connection Error: ${error.message}`,
            redFlags: ["Failed to reach Gemini API endpoint."],
            recommendations: ["Check your internet connection and verify your API key restrictions."]
        };
    }
}
