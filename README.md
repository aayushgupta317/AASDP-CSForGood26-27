# NexTech CS for Good - Team Webpage Project

Welcome to our repository for the NexTech CS for Good project. This project is a collaborative web development effort where our team builds a website to raise awareness, share information, and promote meaningful action around a social issue.

This repository is where we plan, create, review, and improve our webpage as a team using GitHub, version control, and branch-based collaboration.

## Project Goal

Our goal is to create a clean, engaging, and accessible webpage that reflects the values of the CS for Good initiative. The project helps us apply web development skills while working together in a realistic team environment.

The project may include files such as:

- README.md — overview and collaboration guide
- index.html — main webpage structure
- style.css — page styling and layout
- app.js — interactive functionality and JavaScript

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
git checkout -b feature-homepage
```

You can name branches based on your task, for example:

- feature-homepage
- feature-about-section
- feature-contact-form
- fix-navigation
- feature-team-page

This keeps our work organized and makes it easier to review changes later.

## Step 4: Make Your Changes

Open the project in VS Code or another editor and work on your assigned section.

Each person should focus on their own part of the website, such as:

- homepage design
- about section content
- team member cards
- donation / call-to-action section
- contact page or form
- responsive styling updates

Because you are working on your own branch, your edits will not affect the main project until you push and merge them.

## Step 5: Save, Commit, and Push

When you're finished with your changes, stage the files:

```bash
git add .
```

Create a clear commit message:

```bash
git commit -m "Added homepage hero section"
```

Then push your branch to GitHub:

```bash
git push origin feature-homepage
```

Your branch should now appear in the repository for review.

## Step 6: Open a Pull Request

After pushing your branch, go to the repository on GitHub.

GitHub will usually offer the option to Create a Pull Request. A pull request (PR) allows our team to:

- review the code before it is merged
- discuss issues or improvements
- check that the page works correctly
- make sure new changes fit the project goals
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
Members work on their assigned feature
        ↓
Changes are committed and pushed
        ↓
Pull requests are reviewed
        ↓
Approved changes are merged into main
```

## Team Collaboration Guidelines

To keep the project smooth and organized, we should:

- pull the latest version before starting work
- use clear branch names
- make small, focused commits
- write descriptive commit messages
- review pull requests before merging
- communicate when editing the same file or feature

This workflow helps us collaborate efficiently while reducing the risk of overwriting each other's work.

## Final Note

This project is more than just a webpage — it is an opportunity to apply teamwork, problem-solving, and software development practices in a meaningful CS for Good context. By working together through GitHub and pull requests, we can build a project that is both technically strong and aligned with the goals of NexTech CS for Good.
