import { useState } from 'react'
import { FormRow, Alert } from '../../components'
import { useAppContext } from '../../context/appContext'
import Wrapper from '../../assets/wrappers/DashboardFormPage'

const Profile = () => {
  const { user, showAlert, displayAlert, updateUser, isLoading } = useAppContext();

  const [name, setName] = useState(user?.name)
  const [email, setEmail] = useState(user?.email)
  const [location, setLocation] = useState(user?.location)
  const [lastName, setlastName] = useState(user?.lastName)

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !lastName || !location) {
      displayAlert()
      return
    }
    updateUser({ name, email, lastName, location })
  }

  return (
    <Wrapper>
      <form className='form' onSubmit={handleSubmit}>
        <h3>profile</h3>
        {showAlert && <Alert />}
        <div className="form-center">
          <FormRow type="text" labelText="First Name" name="name" value={name} handleChange={(e) => setName(e.target.value)}></FormRow>
          <FormRow type="text" labelText="Last Name" name="lastName" value={lastName} handleChange={(e) => setlastName(e.target.value)}></FormRow>
          <FormRow type="text" name="email" value={email} handleChange={(e) => setEmail(e.target.value)}></FormRow>
          <FormRow type="text" name="location" value={location} handleChange={(e) => setLocation(e.target.value)}></FormRow>
          <button type='submit' className='btn btn-block' disabled={isLoading}>
            {isLoading ? 'Please Wait..' : 'Save Changes'}
          </button>
        </div>
      </form>
    </Wrapper>
  )
}
export default Profile