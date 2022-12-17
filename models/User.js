import mongoose from "mongoose";
import validator from "validator";
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken";

const UserSchema = new mongoose.Schema({

  name: {
    type: String,
    required: [true, 'Please provide Name'],
    minlength: 3,
    maxlength: 20, trim: true,
  },
  email: {
    type: String,
    required: [true, 'Please provide Email'],
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: "Please provide valid Email"
    }
  },
  password: {
    type: String,
    required: [true, 'Please provide Password'],
    minlength: 6,
    select: false
  },
  lastName: {
    type: String,
    maxlength: 20,
    trim: true,
    default: 'lastName'
  },
  location: {
    type: String,
    maxlength: 20,
    trim: true,
    default: 'location'
  }

})

UserSchema.pre('save', async function () { //pre is a hook
  if (!this.isModified('password')) return
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
})


UserSchema.methods.createJWT = function () {
  return jwt.sign({ "userId": this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME
  })
}


//check password
UserSchema.methods.comparedPassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
}

export default mongoose.model('Users', UserSchema)