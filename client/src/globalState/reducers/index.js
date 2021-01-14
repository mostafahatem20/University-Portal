import { combineReducers } from 'redux'
import {
  tokenReducer,
  idReducer,
  nameReducer,
  departmentReducer,
  typeReducer,
  emailReducer,
  PSReducer,
  genderReducer,
} from './SigninReducer'

export const root = combineReducers({
  token: tokenReducer,
  id: idReducer,
  name: nameReducer,
  department: departmentReducer,
  type: typeReducer,
  email: emailReducer,
  passwordStatus: PSReducer,
  gender: genderReducer,
})
