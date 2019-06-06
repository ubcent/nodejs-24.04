//require npm i passport passport-local

const express = require('express');
const cookie = require('cookie-parser');
const session = require('cookie-session');
const passport = require('passport');
const strategy = require('passport-local').Strategy;

const app = express();

app.use(cookie());
app.use(session({ keys: ['secret'] }));
app.use(express.json()); //PREPARING DATA FOR PASSPORT

app.use(passport.initialize());
app.use(passport.session()); // DON'T USE IT IN OTHER AUTH METHODS LOCAL ONLY!

//CHECKIN OUT PAIR LOGIN-PASSWORD
passport.use(
  new Strategy((username, password, done) => {
    if (user && user.checkPassword(password)) {
      delete user.password; //DELET THE PASSWORD THAT IT CAN'T GET THE SESSION
      return done(null, user);
    } else {
      return done(null, false);
    }
  })
);

//LIMITING QUANTITY OF INFO THAT WILL BE KEEPING INSIDE SESSION-RECORD BY ID ONLY
passport.serializeUser((user, done) => {
  done(null, user_id); //RECORDIN USER DY ID
});

passport.deserializeUser((id, done) => {
  const user = User.findById(id); //FIND THE USER BY HIS/HER ID
  done(null, user);
});

//FETCH REQUESTS FROM USERS AND HANDLE IT
app.get('./auth', (req, res) => {
  res.send('TODO: Auth form');
});
//make hendler for POST from users
const authHendler = passport.authenticate('local', {
  successRedirect: '/user',
  failureRedirect: '/auth',
});
//handle POST from users
app.post('./auth', authHendler);

//GUARDING PAGES WHICH MUST HAME AUTH ACCESS ONLY
const mustBeAuthenticated = (req, res, next) => {
  if (req.user) {
    //if req returned user in req then go ferther
    next();
  } else {
    res.redirect('/auth');
  }
};

app.all('/user*', mustBeAuthenticated); //hendle all requests to any page begins with user

//MAKING ROUTING OF USERS PAGES
app.get('user', (req, res) => {
  res.send('TODO: User profile');
});

app.get('user/settings', (req, res) => {
  res.send('TODO: User settings');
});

//GIVE USERS POSSIBILITY TO LOGOUT
app.get('user', (req, res) => {
  req.logout();
  res.redirect('/auth');
});

app.listen(4444, () => {
  console.log('Server has been started on 4444!');
});
