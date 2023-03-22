const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const passwordValidator = function (value) {
  const regex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{8,}$/;
  return regex.test(value);
};

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 5,
    maxlength: 30,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, "Must match an email address!"],
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    validate: [
      passwordValidator,
      "Password must contain at least one number, one special character, and one letter.",
    ],
  },
  profile: {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
      match:  [/^\+?\d{1,4}[-.\s]?\(?(\d{1,3}[-.\s]?\d{1,4})\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}$/, 'Must match a valid phone number format!'],
    },
  },
  pets: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Pet',
    },
  ],
});

userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = model("User", userSchema);

module.exports = User;
