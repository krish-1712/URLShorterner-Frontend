


import axios from 'axios';
import { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { url } from '../App';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup'
import { useFormik } from "formik";

const userSchemaValidation = yup.object({
  email: yup.string().email("Invalid email format").required("Email is required"),
  password: yup.string().required("Password is required").min(8),
  firstname: yup.string().required("First name is required"),
  lastname: yup.string().required("Last name is required"),

})






function Register() {

  let navigate = useNavigate()

  useEffect(() => {
    sessionStorage.clear()
  }, [])




  const { handleSubmit, handleChange, errors, touched, values } = useFormik({
    initialValues: {
      email: "",
      password: "",
      firstname: "",
      lastname: "",
    },
    validationSchema: userSchemaValidation,
    onSubmit: async (values) => {
      try {
        let res = await axios.post(`${url}/users/signup`, values)
        console.log(res)
        toast.success(res.data.message)
        sessionStorage.setItem('token', res.data.token)
        navigate('/login')
      } catch (error) {
        toast.error(error.response.data.message)
      }

    }
  })


  return (


    <div className='login-wrapper'>
      <h1 style={{ "textAlign": "center" }}>Signup Here!</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>First Name</Form.Label>
          <Form.Control type="text" placeholder="Enter the First Name" className="firstname" name="firstname" value={values.firstname}
            onChange={handleChange} />
          {touched.firstname && errors.firstname ? <p style={{ color: "crimson" }}>{errors.firstname}</p> : ""}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Last Name</Form.Label>
          <Form.Control type="text" placeholder="Enter the Last Name" className="lastname" name="lastname" value={values.lastname}
            onChange={handleChange} />
          {touched.lastname && errors.lastname ? <p style={{ color: "crimson" }}>{errors.lastname}</p> : ""}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email address" className="email" name="email" value={values.email}
            onChange={handleChange} />
          {touched.email && errors.email ? <p style={{ color: "crimson" }}>{errors.email}</p> : ""}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Enter the Password" className="password" name="password" value={values.password}
            onChange={handleChange} />
          {touched.password && errors.password ? <p style={{ color: "crimson" }}>{errors.password}</p> : ""}
        </Form.Group>
        <Button variant="primary" type='submit'>
          Signup
        </Button>
      </Form>

    </div>

  );
}

export default Register;