export const tokenReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_TOKEN':
      return action.payload
    case 'UNSET_TOKEN':
      return action.payload
    default:
      return state
  }
}
export const typeReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_TYPE':
      return action.payload
    case 'UNSET_TYPE':
      return action.payload
    default:
      return state
  }
}

export const idReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_ID':
      return action.payload
    case 'UNSET_ID':
      return action.payload
    default:
      return state
  }
}

export const nameReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_NAME':
      return action.payload
    case 'UNSET_NAME':
      return action.payload
    default:
      return state
  }
}
export const genderReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_GENDER':
      return action.payload
    case 'UNSET_GENDER':
      return action.payload
    default:
      return state
  }
}

export const departmentReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_DEPARTMENT':
      return action.payload
    case 'UNSET_DEPARTMENT':
      return action.payload
    default:
      return state
  }
}

export const emailReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_EMAIL':
      return action.payload
    case 'UNSET_EMAIL':
      return action.payload
    default:
      return state
  }
}
export const PSReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_PASSWORDSTATUS':
      return action.payload
    case 'UNSET_PASSWORDSTATUS':
      return action.payload
    default:
      return state
  }
}
