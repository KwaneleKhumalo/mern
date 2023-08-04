import axios from "axios"
import { PROFILE } from "../utils/endpoints"
import { useEffect, useState } from "react"
import { Row, Col } from "react-bootstrap"
import Header from "./Header"
import AuthNav from "./AuthNav"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { CheckCookie } from "../utils/authValidation"

const ProfileComponent = () => {
  const [email, setEmail] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [createdAt, setCreatedAt] = useState("")
  const navigate = useNavigate("")

  const getUserProfile = async () => {
    const response = await axios.get(`${PROFILE}`, { withCredentials: true })

    if (response) {
      setEmail(response.data.userData.email)
      setFirstName(response.data.userData.firstName)
      setLastName(response.data.userData.lastName)
      setCreatedAt(response.data.userData.createdAt)
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
          <h3 className="text-center text-lg-start">{`${firstName} ${lastName}`}</h3>
          <h6 className="text-muted border-bottom text-center text-lg-start">{email}</h6>
          <Row className="mt-5 mx-md-auto text-center text-lg-start">
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
