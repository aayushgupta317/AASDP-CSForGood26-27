# NexTech CS for Good - Senior Safety & Digital Literacy App

Welcome to our repository for the NexTech CS for Good project. We are building an app to help seniors and older adults understand common digital threats, confusing technology concepts, and device settings in plain, accessible language.

## Project Goal

Our goal is to create a user-friendly web application that explains:

- **Common scams** — how to recognize phishing emails, fake tech support calls, and fraudulent schemes
- **Confusing emails** — what legitimate companies really ask for, how to spot suspicious messages, and what to do if something seems off
- **Device settings & features** — clear explanations of privacy settings, security features, browser tools, and smartphone functions
- **Digital safety tips** — practical advice for staying secure online

By working with seniors, local community centers, and digital literacy advocates, we're building something that makes technology less intimidating and helps protect vulnerable populations from fraud and scams.

## Who We're Building This For

This app is designed for:
- Seniors and older adults learning to use technology
- People new to smartphones, email, or the internet
- Anyone looking for clear, jargon-free explanations of digital safety

The app should be easy to navigate, use large readable text, and explain concepts without technical jargon.

## Step 1: Clone the Repository

Each team member should begin by downloading the project to their own computer.

Go to the GitHub repository.
Click the green Code button.
Copy the HTTPS link.
Open your terminal or command prompt.
Run:

```bash
git clone https://github.com/aayushgupta317/AASDP-CSForGood26-27.git
```

Then move into the project folder:

```bash
cd AASDP-CSForGood26-27
```

This gives you a local copy of the project so you can work on it from your machine.

## Step 2: Create the Initial Project Files

If you are the project owner or the first person setting up the repository, create the base files before teammates begin contributing.

For example:

```bash
README.md
index.html
style.css
app.js
assets/
```

Once your files are ready, add them to Git:

```bash
git add .
```

Create a commit message that describes the setup:

```bash
git commit -m "Initial project setup"
```

Then push the files to the main branch:

```bash
git push origin main
```

This makes the project available for the rest of the team on GitHub.

## Step 3: Work on Separate Branches

To avoid overwriting each other's work, every teammate should create their own branch before making changes.

First, pull the latest version of the project:

```bash
git pull origin main
```

Then create a feature branch for your task:

```bash
git checkout -b feature-scam-guide
```

You can name branches based on what you're working on, for example:

- feature-phishing-guide
- feature-email-safety
- feature-privacy-settings
- feature-device-tutorial
- fix-accessibility
- feature-search-function
- feature-senior-center-partnership

This keeps our work organized and makes it easier to review changes later.

## Step 4: Make Your Changes

Open the project in VS Code or another editor and work on your assigned section.

Each person might focus on:

- Creating content about specific scams (email fraud, fake tech support, romance scams, etc.)
- Writing explanations of confusing device settings
- Building interactive tutorials or walkthroughs
- Designing user-friendly navigation
- Improving accessibility (large fonts, clear colors, easy-to-read language)
- Testing with seniors or community partners
- Building search or filtering features

Because you are working on your own branch, your edits will not affect the main project until you push and merge them.

## Step 5: Save, Commit, and Push

When you're finished with your changes, stage the files:

```bash
git add .
```

Create a clear commit message:

```bash
git commit -m "Added phishing email guide with examples"
```

Then push your branch to GitHub:

```bash
git push origin feature-scam-guide
```

Your branch should now appear in the repository for review.

## Step 6: Open a Pull Request

After pushing your branch, go to the repository on GitHub.

GitHub will usually offer the option to Create a Pull Request. A pull request (PR) allows our team to:

- review the content and code for clarity and accuracy
- check that explanations are simple and jargon-free
- ensure the design is accessible and easy to use
- test with target users (seniors, community partners)
- discuss improvements
- merge updates safely into main

Once teammates review the work and approve it, the PR can be merged into main.

## Team Workflow Summary

The overall project workflow looks like this:

```text
Project owner sets up repository
        ↓
Repository is pushed to GitHub
        ↓
Team members pull the latest version
        ↓
Each member creates a branch
        ↓
Members work on their assigned feature or content
        ↓
Changes are committed and pushed
        ↓
Pull requests are reviewed (content, design, accessibility)
        ↓
Approved changes are merged into main
```

## Team Collaboration Guidelines

To keep the project smooth and organized, we should:

- pull the latest version before starting work
- use clear, descriptive branch names
- make small, focused commits with good messages
- write content in plain, accessible language
- test with community partners and target users
- review pull requests carefully before merging
- communicate when editing the same file or feature
- keep accessibility in mind (font size, color contrast, simple language)

## Content Guidelines

When creating content for this app:

- **Use plain language** — avoid technical terms; if you must use them, explain them simply
- **Use real examples** — show actual scam emails, screenshots, or common confusion points
- **Be encouraging** — remind users that it's okay to ask questions and be cautious
- **Organize clearly** — use short sections, bullet points, and headings
- **Test with seniors** — whenever possible, ask community partners or seniors to review content
- **Think accessibility** — use large fonts, good color contrast, and simple navigation

## Final Note

This project is more than just an app — it's about protecting vulnerable populations and empowering seniors to use technology safely and confidently. By working together through GitHub and pull requests, and by staying connected to the community we're serving, we can build something meaningful that makes a real difference.

Thank you for being part of NexTech CS for Good! 🌟
