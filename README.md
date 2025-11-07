# 🧠 AIVerse — The Ultimate Full-Stack AI Toolkit

## 🚀 Introduction
In today’s AI-driven digital world, creators, professionals, and learners constantly seek intelligent tools to enhance productivity and creativity.  
**AIVerse** is a full-stack AI toolkit web application that empowers users to generate high-quality content and visuals effortlessly.  

The platform provides multiple AI-powered utilities such as:
- Article & blog title generation  
- Image generation  
- Background/object removal  
- Resume reviewing  

Additionally, **AIVerse** features a **community/dashboard** where users can showcase and explore AI-generated creations — fostering collaboration and innovation among users.

---

## 🎯 Objectives
1. Provide an all-in-one AI toolkit for generating written and visual content.  
2. Integrate AI models for blog titles, articles, and image creation.  
3. Enable background/object removal from images using AI.  
4. Offer resume analysis and feedback through AI.  
5. Build personalized dashboards for users to manage AI outputs.  
6. Create a community section for sharing and exploring AI creations.  
7. Ensure secure authentication and smooth frontend–backend integration.

---

## ⚙️ Features
| No. | Feature | Description |
|-----|----------|-------------|
| 1 | **AI Article & Blog Title Generator** | Uses NLP models to generate high-quality, SEO-friendly content. |
| 2 | **AI Image Generator** | Creates realistic or artistic images from text prompts using AI models. |
| 3 | **Background/Object Removal** | Automatically removes image backgrounds or unwanted objects with precision. |
| 4 | **Resume Review System** | Provides AI-based feedback on resume content and formatting. |
| 5 | **User Dashboard** | Displays a personalized history of generated AI outputs. |
| 6 | **Community Section** | Allows users to publish their creations and explore others’ AI work. |
| 7 | **Responsive Design** | Optimized for desktops, tablets, and mobile devices. |

---

## 🧩 Technologies Used
**Frontend:** React.js, Tailwind CSS  
**Backend:** Node.js, Express.js  
**Database:** Postresql  
**AI APIs:** OpenAI  
**Image Storage:** Cloudinary  
**Authentication:** Clerk  
**Version Control & Deployment:** GitHub, Render, Vercel  

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|-----------|-------------|
| `GET` | `/api/dashboard` | Get all user-generated outputs |
| `POST` | `/api/generateArticle` | Generate AI-based article or blog title |
| `POST` | `/api/generateImage` | Generate AI-based image |
| `POST` | `/api/removeObject` | Remove object from an image |
| `POST` | `/api/removeObject` | Remove background  from an image |
| `POST` | `/api/resumeReview` | Get AI feedback on uploaded resume |
| `GET` | `/api/community` | Get all community posts |
| `PUT` | `/api/toggleLikes/:id` | Like/unlike a community post |

---

## 🏗️ Implementation Details

### 🔹 Frontend
- Built using **React.js** with **Tailwind CSS** for a modern, responsive design.  
- Components for AI tools like:
  - Text Generator  
  - Image Generator  
  - Resume Review  
  - Background Remover
  - Object Remover 
- Used **Fetch API** for communication with backend routes.  
- Integrated **authentication & dashboard** for user management.

### 🔹 Backend
- Developed using **Node.js** and **Express.js** for RESTful APIs.  
- Separate **routes and controllers** for authentication, AI tools, and community modules.  
- Used **Clerk** for secure access control.  
- Connected to **Postresql** for storing users, AI creations, and posts.

### 🔹 AI Integration
- Integrated **OpenAI for text generation and resume review.  
- Used **ClipDrop** for image generation.  
- Integrated **Cloudinary** for image upload, storage, and manipulation.

### 🔹 Community & Dashboard Module
- **Dashboard** displays all AI-generated outputs of a user.  
- **Community Page** lets users post, view, and explore AI creations.

---

## 🌐 Deployment
- **Frontend:** Vercel  
- **Backend:** Render  
- **Database:** Neon  
- All environment variables securely managed through `.env` files.

---

## ⚡ Environment Variables
Create a `.env` file in the root folder and add:

```backend env
backend env:
PORT=
DATABASE_URL=
CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
GEMINI_API_KEY=

CLIP_DROP=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

frontend env:
VITE_CLERK_PUBLISHABLE_KEY=
VITE_API_BASE_URL=
