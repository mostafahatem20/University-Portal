import React, { useState, useEffect } from 'react'
import GUC from '../../images/guc.png'
import { useHistory } from 'react-router'
import { logout } from '../../globalState/actions/AuthActions'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { backendLink } from '../../keys_dev'
export default function Navbar() {
  const [num, setNumb] = useState(0)
  const [CC, setCC] = useState(false)
  const type = useSelector((state) => state.type)
  const numbNot = () => {
    axios({
      url: `${backendLink}/notification/viewNotifications`,
      method: 'get',
      headers: {
        authorization: token,
      },
    })
      .then((res) => {
        if (res.data.statusCode === '000') {
          setNumb(res.data.notifications.length)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }
  const checkCC = () => {
    axios({
      url: `${backendLink}/slot/checkCC`,
      method: 'POST',
      headers: {
        authorization: token,
      },
    })
      .then((res) => {
        if (res.data.statusCode === '000') {
          setCC(res.data.flag)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }
  useEffect(() => {
    numbNot()
    if (type === 'ta') {
      checkCC()
    }
  })
  const token = useSelector((state) => state.token)
  const dispatch = useDispatch()
  const history = useHistory()

  const [burger, setBurger] = useState('burger')
  const [page, setPage] = useState('hidden')
  const [active, setActive] = useState(
    history.location.pathname.substring(1).toLowerCase()
  )
  const handleBurger = () => {
    if (burger === 'burger') {
      setBurger('burger hover')
    }
    if (burger === 'burger st-1 st-2') {
      setBurger('burger st-1 st-2 hover')
    }
  }
  const handleBurgerout = () => {
    if (burger === 'burger hover') {
      setBurger('burger')
    }
    if (burger === 'burger st-1 st-2 hover') {
      setBurger('burger st-1 st-2')
    }
  }
  const handleBurgerclick = () => {
    if (burger === 'burger hover') {
      setBurger('burger st-1 st-2 hover')
    } else if (burger === 'burger') {
      setBurger('burger st-1 st-2')
    } else if (burger === 'burger st-1 st-2') {
      setBurger('burger')
    } else if (burger === 'burger st-1 st-2 hover') {
      setBurger('burger hover')
    }
    if (page === 'hidden') {
      setPage('')
    } else {
      setPage('hidden')
    }
  }
  const handleActive = (x, y) => {
    if (x === 'profile') {
      setActive('profile')
      history.push('/myProfile')
    } else if (x === 'changeDay') {
      setActive('changeDay')
      history.push('/changeDay')
    } else if (x === 'linking') {
      setActive('linking')
      history.push('/linking')
    } else if (x === 'replacement') {
      setActive('replacement')
      history.push('/replacement')
    } else if (x === 'leave') {
      setActive('leave')
      history.push('/leave')
    } else if (x === 'notifications') {
      setActive('notifications')
      history.push('/notifications')
    } else if (x === 'locations') {
      setActive('locations')
      history.push('/locations')
    } else if (x === 'attendance') {
      setActive('attendance')
      history.push('/attendance')
    } else if (x === 'schedule') {
      setActive('schedule')
      history.push('/schedule')
    } else if (x === 'slots') {
      setActive('slots')
      history.push('/slots')
    } else if (x === 'Courses') {
      setActive('Courses')
      history.push('/Courses')
    } else if (x === 'faculties') {
      setActive('faculties')
      history.push('/faculties')
    } else if (x === 'departments') {
      setActive('departments')
      history.push('/departments')
    } else if (x === 'logOut') {
      dispatch(logout(token, history))
    }
    if (y) handleBurgerclick()
  }
  return (
    <div>
      {' '}
      <header
        id='page-header'
        className={page}
        data-title='Full-Stack Web Developer Portfolio, UI/UX Javascript Specialist'
      >
        <nav style={{ height: '100vh', overflowY: 'auto' }}>
          <a
            title='about'
            className={active === 'profile' ? 'active' : ''}
            onClick={() => handleActive('profile', true)}
            href
          >
            <span>Profile</span>
          </a>
          {type === 'hr' ? (
            <a
              title='departments'
              className={active === 'departments' ? 'active' : ''}
              onClick={() => handleActive('departments', true)}
              href
            >
              <span>Departments</span>
            </a>
          ) : (
            ''
          )}
          {type !== 'hr' ? (
            <a
              title='notifications'
              className={active === 'notifications' ? 'active' : ''}
              onClick={() => handleActive('notifications', true)}
              href
            >
              {' '}
              <span>
                Notifications{' '}
                {num > 0 ? (
                  <span
                    style={{
                      display: 'inline',
                      color: 'red',
                      marginLeft: '1vw',
                    }}
                  >
                    {num}
                  </span>
                ) : (
                  ''
                )}
              </span>
            </a>
          ) : (
            ''
          )}
          {type === 'hr' ? (
            <a
              title='faculties'
              className={active === 'faculties' ? 'active' : ''}
              onClick={() => handleActive('faculties', true)}
              href
            >
              <span>Faculties</span>
            </a>
          ) : (
            ''
          )}
          {type === 'hr' ? (
            <a
              title='locations'
              className={active === 'locations' ? 'active' : ''}
              onClick={() => handleActive('locations', true)}
              href
            >
              <span>Locations</span>
            </a>
          ) : (
            ''
          )}

          {type !== 'hr' ? (
            <a
              title='web portfolio'
              className={active === 'changeDay' ? 'active' : ''}
              onClick={() => handleActive('changeDay', true)}
              href
            >
              <span>Change Day Requests</span>
            </a>
          ) : (
            ''
          )}
          {type !== 'hr' ? (
            <a
              title='web portfolio'
              className={active === 'linking' ? 'active' : ''}
              onClick={() => handleActive('linking', true)}
              href
            >
              <span>Linking Requests</span>
            </a>
          ) : (
            ''
          )}
          {type !== 'hr' ? (
            <a
              title='web portfolio'
              className={active === 'replacement' ? 'active' : ''}
              onClick={() => handleActive('replacement', true)}
              href
            >
              <span>Replacement Requests</span>
            </a>
          ) : (
            ''
          )}
          {type !== 'hr' ? (
            <a
              title='web portfolio'
              className={active === 'leave' ? 'active' : ''}
              onClick={() => handleActive('leave', true)}
              href
            >
              <span>Leave Requests</span>
            </a>
          ) : (
            ''
          )}
          {type !== 'hr' ? (
            type === 'ta' && !CC ? (
              ''
            ) : (
              <a
                title='slots'
                className={active === 'slots' ? 'active' : ''}
                onClick={() => handleActive('slots', true)}
                href
              >
                <span>Slots</span>
              </a>
            )
          ) : (
            ''
          )}
          {type !== 'hr' ? (
            <a
              title='schedule'
              className={active === 'schedule' ? 'active' : ''}
              onClick={() => handleActive('schedule', true)}
              href
            >
              <span>Schedule</span>
            </a>
          ) : (
            ''
          )}
          <a
            title='Courses'
            className={active === 'Courses' ? 'active' : ''}
            onClick={() => handleActive('Courses', true)}
            href
          >
            <span>Courses</span>
          </a>
          <a
            title='attendance'
            className={active === 'attendance' ? 'active' : ''}
            onClick={() => handleActive('attendance', true)}
            href
          >
            <span>Attendance</span>
          </a>
          <a
            title='log out'
            className=''
            onClick={() => handleActive('logOut', true)}
            href
          >
            <span>Log Out</span>
          </a>
        </nav>
      </header>
      <div
        className={burger}
        onMouseOver={handleBurger}
        onMouseOut={handleBurgerout}
        onClick={handleBurgerclick}
      >
        <i></i>
        <i></i>
        <i></i>
      </div>
      <table
        style={{
          width: '100%',
          height: '100px',
          background:
            'linear-gradient(180deg, rgba(1,15,31,1) 3%, rgba(1,155,157,1) 100%)',
        }}
      >
        <tbody>
          <tr>
            <td>
              <img
                alt='guc'
                src={GUC}
                style={{ width: '100px', marginLeft: '3vw', cursor: 'pointer' }}
                onClick={() => history.push('/')}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
