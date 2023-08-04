import { toast } from "react-toastify"


export const formValidation = (email, firstName, lastName, password, confirmPassword) => {

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
  const textRegex = /^[a-zA-Z]+$/


  if (email === "" || !emailRegex.test(email)) {
    toast.error("Please enter a valid Email Address")
    return
  } 
  
  if (firstName === "" || firstName.length < 2 || !textRegex.test(firstName)) {
    toast.error("Please enter a valid name")
    return
  }
  if (lastName === "" || lastName.length < 2 || !textRegex.test(lastName)) {
    toast.error("Please enter a valid Last Name")
    return
  }

  if (confirmPassword === "") {
    toast.error("Passwords Do not match!")
    return
  } else if (confirmPassword !== password) {
    toast.error("Passwords Do not match!")
    return
  }

  if (password === "") {
    toast.error("Password is Required")
    return
  } else if (password.length < 8) {
    toast.error("Password cannot be less than 8 characters")
    return
  } else if (!passwordRegex.test(password)) {
    toast.error("Invalid Password. Try again")
    return
  }

  return true;

}

export const formCompleted = (firstName, email, lastName, password, confirmPassword) => {
  return firstName !== "" && email !== "" && lastName !== "" && password !== "" && confirmPassword !== ""
}