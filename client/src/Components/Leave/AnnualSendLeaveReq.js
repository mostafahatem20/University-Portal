import React, { useState, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { backendLink } from '../../keys_dev'
import Alert from '../Layout/Alert'
import { ReactDatez, ReduxReactDatez } from 'react-datez'
import 'react-datez/dist/css/react-datez.css'
import '../../Stylesheets/SendReplacementReq.css'
import { Form } from 'react-bootstrap'
export default function AccidentalSendReplacementReq(props) {
  const token = useSelector((state) => state.token)
  const myId = useSelector((state) => state.id)

  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [reason, setReason] = useState('')
  const [req, setReq] = useState([])
  const [replacements, setReplacements] = useState([])
  const [count, setCount] = useState(0)
  const [problem, setProblem] = useState('')
  const [err, setErr] = useState('')

  const [showAlert, setShowAlert] = useState(false)

  const [msg] = useState('Request Sent Successfully')
  const handleCloseAlert = () => {
    setShowAlert(false)
  }

  const setIndex = (e) => {
    var filtered = req
    filtered[e.target.name] = e.target.value
    setReq(filtered)
  }

  const sendRequest = () => {
    setErr('')
    if (!startDate) {
      setErr('Start Target Date field can not be empty')
    }
    if (!endDate) {
      setErr('End Target Date field can not be empty')
    }
    if (startDate && endDate && !reason) {
      axios({
        url: `${backendLink}/leave/sendLeaveRequest`,
        method: 'POST',
        headers: {
          Authorization: token,
        },
        data: {
          replacementRequestId: req,
          targetStartDate: startDate,
          targetEndDate: endDate,
          type: 'annual',
          //documentUrl: 'https://www.facebook.com',
          //reason: 'because',
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
    if (startDate && endDate && reason) {
      axios({
        url: `${backendLink}/leave/sendLeaveRequest`,
        method: 'POST',
        headers: {
          Authorization: token,
        },
        data: {
          replacementRequestId: req,
          targetStartDate: startDate,
          targetEndDate: endDate,
          type: 'annual',
          //documentUrl: 'https://www.facebook.com',
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
    }
  }
  useEffect(() => {
    setStartDate('')
    setEndDate('')
    setReason('')
    setProblem('')
    setErr('')

    axios({
      method: 'get',
      url: `${backendLink}/replacement/viewReplacementRequest`,
      headers: {
        authorization: token,
      },
    })
      .then((res) => {
        if (res.data.statusCode === '000') {
          var filtered = res.data.request.filter(function (one) {
            return one.senderId === myId
          })
          setReplacements(filtered)
        }
      })
      .catch((error) => {
        console.log(error)
      })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.show])
  const CountRequests = []
  for (var i = 0; i < count; i++) {
    CountRequests.push(
      <Form.Control
        as="select"
        className="SendChangeDayReqForm"
        name={i}
        onChange={(e) => setIndex(e)}
      >
        {replacements.map((req) => {
          const today = new Date(req.targetDate)
          const youm = today.getDate()
          const shahr = today.getMonth() + 1
          const sana = today.getYear() + 1900
          return (
            <option value={req._id}>
              To: {req.recieverName}: {req.slot.day}, {req.slot.time} slot on{' '}
              {youm}/{shahr}/{sana}
            </option>
          )
        })}
      </Form.Control>
    )
  }
  const incCount = () => {
    if (replacements.length > 0) {
      var filtered = req
      filtered.push(replacements[0]._id)
      setReq(filtered)
      setCount(count + 1)
    }
  }
  return (
    <div className="SendReplacementReq">
      <Modal show={props.show} centered size="lg" onHide={props.handleClose}>
        <Modal.Header
          closeButton
          style={{ borderBottom: '0px' }}
          className="notRotatedTitle"
        >
          Send Annual Leave Request
        </Modal.Header>
        <Modal.Body>
          <table>
            <tbody>
              <td style={{ paddingBottom: '2vw' }}>
                <div>Replacement Requests</div>
              </td>
              <td style={{ paddingLeft: '2vw', paddingBottom: '2vw' }}>
                <div onClick={incCount}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1.8vw"
                    height="1.8vw"
                    fill="currentColor"
                    class="bi bi-plus-circle"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                  </svg>
                </div>
              </td>
            </tbody>
          </table>

          {CountRequests}
          <table className="SendReplacementReqDatetable">
            <tbody>
              <Form.Group>
                <tr>
                  <td className="SendLeaveReqCol3">
                    <Form.Label
                      column
                      sm="12"
                      className="SendReplacementReqGeneral"
                    >
                      Target Start Date:*
                    </Form.Label>
                  </td>
                  <td className="SendLeaveReqCol3">
                    <Form.Label
                      column
                      sm="12"
                      className="SendReplacementReqGeneral"
                    >
                      Target End Date:*
                    </Form.Label>
                  </td>
                </tr>
                <tr>
                  <td className="SendLeaveReqCol3">
                    <div className="form-group">
                      <div className="form-group">
                        <ReactDatez
                          className="SendLeaveReqDate"
                          name="dateInput"
                          handleChange={(e) => setStartDate(e.split('T')[0])}
                          value={startDate}
                          component={ReduxReactDatez}
                          displayCalendars={1}
                          highlightWeekends={false}
                          allowPast={false}
                          firstDayOfWeek="Sa"
                          position="center"
                        />
                      </div>
                    </div>
                  </td>
                  <td className="SendLeaveReqCol3">
                    <div className="form-group">
                      <div className="form-group">
                        <ReactDatez
                          className="SendLeaveReqDate"
                          name="dateInput"
                          handleChange={(e) => setEndDate(e.split('T')[0])}
                          value={endDate}
                          component={ReduxReactDatez}
                          displayCalendars={1}
                          highlightWeekends={false}
                          allowPast={false}
                          firstDayOfWeek="Sa"
                          position="center"
                        />
                      </div>
                    </div>
                  </td>
                </tr>
              </Form.Group>
            </tbody>
          </table>

          <table>
            <tbody>
              <Form.Group>
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
              </Form.Group>
              <tr>
                <td colSpan="5" className="SendReplacementReq3">
                  {err ? (
                    <div className="SendReplacementReqError">{err}</div>
                  ) : null}
                </td>
              </tr>
              <tr>
                <td colSpan="5">
                  {problem ? (
                    <div className="SendReplacementReqProblem">{problem}</div>
                  ) : (
                    <Button
                      className="SendReplacementReqButton"
                      onClick={sendRequest}
                    >
                      Send{' '}
                    </Button>
                  )}
                </td>
              </tr>
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
