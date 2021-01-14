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
export default function SendReplacementReq(props) {
  const token = useSelector((state) => state.token)
  const myId = useSelector((state) => state.id)

  const [toList, setToList] = useState([])
  const [slotList, setSlotList] = useState([])
  const [to, setTo] = useState('')
  const [slot, setSlot] = useState('')
  const [date, setDate] = useState('')
  const [problem, setProblem] = useState('')
  const [err, setErr] = useState('')

  const [showAlert, setShowAlert] = useState(false)

  const [msg] = useState('Request Sent Successfully')
  const handleCloseAlert = () => {
    setShowAlert(false)
  }

  const sendRequest = () => {
    setErr('')
    if (!to) {
      setErr('To field can not be empty')
    }
    if (!slot) {
      setErr('Slot field can not be empty')
    }
    if (!date) {
      setErr('Target Date field can not be empty')
    }

    if (to && slot && date) {
      axios({
        url: `${backendLink}/replacement/createReplacementRequest`,
        method: 'POST',
        headers: {
          Authorization: token,
        },
        data: {
          targetDate: new Date(date),
          receiverId: to,
          slotId: slot,
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
    setTo('')
    setToList([])
    setDate('')
    setSlot('')
    setSlotList([])
    axios({
      url: `${backendLink}/slot/viewSchedule`,
      method: 'GET',
      headers: {
        Authorization: token,
      },
      data: {},
    })
      .then((res) => {
        if (res.data.statusCode === '000') {
          setSlotList(res.data.slots)
          if (res.data.slots.length > 0) {
            setSlot(res.data.slots[0]._id)
          } else {
            setProblem('You do not have slots assigned to you')
          }
        }
      })
      .catch((err) => {
        console.log(err)
      })

    axios({
      url: `${backendLink}/staff/viewStaffPerDepartment2`,
      method: 'GET',
      headers: {
        Authorization: token,
      },
      data: {},
    })
      .then((res) => {
        if (res.data.statusCode === '000') {
          var filtered = res.data.staff.filter(function (staffMember) {
            return staffMember._id !== myId
          })
          setToList(filtered)
          if (filtered.length > 0) {
            setTo(filtered[0]._id)
          } else {
            setProblem('There are no staff members in your department')
          }
        }
      })
      .catch((err) => {
        console.log(err)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.show])
  return (
    <div className='SendReplacementReq'>
      <Modal show={props.show} centered size='lg'>
        <Modal.Header
          closeButton
          onHide={props.handleClose}
          style={{ borderBottom: '0px' }}
        ></Modal.Header>
        <Modal.Body>
          <table className='SendReplacementReqDatetable'>
            <tbody>
              <Form.Group>
                <tr>
                  <td className='SendReplacementReqCol1'>
                    <Form.Label
                      column
                      sm='2'
                      className='SendReplacementReqGeneral'
                    >
                      To:*
                    </Form.Label>
                  </td>
                  <td className='SendReplacementReqCol2'>
                    <Form.Control
                      as='select'
                      className='SendReplacementReqForm'
                      onChange={(e) => setTo(e.target.value)}
                    >
                      {toList.map((to) => {
                        return <option value={to._id}>{to.name}</option>
                      })}
                    </Form.Control>
                  </td>
                  <td className='SendReplacementReqCol3'>
                    <Form.Label
                      column
                      sm='12'
                      className='SendReplacementReqGeneral'
                    >
                      Target Date:*
                    </Form.Label>
                  </td>
                  <td className='SendReplacementReqCol2'>
                    <div className='form-group'>
                      <div className='form-group'>
                        <ReactDatez
                          className='SendReplacementReqDate'
                          name='dateInput'
                          handleChange={(e) => setDate(e.split('T')[0])}
                          value={date}
                          component={ReduxReactDatez}
                          displayCalendars={1}
                          highlightWeekends={false}
                          allowPast={false}
                          firstDayOfWeek='Sa'
                          position='center'
                        />
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className='SendReplacementReqCol1'>
                    <Form.Label
                      column
                      sm='2'
                      className='SendReplacementReqGeneral'
                    >
                      {' '}
                      Slot:*
                    </Form.Label>
                  </td>
                  <td className='SendReplacementReqCol2'>
                    <Form.Control
                      as='select'
                      className='SendReplacementReqForm'
                      onChange={(e) => setSlot(e.target.value)}
                    >
                      {slotList.map((slot) => {
                        return (
                          <option value={slot._id}>
                            {slot.courseName}: {slot.day}, {slot.time} slot
                          </option>
                        )
                      })}
                    </Form.Control>
                  </td>
                </tr>
                <tr>
                  <td colSpan='5' className='SendReplacementReq3'>
                    {err ? (
                      <div className='SendReplacementReqError'>{err}</div>
                    ) : null}
                  </td>
                </tr>
                <tr>
                  <td colSpan='5'>
                    {problem ? (
                      <div className='SendReplacementReqProblem'>{problem}</div>
                    ) : (
                      <Button
                        className='SendReplacementReqButton'
                        onClick={sendRequest}
                      >
                        Send{' '}
                      </Button>
                    )}
                  </td>
                </tr>
              </Form.Group>
            </tbody>
          </table>
        </Modal.Body>
      </Modal>
      <Alert
        showAlert={showAlert}
        severity='success'
        msg={msg}
        handleClose={handleCloseAlert}
      />
    </div>
  )
}
