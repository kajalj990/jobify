import { FormRow, Alert, FormRowSelect } from '../../components'
import { useAppContext } from '../../context/appContext'
import Wrapper from '../../assets/wrappers/DashboardFormPage'

const AddJobs = () => {

  const { isEditing,
    showAlert,
    displayAlert,
    position,
    company,
    jobLocation,
    jobType,
    jobTypeOptions,
    status,
    statusOptions,
    handleChange,
    createJob,
    isLoading, clearValues } = useAppContext();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!position || !company || !jobLocation) {
      displayAlert()
      return
    }
    if (isEditing) {
      //edit job 
      return
    }
    createJob()

  }



  const handleJobInput = (e) => {
    handleChange({ name: e.target.name, value: e.target.value })
  }
  return (
    <Wrapper>
      <form className='form'>
        <h3>{isEditing ? 'Edit job' : 'add job'}</h3>
        {showAlert && <Alert />}
        <div className='form-center'>
          {/* position */}
          <FormRow type="text" name="position" value={position} handleChange={handleJobInput} />
          {/* company */}
          <FormRow type="text" name="company" value={company} handleChange={handleJobInput} />
          {/* jobLocation */}
          <FormRow type="text" labelText="job location" name="jobLocation" value={jobLocation} handleChange={handleJobInput} />
          {/* job type */}
          <FormRowSelect
            labelText='job type' name="jobType" value={jobType} handleChange={handleJobInput}
            list={jobTypeOptions}
          />
          {/* job status */}
          <FormRowSelect
            labelText='job status' name="status" value={status} handleChange={handleJobInput}
            list={statusOptions}
          />
          <div className="btn-container">
            <button type='submit' className='btn btn-block submit-btn' onClick={handleSubmit} disabled={isLoading}
            >submit</button>
            <button className='btn btn-block clear-btn' onClick={(e) => {
              e.preventDefault();
              clearValues()
            }}>clear</button>
          </div>
        </div>

      </form>
    </Wrapper>
  )
}
export default AddJobs