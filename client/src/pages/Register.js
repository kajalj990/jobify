import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { Logo, FormRow, Alert } from "../components"
import Wrapper from "../assets/wrappers/RegisterPage"
import { useAppContext } from "../context/appContext"

const initialState = {
  name: '',
  email: '',
  password: '',
  isMember: true
}


const Register = () => {
  const [values, setValues] = useState(initialState);

  //globle state and useNavigate
  const navigate = useNavigate()

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember })
  }

  const { user, isLoading, showAlert, displayAlert, clearAlert, setupUser } = useAppContext();

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const onSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, isMember } = values;
    if (!email || !password || (!isMember && !name)) {
      displayAlert()
      return
    }
    const currentUser = { name, email, password }
    if (isMember) {
      setupUser({ currentUser, endPoint: '/login', alertText: 'Login Successfully !! Redirecting...' })
    } else {
      setupUser({ currentUser, endPoint: '/register', alertText: 'Registered Successfully !! Redirecting...' })
    }
  }


  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate('/')
      }, 3000)
      navigate('/')
    }
  }, [user, navigate])
  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={onSubmit}>
        <Logo />
        <h3>{values.isMember ? "Login" : "Register"}</h3>
        {showAlert && <Alert />}
        {/* name input  */}
        {!values.isMember && <FormRow type='text' name='name' value={values.name} handleChange={handleChange} />}
        {/* email input  */}
        <FormRow type='email' name='email' value={values.email} handleChange={handleChange} />
        {/* password input */}
        <FormRow type='password' name='password' value={values.password} handleChange={handleChange} />
        <button type="submit" disabled={isLoading} className="btn btn-block">Submit</button>
        <p>
          {values.isMember ? "Not a member yet ?" : "Already a member ?"}
          <button type="button" onClick={toggleMember} className='member-btn'>{!values.isMember ? "Login" : "Register"}</button>
        </p>
      </form>
    </Wrapper>
  )
}

export default Register