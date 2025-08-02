
# 🎵 Sonic Vibe - React + Vite Music App

This is a modern music streaming web application built with **React** and **Vite**, featuring seamless audio playback, hot module replacement, and Firebase integration for user data. It serves as a minimal yet scalable boilerplate to kickstart modern web apps.

---

## ⚙️ Tech Stack

- ⚛️ React (with JSX)
- ⚡ Vite (super fast dev build)
- 🔁 Hot Module Replacement (HMR)
- 🎧 Firebase for user authentication and storage
- ✅ ESLint for code quality
- 🎨 CSS Modules / Tailwind (optional styling)
- 🔌 Vite Plugins (`@vitejs/plugin-react`)

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/HarrshilJoshi/Music-app.git
cd Music-app
````

### 2. Install Dependencies

```bash
npm install
```

### 3. Run the Dev Server

```bash
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📦 Production Build

To generate a production-ready build:

```bash
npm run build
```

---

## 🧪 Linting

Basic ESLint rules are configured:

```bash
npm run lint
```

To extend linting, especially in larger projects, add:

* `typescript-eslint`
* `eslint-plugin-react-hooks`
* `eslint-config-prettier`

---

## 🔐 Environment Variables

Environment-specific secrets (like Firebase config) are stored in a `.env` file, which is excluded from version control via `.gitignore`.

Create a `.env` file in the root:

```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

> Do not commit this file to GitHub.

---

## 🔥 Plugins

You can choose between:

* `@vitejs/plugin-react`: uses Babel for Fast Refresh
* `@vitejs/plugin-react-swc`: uses SWC (faster builds for large apps)

To switch, edit `vite.config.js`.

---

## 📁 Project Structure

```
src/
├── assets/           # Images, icons, etc.
├── components/       # Reusable UI components
├── pages/            # Page-level components
├── firebase.js       # Firebase config and setup
├── App.jsx           # Root component
└── main.jsx          # Entry point
```

---

## 🌐 Deployment

You can deploy this app easily using [Netlify](https://netlify.com/) or [Vercel](https://vercel.com/).

### Netlify Setup:

* Connect your GitHub repository
* Set **build command**: `npm run build`
* Set **publish directory**: `dist`
* Add **environment variables** in the dashboard

---

## 📸 Features

* 🔊 Music play/pause/next/previous
* ⏱️ Seek control with 30-second jumps
* ❤️ Liked songs support (Firebase-based)
* 👤 Persistent user state
* 📱 Responsive design

---

## ✅ Todo (Optional Ideas)

* Add playlists and song upload
* Integrate Spotify API
* Dark/light mode toggle
* User profiles

---

## 📜 License

This project is licensed under the [MIT License](./LICENSE).

---

## ✨ Author
[Harshil Joshi](https://github.com/HarrshilJoshi)

