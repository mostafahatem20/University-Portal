import React, { useState, useEffect } from 'react'

import { backendLink } from '../keys_dev'
import { useSelector } from 'react-redux'
import { Button } from 'react-bootstrap'
// import Snackbar from '@material-ui/core/Snackbar'
// import { useHistory } from 'react-router'
// import { checkTokenExpired } from '../globalState/actions/AuthActions'
import '../Stylesheets/Profiles.css'
import axios from 'axios'
import ProfileCard from '../Components/Profiles/ProfileCard'
import AddStaff from '../Components/Profiles/AddStaffModal'
import backButton from '../images/back.png'
import { useHistory } from 'react-router'
export default function ProfilesList() {
  const history = useHistory()
  const [profiles, setProfiles] = useState([])
  const [reload, setReload] = useState(false)
  const [addStaff, setAddStaff] = useState(false)
  const [missing, setMissing] = useState(false)
  //   const [error, setError] = useState('')
  //const dispatch = useDispatch()
  const token = useSelector((state) => state.token)
  const type = useSelector((state) => state.type)

  const handleCloseAddStaff = () => {
    setAddStaff(false)
  }
  useEffect(() => {
    if (!missing) {
      axios({
        method: 'get',
        url: `${backendLink}/staff/viewAllProfiles`,
        headers: {
          authorization: token,
        },
      })
        .then((res) => {
          if (res.data.statusCode === '000') {
            setProfiles(res.data.profiles)
          }
        })
        .catch((error) => {
          console.log(error)
        })
    } else {
      axios({
        method: 'get',
        url: `${backendLink}/staff/viewMembersMissing`,
        headers: {
          authorization: token,
        },
      })
        .then((res) => {
          if (res.data.statusCode === '000') {
            setProfiles(
              res.data.staffWithMissingDays.concat(
                res.data.staffWithMissingHours
              )
            )
          }
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }, [missing, token, reload])
  return (
    <>
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
          history.push('/myProfile')
        }}
      ></img>
      <table>
        <tbody>
          <tr>
            <td style={{ width: '50vw', paddingLeft: '1vw' }}>
              <p className='ProfileTitleS'>Profiles</p>
            </td>
            {type === 'hr' ? (
              <td style={{ width: '20vw' }}>
                <div className='AddStaffButtonS'>
                  <Button
                    style={{
                      backgroundColor: 'rgba(1, 155, 157, 1)',
                      width: '15vw',
                      fontSize: '1vw',
                      padding: '0.3vw',
                    }}
                    onClick={() => {
                      setMissing(!missing)
                    }}
                  >
                    {' '}
                    View Members With Missing Days/Hours
                  </Button>
                </div>
              </td>
            ) : (
              ''
            )}
            {type === 'hr' ? (
              <td style={{ width: '20vw' }}>
                <div className='AddStaffButtonS'>
                  <Button
                    style={{
                      backgroundColor: 'rgba(1, 155, 157, 1)',
                      width: '7vw',
                      fontSize: '1vw',
                      padding: '0.5vw',
                    }}
                    onClick={() => {
                      setAddStaff(true)
                    }}
                  >
                    {' '}
                    ADD STAFF
                  </Button>
                </div>
              </td>
            ) : (
              ''
            )}
          </tr>
        </tbody>
      </table>
      {!missing ? (
        <div>
          <table className='AllProfileCardsTitlesS'>
            <tbody>
              <tr>
                <td className='ProfileTitlesWidthS'>Name</td>
                <td
                  className='ProfileTitlesWidthS'
                  style={{ paddingLeft: '4vw' }}
                >
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

                <td
                  className='ProfileTitlesWidthS'
                  style={{ paddingLeft: '3vw' }}
                >
                  Day Off
                </td>
                <td
                  className='ProfileTitlesWidthS'
                  style={{ paddingLeft: '4vw' }}
                >
                  ID
                </td>
                <td
                  className='ProfileTitlesWidthS'
                  style={{ paddingLeft: '2vw' }}
                >
                  Total Hours
                </td>
              </tr>
            </tbody>
          </table>
          <div>
            <table className='AllProfileCardsS'>
              <tbody>
                {profiles.map((profile) => {
                  return (
                    <tr>
                      <td>
                        <ProfileCard
                          profile={profile}
                          reload={reload}
                          setReload={setReload}
                        />
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div>
          <p className='ProfileTitleS' style={{ fontSize: '2vw' }}>
            These are the members with missing days or hours:
          </p>
          <table className='AllProfileCardsTitlesS'>
            <tbody>
              <tr>
                <td className='ProfileTitlesWidthS'>Name</td>
                <td
                  className='ProfileTitlesWidthS'
                  style={{ paddingLeft: '4vw' }}
                >
                  Type
                </td>
                <td
                  className='ProfileTitlesWidthS'
                  style={{ paddingLeft: '3.5vw' }}
                >
                  Salary
                </td>
                <td
                  className='ProfileTitlesWidthS'
                  style={{ paddingLeft: '3vw' }}
                >
                  Day Off
                </td>
                <td
                  className='ProfileTitlesWidthS'
                  style={{ paddingLeft: '4vw' }}
                >
                  ID
                </td>
                <td
                  className='ProfileTitlesWidthS'
                  style={{ paddingLeft: '2vw' }}
                >
                  Total Hours
                </td>
              </tr>
            </tbody>
          </table>
          <div>
            <table className='AllProfileCardsS'>
              <tbody>
                {profiles.map((profile) => {
                  return (
                    <tr>
                      <td>
                        <ProfileCard
                          profile={profile}
                          reload={reload}
                          setReload={setReload}
                        />
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
      <AddStaff
        show={addStaff}
        onHide={handleCloseAddStaff}
        add={true}
        reload={reload}
        setReload={setReload}
      />
    </>
  )
}
