# Scan-A-Scam

Scan-A-Scam is a website that helps older people figure out if a text, email, or message is a scam. You paste the message in (or upload a screenshot of it) and it tells you how likely it is to be a scam, why it thinks that, and what you should do about it.

We made this for the NexTech CS for Good project, and it's focused on people in Fishers, Indiana.

---

## Why we made this

Scammers go after seniors a lot, and most scam messages look pretty real if you aren't used to spotting them. We wanted something simple that doesn't use confusing tech words. If you can copy and paste, you can use this.

## What it does

- You can paste a message, upload a screenshot, or do both
- It gives you a risk score from 0 to 100 and a color (red = probably a scam, yellow = be careful, green = looks okay)
- It explains what looked suspicious in plain English
- It gives you steps for what to do next
- It has a "quick takeaway" box with one thing to remember about that message
- If the result is high risk, you can send a heads-up to a family member you set up as your trusted contact
- There's a community page where people in Fishers can see scam reports from their neighbors

## How it works

1. You go to the Scanner page and paste a message or upload a screenshot
2. The site checks that what you gave it is okay (right file type, not too big, not empty)
3. It sends it to Google's Gemini AI, along with instructions to act like a scam checker for older people
4. Gemini sends back a score and explanation
5. The Results page shows everything

If something goes wrong (bad key, no internet, etc.), it shows an error message instead of just breaking or making up a fake answer.

## The pages

| Page | File | What it's for |
|---|---|---|
| Home | `pages/index.html` | Landing page |
| Scanner | `pages/upload.html` | Where you paste or upload stuff |
| Results | `pages/results.html` | Shows the score and explanation |
| Fishers Alerts | `pages/community.html` | Scam reports from the community |
| Caregiver Settings | `pages/caregiver.html` | Set up your trusted contact |

## What we used

- HTML, CSS, and JavaScript (no frameworks, no backend)
- Google Gemini API for the AI part
- Font Awesome for the icons
- Atkinson Hyperlegible font, which is made to be easy to read for people with low vision

## How to run it

### 1. Get the code

```bash
git clone https://github.com/aayushgupta317/AASDP-CSForGood26-27.git
cd AASDP-CSForGood26-27
```

### 2. Get a free Gemini API key

1. Go to https://aistudio.google.com/apikey
2. Sign in with a personal Google account (school accounts usually get blocked)
3. Click **Create API key** and copy it

You don't need a credit card for the free tier.

### 3. Put your key in the project

Make a copy of the example config file:

```bash
cp js/config.example.js js/config.js
```

Open `js/config.js` and paste your key in between the quotes:

```js
window.SCAN_CONFIG = {
    GEMINI_API_KEY: "your-key-goes-here"
};
```

**Important:** `js/config.js` is in our `.gitignore` so it won't get pushed to GitHub. Don't ever commit it or send it to anyone, because that's your personal key.

### 4. Start it up

Don't just double-click the HTML files. Run a local server instead:

```bash
python3 -m http.server
```

Then open http://localhost:8000/pages/index.html in your browser. (The Live Server extension in VS Code works too.)

### 5. Test it

Try pasting a fake scam message like:

> URGENT: Your bank account has been locked. Click here to verify your identity now.

You should get a red result. Also try a harmless message like "Dinner at 6?" and a screenshot to make sure those work too.

## Settings you can change

| What | Where | Notes |
|---|---|---|
| API key | `js/config.js` | Keep it private |
| AI model | `MODEL` at the top of `js/ai-integration.js` | Change this if Google stops supporting the one we're using |
| Instructions for the AI | `INSTRUCTIONS` in `js/ai-integration.js` | Edit this to change how it talks or add scams that are common in Fishers |
| Risk levels | `normalize()` in `js/ai-integration.js` | Red is 70+, yellow is 35 to 69, green is under 35 |

## What's in the project

