
import React, {  useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { NavigationBar, Footer } from "../components"
import axios from "axios";
import Cookies from "js-cookie";
import useUserInfoStore from "../stores/UserInfoStore";
import Swal from 'sweetalert2'
import { LinkContainer } from "react-router-bootstrap";



const Login = () => {
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "Car Rental | Login";
  })

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  }

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  }

  const handleSubmit = () => {
    axios.post(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/login`, {
      email: email,
      password: password
    }).then((response) => {
      Cookies.set("token", response.data.data.access_token, { expires: 1 });
      axios.get(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/user`, {
        headers: {
          Authorization: `Bearer ${response.data.data.access_token}`
        }
      }).then((response) => {
        Swal.fire({
          text: 'Login Success',
          icon: 'success',
          confirmButtonText: 'Ok'
        })
        useUserInfoStore.setState({ name: response.data.data.name });
        if (response.data.data.role === "admin") {
          navigate("/dashboard-admin");
        } else {
          navigate("/dashboard-member");
        }
      })
    }).catch((error) => {
      Swal.fire({
        title: 'Error!',
        text: error.response.data.meta.message,
        icon: 'error',
        confirmButtonText: 'Ok'
      })
    })
  }

  return (
    <div>
      <NavigationBar />
      <section className="vh-100">
        <div className="container-fluid h-custom">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-9 col-lg-6 col-xl-5">
              <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" alt="Sample image" className="img-fluid" />
            </div>
            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
              <form>
                <div className="divider d-flex align-items-center my-4">
                  <p className="text-center fw-bold mx-3 mb-0">Sign in</p>
                </div>
                <div className="form-outline mb-4">
                  <input
                    name="email"
                    type="email"
                    id="form3Example3"
                    className="form-control form-control-lg"
                    placeholder="Enter a valid email address"
                    onChange={handleEmailChange}
                  />
                </div>
                <div className="form-outline mb-3">
                  <input
                    name="password"
                    type="password"
                    id="form3Example4"
                    className="form-control form-control-lg"
                    placeholder="Enter password"
                    onChange={handlePasswordChange}
                  />
                </div>
                <div className="text-center text-lg-start mt-4 pt-2">
                  <button onClick={handleSubmit}
                    type="button"
                    className="btn btn-light-green btn-lg"
                    style={{ paddingLeft: 2.5 + 'rem', paddingRight: 2.5 + 'rem' }}
                  >
                    Login
                  </button>
                  <p className="small fw-bold mt-2 pt-1 mb-0">
                    Don't have an account?{' '}
                    <LinkContainer to="/register">
                      <a>Register</a>
                    </LinkContainer>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}

export default Login

