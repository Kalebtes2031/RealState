🏠 RealState App

A full-stack real estate management platform with a Django REST Framework backend and a React Native Expo mobile frontend.
The backend handles property listings, user authentication, and data APIs, while the mobile app allows users to browse, search, and manage real estate listings.

📂 Project Structure
.
├── realstate_backend/      # Django backend (API, Admin, Auth)
├── realstateapp/           # React Native Expo mobile app
└── README.md

🚀 Features
Backend (Django)

RESTful APIs for listings, users, and authentication

Admin dashboard for managing data

JWT-based authentication (if applicable)

PostgreSQL / SQLite database support

Docker-ready configuration (optional)

Mobile App (React Native)

Browse, filter, and search property listings

View listing details with images and prices

Login / Signup integration with backend API

Dark mode support

Modular component architecture

🛠️ Tech Stack
Layer	Technology
Backend	Django • Django REST Framework
Frontend	React Native (Expo)
Database	PostgreSQL / SQLite
Auth	JWT / Django Auth
Dev Tools	GitHub Actions • Prettier • ESLint
⚙️ Setup Instructions
1. Clone the repository
git clone https://github.com/<your-username>/<repo-name>.git
cd <repo-name>

2. Backend Setup (Django)
cd realstate_backend
python -m venv venv
source venv/bin/activate     # or venv\Scripts\activate on Windows
pip install -r requirements.txt


Create a .env file in realstate_backend/:

SECRET_KEY=your-secret-key
DEBUG=True
DATABASE_URL=sqlite:///db.sqlite3
ALLOWED_HOSTS=*


Run migrations and start the server:

python manage.py migrate
python manage.py runserver


Backend runs on http://127.0.0.1:8000/

3. Frontend Setup (React Native)
cd ../realstateapp
npm install


Create .env file in realstateapp/:

API_BASE_URL=http://127.0.0.1:8000/api/


Run the mobile app:

npx expo start


If using Expo go, scan the QR code in the terminal to open the app on your device or emulator.

🧪 Testing
Backend
pytest

Frontend
npm test

🧰 Folder Details
realstate_backend/
Folder	Description
realstate_backend/settings.py	Django settings (env vars, DB, etc.)
listings/	App handling property models & APIs
users/	Authentication and user management
realstateapp/
Folder	Description
components/	Reusable React Native components
screens/	App screens (Home, Details, Login, etc.)
services/	API calls & network layer
assets/	Images, icons, fonts


Add sample screenshots of mobile UI and Django admin here later.

🧾 License

This project is licensed under the MIT License — feel free to use and modify.

👤 Author

Kaleb Tesfaye Ayele
📧 Kalebtesfaye2031@gmail.com
