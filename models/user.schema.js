import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
    },
    user_role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    avatar: {
      type: String,
      default: null,
    },
    first_name: {
      type: String,
      required: [true, "Please enter your first name"],
    },
    last_name: {
      type: String,
      required: [true, "Please enter your last name"],
    },
    email: {
      type: String,
      required: [true, "Please provide an email"],
      unique: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please provide a valid email",
      ],
    },
    password: {
      type: String,
      required: [true, "Please enter a password"],
      minlength: [6, "Password must be at least 6 characters long"],
      select: false,
    },
  },
  { timestamps: true }
);

//Hash password and create salt before sending to database
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.model("User", UserSchema);
export default User;
