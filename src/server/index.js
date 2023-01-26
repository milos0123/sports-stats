import express from "express";
import cors from "cors";
import ReactDOM from "react-dom/server";
import * as React from "react";
import App from "../shared/components/App";
import serialize from "serialize-javascript";
import path from 'path'
import { matchPath } from "react-router-dom";
import routes from '../shared/routes';
import { StaticRouter } from 'react-router-dom/server';
import session from 'express-session';
import helmet from 'helmet';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import MySQLStore from 'express-mysql-session';
import mysql2 from 'mysql2';
import crypto from 'crypto';
import "reflect-metadata"
import { fetchStanings, fetchClubs, fetchCountries } from "./api-sportmonks";
import catchAsyncErr from "./utils/catchAsyncErr";
import ExpressError from "./utils/expressError";
import cookieParser from "cookie-parser"
import { validateRegisterForm, validateLoginForm } from './schemas'
import { Strategy as GoogleStrategy } from 'passport-google-oauth2';
import nodemailer from 'nodemailer'
import sha256 from 'crypto-js/sha256';

const app = express();

app.use(cors());
app.use(express.static("dist"));
app.use(express.json());

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: [],
      connectSrc: ["'self'", 'https://soccer.sportmonks.com'],
      scriptSrc: ["'unsafe-inline'", "'self'", 'https://soccer.sportmonks.com'],
      scriptSrcAttr: ["'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      workerSrc: ["'self'", "blob:"],
      childSrc: ["blob:", "https://www.sandbox.paypal.com/"],
      objectSrc: [],
      imgSrc: [
        "'self'",
        "blob:",
        "data:",
        "https://res.cloudinary.com/de0mchrco/",
        "https://images.unsplash.com",
        "https://upload.wikimedia.org/",
        'https://soccer.sportmonks.com',
        "https://cdn.sportmonks.com"
      ],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
    },
  })
);

const sessionStore = new MySQLStore({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  port: process.env.DB_PORT,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  key: 'session_cookie_name',
  secret: 'session_cookie_secret',
  store: sessionStore,
  resave: false,
  saveUninitialized: false
}));
app.use(cookieParser())
app.use(passport.initialize())
app.use(passport.session())

const pool = mysql2.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  port: process.env.DB_PORT,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  multipleStatements: true
});

const queryDB = async (q) => {
  const promisePool = pool.promise();
  const [rows, fields] = await promisePool.query(q);
  return rows
}

const validPassword = (password, hash, salt) => {
  const hashVerify = crypto.pbkdf2Sync(password, salt, 10000, 60, 'sha512').toString('hex');
  return hash === hashVerify
}

const verifyCallback = async (username, password, done) => {
  try {
    const results = await queryDB(`SELECT * FROM users WHERE username = "${username}"`)
    if (results.length == 0) {
      return done(null, false);
    }
    const isValid = validPassword(password, results[0].hash, results[0].salt);
    const user = { id: results[0].id, username: results[0].username, hash: results[0].hash, salt: results[0].salt };
    if (isValid) {
      return done(null, user)
    } else {
      return done(null, false);
    }
  } catch (error) {
    // console.log('mysql error: ', error)
    return done(error);
  }
}

passport.use(new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
}, verifyCallback))

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "https://sportstats.cyclic.app/auth/google/callback",
  passReqToCallback: true
}, async (request, accessToken, refreshToken, profile, done) => {
  try {
    const results = await queryDB(`SELECT * FROM users WHERE google_id = "${profile.id}"`)
    if (results.length > 0) {
      return done(null, results[0]);
    } else {
      const user = await queryDB(`SELECT * FROM users WHERE username = "${profile.email}"`)
      if (user.length == 0) {
        const res = await queryDB(`INSERT INTO users(username, hash, salt, google_id) VALUES("${profile.email}", "/", "/", "${profile.id}")`)
        const newUser = {
          id: res.insertId,
          username: profile.email,
          hash: '',
          salt: '',
          google_id: profile.id
        }
        return done(null, newUser)
      } else {
        return done(null, user[0]);
      };
    };
  } catch (error) {
    return next(error);
  }
}));

