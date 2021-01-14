import React, { useState, useEffect } from 'react'
import { Modal, Button, Form, Col } from 'react-bootstrap'
import axios from 'axios'
import { backendLink } from '../../keys_dev'
import { useSelector } from 'react-redux'
import Alert from '../Layout/Alert'
export default function AddDepartment(props) {
  const token = useSelector((state) => state.token)
  const [showAlert, setShowAlert] = useState(false)
  const [staff, setStaff] = useState({ val: '', err: '' })
  const [staffMem, setS] = useState([])
  var staffId = ''
  const [fac, setFac] = useState({ val: '', err: '' })
  const [facArr, setFacArr] = useState([])
  var facultyId = ''
  const [globaleError, setge] = useState('')
  const [m, setm] = useState('')
  const [updated, setUpdated] = useState(false)
  const [err, setErr] = useState({
    name: '',
    facultyId: '',
    HODId: '',
  })

  const [input, setInput] = useState({
    name: props.add ? '' : props.department.name,
    facultyId: props.add ? '' : props.department.facultyId,
    HODId: props.add ? '' : props.department.HODId,
  })
  useEffect(() => {
    setStaff({ val: '', err: '' })
    setFac({ val: '', err: '' })
    setInput({
      name: props.add ? '' : props.department.name,
      facultyId: props.add ? '' : props.department.facultyId,
      HODId: props.add ? '' : props.department.HODId,
    })
    axios({
      url: `${backendLink}/staff/viewAllProfiles`,
      method: 'GET',
      headers: {
        authorization: token,
      },
    })
      .then((res) => {
        if (!props.add) {
          if (props.department.HODId) {
            const oldsID = res.data.profiles.find(
              (profile) => profile._id === props.department.HODId
            )
            setStaff({ val: oldsID.name, err: '' })
          }
        }
        if (res.data.statusCode === '000') {
          let staff
          staff = res.data.profiles
          setS(staff)
        }
      })
      .catch((err) => {
        console.log(err)
      })

    axios({
      url: `${backendLink}/faculty/viewAllFaculties`,
      method: 'GET',
      headers: {
        authorization: token,
      },
    })
      .then((res) => {
        if (!props.add) {
          if (props.department.facultyId) {
            const oldFac = res.data.allFaculties.find(
              (faculty) => faculty._id === props.department.facultyId
            )
            setFac({ val: oldFac.name, err: '' })
          }
        }

        if (res.data.statusCode === '000') {
          let facul
          facul = res.data.allFaculties
          setFacArr(facul)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }, [props])
  const handleDone = () => {
    if (!input.name) setErr({ ...err, name: 'Department name is required*' })
    if (staff.val !== '') {
      for (let i = 0; i < staffMem.length; i++) {
        if (staffMem[i].name === staff.val) {
          staffId = staffMem[i]._id
          break
        }
      }
    }
    if (fac.val !== '') {
      for (let i = 0; i < facArr.length; i++) {
        if (facArr[i].name === fac.val) {
          facultyId = facArr[i]._id
          break
        }
      }
    }
    if (!props.add) {
      setm('Department Updated Successfully')
      let data
      data = {
        id: props.id,
      }
      if (input.name !== props.department.name) {
        data.name = input.name
      }
      if (staff.val && staffId !== props.department.HODId) {
        data.HODId = staffId
      }
      if (fac.val && facultyId !== props.department.facultyId) {
        data.facultyId = facultyId
      }
      axios({
        url: `${backendLink}/department/updateDepartment`,
        method: 'PUT',
        data,
        headers: {
          authorization: token,
        },
      })
        .then((res) => {
          console.log(res)
          if (res.data.statusCode === '000') {
            setUpdated(true)
            props.setReload(!props.reload)
            setShowAlert(true)
            handleClose()
          } else if (
            res.data.statusCode === '001' ||
            res.data.statusCode === '007' ||
            res.data.statusCode === '022'
          ) {
            setErr({ ...err, name: res.data.error })
          } else if (res.data.statusCode === '029') {
            setge(res.data.error)
          } else if (
            res.data.statusCode === '004' ||
            res.data.statusCode === '003'
          ) {
            setge(res.data.error)
          } else if (res.data.statusCode === '005') {
            setErr({ ...err, HODId: res.data.error })
          }
        })
        .catch((err) => {
          console.log(err)
        })
    } else {
      setm('Depatment Added Successfully')
      let data
      data = {
        name: input.name,
        facultyId: facultyId,
      }
      if (staff.val) {
        data.HODId = staffId
      }
      axios({
        url: `${backendLink}/department/addDepartment`,
        method: 'POST',
        data,
        headers: {
          authorization: token,
        },
      })
        .then((res) => {
          if (res.data.statusCode === '000') {
            props.setReload(!props.reload)
            setShowAlert(true)
            handleClose()
          } else if (
            res.data.statusCode === '001' ||
            res.data.statusCode === '007'
          ) {
            setErr({ ...err, name: res.data.error })
          } else if (res.data.statusCode === '029') {
            setErr({ ...err, name: res.data.error })
          } else if (res.data.statusCode === '022') {
            setErr({ ...err, facultyId: res.data.error })
          } else if (
            res.data.statusCode === '004' ||
            res.data.statusCode === '003'
          ) {
            setge(res.data.error)
          } else if (res.data.statusCode === '005') {
            setge(res.data.error)
          } else if (res.data.statusCode === '029') {
            setge(res.data.error)
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
  const handleClose = () => {
    if (props.add) {
      setStaff({ val: '', err: '' })
      setFac({ val: '', err: '' })
      setInput({
        name: '',
        facultyId: '',
        HODId: '',
      })
    } else if (!updated) {
      setInput({
        name: props.department.name,
        HODId: props.department.HODId,
        facultyId: props.department.facultyId,
      })
      setStaff({ val: '', err: '' })
      setFac({ val: '', err: '' })
    }
    setErr({
      name: '',
      facultyId: '',
      HODId: '',
    })
    setge('')
    setFacArr([])
    setS([])
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
          {props.add ? (
            <Modal.Title id='contained-modal-title-vcenter'>
              Add Department
            </Modal.Title>
          ) : (
            <Modal.Title id='contained-modal-title-vcenter'>
              Update Department
            </Modal.Title>
          )}
        </Modal.Header>
        <Modal.Body>
          <Form style={{ padding: '1vw' }}>
            <Form.Row style={{ paddingBottom: '1vw' }}>
              <Col xs='6'>
                <Form.Label>Department Name*</Form.Label>
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
              <Col xs='5'>
                <Form.Label>Faculty Name*</Form.Label>
                <Form.Control
                  as='select'
                  onChange={(e) => {
                    setFac({ val: e.target.value, err: '' })
                  }}
                  defaultValue='Choose...'
                  value={fac.val}
                >
                  <option hidden>Choose...</option>
                  {facArr.map((f) => {
                    return <option>{f.name}</option>
                  })}{' '}
                </Form.Control>
                {err.facultyId ? (
                  <Form.Text className='error'>{err.facultyId}</Form.Text>
                ) : (
                  <Form.Text>&nbsp;</Form.Text>
                )}
              </Col>
              <Col xs='6'>
                <Form.Label>HOD Name</Form.Label>
                <Form.Control
                  as='select'
                  onChange={(e) => {
                    setStaff({ val: e.target.value, err: '' })
                  }}
                  defaultValue='Choose...'
                  value={staff.val}
                >
                  <option hidden>Choose...</option>
                  {staffMem.map((mem) => {
                    return mem.type === 'hod' ? <option>{mem.name}</option> : ''
                  })}{' '}
                </Form.Control>
                {err.HODId ? (
                  <Form.Text className='error'>{err.HODId}</Form.Text>
                ) : (
                  <Form.Text>&nbsp;</Form.Text>
                )}
              </Col>
            </Form.Row>
            <p className='error'>{globaleError}</p>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={handleClose}
            style={{ background: 'rgba(1, 155, 157, 1)' }}
          >
            Close
          </Button>
          {props.add ? (
            <Button
              onClick={handleDone}
              style={{ background: 'rgba(1, 155, 157, 1)' }}
            >
              Add
            </Button>
          ) : (
            <Button
              onClick={handleDone}
              style={{ background: 'rgba(1, 155, 157, 1)' }}
            >
              Update
            </Button>
          )}
        </Modal.Footer>
      </Modal>
      <Alert
        showAlert={showAlert}
        msg={m}
        severity='success'
        handleClose={() => setShowAlert(false)}
      />
    </>
  )
}
