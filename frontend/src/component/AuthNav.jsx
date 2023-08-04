import { useEffect, useState } from "react"
import { Navbar, Nav, Button } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { USER_LOGOUT } from "../utils/endpoints"
import { toast } from "react-toastify"
import axios from 'axios'

const AuthNav = () => {
  const [userInfo, setUserInfo] = useState("")

  const navigate = useNavigate()

  const getUserInfo = () => {
    const userData = JSON.parse(sessionStorage.getItem("userInfo"))
    setUserInfo(userData)
  }

  const handleLogout = () => {
    axios.post(USER_LOGOUT, null, { withCredentials: true })
    sessionStorage.clear()
    toast.info("Logged Out Successfully!")
    navigate("/login")
  }

  useEffect(() => {
    getUserInfo()
  }, [])

  return (
    <>
      <Navbar expand="md" className="bg-dark px-sm-5">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" className="bg-light border ms-auto" />
        <Navbar.Collapse id="responsive-navbar-nav" className="text-center">
          {userInfo ? (
            <Link to={"/dashboard"} className="navbar-brand text-light px-5 border">
              Dashboard
            </Link>
          ) : (
            <Link className="navbar-brand px-5 text-light" to="/">
              Basic User Authentication
            </Link>
          )}
          <Nav className="ms-auto px-5 ">
            {userInfo ? (
              <Nav.Link className="nav-link text-secondary" onClick={handleLogout}>
                Logout
              </Nav.Link>
            ) : (
              <Link to="/login" className="nav-link text-secondary">
                Login
              </Link>
            )}
            {userInfo ? (
              <Link to="/profile" className="nav-link text-secondary">
                Profile
              </Link>
            ) : (
              <Link to="/register" className="nav-link text-secondary">
                register
              </Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  )
}

export default AuthNav
