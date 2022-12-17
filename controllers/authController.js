import User from '../models/User.js';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError, UnAuthenticatedError } from '../errors/index.js';


const register = async (req, res) => {
  const { name, password, email } = req.body

  if (!name || !password || !email) {
    throw new BadRequestError('please provide all values')
  }

  const emailAlreadyExists = await User.findOne({ email });
  if (emailAlreadyExists) {
    throw new BadRequestError('Email already in use')
  }


  const user = await User.create({ name, password, email })
  const token = user.createJWT()
  res.status(StatusCodes.CREATED).json({
    user: {
      "userId": user.id,
      "name": user.name,
      "email": user.email
    },
    "token": token,
    "location": "my city"
  });

}

const login = async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    throw new BadRequestError('Please provide all value')
  }
  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    throw new UnAuthenticatedError('Invalid Email')
  }
  console.log(user)
  const isPasswordValid = await user.comparedPassword(password)

  if (!isPasswordValid) {
    throw new UnAuthenticatedError('Invalid Password')
  }
  const token = user.createJWT()
  user.password = undefined
  res.status(StatusCodes.OK).json({ user, token, location: user.location });
}

const updateUser = async (req, res) => {
  const { email, name, lastName, location } = req.body;
  if (!email || !name || !location || !lastName) {
    throw new BadRequestError('Please provide all value')
  }
  const user = await User.findOne({ _id: req.user.userId })

  user.email = email
  user.name = name
  user.lastName = lastName
  user.location = location

  await user.save()

  const token = user.createJWT()

  res.status(StatusCodes.OK).json({ user, token, location: user.location });
  console.log(req.user)

}

export { register, login, updateUser }