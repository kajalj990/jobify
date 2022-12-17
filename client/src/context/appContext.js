import React, { useContext, useReducer, useEffect } from 'react'

import reducer from './reducer'

import {
  CLEAR_ALERT, DISPLAY_ALERT, SETUP_SUCCESS, SETUP_FAIL, TOGGLE_SIDEBAR, UPDATE_USER, UPDATE_USER_FAIL, UPDATE_USER_SUCCESS, USER_LOGOUT, HANDLE_CHANGE, CLEAR_VALUES, CREATE_JOB, CREATE_JOB_SUCCESS, CREATE_JOB_FAIL, GET_JOBS, GET_JOBS_SUCCESS
} from './action'
import axios from 'axios'

const token = localStorage.getItem('token')
const user = localStorage.getItem('user')
const userlocation = localStorage.getItem('location')

const initialState = {
  isLoading: false,
  showAlert: false,
  text: '',
  alertType: '',
  isEditing: false,

  //user
  user: user ? JSON.parse(user) : null,
  token: token,
  userLocation: userlocation || '',

  showSidebar: false,

  //job

  editJobId: '',
  jobLocation: userlocation || '',
  company: '',
  position: '',
  jobTypeOptions: ['full-time', 'part-time', 'remote', 'internship'],
  jobType: 'full-time',
  statusOptions: ['pending', 'interview', 'declined'],
  status: 'pending',

  jobs: [],
  totalJobs: 0,
  numOfpages: 1,
  page: 1


}

const AppContext = React.createContext()


const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  //axios
  const axiosFetch = axios.create({
    baseURL: 'api/v1/'
  })

  // request interceptors 
  axiosFetch.interceptors.request.use(
    (config) => {
      config.headers.common['Authorization'] = `Bearer ${state.token}`
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )
  //response
  axiosFetch.interceptors.response.use(
    (response) => {
      return response
    },
    (error) => {
      console.log(error)
      if (error.response.status === 401) {
        logout()
      }
      return Promise.reject(error)
    }
  )


  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT })
    clearAlert()
  }

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT })
    }, 3000)
  }

  const addUserToLocalStorage = ({ user, token, location }) => {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
    localStorage.setItem('location', location);
  }

  const removeUserFromLocalStorage = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    localStorage.removeItem('location')
  }

  const setupUser = async ({ currentUser, endPoint, altertText }) => {
    try {
      const { data } = await axios.post(`/api/v1/auth/${endPoint}`, currentUser);
      const { user, token, location } = data
      dispatch({
        type: SETUP_SUCCESS,
        payload: { user, token, location, altertText }
      })
      addUserToLocalStorage({ user, token, location })
    } catch (error) {
      dispatch({
        type: SETUP_FAIL,
        payload: { msg: error.response.data.msg }
      });
    }
    clearAlert();
  }
  const logout = async () => {
    dispatch({ type: USER_LOGOUT })
    removeUserFromLocalStorage()

  }

  const updateUser = async (currentUser) => {
    dispatch({ type: UPDATE_USER })
    try {
      const { data } = await axiosFetch.patch('auth/updateUser', currentUser)
      const { user, token, location } = data
      dispatch({ type: UPDATE_USER_SUCCESS, payload: { user, token, location } })
      addUserToLocalStorage({ user, location, token })
    } catch (error) {
      if (error.response.status !== 401) {
        dispatch({ type: UPDATE_USER_FAIL, payload: { msg: error.response.data.msg } })
      }

    }
    clearAlert()
  }
  const toggleSidebar = () => {
    dispatch({ type: TOGGLE_SIDEBAR })
  }

  //JOB OPERATION
  const handleChange = ({ name, value }) => {
    dispatch({ type: HANDLE_CHANGE, payload: { name, value } })
  }

  const clearValues = () => {
    dispatch({ type: CLEAR_VALUES })
  }

  const createJob = async () => {
    dispatch({ type: CREATE_JOB })
    try {
      const { company, jobLocation, position, jobType, status } = state
      await axiosFetch.post('/jobs', {
        company, jobLocation, position, jobType, status
      })
      dispatch({ type: CREATE_JOB_SUCCESS })
      dispatch({ type: CLEAR_VALUES })
    } catch (error) {
      if (error.response.status === 401) return
      dispatch({ type: CREATE_JOB_FAIL, payload: { msg: error.response.data.msg } })
    }
    clearAlert()
  }

  const getJobs = async () => {
    let url = '/jobs';
    dispatch({ type: GET_JOBS })
    try {
      const { data } = await axiosFetch.get(url)
      const { jobs, totalJobs, numOfPage } = data
      dispatch({ type: GET_JOBS_SUCCESS, payload: { jobs, totalJobs, numOfPage } })
    } catch (error) {
      console.log(error.response)
    }
    clearAlert()
  }
  // useEffect(() => {
  //   getJobs()
  // }, [])
  return (
    <AppContext.Provider value={{ ...state, displayAlert, clearAlert, setupUser, logout, toggleSidebar, updateUser, handleChange, clearValues, createJob }} >
      {children}
    </AppContext.Provider>
  )

}
const useAppContext = () => {
  return useContext(AppContext)
}
export { AppProvider, initialState, useAppContext }