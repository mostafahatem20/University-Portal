import React, { useState, useEffect } from 'react'
import Card from 'react-bootstrap/Card'
import '../../Stylesheets/Profiles.css'
import { Image } from 'react-bootstrap'
import DeleteIcon from '../../images/delete.png'
import DeleteModal from './DeleteNotification'
import { backendLink } from '../../keys_dev'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import axios from 'axios'

export default function Notification(props) {
  const token = useSelector((state) => state.token)
  const history = useHistory()
  const [c, setc] = useState('')

  const Notification = props.notification
  const [whichPath, sethwPath] = useState('')
  const [showDelete, setShowDelete] = useState(false)

  const handleCloseDelete = () => {
    setShowDelete(false)
  }

  const setSeen = () => {
    axios({
      url: `${backendLink}/notification/setNotificationSeen`,
      method: 'PUT',
      data: { notificationId: Notification._id },
      headers: {
        authorization: token,
      },
    })
      .then((res) => {
        if (res.data.statusCode === '000') {
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }
  useEffect(() => {
    if (Notification.seen === true) {
      setc('rgba(1,155,157,1)')
    }

    if (Notification.type === 'replacement') {
      sethwPath('/replacement')
    } else if (Notification.type === 'leave') {
      sethwPath('/leave')
    } else if (Notification.type === 'linking') {
      sethwPath('/Linking')
    } else if (Notification.type === 'changeDay') {
      sethwPath('/ChangeDay')
    }
  }, [token, Notification])
  return (
    <div>
      <table>
        <tbody>
          <tr>
            <td>
              <Card
                className='ProfileCardJ'
                style={{
                  width: '80vw',
                  marginLeft: '6.5vw',
                  cursor: 'pointer',
                  borderWidth: '0.2vw',
                  borderColor: c,
                }}
                onClick={() => {
                  history.push(whichPath)
                  setSeen()
                }}
              >
                <table className='TextInsideProfileCardS'>
                  <tbody>
                    <tr>
                      <td
                        style={{
                          width: '18.5vw',
                          fontSize: '0.7vw',
                          fontWeight: 'bold',
                        }}
                      >
                        {Notification && Notification._id}
                      </td>
                      <td
                        style={{
                          width: '23vw',
                        }}
                      >
                        {Notification && Notification.type}
                      </td>
                      <td
                        style={{
                          width: '27vw',
                          fontSize: '0.7vw',
                          fontWeight: 'bold',
                        }}
                      >
                        {Notification && Notification.description}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </Card>
            </td>
            {
              <td>
                {' '}
                <Image
                  src={DeleteIcon}
                  alt=''
                  className='DeleteIconJ'
                  onClick={() => setShowDelete(true)}
                ></Image>
              </td>
              /* <td>
              {' '}
              <Image
                src={EditIcon}
                alt=""
                className="EditIconJ"
                onClick={() => setShowEdit(true)}
              ></Image>
            </td> */
            }
          </tr>
        </tbody>
      </table>
      {
        <DeleteModal
          show={showDelete}
          handleClose={handleCloseDelete}
          reload={props.reload}
          setReload={props.setReload}
          id={Notification._id}
        />
      }
    </div>
  )
}
