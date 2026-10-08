# CSforGood-Webpage
Instead of creating files directly on the GitHub website, your team should set up the repository on their computers to code locally.

1. Clone the Repository

Everyone on the team (including the owner, if they haven't done it yet) needs to download the repository.
• On the main page of your GitHub repository, click the green Code button and copy the HTTPS URL.
• Open your terminal (or Command Prompt) and run:bash
git clone <PASTE_URL_HERE>
Use code with caution.
• Enter the folder: cd <REPOSITORY_NAME>

2. Create a Branch (Crucial for Collaboration)

Never work directly on the main or master branch at the same time. This causes "merge conflicts" where your code overwrites each other's work.
Before creating any files, create a new branch for the specific feature or file you are working on:
bash
git checkout -b create-initial-files
Use code with caution.

3. Create and Commit the File

Now, open the folder in your favorite code editor (like VS Code) and create your new files (e.g., index.html, main.py, or README.md).
Once you have created or edited your files, save them and log the changes in Git:
bash
# Check what files were changed/created
git status

# Stage the files to be committed
git add .

# Save the changes with a clear message
git commit -m "Create initial project structure and README"
Use code with caution.

4. Push the Branch to GitHub

Send your local branch up to the remote GitHub repository:
bash
git push origin create-initial-files
Use code with caution.

Step 3: Review and Merge (Pull Requests)

Once the branch is pushed, you use GitHub to safely review the new files before adding them to the final project.
1. Go to your repository page on GitHub. You will see a yellow banner that says "Compare & pull request". Click it.
2. Write a short description of what files you added and click Create pull request.
3. Your teammates can now look at the code, leave comments, and make sure everything looks correct.
4. If everything looks good, click Merge pull request. This safely combines your new files into the main branch.
Pro-Tip for the Team: Before anyone starts creating a new file or branch, they should always run git pull origin main in their terminal. This downloads the most updated version of the project so everyone is working on the same page!
