
# 📘 Document Similarity Analyzer #

A web application that compares two text documents and calculates their similarity using **TF-IDF Vectorization** and **Cosine Similarity**.
Built with **React + TypeScript + Vite**, the tool provides fast, accurate similarity scores and an intuitive interface for testing text, articles, essays, and more.

🔗 **Live Website:**
👉 [https://document-similarity-analyzer.vercel.app/](https://document-similarity-analyzer.vercel.app/)

---

## 🚀 Features

### 🔍 **Document Comparison**

* Enter or upload two documents.
* Automatically preprocesses text (lowercasing, punctuation removal).
* Converts documents to TF-IDF vectors.
* Calculates similarity using cosine similarity.

### ⚙️ **How It Works**

1. **Text Preprocessing**
   : Removes punctuation, extra spaces, and normalizes text.

2. **TF-IDF Vectorization**
   : Converts documents into numerical representations based on word importance.

3. **Cosine Similarity**
   : Measures similarity by comparing the angle between TF-IDF vectors.

### 📊 **Similarity Score Guide**

| Score Range   | Meaning            |
| ------------- | ------------------ |
| **0.8 – 1.0** | Very Similar       |
| **0.6 – 0.8** | Moderately Similar |
| **0.4 – 0.6** | Somewhat Similar   |
| **0.2 – 0.4** | Slightly Similar   |
| **0.0 – 0.2** | Very Different     |

---

## 🧪 Try These Example Scenarios

### **Technology Articles**

Similar articles on artificial intelligence often score high.

### **Different Topics**

Two unrelated topics will yield a low similarity score.

### **Identical Content**

Exactly the same text produces a perfect match.

---

## 📁 Project Structure

```
Document Similarity Analyzer/
│
└── project/
    ├── node_modules/
    ├── src/
    │   ├── components/
    │   │   ├── ContactButton.tsx
    │   │   ├── DocumentInput.tsx
    │   │   ├── ExampleDocuments.tsx
    │   │   ├── FileUpload.tsx
    │   │   └── SimilarityResult.tsx
    │   │
    │   ├── utils/
    │   │   ├── documentSimilarity.ts
    │   │   └── fileProcessor.ts
    │   │
    │   ├── App.tsx
    │   ├── index.css
    │   ├── main.tsx
    │   └── vite-env.d.ts
    │
    ├── eslint.config.js
    ├── index.html
    ├── package.json
    ├── postcss.config.js
    ├── tailwind.config.js
    ├── tsconfig.json
    ├── vite.config.ts
```

---

## 🛠️ Tech Stack

* **React + TypeScript**
* **Vite** (Fast build tool & dev server)
* **Tailwind CSS**
* **TF-IDF & Cosine Similarity algorithms (custom implementation)**
* **Vercel** for deployment

---

## 📦 Installation & Setup

Clone the repository:

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
cd YOUR_REPO_NAME/project
```

Install dependencies:

```bash
npm install
```

Start development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

---

## 🤝 Contributing

Contributions, feature requests, and ideas are welcome!
Feel free to open an issue or submit a pull request.

---

## 📬 Contact

If you have suggestions or want to reach out:

📧 **Contact Form:**
Click the **Contact Me** button on the website
🔗 [https://document-similarity-analyzer.vercel.app/](https://document-similarity-analyzer.vercel.app/)

---

## ⭐ Support the Project

If you found this project helpful, consider giving it a **⭐ star** on GitHub — it motivates future improvements!

---

If you want a **shield-style badge section**, **animated preview GIF**, or **license section**, I can generate those too.
