import React, { useState, useEffect } from 'react'
import plus from '../images/plus.png'
import { backendLink } from '../keys_dev'
import { useSelector } from 'react-redux'
import '../Stylesheets/Profiles.css'
import axios from 'axios'
import Location from '../Components/Location/Location'
import assignI from '../images/assign.png'
import AssignS from '../Components/Location/AssignStaff'

import AddLoc from '../Components/Location/AddLocation'
export default function Locations(props) {
  const [show, setShow] = useState()

  const [assign, seta] = useState(false)
  const [reload, setReload] = useState(false)
  const [loc, setLoc] = useState([])
  const token = useSelector((state) => state.token)
  useEffect(() => {
    axios({
      method: 'GET',
      url: `${backendLink}/location/viewLocations`,
      headers: {
        authorization: token,
      },
    })
      .then((res) => {
        if (res.data.statusCode === '000') {
          setLoc(res.data.locations)
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }, [token, reload])
  return (
    <>
      <AddLoc
        add={true}
        show={show}
        onHide={() => setShow(false)}
        reload={reload}
        setReload={setReload}
      />
      {
        <AssignS
          show={assign}
          onHide={() => seta(false)}
          reload={reload}
          setReload={setReload}
          location={loc}
        />
      }

      <table style={{ width: '100%' }}>
        <tbody>
          <tr>
            <td className="ProfileTitleS" style={{ paddingLeft: '2vw' }}>
              Locations
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
                  width: '10.5vw',
                  height: '4vw',
                  padding: '0.3vw',
                  paddingLeft: '0.7vw',
                  marginRight: '1vw',
                  marginTop: '1vw',
                  cursor: 'pointer',
                }}
                onClick={() => setShow(true)}
              >
                Add Location{' '}
                <img src={plus} alt="plus" style={{ width: '2vw' }} />
              </div>
              <div
                style={{
                  //border: '0.5vw solid black',
                  width: '9vw',
                  height: '4vw',
                  padding: '0.3vw',
                  paddingLeft: '0.7vw',
                  marginRight: '4vw',
                  marginTop: '1vw',
                  cursor: 'pointer',
                }}
                onClick={() => seta(true)}
              >
                Asign Office{' '}
                <img src={assignI} alt="plus" style={{ width: '2vw' }} />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <table
        className="AllProfileCardsTitlesS"
        style={{ marginLeft: 'auto', marginRight: 'auto', width: '55vw' }}
      >
        <tbody>
          <tr>
            <td
              style={{ width: '18.5vw', paddingLeft: '3vw', fontSize: '0.9vw' }}
            >
              Name
            </td>
            <td style={{ width: '17vw', fontSize: '0.9vw' }}>ID</td>
            <td style={{ width: '16vw', fontSize: '0.9vw' }}>Type</td>
            <td style={{ width: '10vw', fontSize: '0.9vw' }}>Capacity</td>
          </tr>
        </tbody>
      </table>
      <table className="AllProfileCardsS">
        <tbody>
          {loc.map((location) => {
            return (
              <tr>
                <td>
                  <Location
                    location={location}
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