passport.serializeUser((user, done) => {
  // console.log("inside serialize", user)
  done(null, user.id)
});
passport.deserializeUser(async (userId, done) => {
  // console.log('deserializedUser_', userId);
  try {
    const results = await queryDB(`SELECT * FROM users WHERE id = "${userId}"`)
    // console.log("results from desirialize", results)
    done(null, results[0])
  } catch (error) {
    done(error)
  }
})

const getData = async (req, res) => {
  const activeRoute = routes.find((route) => matchPath(route.path, req.url)) || {};
  if (activeRoute.fetchLevel === 1) {
    const nationsData = await activeRoute.fetchInitialNationsData()
    return { nationsData, favData: {} }
  }
  else if (activeRoute.fetchLevel === 2) {
    const nationsData = await activeRoute.fetchInitialNationsData()
    const clubsData = await activeRoute.fetchInitialClubsData(req.url)
    if (clubsData) {
      const standings = await activeRoute.fetchInitialStandings(req.url)
      if (!standings || !standings.length) {
        return {}
      }
      clubsData.map(team => {
        team.standings = standings[0]?.standings.data.find(t => t.team_id === team.id) || null
      })
    }
    return { nationsData, clubsData, favData: {} }
  }
  else { return {} }
}

// app.get('/getUser', (req, res) => {
//   const { username } = req.user || { username: "" };
//   username.length
//     ? res.status(200).json(username)
//     : res.status(400).json('Not logged in')
// })

app.get('/verify/me/:secret', async (req, res) => {
  try {
    const { secret } = req.params;
    const user = await queryDB(`SELECT * FROM users WHERE users.secret = "${secret}"`)
    if (user.length) {
      await queryDB(`UPDATE users SET secret = NULL WHERE users.secret = "${secret}"`)
      req.login(user[0], function (err) {
        if (err) { return next(err); }
        return res.redirect('/soccer/league/Superliga/19686');
      });
    } else {
      return res.redirect('/something-went-wrong');
    }
  } catch (error) {
    return res.redirect('/something-went-wrong');
  }
})

app.get('/auth/google', passport.authenticate('google', { scope: ['email', 'profile'] }))

app.get('/auth/google/callback', passport.authenticate('google'), (req, res, next) => {
  if (req.user) {
    if (!req.user.google_id) {
      req.logout(function (err) {
        if (err) { return next(err) }
      })
      app.locals.notif = '.......Your account is not linked with Google, please Log In using your email and password....'
      return res.redirect('/user/login')
    } else {
      return res.redirect('/soccer/league/Superliga/19686')
    }
  } else {
    const msg = 'Please Log In/Sign Up';
    throw new ExpressError(msg, 400)
  }
})

app.get("/fetchClubsData/:id", catchAsyncErr(async (req, res) => {
  if (req.user) {
    const { id } = req.params
    const clubs = await fetchClubs(id)
    const standings = await fetchStanings(id)
    if (!clubs || !standings) {
      res.status(404).json('Error')
    } else {
      res.status(200).json({ clubs, standings })
    }
  } else {
    const msg = 'Please Log In/Sign Up';
    throw new ExpressError(msg, 400)
  }
}));

app.get("/fetchNationsData/:pageNum", catchAsyncErr(async (req, res) => {
  if (req.user) {
    const countries = await fetchCountries(req.params.pageNum)
    res.status(200).json(countries)
  } else {
    const msg = 'Please Log In/Sign Up';
    throw new ExpressError(msg, 400)
  }
}))

