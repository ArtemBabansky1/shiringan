const JWT_SECRET = process.env.JWT_SECRET || 'sharingan-dev-secret-change-in-prod';
const PORT = process.env.PORT || 3001;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || 'http://localhost:5173';

module.exports = { JWT_SECRET, PORT, CLIENT_ORIGIN };
