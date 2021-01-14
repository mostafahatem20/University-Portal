import React, { useState, useEffect } from 'react'
import { Modal, Button, Form, Col } from 'react-bootstrap'
import axios from 'axios'
import { backendLink } from '../../keys_dev'
import { useSelector } from 'react-redux'
import Alert from '../Layout/Alert'
export default function EditCourse(props) {
  const token = useSelector((state) => state.token)
  const [showAlert, setShowAlert] = useState(false)
  const [err, setErr] = useState({
    CC: '',
    courseId: '',
  })
  const [input, setInput] = useState({
    CC: '',
    courseId: props.id,
    name: '',
  })
  const [select, setSelect] = useState({
    CC: '',
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
      url: `${backendLink}/course/viewCourseINS`,
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
          axios({
            url: `${backendLink}/department/getTAsinDepartment`,
            method: 'POST',
            data: {
              id: res.data.course.department._id,
            },
            headers: {
              authorization: token,
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
          setInput((prevState) => {
            return {
              ...prevState,
              CC: res.data.course.coordinator
                ? res.data.course.coordinator._id
                : '',
            }
          })
          setSelect({
            CC: res.data.course.coordinator
              ? res.data.course.coordinator.name
              : '',
          })
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }, [props.show, token, props.id])

  const handleStaff = (e) => {
    setErr({ ...err, CC: '' })
    setSelect({ ...select, CC: e.target.value })
    const one = staff.find((one) => one.name === e.target.value)
    setInput({ ...input, CC: one._id })
  }
  const handleDone = () => {
    setErr({
      courseId: '',
      CC: '',
    })
    if (!input.CC) {
      setErr((prevState) => {
        return {
          ...prevState,
          staffId: 'Course Coordinator is required*',
        }
      })
    }
    axios({
      url: `${backendLink}/course/updateCourseINS`,
      method: 'PUT',
      data: {
        courseId: props.id,
        course: {
          courseCoordinatorId: input.CC,
        },
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
      CC: '',
      courseId: '',
      name: '',
    })
    setErr({
      CC: '',
      courseId: '',
    })
    setSelect({
      CC: '',
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
            Assign Course Coordinator
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form style={{ padding: '1vw' }}>
            <Form.Row>
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
                <Form.Label>Course Coordinator*</Form.Label>
                <Form.Control
                  as='select'
                  onChange={handleStaff}
                  value={select.CC}
                >
                  <option hidden>Choose...</option>
                  {staff.map((one) => {
                    return <option>{one.name}</option>
                  })}
                </Form.Control>
                {err.CC ? (
                  <Form.Text className='error'>{err.CC}</Form.Text>
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
            Assign
          </Button>
        </Modal.Footer>
      </Modal>
      <Alert
        showAlert={showAlert}
        msg='Course Updated Successfully'
        severity='success'
        handleClose={() => setShowAlert(false)}
      />
    </>
  )
}
