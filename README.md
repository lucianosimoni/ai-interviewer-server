# Server - AI Interviewer

🧙‍♂️

## 🚂 Run it locally

_Install the dependencies_

```bash
 npm install
```

_Create the **.env** file_

```json
OPENAI_API_KEY="YOUR-API-KEY-HERE"
ADMIN_PASSWORD="REPLACE"
DATABASE_URL="REPLACE?schema=prisma"
SHADOW_DATABASE_URL="REPLACE?schema=shadow"
```

_Start the application locally_

```bash
 npm start # Starts the Local Server at port 3000
```

---

## 🪖 Prisma

_Creates migration and runs it against database_

```bash
npx prisma migrate dev --name migration_name
```

_Creates it locally but **do not apply** to database_

```bash
npx prisma migrate dev --create-only
```

---

## 📦 Dependencies

```json
"dependencies": {
  "@prisma/client": "^4.11.0",
  "dotenv": "^16.0.3",
  "express": "^4.18.2",
  "openai": "^3.1.0"
},
"devDependencies": {
  "morgan": "^1.10.0",
  "prisma": "^4.11.0"
}
```

---

## 🧠 OpenAI

- Base model in use: `gpt-3.5-turbo` / `turbo`

### Fine-tuning model

Check docts [here](https://platform.openai.com/docs/guides/fine-tuning/create-a-fine-tuned-model)

1. _Check if `training-data` is well formatted_

```bash
 openai tools fine_tunes.prepare_data -f <LOCAL_FILE>
```

2. _Fine-tune a new model_

```bash
openai api fine_tunes.create -t <TRAIN_FILE_ID_OR_PATH> -m <BASE_MODEL> --suffix "custom model name"
```

## Do you have recommendations to me? just send me a message 😁
