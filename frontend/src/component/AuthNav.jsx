import { useEffect, useState } from "react"
import { Navbar, Nav } from "react-bootstrap"
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
      <Navbar expand="lg" className="bg-dark">
        {userInfo ? (
          <Link to={"/dashboard"} className="navbar-brand text-light px-5">
            Dashboard
          </Link>
        ) : (
          <Link className="navbar-brand px-5 text-light" to="/">
            Basic User Authentication
          </Link>
        )}

        <Navbar.Toggle aria-controls="basic-navbar-nav" className="border text-light" />
        <Navbar.Collapse id="basic-navbar-nav">
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