```text
AASDP-CSForGood26-27/
├── README.md
├── .gitignore
├── css/
│   ├── style.css        # colors, navbar, buttons, cards (shared by every page)
│   ├── upload.css       # scanner page
│   ├── results.css      # results page
│   ├── community.css    # alert board
│   └── caregiver.css    # caregiver settings
├── js/
│   ├── ai-integration.js  # talks to Gemini and handles errors
│   ├── upload.js          # makes the scanner page work
│   ├── results.js         # shows the results
│   ├── app.js             # community board and caregiver stuff
│   ├── security.js        # checks files and text before we send them
│   ├── config.example.js  # template for your key (this one is okay to commit)
│   └── config.js          # your real key (you make this yourself, it's gitignored)
└── pages/
    ├── index.html
    ├── upload.html
    ├── results.html
    ├── community.html
    └── caregiver.html
```

## Making it easy to use

Since this is for seniors, we tried to make it as easy to read as possible:

- The text is big (18px base) and the colors have high contrast
- Risk is shown with words and a meter, not just color, in case someone can't tell the colors apart
- The AI is told to use short sentences and no tech words
- If something breaks you get a normal explanation, not a blank page

## Security and privacy stuff

- **The API key is in the browser.** That means anyone who can open the site could find it. So this is only meant to be run on your own computer for the class project. Don't put it on the internet without moving the Gemini call to a backend.
- **Free tier privacy.** Google says that on the free tier they might use what you send to improve their products. So only test with fake messages, not real private ones.
- **We don't trust the messages.** The AI is told to never follow instructions that are inside a pasted message, so a scammer can't trick our checker. We also show the AI's answer as plain text and not as HTML.
- **File limits.** Images have to be PNG, JPG, or WEBP and 8 MB or less. Text can be up to 20,000 characters.
- **The AI can be wrong.** It's a helper, not a guarantee. If you're not sure, call the company using a phone number you already trust.

## Stuff that doesn't work yet

Being honest here:

- The "Text them" and "Email them" buttons for the caregiver only show a message saying it was sent. They don't actually send anything yet.
- The community board saves posts in your own browser only, so other people can't see them. It also comes with some sample posts, and the posts aren't cleaned up for safety yet.
- You need internet for it to work, because of Gemini, the icons, and the font.

## Something broke, now what?

| What you see | What to try |
|---|---|
| "No Gemini API key found" | Make `js/config.js` from `js/config.example.js` and paste your key |
| "Gemini rejected the API key" or "would not accept this request" | Check the key for typos or extra spaces, then hard refresh with Ctrl+Shift+R. Make sure it's a Gemini key from AI Studio. Some people online have reported that keys starting with `AQ.` get rejected, so if a new key still fails, try making one with a different personal Google account |
| "model name is no longer available" | Change the `MODEL` in `js/ai-integration.js` |
| "Too many requests" | You hit the free limit, wait a minute and try again |
| "Could not reach Gemini" | Check your wifi |
| Page looks weird or icons are missing | Your internet might be off, the fonts and icons load from the web |

If you want to see Google's exact error, press **F12**, click the **Network** tab, try the scan again, and click the failed request, then **Response**. Don't share the **Headers** tab because your key is in there.

## The team

| Who | What they did |
|---|---|
| Avaneesh | Homepage |
| Sanjiv | Input page |
| Praneysh | Results page |
| Aayush | AI integration and team lead |
| Darsh | JavaScript help and learning |

## If you're working on this

1. Make sure you're on the right repo:
   ```bash
   git remote -v
   ```
   It should say `https://github.com/aayushgupta317/AASDP-CSForGood26-27.git`
2. Get the newest code and make your own branch:
   ```bash
   git pull origin main
   git checkout -b feature-your-feature
   ```
3. Save and push your work:
   ```bash
   git add .
   git commit -m "Say what you changed"
   git push origin feature-your-feature
   ```
4. On GitHub click **Compare & pull request**, add a title and short description, and have a teammate look at it before it gets merged.

**Never commit:** `js/config.js` or any API key, `.DS_Store`, or ZIP files. Always run `git status` before you commit to double check.

---

Thanks for checking out our project. We built this to help people stay safe online.
