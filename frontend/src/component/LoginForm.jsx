import AuthNav from "./AuthNav"
import Header from "./Header"
import { Link, useNavigate } from "react-router-dom"
import { Row, Form, Button, Col } from "react-bootstrap"
import { useState } from "react"
import axios from "axios"
import { USER_LOGIN } from "../utils/endpoints"
import { toast } from "react-toastify"
import { formCompleted } from "../utils/authValidation"

const LoginForm = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate()

  const handleLogin = async e => {
    e.preventDefault()
    try {
      const response = await axios.post(USER_LOGIN, { email, password }, { withCredentials: true })
      const { data } = response.data
      sessionStorage.setItem("userInfo", JSON.stringify(data))
      toast.success(response.data.msg)
      navigate("/dashboard")

      setEmail("")
      setPassword("")
    } catch (err) {
      toast.error(err.response.data)
    }
  }

  return (
    <div>
      <Header authNav={<AuthNav />} />
      <h1 className="text-center mt-5">Login</h1>
      <Row>
        <Col lg={3} className="border-0 mx-auto p-5 mt-5 rounded rounded-lg shadow shadow-lg">
          <Form autoComplete="off" onSubmit={handleLogin}>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email: </Form.Label>
              <Form.Control type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password:</Form.Label>
              <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
            </Form.Group>

            <Button type="submit" variant="success" disabled={!formCompleted(email, password)}>
              Login
            </Button>
            <Row>
              <Col className="mt-3">
                Need an Account? <Link to="/register">Register</Link>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </div>
  )
}

export default LoginForm
