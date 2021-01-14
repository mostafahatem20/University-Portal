import React, { useState, useEffect } from 'react'
import { Modal, Button, Form, Col } from 'react-bootstrap'
import axios from 'axios'
import { backendLink } from '../../keys_dev'
import { useSelector } from 'react-redux'
import Alert from '../Layout/Alert'

export default function ResetPassModal(props) {
  const token = useSelector((state) => state.token)
  const [snackMsg, setSnackMsg] = useState('')
  const [showAlert, setShowAlert] = useState(false)

  const [date, setDate] = useState({ day: '', month: '', year: '', err: '' })
  const [time, setTime] = useState({ val: '', err: '' })
  const [attendanceString, setAttendanceString] = useState({})
  const [attendanceArray, setAttendanceArray] = useState([])
  const [attendanceId, setAttendanceId] = useState('')
  const [attendanceErr, setAttendanceErr] = useState('')

  const days = []
  for (let i = 1; i < 32; i++) {
    days.push(i)
  }
  const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  let years = [new Date().getFullYear() - 1, new Date().getFullYear()]

  const handleClose = () => {
    setDate({ day: '', month: '', year: '', err: '' })
    setTime({ val: '', err: '' })
    setAttendanceString('')
    setAttendanceErr('')
    props.onHide()
  }
  const handleDoneButton = () => {
    const sentData = {
      staffId: props.staffId,
      date: new Date(date.year + '-' + date.month + '-' + date.day),
      time: time.val,
    }

    if (attendanceId) sentData.attendenceId = attendanceId
    if (props.in) {
      axios({
        url: `${backendLink}/attendence/manualSignIn`,
        method: 'POST',
        headers: {
          authorization: token,
        },
        data: sentData,
      })
        .then((res) => {
          if (res.data.statusCode === '000') {
            setSnackMsg('Manual sign in successful')
            setShowAlert(true)
            handleClose()
          } else if (res.data.statusCode === '003') {
            let x = res.data.error.split('"')
            switch (x[1]) {
              case 'date':
                setDate({ ...date, err: res.data.error })
                break
              case 'time':
                setTime({ ...time, err: res.data.error })
                break
              default:
                break
            }
          } else if (res.data.statusCode === '016') {
            setDate({ ...date, err: res.data.error })
          }
        })
        .catch((err) => {
          console.log(err)
        })
    } else {
      axios({
        url: `${backendLink}/attendence/manualSignOut`,
        method: 'POST',
        headers: {
          authorization: token,
        },
        data: sentData,
      })
        .then((res) => {
          if (res.data.statusCode === '000') {
            setSnackMsg('Manual sign out successful')
            setShowAlert(true)
            handleClose()
          } else if (res.data.statusCode === '003') {
            let x = res.data.error.split('"')
            switch (x[1]) {
              case 'date':
                setDate({ ...date, err: res.data.error })
                break
              case 'time':
                setTime({ ...time, err: res.data.error })
                break
              case 'attendenceId':
                setAttendanceErr(res.data.error)
                break
              default:
                break
            }
          } else if (res.data.statusCode === '016') {
            setDate({ ...date, err: res.data.error })
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  useEffect(() => {
    async function fetchData() {
      if (props.in) {
        axios({
          url: `${backendLink}/attendence/viewAllAttendanceWithoutSignIn`,
          method: 'POST',
          headers: {
            authorization: token,
          },
          data: {
            staffId: props.staffId,
          },
        })
          .then((res) => {
            if (res.data.statusCode === '000') {
              let arr = res.data.returnData
              let x = []
              for (let i = 0; i < arr.length; i++) {
                x.push({
                  date: 'Sign Out: ' + new Date(arr[i].signOut),
                  id: arr[i]._id,
                })
                setAttendanceArray(x)
              }
            }
          })
          .catch((err) => {
            console.log(err)
          })
      } else {
        axios({
          url: `${backendLink}/attendence/viewAllAttendanceWithoutSignOut`,
          method: 'POST',
          headers: {
            authorization: token,
          },
          data: {
            staffId: props.staffId,
          },
        })
          .then((res) => {
            if (res.data.statusCode === '000') {
              let arr = res.data.returnData
              let x = []
              for (let i = 0; i < arr.length; i++) {
                x.push({
                  date: 'Sign In: ' + new Date(arr[i].signIn),
                  id: arr[i]._id,
                })
                setAttendanceArray(x)
              }
            }
          })
          .catch((err) => {
            console.log(err)
          })
      }
    }
    fetchData()
  }, [props.staffId, props.show, props.in, token])

  return (
    <>
      <Modal
        show={props.show}
        onHide={props.onHide}
        size='lg'
        aria-labelledby='contained-modal-title-vcenter'
        centered
      >
        <Modal.Header closeButton onHide={handleClose}>
          {props.in ? (
            <Modal.Title
              id='contained-modal-title-vcenter'
              style={{ color: 'rgba(1, 155, 157, 1)' }}
            >
              Manual Sign In
            </Modal.Title>
          ) : (
            <Modal.Title
              id='contained-modal-title-vcenter'
              style={{ color: 'rgba(1, 155, 157, 1)' }}
            >
              Manual Sign Out
            </Modal.Title>
          )}
        </Modal.Header>
        <Modal.Body>
          <Form style={{ padding: '1vw' }}>
            <Form.Row style={{ paddingBottom: '1vw' }}>
              <Col>
                <table>
                  <tbody>
                    <tr>
                      <td>
                        {' '}
                        <Form.Label>Date*</Form.Label>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ paddingRight: '1vw' }}>
                        <Form.Control
                          as='select'
                          value={date.day}
                          onChange={(e) => {
                            setDate({ ...date, day: e.target.value, err: '' })
                          }}
                        >
                          <option hidden>Day</option>
                          {days.map((day) => {
                            return <option>{day}</option>
                          })}{' '}
                        </Form.Control>
                      </td>
                      <td style={{ paddingRight: '1vw' }}>
                        <Form.Control
                          as='select'
                          value={date.month}
                          onChange={(e) => {
                            setDate({ ...date, month: e.target.value, err: '' })
                          }}
                        >
                          <option hidden>Month</option>
                          {months.map((month) => {
                            return <option>{month}</option>
                          })}{' '}
                        </Form.Control>
                      </td>
                      <td style={{ paddingRight: '1vw' }}>
                        <Form.Control
                          as='select'
                          value={date.year}
                          onChange={(e) => {
                            setDate({ ...date, year: e.target.value, err: '' })
                          }}
                        >
                          <option hidden>Year</option>
                          {years.map((year) => {
                            return <option>{year}</option>
                          })}{' '}
                        </Form.Control>
                      </td>
                    </tr>
                  </tbody>
                </table>
                {date.err !== '' ? (
                  <Form.Text className='error'>{date.err}</Form.Text>
                ) : (
                  <Form.Text>&nbsp;</Form.Text>
                )}
              </Col>
              <Col>
                <Form.Label>Time*</Form.Label>
                <Form.Control
                  type='text'
                  onChange={(e) => {
                    setTime({ val: e.target.value + '', err: '' })
                  }}
                  value={time.val}
                />
                {time.err !== '' ? (
                  <Form.Text className='error'>{time.err}</Form.Text>
                ) : (
                  <Form.Text>&nbsp;</Form.Text>
                )}
              </Col>
            </Form.Row>
            <Form.Row>
              <Form.Label>Attendance</Form.Label>
              <Form.Control
                as='select'
                value={attendanceString}
                onChange={(e) => {
                  setAttendanceString(e.target.value)
                  const selectedIndex = e.target.options.selectedIndex
                  const myId = e.target.options[selectedIndex].getAttribute(
                    'id'
                  )
                  setAttendanceId(myId)
                }}
              >
                <option>Attendance</option>
                {attendanceArray.map((att) => {
                  return (
                    <option value={att.date} id={att.id}>
                      {att.date}
                    </option>
                  )
                })}{' '}
              </Form.Control>
              {attendanceErr !== '' ? (
                <Form.Text className='error'>{attendanceErr}</Form.Text>
              ) : (
                <Form.Text>&nbsp;</Form.Text>
              )}
            </Form.Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={handleClose}
            style={{ backgroundColor: 'rgba(1, 155, 157, 1)' }}
          >
            Close
          </Button>
          <Button
            onClick={handleDoneButton}
            style={{ backgroundColor: 'rgba(1, 155, 157, 1)' }}
          >
            Done
          </Button>
        </Modal.Footer>
      </Modal>
      <Alert
        showAlert={showAlert}
        msg={snackMsg}
        severity='success'
        handleClose={() => setShowAlert(false)}
      />
    </>
  )
}
