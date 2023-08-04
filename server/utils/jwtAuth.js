import jwt from "jsonwebtoken"

const getToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "2d"
  })

  res.cookie("authentication", token, {
    httpOnly: true,
    sameSite: true,
    secure: process.env.NODE_ENV !== "development",
    maxAge: 30 * 24 * 60 * 60 * 1000
  })
}

export default getToken
