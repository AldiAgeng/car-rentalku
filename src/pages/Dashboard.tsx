import { Button } from "react-bootstrap"
import useUserInfoStore from "../stores/UserInfoStore"
import Cookies from "js-cookie"
import { useNavigate } from "react-router-dom"

function Dashboard() {
  const navigate = useNavigate()
  const logout = () => {
    useUserInfoStore.setState({ name: '' })
    Cookies.remove('token')
    navigate('/login')
  }

  return (
    <>
      <div>
        <Button variant="primary" onClick={logout}>Logout</Button>
        <h1>User Dashboard</h1>
        <h1>Hello {useUserInfoStore.getState().name}</h1>
        <h1>Coming Soon</h1>
      </div>
    </>
  )
}

export default Dashboard