import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const App = () => {
  return (
    <div className="App">
      <Outlet />
      <ToastContainer position="top-left" theme="dark" autoClose={2000} />
    </div>
  )
}

export default App;
