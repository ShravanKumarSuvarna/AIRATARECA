import express from 'express';
import session from 'express-session';
import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth2';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

console.log('CLIENT_URL used in backend:', process.env.CLIENT_URL);

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.set('trust proxy', 1);

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: true, // must be false in local dev (no HTTPS)
      sameSite: 'none',
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
      callbackURL: 'https://airatareca.onrender.com/auth/google/callback',
    },
    function (accessToken, refreshToken, profile, done) {
      return done(null, profile);
    }
  )
);

// Serialize and deserialize user
passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});

// Routes

// Initiate Google login
app.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Google callback route (make sure this matches Google console)
app.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: `${process.env.CLIENT_URL}`,
  }),
  (req, res) => {
    console.log('🔐 Logged in user:', req.user);
    console.log('🍪 Session ID:', req.sessionID);
    res.redirect(`${process.env.CLIENT_URL}/dashboard`);
  }
);

// Check if user is authenticated
app.get('/api/user', (req, res) => {
  console.log('💡 Cookies:', req.cookies);
  console.log('🔑 Session ID:', req.sessionID);
  if (req.isAuthenticated()) {
    console.log('✅ User is logged in');
    res.json({ loggedIn: true, user: req.user });
  } else {
    console.log('❌ User is not logged in');
    res.json({ loggedIn: false });
  }
});

// Logout route
app.get('/logout', (req, res) => {
  req.logout(() => {
    res.clearCookie('connect.sid');
    res.redirect(process.env.CLIENT_URL);
  });
});

// Root route
app.get('/', (req, res) => {
  res.send('Server is running...');
});

// Start server
app.listen(port, () => {
  console.log(
    `✅ Server is running at ${
      process.env.SERVER_URL || 'http://localhost:' + port
    }`
  );
});
