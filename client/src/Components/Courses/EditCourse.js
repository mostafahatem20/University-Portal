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
    name: '',
    department: '',
    slots: '',
    CC: '',
  })
  const [input, setInput] = useState({
    name: '',
    department: '',
    slots: '',
    CC: '',
  })
  const [select, setSelect] = useState({
    department: '',
    CC: '',
  })
  const [department, setDepartment] = useState([])
  const [staff, setStaff] = useState([])
  useEffect(() => {
    axios({
      url: `${backendLink}/department/getDepartments`,
      method: 'POST',
      headers: {
        authorization: token,
      },
    })
      .then((res) => {
        if (res.data.statusCode === '000') {
          setDepartment(res.data.departments)
        }
      })
      .catch((err) => {
        console.log(err)
      })

    axios({
      url: `${backendLink}/course/viewCourse`,
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
          setInput({
            department: res.data.course.department
              ? res.data.course.department._id
              : '',
            CC: res.data.course.coordinator
              ? res.data.course.coordinator._id
              : '',
            name: res.data.course.name,
            slots: res.data.course.numberOfSlots,
          })
          setSelect({
            department: res.data.course.department
              ? res.data.course.department.name
              : '',
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
  const handleDepartment = (e) => {
    setErr({ ...err, department: '' })

    setSelect({ ...select, department: e.target.value })
    const one = department.find((one) => one.name === e.target.value)
    setInput({ ...input, department: one._id })
    axios({
      url: `${backendLink}/department/getTAsinDepartment`,
      method: 'POST',
      data: {
        id: one._id,
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
  }
  const handleStaff = (e) => {
    setErr({ ...err, CC: '' })
    setSelect({ ...select, CC: e.target.value })
    const one = staff.find((one) => one.name === e.target.value)
    setInput({ ...input, CC: one._id })
  }
  const handleDone = () => {
    if (!input.department)
      setErr({ ...err, department: 'Department is required*' })
    else if (!input.name) setErr({ ...err, name: 'Name is required*' })
    else if (!input.slots)
      setErr({ ...err, slots: 'Number of slots is required*' })
    let data
    if (!input.CC)
      data = {
        courseId: props.id,
        course: {
          departmentId: input.department,
          name: input.name,
          numberOfSlots: input.slots,
        },
      }
    else
      data = {
        courseId: props.id,
        course: {
          departmentId: input.department,
          name: input.name,
          numberOfSlots: input.slots,
          courseCoordinatorId: input.CC,
        },
      }
    axios({
      url: `${backendLink}/course/updateCourse`,
      method: 'PUT',
      data,
      headers: {
        authorization: token,
      },
    })
      .then((res) => {
        if (res.data.statusCode === '000') {
          setShowAlert(true)
          handleClose()
        } else if (
          res.data.statusCode === '001' ||
          res.data.statusCode === '007'
        ) {
          setErr({ ...err, CC: res.data.error })
        } else if (res.data.statusCode === '115') {
          setErr({ ...err, CC: res.data.error })
        } else if (res.data.statusCode === '029') {
          setErr({ ...err, name: res.data.error })
        } else if (res.data.statusCode === '022') {
          setErr({ ...err, department: res.data.error })
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }
  const handleClose = () => {
    setInput({
      name: '',
      department: '',
      slots: '',
      CC: '',
    })
    setErr({
      name: '',
      department: '',
      slots: '',
      CC: '',
    })
    setSelect({
      department: '',
      CC: '',
    })
    setDepartment([])
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
            Edit Course
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form style={{ padding: '1vw' }}>
            <Form.Row style={{ paddingBottom: '1vw' }}>
              <Col>
                <Form.Label>Course Name</Form.Label>
                <Form.Control
                  type='text'
                  onChange={(e) => {
                    setInput({ ...input, name: e.target.value })
                    setErr({ ...err, name: '' })
                  }}
                  value={input.name}
                />
                {err.name ? (
                  <Form.Text className='error'>{err.name}</Form.Text>
                ) : (
                  <Form.Text>&nbsp;</Form.Text>
                )}
              </Col>
              <Col>
                <Form.Label>Number of Slots</Form.Label>
                <Form.Control
                  type='text'
                  onChange={(e) => {
                    setInput({ ...input, slots: e.target.value })
                    setErr({ ...err, slots: '' })
                  }}
                  value={input.slots}
                />
                {err.slots ? (
                  <Form.Text className='error'>{err.slots}</Form.Text>
                ) : (
                  <Form.Text>&nbsp;</Form.Text>
                )}
              </Col>
            </Form.Row>
            <Form.Row>
              <Col>
                <Form.Label>Department</Form.Label>
                <Form.Control
                  as='select'
                  onChange={handleDepartment}
                  defaultValue='Choose...'
                  value={select.department}
                >
                  <option hidden>Choose...</option>
                  {department.map((depart) => {
                    return <option>{depart.name}</option>
                  })}{' '}
                </Form.Control>
                {err.department ? (
                  <Form.Text className='error'>{err.department}</Form.Text>
                ) : (
                  <Form.Text>&nbsp;</Form.Text>
                )}
              </Col>
              <Col>
                <Form.Label>Course Coordinator</Form.Label>
                <Form.Control
                  as='select'
                  onChange={handleStaff}
                  value={select.CC}
                >
                  <option hidden>Choose department first...</option>
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
            Edit
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
