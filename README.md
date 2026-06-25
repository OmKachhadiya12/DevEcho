# 🚀 DevEcho

DevEcho is a full-stack social media and real-time messaging platform inspired by modern community applications. Users can create posts, interact with other users, and communicate instantly through real-time chat.

🌐 Live Demo: https://devecho-1.onrender.com/

---

## ✨ Features

- 🔐 Authentication & Authorization using JWT
- 📝 Create and share posts
- 🗑️ Delete your posts
- ❤️ Like / Unlike posts
- 💬 Comment on posts
- 👥 Follow / Unfollow users
- ❄️ Freeze your account
- 🖼️ Upload images in posts
- 💬 Real-time chat with Socket.IO
- 📷 Image sharing in chat
- 👀 Seen / Unseen message status
- 🔊 Notification sounds
- 🌓 Dark / Light mode
- 📱 Fully responsive design

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Vite
- Chakra UI
- React Router DOM

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Socket.IO
- Cookie Parser

### Cloud Services
- Cloudinary (Image Storage)
- Render (Deployment)

---

## 📸 Screenshots

### Home Feed
<img width="1197" height="852" alt="image" src="https://github.com/user-attachments/assets/852ae37a-07b3-439d-96ed-3f534c2130f1" />

### User Profile

<img width="851" height="866" alt="image" src="https://github.com/user-attachments/assets/2205bd7d-a622-423b-b111-c51a26e13d3c" />

### Real-Time Chat

<img width="962" height="858" alt="image" src="https://github.com/user-attachments/assets/955b8d3f-3e4c-4dc3-9bdb-92ee0228afd7" />


## 📂 Project Structure

```bash
DevEcho
│
├── client
│   ├── src
│   ├── public
│   └── ...
│
├── server
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── socket
│   └── ...
│
└── package.json
```

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory and add:

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

NODE_ENV=production
```

---

## 🚀 Installation & Setup

### Clone the repository

```bash
git clone https://github.com/your-username/DevEcho.git
cd DevEcho
```

### Install dependencies

```bash
npm install
npm install --prefix client
```

### Run development server

```bash
npm run dev
```

### Build for production

```bash
npm run build
```

### Start production server

```bash
npm start
```

---

## 🎯 Key Learning Outcomes

This project helped me gain hands-on experience with:

- Full-stack MERN development
- Authentication & Authorization with JWT
- REST API development
- MongoDB database design
- Real-time communication using Socket.IO
- Cloudinary image management
- Deployment using Render
- Production debugging and deployment workflows

---

## 🔮 Future Improvements

- Push notifications
- Message reactions
- User search improvements
- Group chats
- Media optimization
- Infinite scrolling feed

---

## 👨‍💻 Author

**Om Kachhadiya**

- GitHub: https://github.com/OmKachhadiya12

---

⭐ If you found this project interesting, consider giving it a star!
