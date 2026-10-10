# NexTech CS for Good - Senior Safety & Digital Literacy App

Welcome to the NexTech CS for Good repository. This project is a simple web app designed to help seniors and older adults understand common scams, suspicious emails, confusing device settings, and digital safety basics in plain language.

## Project Goal

Our goal is to create a web app that helps people learn how to stay safe online without technical jargon. The app should explain:

- Common scams and fraud attempts
- Suspicious emails and messages
- Confusing device settings and buttons
- Basic digital safety habits for everyday use

This project is meant to be useful, friendly, and easy to understand for people who may not be comfortable with technology.

## Who This App Is For

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
- Add instruction text that helps users understand the app

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
- Research and learn how to use AI tools in the app
- Help connect the app to AI for scam detection and explanation
- Lead planning for technical decisions
- Help the team learn JavaScript and API usage

### Darsh — JavaScript Learning + Support
- Learn more about JavaScript and website logic
- Help build interactivity on the pages
- Support features like buttons, form behavior, and page updates
- Work with Aayush to learn how to connect the frontend to AI tools

## Project Workflow

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

## Repository Structure

The repository should be organized like this:

```text
NexTech-CSforGood/
├── README.md
├── index.html
├── pages/
│   ├── upload.html
│   └── results.html
├── css/
│   └── style.css
├── js/
│   ├── app.js
│   └── ai-integration.js
├── assets/
│   └── (images, icons, etc.)
├── .gitignore
└── .DS_Store (should not be committed)
```

Important:
- Keep files organized in folders
- Do not leave everything loose in the root
- Do not upload random ZIP files
- Do not commit `.DS_Store`

## Important Setup Rules

These are the most important lessons from the initial setup process. Please do not do the following:

- Do not create a new GitHub repo unless the team explicitly asks for one
- Do not keep a random personal repo connected to this project
- Do not forget to check `git remote -v`
- Do not push to the wrong repository URL
- Do not leave the repo in an unorganized state
- Do not commit `.DS_Store` or ZIP files

Before starting work, always confirm that the repository is the correct one:

```bash
git remote -v
```

It should point to:

```bash
https://github.com/aayushgupta317/AASDP-CSForGood26-27.git
```

If it points somewhere else, fix it:

```bash
git remote set-url origin https://github.com/aayushgupta317/AASDP-CSForGood26-27.git
```

## Correct Setup Process

### Step 1: Clone the Correct Repo

Go to:

https://github.com/aayushgupta317/AASDP-CSForGood26-27

Then clone it using one of these options:

- GitHub Desktop
- VS Code local folder
- GitHub Codespaces

### Step 2: Check the Repo Location

Make sure your local folder is the repo checked out from the GitHub repo above.

Do not create an unrelated folder and then try to push it to a different remote.

### Step 3: Confirm Git Status

Before making changes, run:

```bash
git status
```

If it says the repo is clean, you are ready to work.

### Step 4: Create a Branch Only After the Repo Is Correct

Each teammate should create their own branch from `main`.

Examples:

- Avaneesh: `feature-homepage`
- Sanjiv: `feature-upload-page`
- Praneysh: `feature-results-page`
- Aayush: `feature-ai-integration`
- Darsh: `feature-javascript-learning`

Create a branch like this:

```bash
git checkout -b feature-homepage
```

Or in GitHub Desktop:

1. Click Current Branch
2. Click New Branch
3. Name it clearly
4. Click Create Branch

## What We Did Right

The correct workflow is:

1. Organize the repo structure in folders
2. Create the project files in the right folder locations
3. Check that Git is connected to the correct repo
4. Commit the changes
5. Push to `main` when the setup is ready
6. Create feature branches for the actual work after the repo is established

This keeps the repo clean and prevents confusion.

## .gitignore File

Add a `.gitignore` file so system files and zip files are not committed.

Example:

```gitignore
.DS_Store
*.zip
```

Then run:

```bash
git add .gitignore
git commit -m "Add .gitignore"
git push origin main
```

## Committing and Pushing

Whenever you finish work:

```bash
git add .
git commit -m "Describe your change"
git push origin your-branch-name
```

For example:

```bash
git add .
git commit -m "Added homepage layout"
git push origin feature-homepage
```

Use simple commit messages like:

- Added homepage layout
- Created upload form
- Built results page
- Started AI integration
- Fixed styling issues

## Pull Requests

After pushing your branch, open the GitHub repo. GitHub usually shows a button like:

- Compare & pull request

Click it and then:

1. Add a title
2. Add a short description
3. Click Create Pull Request

The team can review it and then merge it into `main`.

## Pull Updates Before Working

Before you start work, always pull the latest version:

```bash
git pull origin main
```

This helps everyone stay updated and prevents merge issues.

## Good Team Habits

To keep the project simple and organized, everyone should:

- Work on their own branch
- Save work often
- Push changes regularly
- Communicate when they finish a feature
- Pull the latest version before starting work
- Review each other's code before merging

## What to Avoid

Please avoid these common mistakes:

- Creating a separate personal repo for this project
- Forgetting to check the remote URL
- Pushing to the wrong GitHub repo
- Leaving `.DS_Store` in the repo
- Uploading ZIP files to the project
- Working in a random local folder that is not connected to the GitHub repo
- Creating multiple different repos for the same project

## Final Note

This project is not just about building a website — it is about using technology to help people stay safe online. Our goal is to make this app easy to use, useful to seniors, and clear enough that people can learn the basics of digital safety without feeling overwhelmed.

The best way to do this is to keep the repository clean, stay organized, and follow the same setup pattern every time.

Thank you for being part of NexTech CS for Good.
