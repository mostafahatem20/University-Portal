import React, { useEffect, useState } from 'react'
import { Modal, Button, Form, Col } from 'react-bootstrap'
import axios from 'axios'
import { backendLink } from '../../keys_dev'
import { useSelector } from 'react-redux'
import Alert from '../Layout/Alert'
export default function AddFaculty(props) {
  const token = useSelector((state) => state.token)
  const [showAlert, setShowAlert] = useState(false)
  const [globaleError, setge] = useState('')
  const [updated, setUpdated] = useState(false)
  const [m, setM] = useState('')
  const [err, setErr] = useState({
    name: '',
    numberOfStudents: '',
    building: '',
  })
  const [input, setInput] = useState({
    name: props.add ? '' : props.faculty.name,
    numberOfStudents: props.add ? '' : props.faculty.numberOfStudents,
    building: props.add ? '' : props.faculty.building,
  })
  useEffect(() => {
    setInput({
      name: props.add ? '' : props.faculty.name,
      numberOfStudents: props.add ? '' : props.faculty.numberOfStudents,
      building: props.add ? '' : props.faculty.building,
    })
  }, [props])
  const handleDone = () => {
    if (!input.name) setErr({ ...err, name: 'Faculty name is required*' })

    if (!props.add) {
      setM('Faculty Updated Successfully')
      let data
      data = {
        id: props.id,
        name: input.name,
      }
      if (input.numberOfStudents !== '') {
        data.numberOfStudents = input.numberOfStudents
      }
      if (input.building !== '') {
        data.building = input.building
      }
      axios({
        url: `${backendLink}/faculty/updateFaculty`,
        method: 'PUT',
        data,
        headers: {
          authorization: token,
        },
      })
        .then((res) => {
          if (res.data.statusCode === '000') {
            setUpdated(true)
            props.setReload(!props.reload)
            setShowAlert(true)
            handleClose()
          } else if (
            res.data.statusCode === '001' ||
            res.data.statusCode === '007'
          ) {
            setErr({ ...err, name: res.data.error })
          } else if (res.data.statusCode === '015') {
            setErr({ ...err, name: res.data.error })
          } else if (res.data.statusCode === '029') {
            setErr({ ...err, name: res.data.error })
          } else if (res.data.statusCode === '003') {
            setge(res.data.error)
          }
        })
        .catch((err) => {
          console.log(err)
        })
    } else {
      setM('Faculty Added Successfully')
      let data
      data = {
        name: input.name,
      }
      if (input.numberOfStudents !== '') {
        data.numberOfStudents = input.numberOfStudents
      }
      if (input.building !== '') {
        data.building = input.building
      }
      axios({
        url: `${backendLink}/faculty/addFaculty`,
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
          } else if (res.data.statusCode === '015') {
            setErr({ ...err, name: res.data.error })
          } else if (res.data.statusCode === '029') {
            setErr({ ...err, name: res.data.error })
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
  const handleClose = () => {
    if (props.add) {
      setInput({
        name: '',
        numberOfStudents: '',
        building: '',
      })
    } else if (!updated) {
      setInput({
        name: props.faculty.name,
        numberOfStudents: props.faculty.numberOfStudents,
        building: props.faculty.building,
      })
    }
    setErr({
      name: '',
      numberOfStudents: '',
      building: '',
    })
    setge('')
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
              Add Faculty
            </Modal.Title>
          ) : (
            <Modal.Title id='contained-modal-title-vcenter'>
              Update Faculty
            </Modal.Title>
          )}
        </Modal.Header>
        <Modal.Body>
          <Form style={{ padding: '1vw' }}>
            <Form.Row style={{ paddingBottom: '1vw' }}>
              <Col xs='6'>
                <Form.Label>Faculty Name*</Form.Label>
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
                <Form.Label>Number of Students*</Form.Label>
                <Form.Control
                  type='text'
                  onChange={(e) => {
                    setInput({ ...input, numberOfStudents: e.target.value })
                    setErr({ ...err, numberOfStudents: '' })
                  }}
                  value={input.numberOfStudents}
                />
                {err.numberOfStudents ? (
                  <Form.Text className='error'>
                    {err.numberOfStudents}
                  </Form.Text>
                ) : (
                  <Form.Text>&nbsp;</Form.Text>
                )}
              </Col>
              <Col xs='6'>
                <Form.Label>Building*</Form.Label>
                <Form.Control
                  type='text'
                  onChange={(e) => {
                    setInput({ ...input, building: e.target.value })
                    setErr({ ...err, building: '' })
                  }}
                  value={input.building}
                />
                {err.building ? (
                  <Form.Text className='error'>{err.building}</Form.Text>
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
