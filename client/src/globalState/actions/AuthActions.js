import axios from 'axios'
import { backendLink } from '../../keys_dev'
export const loginAPI = (email, password, history) => {
  return async (dispatch, getState) => {
    return await axios({
      url: `${backendLink}/staff/logIn`,
      method: 'PUT',
      data: {
        email,
        password,
      },
    }).then((res) => {
      if (res.data.statusCode === '000') {
        const name = res.data.payLoad.name
        const token = res.data.token
        const id = res.data.payLoad.id
        const type = res.data.payLoad.type
        const email = res.data.payLoad.email
        const passwordStatus = res.data.payLoad.passwordStatus
        dispatch(setToken(token))
        dispatch(setID(id))
        dispatch(setName(name))
        dispatch(setPasswordStatus(passwordStatus))
        if (res.data.payLoad.department) {
          const department = res.data.payLoad.department
          dispatch(setDepartment(department))
        }
        dispatch(setType(type))
        dispatch(setEmail(email))
        history.push('/')
      } else {
        dispatch(unsetToken())
        dispatch(unsetID())
        dispatch(unsetName())
        dispatch(unsetDepartment())
        dispatch(unsetType())
        dispatch(unsetEmail())
        dispatch(unsetPasswordStatus())
      }
      return res.data
    })
  }
}

const setToken = (payload) => {
  return {
    type: 'SET_TOKEN',
    payload,
  }
}

const unsetToken = () => {
  return {
    type: 'UNSET_TOKEN',
    payload: '',
  }
}
export const setPasswordStatus = (payload) => {
  return {
    type: 'SET_PASSWORDSTATUS',
    payload,
  }
}

const unsetPasswordStatus = () => {
  return {
    type: 'UNSET_PASSWORDSTATUS',
    payload: '',
  }
}
const setType = (payload) => {
  return {
    type: 'SET_TYPE',
    payload,
  }
}
const unsetType = () => {
  return {
    type: 'UNSET_TYPE',
    payload: '',
  }
}
const setDepartment = (payload) => {
  return {
    type: 'SET_DEPARTMENT',
    payload,
  }
}

const unsetDepartment = () => {
  return {
    type: 'UNSET_DEPARTMENT',
    payload: '',
  }
}

const setName = (payload) => {
  return {
    type: 'SET_NAME',
    payload,
  }
}

const unsetName = () => {
  return {
    type: 'UNSET_NAME',
    payload: '',
  }
}

const setID = (payload) => {
  return {
    type: 'SET_ID',
    payload,
  }
}

const unsetID = () => {
  return {
    type: 'UNSET_ID',
    payload: '',
  }
}
const setEmail = (payload) => {
  return {
    type: 'SET_EMAIL',
    payload,
  }
}

const unsetEmail = () => {
  return {
    type: 'UNSET_EMAIL',
    payload: '',
  }
}

export const logout = (token, history) => {
  return async (dispatch, getState) => {
    return await axios({
      url: `${backendLink}/staff/logOut`,
      method: 'PUT',
      headers: {
        authorization: token,
      },
    }).then((res) => {
      dispatch(unsetToken())
      dispatch(unsetID())
      dispatch(unsetName())
      dispatch(unsetDepartment())
      dispatch(unsetType())
      dispatch(unsetEmail())
      dispatch(unsetPasswordStatus())
      history.push('/logIn')
    })
  }
}
