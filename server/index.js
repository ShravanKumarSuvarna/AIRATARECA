import express from 'express';
import session from 'express-session';
import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth2';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const port = 3000;

// CORS
app.use(
  cors({
    origin: 'http://localhost:5173',
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
      secure: false, // Set to true in production with HTTPS
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
      callbackURL: 'http://localhost:3000/auth/google/dashboard',
    },
    function (accessToken, refreshToken, profile, done) {
      // Save the profile to the session (mock user handling)
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
    successRedirect: 'http://localhost:5173/dashboard',
    failureRedirect: 'http://localhost:5173',
  })
);

// Authenticated user check
app.get('/api/user', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ loggedIn: true, user: req.user });
  } else {
    res.json({ loggedIn: false });
  }
});

// Logout
app.get('/logout', (req, res) => {
  req.logout(() => {
    res.clearCookie('connect.sid');
    res.redirect('http://localhost:5173');
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
