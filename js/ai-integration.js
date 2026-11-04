// js/ai-integration.js

const GEMINI_API_KEY = 'YOUR_GEMINI_API_KEY'; // Replace with your Gemini API key
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;

/**
 * Analyzes text or image data using Gemini AI for scam detection.
 * @param {string} inputContent - The text message or extracted text from uploaded files/images.
 * @returns {Promise<Object>} - Returns structured analysis: { riskLevel, score, summary, redFlags, recommendations }
 */
async function analyzeScamContent(inputContent) {
    const prompt = `
You are an expert cybersecurity AI assistant for "Scan-A-Scam", an application protecting seniors and citizens from online fraud, phishing, and scams.
Analyze the following text/message submitted by a user for potential scam indicators (such as urgency, fake banking alerts, gift card demands, suspicious links, impersonation, or lottery wins).

Input content to analyze:
"""
${inputContent}
"""

You must respond strictly in valid JSON format with no extra markdown formatting outside the JSON block, using this exact schema:
{
  "riskLevel": "green", // Must be exactly one of: "green" (safe/low risk), "yellow" (suspicious/caution), or "red" (high risk scam)
  "score": 15, // Integer from 0 (completely safe) to 100 (definitive scam)
  "summary": "A concise 1-2 sentence verdict explaining why this is safe, suspicious, or a scam.",
  "redFlags": ["Specific red flag 1", "Specific red flag 2"], // Array of strings detailing threats found, or empty array if green
  "recommendations": ["Actionable safety tip 1", "Actionable safety tip 2"] // Array of safe next steps for the user
}
`;

    try {
        const response = await fetch(GEMINI_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: prompt }]
                }]
            })
        });

        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }

        const data = await response.json();
        const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
        
        // Clean up markdown code blocks if Gemini includes them
        const cleanedJSON = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
        const parsedResult = JSON.parse(cleanedJSON);
        
        return parsedResult;
    } catch (error) {
        console.error('Error communicating with Gemini AI:', error);
        // Fallback safety structure if API fails
        return {
            riskLevel: "yellow",
            score: 50,
            summary: "Unable to complete full AI verification at this moment, but please exercise caution.",
            redFlags: ["Automated analysis encountered a network or key validation error."],
            recommendations: ["Do not click links or send money until verified manually."]
        };
    }
}
