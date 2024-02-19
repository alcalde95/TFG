import jwt from 'jsonwebtoken'
import { SECRET } from './index.js'
export const authorized = ({ token }) => {
  try {
    const decoded = jwt.verify(token, SECRET)

    if (Date.now() > decoded.exp) {
      throw new Error('Token expired')
    }
    return true
  } catch (error) {
    throw new Error('Unauthorized')
  }
}

export const generateToken = ({ email }) => {
  const token = jwt.sign({
    email,
    exp: Date.now() + 60 * 60 * 1000 * 24 * 7 // 7d
  }, SECRET)
  return { token }
}
