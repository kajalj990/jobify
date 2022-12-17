import jwt from 'jsonwebtoken'
import { UnAuthenticatedError } from "../errors/index.js";
const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer')) {
    throw new UnAuthenticatedError('Authentication Failed')
  }
  const token = authHeader.split(' ')[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    req.user = { userId: payload.userId }
    console.log(req.user)
    next()
  } catch (error) {
    throw new UnAuthenticatedError('Authentication Failed')
  }

}
export default auth