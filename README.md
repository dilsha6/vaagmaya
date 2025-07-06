# 🗣️ Assistive Speech Recognition System

This mobile application is designed to support individuals with **cerebral palsy** by enabling seamless **real-time speech-to-text communication** with caregivers. The app facilitates both in-home and remote interaction, allowing users to express their needs more independently.

---

## 🚀 Features

- 🎤 **Speech Recognition** – Real-time voice-to-text conversion using OpenAI Whisper
- 🗣️ **Text-to-Speech** – Caregivers can respond using synthesized voice replies
- 🔐 **Role-Based Access** – Separate login flows for Patients (CP Users) and Caregivers
- 🔄 **Two-Way Communication** – Supports message exchange even when the caregiver is remote
- ☁️ **Cloud Sync** – Stores chat logs and user profiles securely in Firebase
- 👓 **Accessible UI** – Clean, simple interface designed for accessibility and ease of use

---

## 🛠️ Tech Stack

| Layer        | Technology         |
|--------------|--------------------|
| Frontend     | React Native       |
| Backend      | FastAPI (optional for Whisper deployment) |
| Speech-to-Text | OpenAI Whisper (local/remote model) |
| Text-to-Speech | Google Text-to-Speech (gTTS) |
| Authentication | Firebase Auth     |
| Database     | Firebase Firestore |
| Storage      | Firebase Storage (for audio files if needed) |

---

## 📱 App Structure

- `Login Page` – Sign up or login based on role
- `Role Selection` – Choose between CP User and Caregiver
- `Home Pages` – Role-specific dashboards
- `Profile & Settings` – Update profile and preferences
- `Real-Time Chat` – Transcribed speech is sent to caregiver with timestamp
- `Help & Support` – FAQs and accessibility instructions

---

## 🧑‍💻 How to Run Locally

1. Clone the repo:

git clone https://github.com/dilsha6/vaagmaya.git
cd vaagmaya


2. Install dependencies:

npm install


3. Set up Firebase:
- Enable Firebase Authentication and Firestore
- Add your `google-services.json` or `GoogleService-Info.plist`

4. Run the app:

npx react-native run-android
or

npx react-native run-ios


---

## 💡 Future Improvements

- AI-based error correction in transcription
- Offline Whisper model integration
- Real-time emotion tagging (tone/sentiment analysis)
- Multilingual support
- Emergency alert trigger

---

## 📄 License

This project is licensed under the MIT License.

---

## 🙋‍♀️ Developed By

**Dilsha K** – Final year B.Tech IT student passionate about building accessible healthcare solutions.

[GitHub](https://github.com/dilsha6) | [LinkedIn](https://www.linkedin.com/in/dilsha-k-a6100622b)
