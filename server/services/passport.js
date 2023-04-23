const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const config = require("config");
const User = require("../models/User");
require("dotenv").config();
// const BACKEND_URL = config.get("BACKEND_URL");
const BACKEND_URL = process.env.BACKEND_URL;

/* =================== Handeling Infinite run: Start ===================  */
// passport.serializeUser((user, done) => {
//   done(null, user._id);
// });

// passport.deserializeUser((_id, done) => {
//   //console.log("This is id", _id);
//   User.findById(_id).then(user => {
//     done(null, user);
//   });
// });
// For Google
passport.use(
  new GoogleStrategy(
    {
      // clientID: config.get("GOOGLE_CLIENT_ID"),
      clientID: process.env.GOOGLE_CLIENT_ID,
      // clientSecret: config.get("GOOGLE_CLIENT_SECRET"),
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      // callbackURL: "/api/auth/google/callback",
      callbackURL: `${BACKEND_URL}/api/auth/google/callback`,
      proxy: true,
    },
    async (accessToken, refreshToken, profile, done) => {
      //console.log(id_token.id_token);
      try {
        const oldUser = await User.findOne({ email: profile._json.email });
        if (oldUser) return done(null, oldUser);
      } catch (err) {
        console.log(err);
      }

      try {
        const newUser = await new User({
          userId: profile.id,
          imageUrl: profile._json.picture,
          email: profile._json.email,
          firstName: profile._json.given_name,
          lastName: profile._json.family_name,
        }).save();
        done(null, newUser);
      } catch (err) {
        console.log(err);
      }
    }
  )
);
