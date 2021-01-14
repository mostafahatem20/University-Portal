import React, { useState, useEffect } from 'react'

import { backendLink } from '../keys_dev'
import { useSelector } from 'react-redux'
import '../Stylesheets/Profiles.css'
import axios from 'axios'

import Notifications from '../Components/Notifications/Notification'

export default function Notification(props) {
  const [reload, setReload] = useState(false)
  const [noti, setNoti] = useState([])
  const token = useSelector((state) => state.token)

  useEffect(() => {
    axios({
      url: `${backendLink}/notification/viewNotifications`,
      method: 'GET',
      headers: {
        authorization: token,
      },
    })
      .then((res) => {
        if (res.data.statusCode === '000') {
          setNoti(res.data.notifications)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  })
  return (
    <>
      <table style={{ width: '100%' }}>
        <tbody>
          <tr>
            <td className='ProfileTitleS' style={{ paddingLeft: '2vw' }}>
              Notifications
            </td>
            <td
              style={{
                fontSize: '1vw',
                color: 'black',
                display: 'flex',
                justifyContent: 'flex-end',
              }}
            ></td>
          </tr>
        </tbody>
      </table>
      <table
        className='AllProfileCardsTitlesS'
        style={{ marginLeft: 'auto', marginRight: 'auto', width: '80vw' }}
      >
        <tbody>
          <tr>
            <td
              style={{ width: '18.5vw', paddingLeft: '7vw', fontSize: '0.9vw' }}
            >
              ID
            </td>
            <td style={{ width: '17vw', fontSize: '0.9vw' }}>Type</td>
            <td style={{ width: '16vw', fontSize: '0.9vw' }}>Description</td>
          </tr>
        </tbody>
      </table>
      <table className='AllProfileCardsS'>
        <tbody>
          {noti.map((notification) => {
            return (
              <tr>
                <td>
                  <Notifications
                    notification={notification}
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
