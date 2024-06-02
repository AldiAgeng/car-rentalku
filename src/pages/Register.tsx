
import React, {  useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { NavigationBar, Footer } from "../components"
import axios from "axios";
import Swal from 'sweetalert2'



const Register = () => {
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "Car Rental | Register";
  })

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    phone: "",
    driver_license: ""
  });


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = () => {
    axios.post(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/register`, formData).then((_) => {
      Swal.fire({
        text: 'Register Success',
        icon: 'success',
        confirmButtonText: 'Ok'
      })
      navigate("/login");
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
            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1 mt-5">
              <form>
                <div className="divider d-flex align-items-center my-4">
                  <p className="text-center fw-bold mx-3 mb-0">Sign up</p>
                </div>
                <div className="form-outline mb-4">
                  <input
                    name="email"
                    type="email"
                    id="form3Example3"
                    className="form-control form-control-lg"
                    placeholder="Enter a valid email address"
                    onChange={handleChange}
                  />
                </div>
                <div className="form-outline mb-4">
                  <input
                    name="name"
                    type="text"
                    id="form3Example4"
                    className="form-control form-control-lg"
                    placeholder="Enter name"
                    onChange={handleChange}
                  />
                </div>
                <div className="form-outline mb-4">
                  <input
                    name="phone"
                    type="text"
                    id="form3Example5"
                    className="form-control form-control-lg"
                    placeholder="Enter phone number"
                    onChange={handleChange}
                  />
                </div>
                <div className="form-outline mb-4">
                  <input
                    name="driver_license"
                    type="text"
                    id="form3Example6"
                    className="form-control form-control-lg"
                    placeholder="Enter driver license / SIM"
                    onChange={handleChange}
                  />
                </div>
                <div className="form-outline mb-4">
                  <input
                    name="address"
                    type="text"
                    id="form3Example7"
                    className="form-control form-control-lg"
                    placeholder="Enter address"
                    onChange={handleChange}
                  />
                </div>
                <div className="form-outline mb-3">
                  <input
                    name="password"
                    type="password"
                    id="form3Example8"
                    className="form-control form-control-lg"
                    placeholder="Enter password"
                    onChange={handleChange}
                  />
                </div>
                <div className="text-center text-lg-start mt-4 pt-2">
                  <button onClick={handleSubmit}
                    type="button"
                    className="btn btn-light-green btn-lg"
                    style={{ paddingLeft: 2.5 + 'rem', paddingRight: 2.5 + 'rem' }}
                  >
                    Register
                  </button>
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

export default Register

