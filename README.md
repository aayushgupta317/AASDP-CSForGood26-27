# NexTech CS for Good - Senior Safety & Digital Literacy App

Welcome to our repository for the NexTech CS for Good project. Our team is building a simple web app to help seniors and older adults understand common scams, suspicious emails, and confusing device settings in plain, easy-to-understand language.

## Project Goal

Our goal is to create an app that helps people learn how to stay safe online without technical jargon. The app should explain:

- Common scams and fraud attempts
- Suspicious emails and messages
- Confusing device settings and buttons
- Basic digital safety tips for everyday use

This project is meant to be useful, friendly, and easy to understand for people who may not be comfortable with technology.

## Who This Is For

This app is designed for:
- Seniors and older adults
- People new to phones, email, and the internet
- Anyone who wants simple explanations of digital safety

We want the experience to feel calm, clear, and accessible.

## Team Roles

Our team has 5 people, and each person is responsible for a different part of the product:

### Avaneesh — Homepage
- Build the landing page
- Create a welcoming homepage for the app
- Make the site easy to understand and visually friendly
- Add instructions on how to use the app

### Sanjiv — Input Page
- Build the page where users upload screenshots, text, or email content
- Create the form for entering information
- Add simple instructions so older users know what to do
- Make the upload process easy to follow

### Praneysh — Results Page
- Build the results page
- Show a scam score or percentage (example: 85% likely scam)
- Explain why something seems suspicious
- Give clear suggestions on what the user should do next

### Aayush — AI + Leadership
- Research and learn how to use AI tools like GPT or Claude in a website
- Help connect the app to AI for scam detection and explanation
- Lead planning for technical decisions
- Help the team learn JavaScript and API usage

### Darsh — JavaScript Learning + Support
- Learn more about JavaScript and website logic
- Help build interaction on the pages
- Support features like buttons, form behavior, and page updates
- Work with Aayush to learn how to connect the frontend to AI tools

## Project Flow

```text
Homepage (Avaneesh)
    ↓
Upload / input page (Sanjiv)
    ↓
AI analyzes content (Aayush)
    ↓
Results page explains the risk (Praneysh)
    ↓
User learns how to stay safe
```

## Simple Team Workflow

We want this process to stay simple and easy for everyone.

### What we will use

- VS Code — for editing code
- GitHub website — for sharing and reviewing code
- GitHub Desktop (optional) — for people who prefer a simpler interface

We do not need to install many tools. The goal is to keep setup easy.

## Step 1: Open the Repository

One person should set up the project first.

Go to the GitHub repository:
https://github.com/aayushgupta317/AASDP-CSForGood26-27

Then:
1. Click the green Code button
2. Choose the easiest option for you:
   - Codespaces (browser-based VS Code)
   - GitHub Desktop
   - Local VS Code if you already have it installed

## Step 2: Everyone Gets the Project

Each teammate should get the repository on their computer or use Codespaces.

### Option A: Use GitHub Desktop (easy for most people)

1. Download GitHub Desktop: https://desktop.github.com/
2. Open GitHub Desktop
3. Click File → Clone Repository
4. Search for `aayushgupta317/AASDP-CSForGood26-27`
5. Choose a folder on your computer
6. Click Clone
7. Open the project in VS Code

### Option B: Use Codespaces (browser version)

1. Go to the GitHub repository
2. Click the green Code button
3. Click Codespaces
4. Click Create codespace
5. VS Code opens in your browser

This is a good option if you want to avoid local setup.

### Option C: Use local VS Code only

1. Open VS Code
2. Click File → Open Folder
3. Open the project folder on your computer

## Step 3: Create Your Own Branch

Each person should work on a separate branch so no one overwrites someone else's work.

Examples:
- Avaneesh: `feature-homepage`
- Sanjiv: `feature-upload-page`
- Praneysh: `feature-results-page`
- Aayush: `feature-ai-integration`
- Darsh: `feature-javascript-learning`

### In GitHub Desktop:
1. Click Current Branch
2. Click New Branch
3. Enter your branch name
4. Click Create Branch

### In VS Code Terminal:
```bash
git checkout -b feature-homepage
```

Replace the name with your own branch.

## Step 4: Start Working in VS Code

Open the project in VS Code and edit the file(s) assigned to you.

Suggested files:
- `index.html` — homepage
- `upload.html` — input page
- `results.html` — results page
- `style.css` — shared styling
- `app.js` — JavaScript logic
- `ai-integration.js` — AI API work

Each person should stay focused on their assigned page or task.

## Step 5: Save Your Work

Whenever you finish a section:

1. Save the file in VS Code
2. Open GitHub Desktop or the terminal
3. Commit your changes

### In GitHub Desktop:
1. Write a short commit message
2. Click Commit to [your branch]
3. Click Push origin

### In Terminal:
```bash
git add .
git commit -m "Added homepage section"
git push origin feature-homepage
```

Use simple, clear commit messages like:
- Added homepage layout
- Created upload form
- Built scam results page
- Started AI integration

## Step 6: Pull Requests

After pushing your branch, open the GitHub repository.

GitHub will usually show a button like:
- Compare & pull request

Click it, then:
1. Add a title
2. Add a short description of what you changed
3. Click Create Pull Request

The team can review it and then merge it into main.

## Step 7: Get Updates from the Team

Before you start working, always pull the newest version from GitHub.

### In GitHub Desktop:
- Click Fetch origin
- Then click Pull origin

### In VS Code Terminal:
```bash
git pull origin main
```

This helps everyone stay updated.

## Project Responsibilities After the Basic Pages Are Done

Once the main webpage is created, each person can continue doing more work based on their role:

### Avaneesh
- Improve the homepage design
- Make the site more accessible and senior-friendly
- Add clearer colors, spacing, and instructions

### Sanjiv
- Improve upload features
- Add better instructions for screenshots and pasted text
- Explore drag-and-drop or file upload improvements

### Praneysh
- Improve the scam score display
- Add more explanation for risky content
- Add a friendly explanation section with "why this is risky"

### Aayush
- Learn more about JavaScript and AI APIs
- Connect the app to GPT or Claude
- Help the team use AI correctly and safely
- Build technical documentation for the project

### Darsh
- Learn JavaScript deeply
- Help refine app interactions and page logic
- Support the team with frontend features and debugging
- Work on making the app smoother and more responsive

## Good Team Habits

To keep the project simple and organized, everyone should:

- Work on their own branch
- Save work often
- Push changes regularly
- Communicate when they finish a feature
- Pull the latest version before starting work
- Review each other's code before merging

## Suggestions for the App

Here are some ideas the team can consider after the basic version is finished:

- Add a large-font mode for accessibility
- Add clear scam examples with red flags
- Add a button explaining what to do if the message looks suspicious
- Add help text for seniors using phones or email
- Add a safe "learn more" section about common scams
- Add a feature where users can paste text from an email
- Add a way to show multiple scam indicators in simple language
- Add simple colors like green for safe, yellow for caution, red for scam

## Final Note

This project is not just about building a website — it is about using technology to help people stay safe online. Our goal is to make this app easy to use, useful to seniors, and clear enough that people feel supported instead of confused.

By working together and keeping the process simple, we can build something meaningful and helpful.

Thank you for being part of NexTech CS for Good.
