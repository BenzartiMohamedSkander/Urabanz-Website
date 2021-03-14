const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const passport = require("passport");

const customer = require("../models/Customer");

require("dotenv").config({ path: "../config/.env" });
const secretOrKey = process.env.secretOrKey;




const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey,
  };

  passport.initialize();


  passport.use(
    new JwtStrategy(opts, async (jwt_payload, done) => {
      const { id } = jwt_payload;
  
      console.log(jwt_payload);
  
      try {
        const customer = await Customer.findById(id);
        
        console.log(customer);
  
        customer ? done(null, customer) : done(null, false);
      } catch (error) {
        console.error(error);
      }
    })
  );

  module.exports = isAuth = () =>
  passport.authenticate("jwt", { session: false });