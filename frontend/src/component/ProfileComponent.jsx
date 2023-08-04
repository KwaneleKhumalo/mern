import axios from "axios"
import { PROFILE } from "../utils/endpoints"
import { useEffect, useState } from "react"
import { Row, Col } from "react-bootstrap"
import Header from "./Header"
import AuthNav from "./AuthNav"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

const ProfileComponent = () => {
  const [userInfo, setUserInfo] = useState()
  const [email, setEmail] = useState()
  const [firstName, setFirstName] = useState()
  const [lastName, setLastName] = useState()
  const [createdAt, setCreatedAt] = useState()
  const [isAdmin, setIsAdmin] = useState()
  const navigate = useNavigate()

  const getUserProfile = async () => {
    const response = await axios.get(`${PROFILE}`, { withCredentials: true })

    if (response) {
      setEmail(response.data.userData.email)
      setFirstName(response.data.userData.firstName)
      setLastName(response.data.userData.lastName)
      setCreatedAt(response.data.userData.createdAt)
      setIsAdmin(response.data.userData.isAdmin)
    }
  }

  const user = JSON.parse(sessionStorage.getItem("userInfo"))
  

  useEffect(() => {
    if (!user) {
      navigate("/login")
      toast.warning("Unauthorized!")
    }
    getUserProfile()
  }, [user])

  return (
    <>
      <Header authNav={<AuthNav />} />
      <Row>
        <Col lg={11} className="bg-light border p-5 text-dark border-0 shadow mb-5 mt-4 mx-auto">
          <h3>{`${firstName} ${lastName}`}</h3>
          <h6 className="text-muted border-bottom">{email}</h6>
          <Row className="mt-5">
            <Col lg={2}>
              <h6>Member Since</h6>
              <p className="text-secondary">{new Date(createdAt).toLocaleDateString("en-US")}</p>
            </Col>
            <Col lg={2}>
              <h6>Email</h6>
              <p className="text-secondary">{email}</p>
            </Col>
            <Col lg={2}>
              <h6>First Name</h6>
              <p className="text-secondary">{firstName}</p>
            </Col>
            <Col lg={2}>
              <h6>First Name</h6>
              <p className="text-secondary">{lastName}</p>
            </Col>
          </Row>
        </Col>
        <Col lg={12}>
          <h2 className="text-center" style={styles}>
            {" "}
            Membership Details
          </h2>
        </Col>
      </Row>
    </>
  )
}

const styles = {
  textDecoration: "underline",
  textUnderlineOffset: "8px",
  textDecorationColor: "grey"
}

export default ProfileComponent
