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




---

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)  
- npm or yarn  
- Git  
- PostgreSQL database  

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the `backend` folder with the required variables (see Environment Variables section above).

4. Start the backend server:
```bash
npm start
```
The server will run on `http://localhost:5000` (or the PORT specified in your `.env`).

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the `frontend` folder with the required variables.

4. Start the development server:
```bash
npm run dev
```
The application will open in your browser at `http://localhost:5173` (or the Vite default port).

---

## 📁 Project Structure

```
VisionaryAi-1/
├── backend/
│   ├── config/           # Configuration files (DB, Cloudinary, Multer)
│   ├── controllers/      # Request handlers (AI & User)
│   ├── Middlewares/      # Custom middleware functions
│   ├── routes/           # API routes
│   ├── server.js         # Main server file
│   └── package.json      # Backend dependencies
├── frontend/
│   ├── public/           # Static assets
│   ├── src/
│   │   ├── assets/       # Image/media assets
│   │   ├── Components/   # Reusable React components
│   │   ├── Pages/        # Page components
│   │   ├── utils/        # Utility functions (API client, error handling)
│   │   ├── App.jsx       # Main App component
│   │   └── main.jsx      # React entry point
│   ├── package.json      # Frontend dependencies
│   └── vite.config.js    # Vite configuration
└── README.md             # Project documentation
```

---

## 🔧 Development Workflow

### Running Both Services Simultaneously
- Open two terminals
- In terminal 1: `cd backend && npm start`
- In terminal 2: `cd frontend && npm run dev`

### Building for Production
**Backend:**
```bash
cd backend
npm start  # or npm run build (if available)
```

**Frontend:**
```bash
cd frontend
npm run build
```

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Port already in use | Change PORT in `.env` or kill the process using that port |
| Database connection error | Verify DATABASE_URL in `.env` and ensure PostgreSQL is running |
| API not responding | Ensure backend server is running and VITE_API_BASE_URL is correct |
| Clerk authentication fails | Verify CLERK_PUBLISHABLE_KEY and CLERK_SECRET_KEY are correct |
| Images not uploading | Check Cloudinary credentials and API keys in `.env` |

---

## 📚 API Usage Examples

### Generate Article/Blog Title
```bash
POST /api/generateArticle
Content-Type: application/json

{
  "topic": "Artificial Intelligence",
  "style": "formal"
}
```

### Generate Image
```bash
POST /api/generateImage
Content-Type: application/json

{
  "prompt": "A futuristic city at sunset"
}
```

### Remove Background
```bash
POST /api/removeBackground
Content-Type: multipart/form-data

file: <image_file>
```

---

## 🤝 Contributing
Contributions are welcome! Please follow these steps:
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit changes: `git commit -m "Add your feature"`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

## 📄 License
This project is licensed under the MIT License — feel free to use it for personal and commercial projects.

---



