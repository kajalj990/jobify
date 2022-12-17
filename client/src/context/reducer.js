import { CLEAR_ALERT, DISPLAY_ALERT, HANDLE_CHANGE, SETUP_FAIL, SETUP_SUCCESS, SETUP_USER, TOGGLE_SIDEBAR, UPDATE_USER, UPDATE_USER_FAIL, UPDATE_USER_SUCCESS, USER_LOGOUT, CLEAR_VALUES, CREATE_JOB, CREATE_JOB_SUCCESS, CREATE_JOB_FAIL, GET_JOBS, GET_JOBS_SUCCESS } from "./action";
import { initialState } from "./appContext";
const reducer = (state, action) => {
  if (action.type === DISPLAY_ALERT) {
    return {
      ...state,
      showAlert: true,
      alertType: 'danger',
      alertText: "Please provide all values !!"
    }
  }
  if (action.type === CLEAR_ALERT) {
    return {
      ...state,
      showAlert: false,
      alertType: '',
      alertText: ""
    }
  }

  if (action.type === SETUP_USER) {
    return {
      ...state,
      isLoading: true
    }
  }

  if (action.type === SETUP_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      token: action.payload.token,
      user: action.payload.user,
      userLocation: action.payload.location,
      jobLocation: action.payload.location,
      showAlert: true,
      alertType: 'success',
      alertText: action.payload.alertText
    }
  }

  if (action.type === SETUP_FAIL) {
    return {
      state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg,
    }
  }


  if (action.type === USER_LOGOUT) {
    return {
      ...initialState,
      token: null,
      user: null,
      userLocation: null,
      jobLocation: null
    }
  }
  if (action.type === UPDATE_USER) {
    return {
      ...state,
      isLoading: true
    }
  }

  if (action.type === UPDATE_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      token: action.payload.token,
      user: action.payload.user,
      userLocation: action.payload.location,
      jobLocation: action.payload.location,
      showAlert: true,
      alertType: 'success',
      alertText: 'User Profile Updated!'

    }
  }

  if (action.type === UPDATE_USER_FAIL) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg,
    }
  }


  if (action.type === TOGGLE_SIDEBAR) {
    return {
      ...state,
      showSidebar: !state.showSidebar
    }
  }
  if (action.type === HANDLE_CHANGE) {
    return {
      ...state,
      [action.payload.name]: action.payload.value,
    }
  }

  if (action.type === CLEAR_VALUES) {
    const initialState = {
      isEditing: false,
      editJobId: '',
      jobLocation: state.userLocation,
      company: '',
      position: '',
      jobType: 'full-time',
      status: 'pending'
    }
    return {
      ...state,
      ...initialState
    }
  }

  if (action.type === CREATE_JOB) {
    return {
      ...state,
      isLoading: true
    }
  }

  if (action.type === CREATE_JOB_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'success',
      alertText: 'New Job Created!',
    }
  }
  if (action.type === CREATE_JOB_FAIL) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg
    }
  }

  if (action.type === GET_JOBS) {
    return {
      ...state,
      isLoading: true,
      showAlert: false
    }
  }

  if (action.type === GET_JOBS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      jobs: action.payload.jobs,
      totalJobs: action.payload.totalJobs,
      numOfPages: action.payload.numOfPages,
    }
  }
  throw new Error(`no such action : ${action.type}`);
}




export default reducer