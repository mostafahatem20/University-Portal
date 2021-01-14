import React, { useState } from 'react'
import logo from '../images/logo.png'
import { Form, Button } from 'react-bootstrap'
import { useHistory } from 'react-router'
import { loginAPI } from '../globalState/actions/AuthActions'
import { useDispatch } from 'react-redux'
import '../Stylesheets/LogIn.css'
export default function LogIn() {
  const dispatch = useDispatch()
  const history = useHistory()
  const [cred, setCred] = useState({ email: '', password: '' })
  const [err, setErr] = useState({ email: '', password: '' })
  const submit = async (event) => {
    event.preventDefault()
    setErr({ email: '', password: '' })
    const resData = await dispatch(loginAPI(cred.email, cred.password, history))
    if (resData.statusCode === '004') {
      setErr({ ...err, email: resData.error })
    } else if (resData.statusCode === '005') {
      setErr({ ...err, password: resData.error })
    } else if (resData.statusCode === '003') {
      if (resData.error === `"email" is not allowed to be empty`)
        setErr({ ...err, email: resData.error })
      else setErr({ ...err, password: resData.error })
    }
  }
  const submitKey = (event) => {
    if (event.keyCode === 13) {
      event.preventDefault()
      submit(event)
    }
  }
  return (
    <div
      style={{
        height: '98vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        backgroundColor: 'white',
      }}
    >
      <table className='logTable'>
        <tbody>
          <tr>
            <td>
              <img src={logo} className='logoLog' alt='logo' />
            </td>
          </tr>
          <tr>
            <td style={{ verticalAlign: 'top', height: '20vw' }}>
              <Form onKeyDown={(e) => submitKey(e)}>
                <Form.Group controlId='formBasicEmail'>
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type='email'
                    placeholder='Enter email'
                    value={cred.email}
                    onChange={(e) =>
                      setCred({ ...cred, email: e.target.value })
                    }
                  />
                  {err.email ? (
                    <Form.Text className='error'>{err.email}</Form.Text>
                  ) : (
                    ''
                  )}
                </Form.Group>

                <Form.Group controlId='formBasicPassword'>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type='password'
                    placeholder='Password'
                    value={cred.password}
                    onChange={(e) =>
                      setCred({ ...cred, password: e.target.value })
                    }
                  />
                  {err.password ? (
                    <Form.Text className='error'>{err.password}</Form.Text>
                  ) : (
                    ''
                  )}
                </Form.Group>
                <Form.Group
                  style={{ display: 'flex', justifyContent: 'flex-end' }}
                >
                  <Button variant='primary' type='submit' onClick={submit}>
                    Log In
                  </Button>
                </Form.Group>
              </Form>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
