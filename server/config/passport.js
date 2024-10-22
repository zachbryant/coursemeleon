const schemas = require("../schema/schema");
const util = require("../util/util");
const passport = require("passport"),
  LocalStrategy = require("passport-local").Strategy,
  AnonymousStrategy = require("passport-anonymous").Strategy,
  JWTStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt,
  jwtSecret = require("./jwtConfig");

// To be used in passport.authenticate(...)
passport.use(
  "login",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "code",
      session: false
    },
    function(username, password, done) {
      console.log("Checking for user %s, code %s", username, password);
      schemas.User.findOne({ email: username, code: password }, (err, user) => {
        if (user) {
          console.log("Found! Authorized!");
          user.clearCode();
          return done(null, user);
        } else return done(null, false, { message: "Incorrect credentials." });
      });
    }
  )
);

passport.use("anonymous", new AnonymousStrategy());

const jwt_opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("JWT"),
  secretOrKey: jwtSecret.secret
};

passport.use(
  "JWT",
  new JWTStrategy(jwt_opts, (jwt_payload, done) => {
    if (util.isValidJWT(jwt_payload)) {
      schemas.User.byUid(jwt_payload.uid, (err, user) => {
        if (user) {
          done(null, user);
        } else {
          done(null, false, { message: "User not found in db" });
        }
      });
    } else {
      done(null, false, { message: "JWT expired" });
    }
  })
);

/*
router.get('/protected',
  passport.authenticate('jwt', {session: false}),
  (req, res) => {
    const { user } = req;

    res.status(200).send({ user });
  });
*/

// Peristence
// We only want to store the user id in a cookie
passport.serializeUser((user, done) => {
  done(null, user.uid);
});

// Retrieve the stored user id from the cookie
passport.deserializeUser((id, done) => {
  schemas.User.byUid({ uid: id }, function(err, user) {
    done(null, user);
  });
});
