# 🧠 AI Interviewer | Backend

Create a real-time _software development_ **interview** on your browser, using a custom trained LLM AI as your Interviewer.

<p align="center" style="padding:1rem;">
  <a 
  style="background-color: #84a59d; border-radius:20px; padding:1rem; color:#f7ede2; font-weight:bold; text-decoration:none;"
  href="https://ai-interviewer-gh3q.onrender.com">👉 Check the Live version here 👈</a>
</p>

## ✨ Features

- Simulate a real-time Junior interview
- Speech Recognition _(Whisper 🗣️)_
- AI Model _(Custom Trained 🏋️)_
- Interview organizer
- Mobile friendly

---

## ⚙️ Technologies Used

- ### Frontend 💻

  - React.js
  - TailwindCSS
  - Axios

- ### Backend 👈(ﾟヮﾟ 👈)

  - Node.js
  - OpenAI
  - PostgreSQL
  - Prisma ORM
  - Express.js

---

## 🚂 Getting Started

To get started with the project, clone the repository and install the dependencies.

_Install the dependencies_

```bash
npm install
```

_Create the **.env** file_

- Duplicate the `.env.example`
- Rename to `.env` and _fill it up_.

_Start the application locally_

```bash
 npm start # Starts the Local Server at port 3000
```

---

## 🪖 Using Prisma ORM

_Creates migration and runs it against database_

```bash
npx prisma migrate dev --name migration_name
```

_Creates it locally but **do not apply** to database_

```bash
npx prisma migrate dev --create-only
```

_Reset database_

```bash
npx prisma migrate reset
```

---

## 📦 Dependencies

```json
"dependencies": {
  "@prisma/client": "^4.11.0",
  "bcrypt": "^5.1.0",
  "cors": "^2.8.5",
  "dotenv": "^16.0.3",
  "express": "^4.18.2",
  "form-data": "^4.0.0",
  "graceful-fs": "^4.2.11",
  "jsonwebtoken": "^9.0.0",
  "multer": "^1.4.5-lts.1",
  "openai": "^3.2.1"
},
"devDependencies": {
  "morgan": "^1.10.0",
  "prisma": "^4.11.0"
}
```

---

## 🧠 OpenAI

- Base model in use: `curie`
- Fine-tunned model with more than 150+ lines of data.

### Fine-tuning model

Check docts [here](https://platform.openai.com/docs/guides/fine-tuning/create-a-fine-tuned-model)

1. _Check if `training-data` is well formatted_

```bash
 openai tools fine_tunes.prepare_data -f <LOCAL_FILE>
```

2. _Fine-tune a new model_

```bash
openai -k <API_KEY> api fine_tunes.create -t <TRAIN_FILE_ID_OR_PATH> -m <BASE_MODEL> --suffix "custom model name"
```

3. _Train already made Fine-tuned model_

```bash
openai -k <API_KEY> api fine_tunes.create -t <TRAIN_FILE_ID_OR_PATH> --model <MODEL_ID>
```

## Do you have recommendations to me? just send me a message 😁
