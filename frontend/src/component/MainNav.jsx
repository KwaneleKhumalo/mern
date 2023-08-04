import { Navbar, Nav } from 'react-bootstrap'
import {Link} from 'react-router-dom'

const MainNav = () => {
  return (
    <>
      <Navbar expand="lg" className="bg-dark">
        <Link className="navbar-brand px-5 text-light" to="/">
          Basic User Authentication
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto px-5 ">
            <Link to="/login" className="nav-link text-secondary">
              Login
            </Link>
            <Link to="/register" className="nav-link text-secondary">
              register
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  )
}

export default MainNav
