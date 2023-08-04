import mongoose from "mongoose"
import bcrypt from "bcryptjs"

const Schema = mongoose.Schema

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      unique: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please use a valid email address"]
    },

    firstName: {
      type: String,
      required: [true, "First Name is required"],
      match: [/^[a-zA-Z]+$/, "Invalid Value. Please enter valid characters."]
    },
    lastName: {
      type: String,
      required: [true, "Last Name is required"],
      match: [/^[a-zA-Z]+$/, "Invalid Value. Please enter valid characters."]
    },

    password: {
      type: String,
      required: [true, "password is required"],
      match: [/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, "Password is invalid"]
    },
    isAdmin: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
)

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) next()
  const salt = await bcrypt.genSalt(12)
  this.password = await bcrypt.hash(this.password, salt)
})

// Compare user input password with the hashed password to make sure they match during login.
userSchema.methods.matchPassword = async function (inputPassword) {
  return await bcrypt.compare(inputPassword, this.password)
}

const User = mongoose.model("User", userSchema)

export default User
