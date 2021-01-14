import React, { useState, useEffect } from 'react'
import { backendLink } from '../keys_dev'
import { useSelector } from 'react-redux'
import { Button } from 'react-bootstrap'
import '../Stylesheets/Profiles.css'
import axios from 'axios'
import AddStaff from '../Components/Profiles/AddStaffModal'
import Alert from '../Components/Layout/Alert'
import { useHistory } from 'react-router-dom'
import ManualSignin from '../Components/Profiles/ManualSigninoutModal'
import OlderSalaries from '../Components/Profiles/OlderSalariesModal'
import backButton from '../images/back.png'
export default function StaffProfile() {
  const history = useHistory()
  const [showAlert, setShowAlert] = useState(false)
  const [snackMsg, setSnackMsg] = useState('')
  //const [reload, setReload] = useState(false)
  const [addStaff, setAddStaff] = useState(false)
  const token = useSelector((state) => state.token)
  const type = useSelector((state) => state.type)
  const id = useSelector((state) => state.id)
  const [manualSignin, setManualSignin] = useState(false)
  const [manualSignout, setManualSignout] = useState(false)
  const [olderSalaries, setOlderSalaries] = useState(false)
  const handleCloseAddStaff = () => {
    setAddStaff(false)
  }
  const handleCloseSignin = () => {
    setManualSignin(false)
  }

  const handleCloseSignout = () => {
    setManualSignout(false)
  }
  const handleOlderSalaries = () => {
    setOlderSalaries(false)
  }
  const [profile, setProfile] = useState(history.location.state)

  const [deptName, setDeptName] = useState('')
  const [locName, setLocName] = useState('')
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
    }
    fetchData()
  }, [profile, token])
  const handleEditButton = () => {
    setAddStaff(true)
  }
  const resetPasswordHR = async () => {
    if (type === 'hr' && profile._id !== id) {
      await axios({
        url: `${backendLink}/staff/resetPasswordHR`,
        method: 'PUT',
        headers: {
          authorization: token,
        },
        data: { staffId: profile._id },
      })
        .then((res) => {
          if (res.data.statusCode === '000') {
            setSnackMsg('Password reset to default')
            setShowAlert(true)
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }
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
          history.push('/profiles')
        }}
      ></img>
      {type === 'hr' ? (
        <table>
          <tbody>
            <tr>
              <td style={{ width: '40vw', paddingLeft: '1vw' }}>
                <p className='ProfileTitleS'>Profile</p>
              </td>
              <td style={{ width: '13vw' }}>
                <Button
                  onClick={() => {
                    setManualSignin(true)
                  }}
                  style={{
                    backgroundColor: 'rgba(1, 155, 157, 1)',
                  }}
                >
                  Manual Sign In
                </Button>
              </td>
              <td style={{ width: '13vw' }}>
                <Button
                  onClick={() => {
                    setManualSignout(true)
                  }}
                  style={{
                    backgroundColor: 'rgba(1, 155, 157, 1)',
                  }}
                >
                  Manual Sign Out
                </Button>
              </td>
              <td style={{ width: '13vw' }}>
                <Button
                  onClick={resetPasswordHR}
                  style={{
                    backgroundColor: 'rgba(1, 155, 157, 1)',
                  }}
                >
                  Reset Password
                </Button>
              </td>
              <td style={{ width: '13vw' }}>
                <Button
                  onClick={() => {
                    setOlderSalaries(true)
                  }}
                  style={{
                    backgroundColor: 'rgba(1, 155, 157, 1)',
                  }}
                >
                  Older Salaries
                </Button>
              </td>
              <td>
                <Button
                  onClick={handleEditButton}
                  style={{
                    backgroundColor: 'rgba(1, 155, 157, 1)',
                  }}
                >
                  Edit
                </Button>
              </td>
            </tr>
          </tbody>
        </table>
      ) : (
        ''
      )}
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
              {type === 'hr' ? (
                <td>
                  <table>
                    <tbody>
                      <tr>
                        <td className='ProfileDetailedTitlesS'>Salary:</td>
                        <td className='ProfileDetailedTextS'>
                          {profile.salary}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              ) : (
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
              )}

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
            {type === 'hr' ? (
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
              </tr>
            ) : (
              ''
            )}
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
      />
      <Alert
        showAlert={showAlert}
        msg={snackMsg}
        severity='success'
        handleClose={() => setShowAlert(false)}
      />
      <ManualSignin
        in={true}
        show={manualSignin}
        onHide={handleCloseSignin}
        staffId={profile._id}
      />
      <ManualSignin
        in={false}
        show={manualSignout}
        onHide={handleCloseSignout}
        staffId={profile._id}
      />
      <OlderSalaries
        show={olderSalaries}
        onHide={handleOlderSalaries}
        staffId={profile._id}
      />
    </div>
  )
}
