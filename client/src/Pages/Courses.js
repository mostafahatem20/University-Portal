import React, { useState, useEffect } from 'react'
import { backendLink } from '../keys_dev'
import { useSelector } from 'react-redux'
import '../Stylesheets/Profiles.css'
import axios from 'axios'
import CourseCard from '../Components/Courses/CourseCard'
import { Button } from 'react-bootstrap'
import AddCourse from '../Components/Courses/AddCourse'
import NoResults from '../Components/Layout/NoResults'
export default function Courses() {
  const type = useSelector((state) => state.type)
  const [show, setShow] = useState()
  const [reload, setReload] = useState(false)
  const [courses, setCourses] = useState([])
  const token = useSelector((state) => state.token)
  useEffect(() => {
    axios({
      method: 'GET',
      url: `${backendLink}/course/viewCourses`,
      headers: {
        authorization: token,
      },
    })
      .then((res) => {
        if (res.data.statusCode === '000') {
          setCourses(res.data.courses)
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }, [token, reload])
  return (
    <>
      <AddCourse
        show={show}
        onHide={() => setShow(false)}
        reload={reload}
        setReload={setReload}
      />
      <table style={{ width: '100%' }}>
        <tbody>
          <tr>
            <td className='ProfileTitleS' style={{ paddingLeft: '2vw' }}>
              Courses
            </td>
          </tr>
        </tbody>
      </table>
      <table
        className='AllProfileCardsTitlesS'
        style={{ marginLeft: 'auto', marginRight: 'auto', width: '65vw' }}
      >
        <tbody>
          <tr>
            <td
              style={{
                width: '17.5vw',
                paddingLeft: '1.5vw',
                fontSize: '0.9vw',
              }}
            >
              Name
            </td>
            <td style={{ width: '9.5vw', fontSize: '0.9vw' }}>
              Number of Slots
            </td>
            <td style={{ width: '18vw', fontSize: '0.9vw' }}>
              Course Coordinator
            </td>
            <td style={{ fontSize: '0.9vw' }}>Department</td>
          </tr>
        </tbody>
      </table>
      <table className='AllProfileCardsS'>
        <tbody>
          {!courses || courses.length === 0 ? (
            <tr>
              <td>
                <NoResults width='65vw' />
              </td>{' '}
            </tr>
          ) : (
            courses.map((course) => {
              return (
                <tr>
                  <td>
                    <CourseCard
                      course={course}
                      reload={reload}
                      setReload={setReload}
                    />
                  </td>
                </tr>
              )
            })
          )}
        </tbody>
      </table>
      {type === 'hr' ? (
        <div className='AddStaffButtonS'>
          <Button
            style={{
              backgroundColor: 'rgba(1, 155, 157, 1)',
              marginBottom: '1.5vw',
              width: '6vw',
              fontSize: '0.8vw',
              padding: '0.3vw',
            }}
            onClick={() => setShow(true)}
          >
            {' '}
            Add Course
          </Button>
        </div>
      ) : (
        ''
      )}
    </>
  )
}
