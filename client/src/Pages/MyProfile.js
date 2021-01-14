import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router'
import { backendLink } from '../keys_dev'
import { useSelector } from 'react-redux'
import { Button } from 'react-bootstrap'
import '../Stylesheets/Profiles.css'
import axios from 'axios'
import AddStaff from '../Components/Profiles/AddStaffModal'
import Alert from '../Components/Layout/Alert'
import ResetModal from '../Components/Profiles/ResetPassModal'
import backButton from '../images/back.png'
export default function StaffProfile() {
  const history = useHistory()
  const [showAlert, setShowAlert] = useState(false)
  const [snackMsg, setSnackMsg] = useState('')
  const [reload, setReload] = useState(false)
  const [addStaff, setAddStaff] = useState(false)
  const token = useSelector((state) => state.token)
  const type = useSelector((state) => state.type)
  const id = useSelector((state) => state.id)

  const [salarySoFar, setSalarySoFar] = useState('')
  const [showResetModal, setShowResetModal] = useState(false)

  const handleCloseAddStaff = () => {
    setAddStaff(false)
  }
  const handleCLoseReset = () => {
    setShowResetModal(false)
  }

  const [profile, setProfile] = useState({})
  useEffect(() => {
    async function fetchData2() {
      await axios({
        url: `${backendLink}/staff/viewMyProfile`,
        method: 'GET',
        headers: {
          authorization: token,
        },
      })
        .then((res) => {
          if (res.data.statusCode === '000') {
            setProfile(res.data.profile)
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }
    fetchData2()
  }, [id, token, reload])
  const [deptName, setDeptName] = useState('')
  const [locName, setLocName] = useState('')

  const [diffHrs, setDiffHrs] = useState('')
  const diffHrsSplit = diffHrs.split(' ')
  const diffHrsPrint =
    diffHrsSplit[0] +
    ' ' +
    diffHrsSplit[1] +
    ' ' +
    parseFloat(diffHrsSplit[2]).toFixed(2)
  useEffect(() => {
    async function fetchData() {
      await axios({
        url: `${backendLink}/department/getDepartments`,
        method: 'POST',
        headers: {
          authorization: token,
        },
      })
        .then((res) => {
          if (res.data.statusCode === '000') {
            let dept = ['None']
            dept = dept.concat(res.data.departments)
            if (profile.department) {
              for (let i = 0; i < dept.length; i++) {
                if (dept[i]._id === profile.department) {
                  setDeptName(dept[i].name)
                  break
                }
              }
            }
          }
        })
        .catch((err) => {
          console.log(err)
        })
      await axios({
        url: `${backendLink}/location/getLocations`,
        method: 'GET',
        headers: {
          authorization: token,
        },
      })
        .then((res) => {
          if (res.data.statusCode === '000') {
            for (let i = 0; i < res.data.locations.length; i++) {
              if (res.data.locations[i]._id === profile.officeLocation) {
                setLocName(res.data.locations[i].name)
                break
              }
            }
          }
        })
        .catch((err) => {
          console.log(err)
        })
      await axios({
        url: `${backendLink}/staff/checkSalarySoFar`,
        method: 'GET',
        headers: {
          authorization: token,
        },
        data: profile._id,
      })
        .then((res) => {
          if (res.data.statusCode === '000') {
            setSalarySoFar(res.data.salarySoFar)
          }
        })
        .catch((err) => {
          console.log(err)
        })
      await axios({
        url: `${backendLink}/staff/viewDifferenceHours`,
        method: 'GET',
        headers: {
          authorization: token,
        },
      })
        .then((res) => {
          if (res.data.statusCode === '000') {
            setDiffHrs(res.data.hours)
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }
    fetchData()
  }, [profile, token, reload])
  const signIn = async () => {
    await axios({
      url: `${backendLink}/attendence/signIn`,
      method: 'POST',
      headers: {
        authorization: token,
      },
    })
      .then((res) => {
        if (res.data.statusCode === '000') {
          setSnackMsg('Signed in successfully')
          setShowAlert(true)
          setReload(!reload)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }
  const signOut = async () => {
    await axios({
      url: `${backendLink}/attendence/signOut`,
      method: 'POST',
      headers: {
        authorization: token,
      },
    })
      .then((res) => {
        if (res.data.statusCode === '000') {
          setSnackMsg('Signed out successfully')
          setShowAlert(true)
          setReload(!reload)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }
  const handleEditButton = () => {
    setAddStaff(true)
  }
  const resetPassword = () => {
    setShowResetModal(true)
  }
  return (
    <div style={{ overflowX: 'hidden' }}>
      <img
        src={backButton}
        alt=''
        style={{
          width: '2vw',
          marginTop: '1vw',
          cursor: 'pointer',
          marginLeft: '1vw',
        }}
        onClick={() => {
          history.push('/')
        }}
      ></img>
      <table>
        <tbody>
          <tr>
            <td style={{ width: '40vw', paddingLeft: '1vw' }}>
              <p className='ProfileTitleS'>Profile</p>
            </td>
            <td style={{ width: '10vw' }}>
              <Button
                onClick={signIn}
                style={{
                  backgroundColor: 'rgba(1, 155, 157, 1)',
                  width: '6vw',
                  fontSize: '1vw',
                  padding: '0.3vw',
                }}
              >
                Sign In
              </Button>
            </td>
            <td style={{ width: '10vw' }}>
              <Button
                onClick={signOut}
                style={{
                  backgroundColor: 'rgba(1, 155, 157, 1)',
                  width: '6vw',
                  fontSize: '1vw',
                  padding: '0.3vw',
                }}
              >
                Sign Out
              </Button>
            </td>
            <td style={{ width: '10vw' }}>
              <Button
                onClick={resetPassword}
                style={{
                  backgroundColor: 'rgba(1, 155, 157, 1)',
                  width: '9vw',
                  fontSize: '1vw',
                  padding: '0.3vw',
                }}
              >
                Reset Password
              </Button>
            </td>
            {type === 'hr' || type === 'instructor' || type === 'hod' ? (
              <td style={{ width: '10vw' }}>
                <Button
                  onClick={() => {
                    history.push('/profiles')
                  }}
                  style={{
                    backgroundColor: 'rgba(1, 155, 157, 1)',
                    width: '10vw',
                    fontSize: '1vw',
                    padding: '0.3vw',
                  }}
                >
                  View All Profiles
                </Button>
              </td>
            ) : (
              ''
            )}

            <td>
              <Button
                onClick={handleEditButton}
                style={{
                  backgroundColor: 'rgba(1, 155, 157, 1)',
                  marginLeft: '1vw',
                  width: '3vw',
                  fontSize: '1vw',
                  padding: '0.3vw',
                }}
              >
                Edit
              </Button>
            </td>
          </tr>
        </tbody>
      </table>
      <table>
        <tbody>
          <tr>
            <td style={{ width: '5vw' }}>
              <p
                className='ProfileTitleS'
                style={{ fontSize: '1.6vw', width: '5vw' }}
              >
                ID:
              </p>
            </td>
            <td className='ProfileDetailedTextS'>{profile.id}</td>
          </tr>
        </tbody>
      </table>
      <div>
        <table className='ProfileDetailedTableS'>
          <tbody>
            <tr className='ProfileDetailedRowS'>
              <td>
                <table>
                  <tbody>
                    <tr>
                      <td className='ProfileDetailedTitlesS'>Name:</td>
                      <td className='ProfileDetailedTextS'>{profile.name}</td>
                    </tr>
                  </tbody>
                </table>
              </td>
              <td>
                <table>
                  <tbody>
                    <tr>
                      <td className='ProfileDetailedTitlesS'>Email:</td>
                      <td className='ProfileDetailedTextS'>{profile.email}</td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            <tr className='ProfileDetailedRowS'>
              <td>
                <table>
                  <tbody>
                    <tr>
                      <td className='ProfileDetailedTitlesS'>Type:</td>
                      <td className='ProfileDetailedTextS'>{profile.type}</td>
                    </tr>
                  </tbody>
                </table>
              </td>
              <td>
                <table>
                  <tbody>
                    <tr>
                      <td className='ProfileDetailedTitlesS'>Department:</td>
                      <td className='ProfileDetailedTextS'>{deptName}</td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            <tr className='ProfileDetailedRowS'>
              <td>
                <table>
                  <tbody>
                    <tr>
                      <td className='ProfileDetailedTitlesS'>Salary:</td>
                      <td className='ProfileDetailedTextS'>{profile.salary}</td>
                    </tr>
                  </tbody>
                </table>
              </td>
              <td>
                <table>
                  <tbody>
                    <tr>
                      <td className='ProfileDetailedTitlesS'>Day Off:</td>
                      <td className='ProfileDetailedTextS'>{profile.dayOff}</td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            <tr className='ProfileDetailedRowS'>
              <td>
                <table>
                  <tbody>
                    <tr>
                      <td className='ProfileDetailedTitlesS'>Total Hours:</td>
                      <td className='ProfileDetailedTextS'>
                        {parseFloat(profile.totalHrs).toFixed(2)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
              <td>
                <table>
                  <tbody>
                    <tr>
                      <td className='ProfileDetailedTitlesS'>Missing Days:</td>
                      <td className='ProfileDetailedTextS'>
                        {profile.missingDays}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            <tr className='ProfileDetailedRowS'>
              <td>
                <table>
                  <tbody>
                    <tr>
                      <td className='ProfileDetailedTitlesS'>Leave Balance:</td>
                      <td className='ProfileDetailedTextS'>
                        {profile.leaveBalance}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
              <td>
                <table>
                  <tbody>
                    <tr>
                      <td className='ProfileDetailedTitlesS'>
                        Accidental Balance:
                      </td>
                      <td className='ProfileDetailedTextS'>
                        {profile.accidentalBalance}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            <tr className='ProfileDetailedRowS'>
              <td>
                <table>
                  <tbody>
                    <tr>
                      <td className='ProfileDetailedTitlesS'>
                        Compensated Days:
                      </td>
                      <td className='ProfileDetailedTextS'>
                        {profile.compensatedDays}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
              <td>
                <table>
                  <tbody>
                    <tr>
                      <td className='ProfileDetailedTitlesS'>Gender:</td>
                      <td className='ProfileDetailedTextS'>{profile.gender}</td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            <tr className='ProfileDetailedRowS'>
              <td>
                <table>
                  <tbody>
                    <tr>
                      <td className='ProfileDetailedTitlesS'>
                        Office Location:
                      </td>
                      <td className='ProfileDetailedTextS'>{locName}</td>
                    </tr>
                  </tbody>
                </table>
              </td>
              <td>
                <table>
                  <tbody>
                    <tr>
                      <td className='ProfileDetailedTitlesS'>Salary So Far:</td>
                      <td className='ProfileDetailedTextS'>
                        {parseFloat(salarySoFar).toFixed(2)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            <tr className='ProfileDetailedRowS'>
              <td>
                <table>
                  <tbody>
                    <tr>
                      <td className='ProfileDetailedTitlesS'>
                        Difference Hours:
                      </td>
                      {diffHrs ? (
                        <td className='ProfileDetailedTextS'>
                          {diffHrsPrint && diffHrsPrint}
                        </td>
                      ) : (
                        ''
                      )}
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <AddStaff
        show={addStaff}
        onHide={handleCloseAddStaff}
        add={false}
        profile={profile}
        setProfile={setProfile}
        deptName={deptName}
        locName={locName}
        fromMine={true}
      />
      <Alert
        showAlert={showAlert}
        msg={snackMsg}
        severity='success'
        handleClose={() => setShowAlert(false)}
      />
      <ResetModal show={showResetModal} onHide={handleCLoseReset} />
    </div>
  )
}
