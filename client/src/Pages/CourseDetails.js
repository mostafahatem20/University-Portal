import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useHistory } from 'react-router'
import { useSelector } from 'react-redux'
import back from '../images/back.png'
import { Button } from 'react-bootstrap'
import EditCourseModal from '../Components/Courses/EditCourse'
import axios from 'axios'
import { backendLink } from '../keys_dev'
import AssignIns from '../Components/Courses/AssignInstructor'
import ProfileCard from '../Components/Courses/StaffCard'
import UpdateIns from '../Components/Courses/UpdateInstructor'
import AssignStaff from '../Components/Courses/AssignStaff'
import NoResults from '../Components/Layout/NoResults'
import UpdateStaff from '../Components/Courses/UpdateStaff'
import AssignCC from '../Components/Courses/AssignCC'
export default function CourseDetails() {
  const id = useParams().id
  const token = useSelector((state) => state.token)
  const [reload, setReload] = useState(false)
  const [profiles, setProfiles] = useState([])
  const [instructors, setInstructors] = useState([])
  const [staffs, setStaffs] = useState([])
  const type = useSelector((state) => state.type)
  const history = useHistory()
  const [editCourse, setEditCourse] = useState(false)
  const [assignInstructor, setassignInstructor] = useState(false)
  const [assignStaff, setassignStaff] = useState(false)
  const [assignCC, setassignCC] = useState(false)
  const [updateStaff, setupdateStaff] = useState(false)
  const [updateInstructor, setupdateInstructorr] = useState(false)
  const [courseCoverage, setCourseCoverage] = useState(false)
  useEffect(() => {
    axios({
      url: `${backendLink}/course/viewCourseCoverage`,
      method: 'POST',
      headers: {
        authorization: token,
      },
      data: {
        courseId: id,
      },
    })
      .then((res) => {
        if (res.data.statusCode === '000') {
          setCourseCoverage(res.data.coverage)
        }
      })
      .catch((err) => {
        console.log(err)
      })

    axios({
      method: 'POST',
      url: `${backendLink}/courseStaff/viewCourseStaff`,
      headers: {
        authorization: token,
      },
      data: {
        courseId: id,
      },
    })
      .then((res) => {
        if (res.data.statusCode === '000') {
          setProfiles(res.data.staff)
          setInstructors(
            res.data.staff.filter((one) => one.type === 'instructor')
          )
          setStaffs(res.data.staff.filter((one) => one.type === 'ta'))
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }, [token, id, reload])
  return (
    <>
      <EditCourseModal
        id={id}
        show={editCourse}
        onHide={() => setEditCourse(false)}
      />
      <AssignIns
        id={id}
        show={assignInstructor}
        reload={reload}
        setReload={setReload}
        onHide={() => setassignInstructor(false)}
      />
      <AssignStaff
        id={id}
        show={assignStaff}
        reload={reload}
        setReload={setReload}
        onHide={() => setassignStaff(false)}
      />
      <AssignCC
        id={id}
        show={assignCC}
        reload={reload}
        setReload={setReload}
        onHide={() => setassignCC(false)}
      />
      <UpdateIns
        id={id}
        instructors={instructors}
        show={updateInstructor}
        reload={reload}
        setReload={setReload}
        onHide={() => setupdateInstructorr(false)}
      />
      <UpdateStaff
        id={id}
        instructors={staffs}
        show={updateStaff}
        reload={reload}
        setReload={setReload}
        onHide={() => setupdateStaff(false)}
      />
      <table>
        <tbody>
          <tr>
            <td
              style={{
                padding: '1vw',
                fontSize: '1.25vw',
                color: 'black',
                cursor: 'pointer',
              }}
            >
              {' '}
              <div onClick={() => history.push('/courses')}>
                <img
                  src={back}
                  alt='plus'
                  style={{ width: '2vw', marginRight: '0.5vw' }}
                />
                All courses
              </div>
            </td>
            {type !== 'hr' ? (
              <td
                style={{
                  padding: '1vw',
                  fontSize: '1.25vw',
                  color: 'black',
                  width: type === 'instructor' ? '62vw' : '69vw',
                  textAlign: 'center',
                }}
              >
                Course Coverage: {courseCoverage}
              </td>
            ) : (
              <td style={{ width: '79vw' }}></td>
            )}
            <td>
              {type === 'hr' ? (
                <Button
                  style={{
                    backgroundColor: 'rgba(1, 155, 157, 1)',
                    width: '6vw',
                    fontSize: '0.8vw',
                    padding: '0.3vw',
                  }}
                  onClick={() => setEditCourse(true)}
                >
                  Edit Course
                </Button>
              ) : type === 'hod' ? (
                <div style={{ display: 'flex' }}>
                  <Button
                    style={{
                      backgroundColor: 'rgba(1, 155, 157, 1)',
                      width: '8vw',
                      fontSize: '0.8vw',
                      padding: '0.3vw',
                      marginRight: '1vw',
                    }}
                    onClick={() => setupdateInstructorr(true)}
                  >
                    Update Instructor
                  </Button>
                  <Button
                    style={{
                      backgroundColor: 'rgba(1, 155, 157, 1)',
                      width: '8vw',
                      fontSize: '0.8vw',
                      padding: '0.3vw',
                    }}
                    onClick={() => setassignInstructor(true)}
                  >
                    Assign Instructor
                  </Button>
                </div>
              ) : type === 'instructor' ? (
                <div style={{ display: 'flex' }}>
                  <Button
                    style={{
                      backgroundColor: 'rgba(1, 155, 157, 1)',
                      width: '6vw',
                      fontSize: '0.8vw',
                      padding: '0.3vw',
                      marginRight: '1vw',
                    }}
                    onClick={() => setupdateStaff(true)}
                  >
                    Update Staff
                  </Button>
                  <Button
                    style={{
                      backgroundColor: 'rgba(1, 155, 157, 1)',
                      width: '6vw',
                      fontSize: '0.8vw',
                      padding: '0.3vw',
                      marginRight: '1vw',
                    }}
                    onClick={() => setassignStaff(true)}
                  >
                    Assign Staff
                  </Button>
                  <Button
                    style={{
                      backgroundColor: 'rgba(1, 155, 157, 1)',
                      width: '8vw',
                      fontSize: '0.8vw',
                      padding: '0.3vw',
                    }}
                    onClick={() => setassignCC(true)}
                  >
                    Assign Course Coordinator
                  </Button>
                </div>
              ) : (
                ''
              )}
            </td>
          </tr>
          <tr>
            <td
              colSpan='3'
              className='ProfileTitleS'
              style={{ paddingLeft: '2vw' }}
            >
              Course Staff
            </td>
          </tr>
        </tbody>
      </table>
      <table className='AllProfileCardsTitlesS'>
        <tbody>
          <tr>
            <td className='ProfileTitlesWidthS'>Name</td>
            <td className='ProfileTitlesWidthS' style={{ paddingLeft: '4vw' }}>
              Type
            </td>
            {type === 'hr' ? (
              <td
                className='ProfileTitlesWidthS'
                style={{ paddingLeft: '3.5vw' }}
              >
                Salary
              </td>
            ) : (
              <td
                className='ProfileTitlesWidthS'
                style={{ paddingLeft: '1vw' }}
              >
                Leave Balance
              </td>
            )}
            <td className='ProfileTitlesWidthS' style={{ paddingLeft: '3vw' }}>
              Day Off
            </td>
            <td className='ProfileTitlesWidthS' style={{ paddingLeft: '4vw' }}>
              ID
            </td>
            <td className='ProfileTitlesWidthS' style={{ paddingLeft: '2vw' }}>
              Total Hours
            </td>
          </tr>
        </tbody>
      </table>
      <table className='AllProfileCardsS'>
        <tbody>
          {!profiles || profiles.length === 0 ? (
            <tr>
              <td>
                <NoResults width='80vw' />
              </td>{' '}
            </tr>
          ) : (
            profiles.map((profile) => {
              return (
                <tr>
                  <td>
                    <ProfileCard
                      courseId={id}
                      profile={profile}
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
    </>
  )
}
