import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

import User from "@models/user";
import { connectToDB } from "@utils/database";

// Helper function to generate a valid username
const generateValidUsername = (name, email) => {
  let username = name.replace(/\s+/g, "").toLowerCase(); // Remove spaces and lowercase

  // Ensure username is between 8 and 20 characters
  if (username.length < 8 || username.length > 20) {
    // Fallback to using the email if the name is invalid
    username = email.split("@")[0].toLowerCase(); // Use the part before @ in the email
    if (username.length < 8) {
      username = username.padEnd(8, "0"); // Pad with zeroes to reach 8 characters
    }
    if (username.length > 20) {
      username = username.slice(0, 20); // Truncate to 20 characters
    }
  }

  // Ensure username is alphanumeric
  username = username.replace(/[^a-z0-9]/gi, "");

  return username;
};

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      // store the user id from MongoDB to session
      const sessionUser = await User.findOne({
        email: session.user.email,
      });
      session.user.id = sessionUser._id.toString();

      return session;
    },

    async signIn({ profile }) {
      try {
        await connectToDB();

        // check if a user already exists
        const userExists = await User.findOne({ email: profile.email });

        // if not, create a new user
        if (!userExists) {
          const validUsername = generateValidUsername(profile.name, profile.email);

          await User.create({
            email: profile.email,
            username: validUsername,  // Use the generated valid username
            image: profile.picture,
          });
        }

        return true;
      } catch (error) {
        console.log("Error creating user:", error);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
