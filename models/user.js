import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, 'Email is required!'],  // Fixed validation message
    unique: [true, 'Email already exists!']   // Fixed validation message
  },
  username: {
    type: String,
    required: [false, 'Username is required!'],  // Set to false for OAuth flows
    match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username invalid, it should contain 8-20 alphanumeric letters and be unique!"],
    unique: true  // Ensure the username is unique if provided
  },
  image: {
    type: String
  }
});

const User = models.User || model("User", userSchema);

export default User;
