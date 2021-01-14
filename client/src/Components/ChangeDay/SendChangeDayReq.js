import React, { useState, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { backendLink } from '../../keys_dev'
import Alert from '../Layout/Alert'
import '../../Stylesheets/SendReplacementReq.css'
import '../../Stylesheets/ChangeDay.css'
import { Form } from 'react-bootstrap'
export default function SendReplacementReq(props) {
  const token = useSelector((state) => state.token)

  const [dayList] = useState([
    'Saturday',
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
  ])
  const [day, setDay] = useState('Saturday')
  const [reason, setReason] = useState('')
  const [err, setErr] = useState('')
  const [showAlert, setShowAlert] = useState(false)
  const [msg] = useState('Request Sent Successfully')
  const handleCloseAlert = () => {
    setShowAlert(false)
  }

  const sendRequest = () => {
    setErr('')
    if (reason) {
      axios({
        url: `${backendLink}/schedule/requestChangeDayOff`,
        method: 'POST',
        headers: {
          Authorization: token,
        },
        data: {
          dayOff: day.toLocaleLowerCase(),
          reason: reason,
        },
      })
        .then((res) => {
          if (res.data.statusCode === '000') {
            setShowAlert(true)
            props.setShow(false)
            props.setReload(!props.reload)
          } else {
            setErr(res.data.error)
          }
        })
        .catch((err) => {
          console.log(err)
        })
    } else {
      axios({
        url: `${backendLink}/schedule/requestChangeDayOff`,
        method: 'POST',
        headers: {
          Authorization: token,
        },
        data: {
          dayOff: day.toLocaleLowerCase(),
        },
      })
        .then((res) => {
          if (res.data.statusCode === '000') {
            setShowAlert(true)
            props.setShow(false)
            props.setReload(!props.reload)
          } else {
            setErr(res.data.error)
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
  useEffect(() => {
    setDay('Saturday')
    setReason('')
  }, [props.show])
  return (
    <div className="SendReplacementReq">
      <Modal show={props.show} centered size="lg">
        <Modal.Header
          closeButton
          onHide={props.handleClose}
          style={{ borderBottom: '0px' }}
        ></Modal.Header>
        <Modal.Body>
          <table className="SendReplacementReqDatetable">
            <tbody>
              <Form.Group>
                <tr>
                  <td className="SendChangeDayReqCol1">
                    <Form.Label column className="SendReplacementReqGeneral">
                      Day Off:*
                    </Form.Label>
                  </td>
                  <td className="SendReplacementReqCol2">
                    <Form.Control
                      as="select"
                      className="SendReplacementReqForm"
                      onChange={(e) => setDay(e.target.value)}
                    >
                      {dayList.map((day) => {
                        return <option>{day}</option>
                      })}
                    </Form.Control>
                  </td>
                </tr>
                <tr>
                  <td className="SendReplacementReqCol1">
                    <Form.Label column className="SendReplacementReqGeneral">
                      {' '}
                      Reason:
                    </Form.Label>
                  </td>
                  <td className="SendChangeDayReqCol2">
                    <Form.Control
                      as="textarea"
                      rows={3}
                      className="SendChangeDayReqForm"
                      onChange={(e) => setReason(e.target.value)}
                    ></Form.Control>
                  </td>
                </tr>
                <tr>
                  <td colSpan="2" className="SendReplacementReq3">
                    {err ? (
                      <div className="SendReplacementReqError">{err}</div>
                    ) : null}
                  </td>
                </tr>
                <tr>
                  <td colSpan="2">
                    <Button
                      className="SendReplacementReqButton"
                      onClick={sendRequest}
                    >
                      Send{' '}
                    </Button>
                  </td>
                </tr>
              </Form.Group>
            </tbody>
          </table>
        </Modal.Body>
      </Modal>
      <Alert
        showAlert={showAlert}
        severity="success"
        msg={msg}
        handleClose={handleCloseAlert}
      />
    </div>
  )
}
