# ✨ AI Content Generator Website

A modern, responsive AI-powered web application that enables users to generate high-quality content using cutting-edge Large Language Models (LLMs) like GPT-4. This platform is built with Next.js 13+, Tailwind CSS, and Clerk for secure authentication.

---

## 🚀 Live Demo

👉 [Visit the Project](https://github.com/Laughing0004/ai-content-generator) 
---

## 📌 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Screenshots](#screenshots)
- [Folder Structure](#folder-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

---

## ✅ Features

- 🧠 Generate blog posts, product descriptions, and other content using AI (GPT-3.5/GPT-4)
- 🎨 Beautiful and responsive UI with Tailwind CSS
- 🔐 Authentication via Clerk (Sign in/Sign up)
- 🌙 Dark mode support
- 📈 History tracking of generated content
- 📄 Download generated content
- 🔄 Feedback loop to improve generation quality
- 🛡️ Protected dashboard routes using middleware
- 📁 Clean and scalable project structure using App Router

---

## 🛠 Tech Stack

- **Frontend:** Next.js 13+, TypeScript, Tailwind CSS
- **Authentication:** [Clerk.dev](https://clerk.dev)
- **AI Model:** OpenAI GPT-3.5 / GPT-4 via API
- **Styling & Animations:** Tailwind CSS, `tailwindcss-animate`
- **Deployment:** Vercel
- **Icons:** Lucide
- **State Management:** React (Native state)
- **Additional Tools:** Drizzle ORM, ShadCN UI, Razorpay (if applicable)

---

## 📷 Screenshots

| Landing Page | Sign-In Page | Dashboard |
|--------------|--------------|-----------|
| ![Landing](https://github.com/user-attachments/assets/97a0811e-4f45-48bf-9716-1e6579740d12) | ![Sign-In](https://github.com/user-attachments/assets/6128ae73-fdbf-41af-9505-24b97587c2bb) | ![Dashboard](https://github.com/user-attachments/assets/48731560-b45a-4d02-adfc-ddf5adad66b7) |

## 📁 Folder Structure (Simplified)

\`\`\`
app/
├── (auth)/
│   ├── sign-in/[[...sign-in]]/page.tsx
│   └── sign-up/[[...sign-up]]/page.tsx
├── dashboard/
│   └── page.tsx
├── components/
│   └── ui/...
├── layout.tsx
├── page.tsx (Landing Page)
middleware.ts
tailwind.config.ts
postcss.config.mjs
tsconfig.json
.env.local
\`\`\`

---

## ⚙️ Getting Started

### 1. Clone the Repository

\`\`\`bash
git clone https://github.com/Laughing0004/ai-content-generator.git
cd ai-content-generator
\`\`\`

### 2. Install Dependencies

\`\`\`bash
npm install
# or
yarn install
\`\`\`

### 3. Configure Environment Variables

Create a \`.env.local\` file and add the following:

\`\`\`env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your-clerk-key
CLERK_SECRET_KEY=your-secret-key
OPENAI_API_KEY=your-openai-api-key
\`\`\`

### 4. Run the Development Server

\`\`\`bash
npm run dev
# or
yarn dev
\`\`\`

Visit [[http://localhost:3000]]([http://localhost:3000]) to see the app.

---

## 🔐 Authentication Flow

- Landing Page (\`/\`)
- → Click **Get Started** ➝ \`/sign-in\`
- → After Sign-in ➝ Redirect to \`/dashboard\`
- Routes under \`/dashboard\` are protected via \`middleware.ts\` and \`Clerk\`.

---

## 🚀 Deployment

### Deploy to Vercel:

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import project from GitHub
4. Set environment variables in Vercel Dashboard
5. Click **Deploy**

---

## 🌐 Environment Variables Reference

| Variable                     | Description                         |
|-----------------------------|-------------------------------------|
| \`NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY\` | Public key for Clerk frontend |
| \`CLERK_SECRET_KEY\`          | Secret key for Clerk backend        |
| \`OPENAI_API_KEY\`            | OpenAI API key for content generation |

---

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repo
2. Create a branch: \`git checkout -b feature/feature-name\`
3. Commit changes: \`git commit -m "feat: add feature"\`
4. Push to branch: \`git push origin feature/feature-name\`
5. Open a pull request

---

## 📝 License

This project is licensed under the [MIT License](LICENSE).

---

## 📬 Contact

**Developer:** PK (Purushottam Kumar)  
📧 Email: your-labdesign0004@gmail.com 
🔗 Portfolio: [your-portfolio-link.com](https://laughing0004.github.io/My-Portfolio/)

---

> Built with ❤️ using Next.js, Tailwind, Clerk, and OpenAI.
