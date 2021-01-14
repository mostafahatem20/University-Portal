import React, { useState, useEffect } from 'react'
import plus from '../images/plus.png'
import { backendLink } from '../keys_dev'
import { useSelector } from 'react-redux'
import '../Stylesheets/Profiles.css'
import axios from 'axios'
import Faculty from '../Components/Faculties/Faculty'

import AddFaculty from '../Components/Faculties/AddFaculty'
export default function Faculties(props) {
  const [show, setShow] = useState()
  const [reload, setReload] = useState(false)
  const [faculties, setFaculties] = useState([])
  const token = useSelector((state) => state.token)
  useEffect(() => {
    axios({
      method: 'GET',
      url: `${backendLink}/faculty/viewAllFaculties`,
      headers: {
        authorization: token,
      },
    })
      .then((res) => {
        if (res.data.statusCode === '000') {
          setFaculties(res.data.allFaculties)
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }, [token, reload])
  return (
    <>
      <AddFaculty
        add={true}
        show={show}
        onHide={() => setShow(false)}
        reload={reload}
        setReload={setReload}
      />
      <table style={{ width: '100%' }}>
        <tbody>
          <tr>
            <td className='ProfileTitleS' style={{ paddingLeft: '2vw' }}>
              Faculties
            </td>
            <td
              style={{
                fontSize: '1vw',
                color: 'black',
                display: 'flex',
                justifyContent: 'flex-end',
              }}
            >
              <div
                style={{
                  //border: '0.5vw solid black',
                  width: '10vw',
                  padding: '0.3vw',
                  paddingLeft: '0.7vw',
                  marginRight: '4vw',
                  marginTop: '1vw',
                  cursor: 'pointer',
                }}
                onClick={() => setShow(true)}
              >
                Add Faculty{' '}
                <img src={plus} alt='plus' style={{ width: '2vw' }} />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <table
        className='AllProfileCardsTitlesS'
        style={{
          marginLeft: 'auto',
          marginRight: 'auto',
          width: '45vw',
          textAlign: 'left',
        }}
      >
        <tbody>
          <tr>
            <td
              style={{ width: '18.5vw', paddingLeft: '3vw', fontSize: '0.9vw' }}
            >
              Name
            </td>
            <td style={{ width: '17vw', fontSize: '0.9vw' }}>ID</td>
            <td style={{ width: '16vw', fontSize: '0.9vw' }}>
              Number of Students
            </td>
            <td style={{ width: '10vw', fontSize: '0.9vw' }}>Building</td>
          </tr>
        </tbody>
      </table>
      <table className='AllProfileCardsS'>
        <tbody>
          {faculties.map((faculty) => {
            return (
              <tr>
                <td>
                  <Faculty
                    faculty={faculty}
                    reload={reload}
                    setReload={setReload}
                  />
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}
