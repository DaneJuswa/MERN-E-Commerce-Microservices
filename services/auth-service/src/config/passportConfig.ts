import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as FacebookStrategy  } from "passport-facebook";
import dotenv from "dotenv";
dotenv.config();


//google strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: process.env.GOOGLE_CALLBACK_URL!,
    },
    async (_accessToken, _refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value;
        if (!email) return done(new Error("No email returned from Google profile"));

        // pass the raw profile through — service does the DB work
        return done(null, profile as any);
      } catch (error) {
        return done(error as Error);
      }
    }
  )
);

//facebook strategy
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID!,
      clientSecret: process.env.FACEBOOK_APP_SECRET!,
      callbackURL: process.env.FACEBOOK_CALLBACK_URL!,
      profileFields:["id", "displayName", "emails"]
    },
    async(_accessToken, _refreshToken, profile, done) =>{
        try {
          const email = profile.emails?.[0].value;

          if(!email){
            return done(new Error("No email returned from Facebook profile"));
          }

          return done(null, profile as any)
        } catch (error) {
          
        }
    }
  )

)


export default passport;
