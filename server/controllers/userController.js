import User from "../models/userModel.js"
import getToken from "../utils/jwtAuth.js"

// Post Controllers
export const register = async (req, res) => {

  const { email, firstName, lastName, password } = req.body

  const userExists = await User.findOne({ email })
  
  if (userExists) {
    return res.status(403).json({
      msg: "This user already exists. Please login.",
    })
  }

  try {
    const user = await User.create({
      email,
      firstName,
      lastName,
      password
    })

    if (user) {
      getToken(res, user._id)
      return res.status(200).json({
        msg: "User Created Successfully!",
        data: {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email
        }
      })
    } else {
      return res.status(403).send("Failed to create a user.")
    }
  } catch (err) {
    const errorMessage = await Object.values(err.errors)[0].properties.message
    res.status(403).send(errorMessage ? `Error! ${errorMessage}.` : "Account not created. Please check your values and try again.")
  }

}

export const login = async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })
  
  if (!user) {
    return res.status(404).send("This user doesn't exist. Please create an account.")
  }

  if (user && (await user.matchPassword(password))) {

    getToken(res, user._id);
    return res.status(200).json({
      msg: "Logged In Successfully!",
      data: {
        id: user._id,
        email: user.email,
        firstName: user.firstName
      }
    })
  } else {
    res.status(403).send("Invalid Credentials. Please try again!")
  }

}

export const logout = (req, res) => {
  res.cookie("authentication", "", { expires: new Date(0), httpOnly: true })
  res.status(200).send('User Logged Out.')
}


// Get Controllers
export const profile = async (req, res) => {
  const user = await req.user
  res.status(200).json({
    userData: {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      createdAt: user.createdAt,
      isAdmin: user.isAdmin
    }
  })
}

export const editUser = (req, res) => {
  res.status(200).json({
    msg: "Update User Profile"
  })
}

export const deleteUsers = (req, res) => {
  res.status(200).json({
    msg: "Delete User"
  })
}

export const getUsers = (req, res) => {
  res.status(200).json({
    msg: "Get All Users"
  })
}

export const getSingleUser = (req, res) => {
  res.status(200).json({
    msg: "Get Single User"
  })
}

