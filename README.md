# Dating App - Couple Matching Platform

A modern web application for matching couples with real-time chat, user profiles, and intelligent matching algorithms.

## 🚀 Tech Stack

- **Backend**: PHP (Laravel/Custom)
- **Frontend**: React + Bootstrap 5
- **Real-time Chat**: Node.js + Socket.io
- **Database**: MySQL
- **Server**: Ubuntu
- **Package Manager**: npm, Composer

## 📋 Features

- ✅ User Registration & Profiles
- ✅ Private Room Design & Decoration
- ✅ Photo Gallery
- ✅ Real-time Chat System
- ✅ Preference Filters (Age, Location, Interests)
- ✅ Intelligent Matching Algorithm
- ✅ Notifications
- ✅ Payment/Subscription System (Future)

## 📁 Project Structure

```
dating-app/
├── backend/              # PHP Backend
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── database/
│   │   └── migrations/
│   ├── public/
│   ├── .env.example
│   └── composer.json
├── frontend/             # React Frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── styles/
│   │   ├── hooks/
│   │   ├── services/
│   │   └── App.js
│   ├── public/
│   ├── package.json
│   └── .env.example
├── chat-server/          # Node.js Real-time Chat
│   ├── src/
│   │   ├── server.js
│   │   ├── handlers/
│   │   ├── middleware/
│   │   └── utils/
│   ├── package.json
│   └── .env.example
├── database/
│   ├── schema.sql
│   └── migrations/
├── docker-compose.yml
├── .gitignore
└── README.md
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v14+)
- PHP (v7.4+)
- MySQL (v5.7+)
- Composer
- npm or yarn

### Quick Start

1. **Clone the repository**
```bash
git clone https://github.com/giangbay/dating-app.git
cd dating-app
```

2. **Setup Backend**
```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php -S localhost:8000
```

3. **Setup Frontend**
```bash
cd frontend
npm install
npm start
```

4. **Setup Chat Server**
```bash
cd chat-server
npm install
npm start
```

5. **Database Setup**
```bash
mysql -u root -p < database/schema.sql
```

## 🔧 Environment Variables

### Backend (.env)
```
DB_HOST=localhost
DB_PORT=3306
DB_NAME=dating_app
DB_USER=root
DB_PASS=
CHAT_SERVER_URL=http://localhost:3000
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:8000/api
REACT_APP_CHAT_SERVER=http://localhost:3000
```

### Chat Server (.env)
```
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASS=
DATABASE=dating_app
```

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user

### Users
- `GET /api/users/{id}` - Get user profile
- `PUT /api/users/{id}` - Update user profile
- `GET /api/users/search` - Search users with filters

### Matches
- `GET /api/matches` - Get matched profiles
- `POST /api/matches/like` - Like a profile
- `POST /api/matches/skip` - Skip a profile

### Messages
- Real-time chat via Socket.io

## 🗄️ Database Schema

See `database/schema.sql` for complete database structure.

Main tables:
- `users` - User accounts
- `profiles` - User profiles
- `photos` - User photos
- `matches` - Matching records
- `messages` - Chat messages
- `notifications` - System notifications

## 🚢 Deployment

### Free Options
- **Frontend**: Vercel, Netlify
- **Backend**: Railway, Render, Heroku free tier
- **Database**: Clever Cloud, PlanetScale
- **Chat Server**: Railway, Render

### Ubuntu Server Setup
See `DEPLOYMENT.md` for detailed Ubuntu setup instructions.

## 🤝 Contributing

1. Create feature branch: `git checkout -b feature/your-feature`
2. Commit changes: `git commit -m 'Add your feature'`
3. Push to branch: `git push origin feature/your-feature`
4. Open Pull Request

## 📝 License

MIT License - see LICENSE file for details

## 👥 Support

For support, email: support@dating-app.com or open an issue.

---

**Happy coding! 🎉**
