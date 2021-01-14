import React, { useState, useEffect } from 'react'
import plus from '../images/plus.png'
import { backendLink } from '../keys_dev'
import { useSelector } from 'react-redux'
import '../Stylesheets/Profiles.css'
import axios from 'axios'
import Department from '../Components/Department/Department'

import AddDep from '../Components/Department/AddDepartment'
export default function Departments(props) {
  const [show, setShow] = useState()
  const [reload, setReload] = useState(false)
  const [dep, setDep] = useState([])
  const token = useSelector((state) => state.token)
  useEffect(() => {
    axios({
      method: 'GET',
      url: `${backendLink}/department/viewAllDepartments`,
      headers: {
        authorization: token,
      },
    })
      .then((res) => {
        if (res.data.statusCode === '000') {
          setDep(res.data.allDep)
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }, [token, reload])
  return (
    <>
      <AddDep
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
              Departments
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
                  // border: '0.5vw solid black',
                  width: '12vw',
                  padding: '0.3vw',
                  paddingLeft: '0.7vw',
                  marginRight: '4vw',
                  marginTop: '1vw',
                  cursor: 'pointer',
                }}
                onClick={() => setShow(true)}
              >
                Add Department{' '}
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
          width: '55vw',
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
            <td style={{ width: '16vw', fontSize: '0.9vw' }}>Faculty Name</td>
            <td style={{ width: '10vw', fontSize: '0.9vw' }}>HOD Name</td>
          </tr>
        </tbody>
      </table>
      <table className='AllProfileCardsS'>
        <tbody>
          {dep.map((department) => {
            return (
              <tr>
                <td>
                  <Department
                    department={department}
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