app.get("*", catchAsyncErr(async (req, res, next) => {
  const route = routes.find((route) => matchPath(route.path, req.url)) || {}
  const user = req.user

  if (user) {
    if (!route.path) {
      return res.redirect("/soccer/league/Superliga/19686")
    }
  } else if (!route.path) {
    return res.redirect("/user/register")
  }
  const data = user
    ? await getData(req, res)
    : {}
  const notif = req.app.locals.notif || ""
  app.locals.notif = "";
  const markup = ReactDOM.renderToString(
    <StaticRouter location={req.url} >
      <App notif={notif} serverData={data} userData={user?.username || ""} />
    </StaticRouter>
  )
  res.send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Sports Statistics</title>
          <script src="/bundle.js" defer></script>
          <meta name="viewport" content="width=device-width,initial-scale=1">
          <link href="/main.css" rel="stylesheet">
          <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />  <script>            
            window.__INITIAL_NATIONS_DATA__ = ${serialize(data.nationsData)}
            window.__INITIAL_CLUBS_DATA__ = ${serialize(data.clubsData)}
            window.__INITIAL_USER__= ${serialize(user?.username) || ""}  
            window.__INITIAL_NOTIF__ = ${serialize(notif)}
          </script>
        </head>
        <body>
          <div id="app">${markup}</div>
        </body>
      </html>
    `);
}));

const userExists = async (req, res, next) => {
  try {
    const results = await queryDB(`SELECT username FROM users WHERE username = "${req.body.username}"`)
    if (results.length) {
      return res.status(400).json('.......Username with that e-mail address already exist. Please choose other....')
    } else {
      return next()
    }
  } catch (error) {
    return res.status(400).json('.......Ops, there where some issues, try later. Please let us know if you keep seeing this message....')

  }
}

const genPassword = (password) => {
  const salt = crypto.randomBytes(32).toString('hex')
  const genhash = crypto.pbkdf2Sync(password, salt, 10000, 60, 'sha512').toString('hex');
  return { salt: salt, hash: genhash }
}

const transporter = nodemailer.createTransport({
  host: "smtp-relay.sendinblue.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.SENDINBLUE_USER,
    pass: process.env.SENDINBLUE_PASS,
  },
})

app.post('/logout', function (req, res, next) {
  req.logout(function (err) {
    if (err) { return next(err); }
    res.status(200).json('Logouted')
  });
});

app.post('/login', validateLoginForm, passport.authenticate('local'),
  async (req, res, next) => {
    try {
      const results = await queryDB(`SELECT * FROM users WHERE id = ${req.session.passport.user};`)
      if (!results.length) {
        res.status(400).json(".......User does not exist....")
      } else if (results[0].secret) {
        req.logout(function (err) {
          if (err) { return next(err); }
          res.status(400).json(".......Please verify your e-mail adress first....")
        });
      } else {
        const nationsData = await fetchCountries();
        const clubsData = await fetchClubs();
        const standings = await fetchStanings();
        clubsData.map(team => {
          team.standings = standings[0]?.standings.data.find(t => t.team_id === team.id) || null
        })
        res.status(200).json({ nationsData, clubsData, username: req.user.username })
      }
    } catch (error) {
      return next(error);
    }
  });

app.post('/register', validateRegisterForm, userExists, async (req, res, next) => {
  try {
    const rand = Math.floor(Math.random() * 1000);
    const scrt = sha256(`secret${rand}`).toString();
    const { username, password } = req.body
    const saltHash = genPassword(password);
    await transporter.sendMail({
      from: '"SportsStats" <donotreply@soccer-stats.com>',
      to: username,
      subject: "Verify e-mail address",
      text: 'Hello, Please Click on the link below to activate your soccer-stats account.',
      html: `Hello,<br> Please Click on the link below to activate your soccer-stats account.<br><a href='https://sportstats.cyclic.app/verify/me/${scrt}'>Click here!</a>`
    })
    await queryDB(`INSERT INTO users(username, hash, salt, secret)
     VALUES("${username}", "${saltHash.hash}", "${saltHash.salt}", "${scrt}")`)
    return res.status(200).json(".......you will receive verification email within 3min - If you don't find it in Primary, look under All Mail folder .200")
  } catch (error) {
    return next(error);
  }
})

app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  // console.log('CATCHED ERROR :', err)
  if (!err.message) err.message = 'Oh No, Something Went Wrong!';
  res.status(statusCode).json(`${err} ${statusCode}`);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});

// test