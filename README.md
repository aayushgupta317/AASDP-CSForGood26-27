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

## Team Roles & Responsibilities

Our team of 5 high schoolers is working together to build different parts of the app:

### **Avaneesh - Homepage & User Interface**
- Design and build the main landing page
- Create a clean, welcoming interface that's easy for seniors to understand
- Build navigation menu and overall site structure
- Ensure the design is accessible (large fonts, clear colors, simple layout)
- Add instructions on how to use the app

### **Sanjiv - Input & Upload Page**
- Create the page where users can submit emails or screenshots for analysis
- Build file upload functionality (images, text, screenshots)
- Design a simple, clear form that explains what to upload and why
- Add validation to check that uploads are valid
- Include helpful instructions for seniors on how to take screenshots or copy text

### **Praneysh - Results & Analysis Page**
- Build the page that displays analysis results
- Show a "scam likelihood" percentage or rating (e.g., "This looks 85% likely to be a scam")
- Display specific warnings or red flags found in the email/content
- Provide clear explanations of why something is or isn't a scam
- Add helpful next steps ("What to do if this is a scam")

### **Aayush - AI Integration & Leadership**
- Research and integrate AI tools (like OpenAI's GPT API or Claude API) into the app
- Build the backend logic that analyzes submitted emails/text for scam indicators
- Learn how to make API calls and handle responses in JavaScript/backend
- Lead the team in planning how to use AI effectively
- Document how the AI analysis works so the team understands it
- Mentor Darsh on JavaScript best practices

### **Darsh - JavaScript Development & Enhancement**
- Learn advanced JavaScript to power interactive features
- Build form validation and user interaction handling
- Create smooth transitions between pages
- Add features like copy-to-clipboard, print functionality
- Handle loading states and error messages
- Work with Aayush to integrate AI results into the frontend

---

## Project Structure

Here's how the app will flow:

```
Homepage (Avaneesh)
    ↓
User uploads email/text (Sanjiv)
    ↓
AI analyzes content (Aayush)
    ↓
Results page shows scam likelihood (Praneysh)
    ↓
User gets safety tips & recommendations
```

---

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

The project owner sets up the base structure:

```
index.html (homepage)
upload.html (upload/input page)
results.html (analysis results page)
style.css (styling for all pages)
app.js (main JavaScript functionality)
ai-integration.js (AI/API integration)
assets/ (images, icons, etc.)
```

Once files are ready, add them to Git:

```bash
git add .
```

Create a commit message:

```bash
git commit -m "Initial project setup with page structure"
```

Then push to main:

```bash
git push origin main
```

## Step 3: Work on Separate Branches

Each team member creates their own feature branch:

**Avaneesh:**
```bash
git checkout -b feature-homepage
```

**Sanjiv:**
```bash
git checkout -b feature-upload-page
```

**Praneysh:**
```bash
git checkout -b feature-results-page
```

**Aayush:**
```bash
git checkout -b feature-ai-integration
```

**Darsh:**
```bash
git checkout -b feature-javascript-enhancement
```

This keeps everyone's work organized and prevents conflicts.

## Step 4: Make Your Changes

Each person works on their assigned section:

- Pull the latest code frequently (`git pull origin main`)
- Make your changes in your editor
- Test your work locally
- Commit often with clear messages
- Keep communication open with the team about dependencies

### Important Notes for High Schoolers

- **Avaneesh**: Focus on making the UI beginner-friendly. Test with family members or seniors if possible.
- **Sanjiv**: Think about what makes uploading difficult for seniors (small buttons, confusing labels). Test with real screenshots.
- **Praneysh**: Make the results clear and non-technical. Use simple language, not computer jargon.
- **Aayush**: Research AI APIs early. Try making test calls to understand how they work. Document everything for the team.
- **Darsh**: Focus on small, reusable functions. Comment your code so others can understand it.

## Step 5: Save, Commit, and Push

When you finish a section:

```bash
git add .
git commit -m "Descriptive message about what you changed"
git push origin feature-your-feature-name
```

## Step 6: Open a Pull Request

After pushing, create a Pull Request on GitHub so teammates can review your work.

A PR allows the team to:
- Review code and design
- Suggest improvements
- Catch bugs or issues
- Make sure everything works together
- Test with real users if possible

Once approved, merge into main.

---

## Roadmap & Next Steps

After we complete the core pages and AI integration, we can add:

1. **User Accounts** — let users save their history and get personalized tips
2. **Learning Modules** — interactive tutorials teaching digital safety
3. **FAQ Section** — common questions about scams and security
4. **Mobile App** — convert the website to a mobile-friendly app
5. **Community Features** — let users share common scams they've seen
6. **Real-Time Alerts** — notify users about new scams in the news
7. **Senior Center Integration** — work with local centers to test and gather feedback
8. **Multi-Language Support** — translate for non-English speakers
9. **Video Tutorials** — visual guides for specific topics
10. **Accessibility Features** — voice-over options, text-to-speech, adjustable fonts

---

## Team Collaboration Guidelines

To keep the project smooth and organized, we should:

- pull the latest version before starting work
- use clear, descriptive branch names and commit messages
- make small, focused commits (not huge changes all at once)
- test your code before pushing
- ask questions if you're stuck
- review each other's pull requests carefully
- keep accessibility in mind (large fonts, clear language, easy navigation)
- communicate about changes that might affect others' work

## Content Guidelines

When creating content for this app:

- **Use plain language** — avoid technical terms; if you must use them, explain them simply
- **Use real examples** — show actual scam emails, screenshots, or common confusion points
- **Be encouraging** — remind users that it's okay to ask questions and be cautious
- **Organize clearly** — use short sections, bullet points, and headings
- **Test with target users** — ask family members or local seniors to try it
- **Think accessibility** — large fonts, good color contrast, simple navigation

---

## Resources & Learning

### For Aayush (AI Integration):
- OpenAI API documentation: https://platform.openai.com/docs
- Claude API (Anthropic): https://claude.ai/api
- How to make API calls in JavaScript: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
- Scam detection patterns: research common phishing keywords and scam red flags

### For Darsh (JavaScript):
- MDN Web Docs: https://developer.mozilla.org/en-US/docs/Web/JavaScript
- JavaScript Promises & Async/Await: Learn how to handle AI API responses
- DOM Manipulation: https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model
- Form Handling & Validation

### For Everyone:
- GitHub Basics: https://guides.github.com/
- HTML/CSS Fundamentals (if needed)
- Accessibility Guidelines: https://www.w3.org/WAI/fundamentals/

---

## Final Note

This project is more than just an app — it's about protecting vulnerable populations and empowering seniors to use technology safely and confidently. As high schoolers, you're gaining real-world experience in:

- **Teamwork** — coordinating across 5 people with different roles
- **Software development** — building a real web application
- **Problem-solving** — debugging, testing, and improving code
- **Social impact** — creating something that genuinely helps people
- **AI & technology** — learning cutting-edge tools like GPT and Claude

By working together through GitHub, communicating clearly, and staying connected to the problem you're solving, you can build something meaningful that makes a real difference.

Thank you for being part of NexTech CS for Good! 🌟
