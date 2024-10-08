import jwt from 'jsonwebtoken'
import { SECRET } from './index.js'
export const authorized = ({ authorization }) => {
  try {
    if (authorization.split(' ').length < 2) return { valid: false }
    const token = authorization.split(' ')[1]
    const decoded = jwt.verify(token, SECRET)

    if (Date.now() > decoded.exp) {
      throw new Error('Token expired')
    }
    return { decoded, valid: true }
  } catch (error) {
    return { valid: false }
  }
}

export const generateToken = ({ email }) => {
  const token = jwt.sign({
    email,
    exp: Date.now() + 60 * 60 * 1000 * 24 * 7 // 7d
  }, SECRET)
  return { token }
}

export const convertClassesPhoto = ({ classes }) => {
  return classes.map((classData) => {
    let { photo } = classData
    photo = 'data:image/jpeg;base64,' + Buffer.from(photo).toString('base64')
    return { ...classData, photo }
  })
}

export const convertSingleClassesPhoto = ({ c }) => {
  let { photo } = c
  photo = 'data:image/jpeg;base64,' + Buffer.from(photo).toString('base64')
  return { ...c, photo }
}
