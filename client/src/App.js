import React, { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom'
import { useSelector } from 'react-redux'
import LogIn from './Pages/LogIn'
import Welcome from './Pages/Welcome'
import Navbar from './Components/Layout/Navbar'
import ReplacementReqList from './Components/Replacement/ReplacementReqList'
import ChangeDayReqList from './Components/ChangeDay/ChangeDayReqList'
import LinkingReqList from './Components/Linking/LinkingReqList'
import LeaveReqList from './Components/Leave/LeaveReqList'
import Courses from './Pages/Courses'
import CourseDetails from './Pages/CourseDetails'
import Notification from './Pages/Notification'
import Faculties from './Pages/Faculty'
import Locations from './Pages/Location'
import Profiles from './Pages/ProfilesList'
import ProfileDetailed from './Pages/StaffProfile'
import MyProfile from './Pages/MyProfile'
import Reset from './Components/Profiles/ResetPassModal'
import Attendance from './Pages/Attendance'
import Schedule from './Pages/Schedule'
import Slots from './Pages/Slots'
import './App.css'
import Department from './Pages/Department'

export default function App() {
  const token = useSelector((state) => state.token)
  const type = useSelector((state) => state.type)
  const passwordStatus = useSelector((state) => state.passwordStatus)
  const [reset, setReset] = useState(false)
  useEffect(() => {
    if (passwordStatus === 'default') {
      setReset(true)
    } else {
      setReset(false)
    }
  }, [passwordStatus])
  return (
    <>
      <Router>
        <table style={{ width: '100%', overflow: 'hidden' }}>
          <tbody>
            <tr>
              <td>{token ? <Navbar /> : ''}</td>
            </tr>
            <tr>
              <td>
                {' '}
                <Switch>
                  <Route
                    exact
                    path='/'
                    render={() =>
                      token ? <Welcome /> : <Redirect to='/logIn' />
                    }
                  />

                  <Route
                    exact
                    path='/Replacement'
                    render={() =>
                      token ? <ReplacementReqList /> : <Redirect to='/logIn' />
                    }
                  />
                  <Route
                    exact
                    path='/Leave'
                    render={() =>
                      token ? <LeaveReqList /> : <Redirect to='/logIn' />
                    }
                  />

                  <Route
                    exact
                    path='/ChangeDay'
                    render={() =>
                      token ? <ChangeDayReqList /> : <Redirect to='/logIn' />
                    }
                  />
                  <Route
                    exact
                    path='/Linking'
                    render={() =>
                      token ? <LinkingReqList /> : <Redirect to='/logIn' />
                    }
                  />

                  <Route
                    exact
                    path='/logIn'
                    render={() => (token ? <Redirect to='/' /> : <LogIn />)}
                  />
                  <Route
                    exact
                    path='/courses'
                    render={() =>
                      token ? <Courses /> : <Redirect to='/logIn' />
                    }
                  />
                  {type !== 'ta' ? (
                    <Route
                      exact
                      path='/courses/:id'
                      render={() =>
                        token ? <CourseDetails /> : <Redirect to='/logIn' />
                      }
                    />
                  ) : (
                    ''
                  )}
                  {type === 'hr' || type === 'hod' || type === 'instructor' ? (
                    <Route
                      exact
                      path='/profiles'
                      render={() =>
                        token ? <Profiles /> : <Redirect to='/logIn' />
                      }
                    />
                  ) : (
                    ''
                  )}
                  <Route
                    exact
                    path='/profileDetailed'
                    render={() =>
                      token ? <ProfileDetailed /> : <Redirect to='/logIn' />
                    }
                  />
                  <Route
                    exact
                    path='/myProfile'
                    render={() =>
                      token ? <MyProfile /> : <Redirect to='/logIn' />
                    }
                  />

                  <Route
                    exact
                    path='/notifications'
                    render={() =>
                      token ? <Notification /> : <Redirect to='/logIn' />
                    }
                  />
                  <Route
                    exact
                    path='/faculties'
                    render={() =>
                      token ? <Faculties /> : <Redirect to='/logIn' />
                    }
                  />
                  <Route
                    exact
                    path='/locations'
                    render={() =>
                      token ? <Locations /> : <Redirect to='/logIn' />
                    }
                  />
                  <Route
                    exact
                    path='/departments'
                    render={() =>
                      token ? <Department /> : <Redirect to='/logIn' />
                    }
                  />
                  <Route
                    exact
                    path='/attendance'
                    render={() =>
                      token ? <Attendance /> : <Redirect to='/logIn' />
                    }
                  />
                  {type !== 'hr' ? (
                    <Route
                      exact
                      path='/schedule'
                      render={() =>
                        token ? <Schedule /> : <Redirect to='/logIn' />
                      }
                    />
                  ) : (
                    ''
                  )}
                  {type !== 'hr' ? (
                    <Route
                      exact
                      path='/slots'
                      render={() =>
                        token ? <Slots /> : <Redirect to='/logIn' />
                      }
                    />
                  ) : (
                    ''
                  )}

                  <Route
                    render={() =>
                      token ? <Redirect to='/' /> : <Redirect to='/logIn' />
                    }
                  />
                </Switch>
              </td>
            </tr>
          </tbody>
        </table>
        <Reset show={reset} onHide={() => setReset(false)} default={true} />
      </Router>
    </>
  )
}
