import express from 'express';
import session from 'express-session';
import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth2';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

// CORS
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

// Session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: true, // true if your backend is served over HTTPS
      sameSite: 'lax',
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Passport Google Strategy
passport.use(
  new GoogleStrategy.Strategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/auth/google/dashboard', // Keep localhost if backend is local
      // Replace with production URL if hosted
      // callbackURL: 'https://your-backend-url.com/auth/google/dashboard',
    },
    function (accessToken, refreshToken, profile, done) {
      return done(null, profile);
    }
  )
);

// Serialize/Deserialize
passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});

// Routes

// Start Google login
app.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Google OAuth callback
app.get(
  '/auth/google/dashboard',
  passport.authenticate('google', {
    successRedirect: `${process.env.CLIENT_URL}/dashboard`,
    failureRedirect: `${process.env.CLIENT_URL}`,
  })
);

// Authenticated user check
app.get('/api/user', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ loggedIn: true, user: req.user });
    console.log('True is loged in');
  } else {
    res.json({ loggedIn: false });
    console.log('False is loged in');
  }
});

// Logout
app.get('/logout', (req, res) => {
  req.logout(() => {
    res.clearCookie('connect.sid');
    res.redirect(process.env.CLIENT_URL);
  });
});

// Root route
app.get('/', (req, res) => {
  res.send('Server running...');
});

// Start server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
