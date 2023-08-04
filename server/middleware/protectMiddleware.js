import jwt from "jsonwebtoken"
import User from "../models/userModel.js"

export const protect = async (req, res, next) => {
  let token = req.cookies.authentication

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      req.user = await User.findById(decoded.userId).select("-password")
      return next()
    } catch (error) {
      res.status(401).send("Not Authorized.")
    }
  }
}

export const adminProtect = async (req, res, next) => {
  const user = req.user;

  if (user.isAdmin) {
    next()
  } else {
    res.status(401).json({msg: 'Not Authorized'})
  }
}
