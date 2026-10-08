# CSforGood-Webpage
Once everyone has accepted their GitHub invitations, you can start working on the project together.

The best way to collaborate is for each person to have their own copy of the repository and work on separate Git branches. This helps prevent people from accidentally overwriting or breaking each other's code.

Step 1: Clone the Repository
Both the project owner and collaborators should first download a copy of the repository to their own computers.

Go to the GitHub repository.
Click the green <> Code button.
Copy the HTTPS URL.
Open your terminal or Command Prompt.
Run:
git clone <PASTE_URL_HERE>
Move into the project folder:
cd <REPOSITORY_NAME>
You now have a local copy of the GitHub repository that you can work on from your computer.

Step 2: Create the Initial Project Files — Owner
If you are the project owner or the person starting the project, create the initial files before your teammates begin working.

For example, your project might include:

README.md — explains the project
index.html — main HTML page
style.css — website styling
app.js — JavaScript functionality
Once you have created the initial files, save them and add them to Git:

git add .
Create a commit describing your changes:

git commit -m "Initial project setup"
Then push the files to the main branch on GitHub:

git push origin main
Your initial project is now available on GitHub for the rest of the team.

Step 3: How Team Members Should Add Files Safely
After the owner has pushed the initial project, collaborators can begin working.

Important: Collaborators should avoid working directly on the main branch. Each person should create their own branch for the specific feature or task they are working on.
1. Get the Latest Version
First, make sure your local copy contains the owner's latest changes:

git pull origin main
2. Create a New Branch
Create a branch for your specific task:

git checkout -b feature-add-login
You can name the branch based on what you are working on.

Examples:

feature-add-login
feature-user-profile
feature-homepage
fix-navigation
3. Create or Modify Your Files
Open the project in your code editor, such as VS Code, and work on your assigned feature.

Because you are working on your own branch, your changes will not immediately affect the main branch.

4. Save and Commit Your Work
When you are finished with your changes, stage the files:

git add .
Then create a commit:

git commit -m "Added login form"
Try to make your commit message clearly describe what you changed.

5. Push Your Branch to GitHub
Upload your branch to GitHub:

git push origin feature-add-login
Your branch and changes should now appear on the GitHub repository.

Step 4: Review and Merge Using a Pull Request
After pushing your branch, go to the repository on GitHub.

GitHub will usually show an option to Create a Pull Request for your newly pushed branch.

A Pull Request (PR) allows the team to:

Review the code before it is added to the project
Discuss or suggest changes
Find potential problems
Make sure the new feature works with the existing code
Safely merge changes into the main branch
Once the team has reviewed the changes and everyone is satisfied, the Pull Request can be merged into main.

The Basic Team Workflow
The overall process looks like this:

Owner creates the project
        ↓
Owner pushes initial files
        ↓
Team member pulls the latest version
        ↓
Team member creates a new branch
        ↓
Team member makes changes
        ↓
Team member commits changes
        ↓
Team member pushes their branch
        ↓
Team member opens a Pull Request
        ↓
Team reviews the changes
        ↓
Pull Request is merged into main
