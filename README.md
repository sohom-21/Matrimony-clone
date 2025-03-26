# Matrimony Clone

A modern matrimonial website built with the MERN stack (MongoDB, Express.js, React.js, Node.js) that helps users find potential life partners through various search functionalities.

## Features

### Search Options
- **Smart Search**: Advanced filtering with multiple criteria including age, gender, and photo preferences
- **ID Search**: Direct profile lookup using unique matrimony IDs
- **Occupational Search**: Filter profiles based on professional background
- **Advanced Search**: Multi-parameter search with native place, education, and star sign filters
- **Educational Search**: Find matches based on educational qualifications
- **Location Search**: Search profiles by location

### Frontend Routes

#### Public Routes
- `/`: Home page with introduction and features
- `/login`: User login page
- `/register`: New user registration
- `/success-stories`: View matrimony success stories
- `/contact`: Contact support page

#### Protected Routes
- `/profile/:id`: View detailed profile information
- `/profile/edit`: Edit user profile
- `/search`: Main search interface
  - `/search/smart`: Smart search with multiple criteria
  - `/search/educational`: Educational qualification based search
  - `/search/occupational`: Search by occupation
  - `/search/location`: Location-based search
  - `/search/id`: Search by matrimony ID
  - `/search/advanced`: Advanced search with multiple parameters
- `/matches`: View matching profiles
- `/saved-profiles`: View saved/shortlisted profiles

### API Routes

#### Authentication Routes
- `POST /auth/register`: Register a new user

#### User Routes
- `POST /search/smart`: Advanced search with multiple criteria
- `POST /search/educational`: Search based on educational qualifications
- `POST /search/occupational`: Search based on occupation
- `POST /search/location`: Search based on location preferences
- `POST /search/id`: Search profile by matrimony ID
- `POST /search/advanced`: Advanced search with native place, education, and stars
- `POST /register`: Register a new user profile
- `GET /users`: Get all users
- `GET /users/:id`: Get user by ID
- `PUT /users/:id`: Update user profile
- `DELETE /users/:id`: Delete user profile

### Additional Features
- User Registration and Authentication
- Profile Management
- Refer a Friend
- Success Stories
- Contact Support

## Tech Stack

### Frontend
- React.js
- Tailwind CSS for styling
- React Router for navigation

### Backend
- Node.js
- Express.js
- MongoDB for database

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- MongoDB
- npm or yarn package manager

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/Matrimony-clone.git
cd Matrimony-clone
```

2. Install backend dependencies:
```bash
cd backend
npm install
```

3. Install frontend dependencies:
```bash
cd ../frontend
npm install
```

4. Create a `.env` file in the backend directory with your MongoDB connection string:
```
MONGODB_URI=your_mongodb_connection_string
PORT=5000
```

## Running the Application

1. Start the backend server:
```bash
cd backend
npm start
```

2. Start the frontend development server:
```bash
cd frontend
npm start
```

The application will be available at `http://localhost:3000`

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
