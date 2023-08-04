import { useEffect, useState } from "react"
import { Row } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import Header from "./Header"
import AuthNav from "./AuthNav"

const DashComponent = () => {
  const [userInfo, setUserInfo] = useState("")
  const navigate = useNavigate()

  const getUserInfo = async () => {
    const user = JSON.parse(sessionStorage.getItem("userInfo"))
    if (user) {
      setUserInfo(user)
    } else {
      navigate("/login")
      toast.warning("You are not logged in!")
    }
  }

  useEffect(() => {
    getUserInfo()
  }, [])
  
  return (
    <>
      <Header authNav={<AuthNav />}/>
      <Row>
        <h1 className="text-center mt-5">Dashboard</h1>
      </Row>
    </>
  )
}

export default DashComponent
