import React, { useState, useEffect } from 'react'
import { Modal, Button, Form, Col } from 'react-bootstrap'
import axios from 'axios'
import { backendLink } from '../../keys_dev'
import { useSelector } from 'react-redux'
import Alert from '../Layout/Alert'
export default function UpdateStaff(props) {
  const token = useSelector((state) => state.token)
  const [showAlert, setShowAlert] = useState(false)
  const [err, setErr] = useState({
    courseId: '',
    staffId: '',
    newStaffId: '',
  })
  const [input, setInput] = useState({
    courseId: props.id,
    name: '',
    staffId: '',
    newStaffId: '',
  })

  const [staff, setStaff] = useState([])
  useEffect(() => {
    axios({
      url: `${backendLink}/course/coursename`,
      method: 'POST',
      headers: {
        authorization: token,
      },
      data: {
        courseId: props.id,
      },
    })
      .then((res) => {
        if (res.data.statusCode === '000') {
          setInput((prevState) => {
            return {
              ...prevState,
              name: res.data.course,
              courseId: props.id,
            }
          })
        }
      })
      .catch((err) => {
        console.log(err)
      })
    axios({
      url: `${backendLink}/courseStaff/getStaff`,
      method: 'POST',
      headers: {
        authorization: token,
      },
      data: {
        courseId: props.id,
      },
    })
      .then((res) => {
        if (res.data.statusCode === '000') {
          setStaff(res.data.staff)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }, [props.show, token, props.id])
  const handleINS = (e) => {
    setErr((prevState) => {
      return {
        ...prevState,
        staffId: '',
      }
    })
    setInput((prevState) => {
      return {
        ...prevState,
        staffId: e.target.value,
      }
    })
  }
  const handleINSNew = (e) => {
    setErr((prevState) => {
      return {
        ...prevState,
        newStaffId: '',
      }
    })
    setInput((prevState) => {
      return {
        ...prevState,
        newStaffId: e.target.value,
      }
    })
  }
  const handleDone = () => {
    setErr({
      courseId: '',
      staffId: '',
    })
    if (!input.staffId) {
      setErr((prevState) => {
        return {
          ...prevState,
          staffId: 'Old Staff is required*',
        }
      })
    } else if (!input.newStaffId) {
      setErr((prevState) => {
        return {
          ...prevState,
          newStaffId: 'New Staff is required*',
        }
      })
    }
    axios({
      url: `${backendLink}/courseStaff/updateStaff`,
      method: 'PUT',
      data: {
        courseId: props.id,
        staffId: input.staffId,
        newStaffId: input.newStaffId,
      },
      headers: {
        authorization: token,
      },
    })
      .then((res) => {
        if (res.data.statusCode === '000') {
          props.setReload(!props.reload)
          setShowAlert(true)
          handleClose()
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleClose = () => {
    setInput({
      courseId: '',
      staffId: '',
    })
    setErr({
      courseId: '',
      staffId: '',
    })
    setStaff([])
    props.onHide()
  }
  return (
    <>
      <Modal
        show={props.show}
        onHide={handleClose}
        size='lg'
        aria-labelledby='contained-modal-title-vcenter'
        centered
      >
        <Modal.Header closeButton onHide={handleClose}>
          <Modal.Title id='contained-modal-title-vcenter'>
            Update Staff
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form style={{ padding: '1vw' }}>
            <Form.Row style={{ paddingBottom: '1vw' }}>
              <Col>
                <Form.Label>Course Name*</Form.Label>
                <Form.Control type='text' value={input.name} readOnly />
                {err.courseId ? (
                  <Form.Text className='error'>{err.courseId}</Form.Text>
                ) : (
                  <Form.Text>&nbsp;</Form.Text>
                )}
              </Col>
              <Col>
                <Form.Label>Old Staff*</Form.Label>
                <Form.Control
                  as='select'
                  onChange={handleINS}
                  defaultValue='Choose...'
                >
                  <option hidden>Choose...</option>
                  {props.instructors &&
                    props.instructors.map((staff) => {
                      return <option value={staff._id}>{staff.name}</option>
                    })}{' '}
                </Form.Control>
                {err.staffId ? (
                  <Form.Text className='error'>{err.staffId}</Form.Text>
                ) : (
                  <Form.Text>&nbsp;</Form.Text>
                )}
              </Col>
            </Form.Row>
            <Form.Row style={{ paddingBottom: '1vw' }}>
              <Col>
                <Form.Label>New Staff*</Form.Label>
                <Form.Control
                  as='select'
                  onChange={handleINSNew}
                  defaultValue='Choose...'
                >
                  <option hidden>Choose...</option>
                  {staff.map((staff) => {
                    return <option value={staff._id}>{staff.name}</option>
                  })}{' '}
                </Form.Control>
                {err.newStaffId ? (
                  <Form.Text className='error'>{err.newStaffId}</Form.Text>
                ) : (
                  <Form.Text>&nbsp;</Form.Text>
                )}
              </Col>
            </Form.Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={handleClose}
            style={{ background: 'rgba(1, 155, 157, 1)' }}
          >
            Close
          </Button>
          <Button
            onClick={handleDone}
            style={{ background: 'rgba(1, 155, 157, 1)' }}
          >
            Update
          </Button>
        </Modal.Footer>
      </Modal>
      <Alert
        showAlert={showAlert}
        msg='Instructor Updated Successfully'
        severity='success'
        handleClose={() => setShowAlert(false)}
      />
    </>
  )
}
