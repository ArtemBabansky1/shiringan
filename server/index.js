const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { PORT, CLIENT_ORIGIN } = require('./config');

const app = express();

app.use(cors({ origin: CLIENT_ORIGIN, credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth',     require('./routes/auth'));
app.use('/api/progress', require('./routes/progress'));
app.use('/api/profile',  require('./routes/profile'));

app.listen(PORT, () => {
  console.log(`Sharingan server running on http://localhost:${PORT}`);
});
