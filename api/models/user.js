import mongoose from 'mongoose'
const Schema = mongoose.Schema;
import bcrypt from "bcryptjs";
import eventSchema from "./events.js"

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
    min: 3,
    max: 20,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    max: 50,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    min: 6,
  },
  name: {
    type: String,
    required: true,
  },
  info: {
    type: String,
    default: "test",
    max: 50,
  },
  coverPicture: {
    type: String,
    default: "",
  },
  profilePicture: {
    type: String,
    default:
      "https://res.cloudinary.com/dqjh46sk5/image/upload/v1677786781/zpoquv2r7p88ahgupk0d.jpg",
  },
  friends: {
    type: Array,
    default: [],
  },
  followers: {
    type: Array,
    default: [],
  },
  followings: {
    type: Array,
    default: [],
  },
  memberSince: {
    type: Date,
    default: Date.now,
  },
  posts: {
    type: Array,
    default: [],
  },
  comments: {
    type: Array,
    default: [],
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
    newUser: {
    type: Boolean,
    default: true,
  },
  layout: {
    type: Array,
    default: [],
  },
  schedule: {
    type: Schema.Types.ObjectId,
    ref: 'events',
  },
  tasks: {
    type: Schema.Types.ObjectId,
    ref: 'tasks',
  },
 goal: {
  type: String,
 },
  relationship: {
    type: Number,
    enum: [1, 2, 3],
  },
  city: {
    type: String,
    max: 50,
  },
  from: {
    type: String,
    max: 50,
  },
  status: {
    type: String,
    max: 50,
  },
});
// pre-save hook to encrypt user passwords on signup

userSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("password")) return next();
  bcrypt.hash(user.password, 10, (err, hash) => {
    if (err) return next(err);
    user.password = hash;
    next();
  });
});

// method to check encrypted password on login

userSchema.methods.checkPassword = function (passwordAttempt, callback) {
  bcrypt.compare(passwordAttempt, this.password, (err, isMatch) => {
    if (err) return callback(err);
    return callback(null, isMatch);
  });
};

// method to remove user's password for toek/sending the response
userSchema.methods.withoutPassword = function () {
  const user = this.toObject();
  delete user.password;
  return user;
};

export default mongoose.model("User", userSchema);
