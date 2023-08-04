import Header from "./Header"
import AuthNav from "./AuthNav"
import { Link, useNavigate } from "react-router-dom"
import { Row, Form, Button, Col } from "react-bootstrap"
import { useState } from "react"
import axios from "axios"
import { USER_REGISTRATION } from "../utils/endpoints"
import { toast } from "react-toastify"
import { formValidation, formCompleted } from "../utils/authValidation"

const RegistrationForm = () => {
  const [email, setEmail] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const navigate = useNavigate()

  const clearForm = () => {
    setEmail("")
    setFirstName("")
    setLastName("")
    setPassword("")
    setConfirmPassword("")
  }

  const handleForm = async e => {
    e.preventDefault()

    if (!formValidation(email, firstName, lastName, password, confirmPassword)) return;

    try {
      const response = await axios.post(USER_REGISTRATION, { email, firstName, lastName, password }, { withCredentials: true })

      const { data } = response.data
      sessionStorage.setItem("userInfo", JSON.stringify(data))
      navigate("/dashboard")
      toast.success("Account Created Successfully!")
      clearForm()
    } catch (error) {
      toast.error(error.response.data)
    }
  }

  return (
    <>
      <Header authNav={<AuthNav />} />
      <h1 className="text-center mt-5">Sign-Up</h1>
      <Row className="px-5">
        <Col lg={5} xl={3} className="border-0 mx-auto p-5 mt-5 rounded rounded-lg shadow shadow-lg">
          <Form onSubmit={handleForm} autoComplete="off" noValidate>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email: </Form.Label>
              <Form.Control type="email" placeholder="i.e. jdoe@email.com" value={email} onChange={e => setEmail(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="firstname">
              <Form.Label>First Name: </Form.Label>
              <Form.Control type="text" placeholder="First Name" value={firstName} onChange={e => setFirstName(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="lastname">
              <Form.Label>Last Name:</Form.Label>
              <Form.Control type="text" placeholder="LastName" value={lastName} onChange={e => setLastName(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password:</Form.Label>
              <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
              <p className="text-secondary text-center">At least 8 characters, one symbol, one letter, one number</p>
            </Form.Group>

            <Form.Group className="mb-3" controlId="confirmPassword">
              <Form.Label>Confirm Password:</Form.Label>
              <Form.Control type="password" placeholder="Password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
            </Form.Group>
            <Button type="submit" variant="success" disabled={!formCompleted(email, firstName, lastName, password, confirmPassword)}>
              Register
            </Button>
            <Row>
              <Col className="mt-3">
                Have an Account? <Link to="/login">Login</Link>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </>
  )
}

export default RegistrationForm
