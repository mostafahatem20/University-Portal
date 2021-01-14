import React, { useState, useEffect } from 'react'
import { Modal, Button, Form, Col } from 'react-bootstrap'
import axios from 'axios'
import { backendLink } from '../../keys_dev'
import { useSelector } from 'react-redux'
import Alert from '../Layout/Alert'
export default function AddLocation(props) {
  const token = useSelector((state) => state.token)
  const [showAlert, setShowAlert] = useState(false)
  const [m, setm] = useState('')
  const [globaleError, setge] = useState('')
  const [updated, setUpdated] = useState(false)
  const [err, setErr] = useState({
    name: '',
    type: '',
    capacity: '',
  })

  const [input, setInput] = useState({
    name: props.add ? '' : props.location.name,
    type: props.add ? '' : props.location.type,
    capacity: props.add ? '' : props.location.capacity,
  })

  useEffect(() => {
    setInput({
      name: props.add ? '' : props.location.name,
      type: props.add ? '' : props.location.type,
      capacity: props.add ? '' : props.location.capacity,
    })
  }, [props])

  const handleDone = () => {
    setge('')
    if (!input.name) setErr({ ...err, name: 'Location name is required*' })

    //numberOfStudents: input.numberOfStudents,
    //building: input.building,

    if (!props.add) {
      setm('Location Updated Successfully')
      let data
      data = {
        locationId: props.id,
        location: {},
      }
      if (input.name !== '' && input.name !== props.location.name) {
        data.location.name = input.name
      }
      if (input.type !== '' && input.type !== props.location.type) {
        data.location.type = input.type
      }
      if (input.capacity !== props.location.capacity) {
        data.location.capacity = input.capacity
      }
      axios({
        url: `${backendLink}/location/updateLocation`,
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
            res.data.statusCode === '007'
          ) {
            setErr({ ...err, name: res.data.error })
          } else if (res.data.statusCode === '029') {
            setErr({ ...err, name: res.data.error })
          } else if (res.data.statusCode === '004') {
            setge(res.data.error)
          } else if (res.data.statusCode === '005') {
            setge(res.data.error)
          }
        })
        .catch((err) => {
          console.log(err)
        })
    } else {
      setm('Location Added Successfully')
      let data
      data = {
        location: {
          name: input.name,
          type: input.type,
        },
      }
      if (input.capacity !== '') {
        data.location.capacity = input.capacity
      }
      axios({
        url: `${backendLink}/location/addLocation`,
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
          } else if (res.data.statusCode === '004') {
            setge(res.data.error)
          } else if (res.data.statusCode === '005') {
            setge(res.data.error)
          } else if (res.data.statusCode === '003') {
            setge(res.data.error)
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
  const handleClose = () => {
    setErr({
      name: '',
      type: '',
      capacity: '',
    })
    setge('')
    props.onHide()
    setInput({
      name: props.add ? '' : props.location.name,
      type: props.add ? '' : props.location.type,
      capacity: props.add ? '' : props.location.capacity,
    })
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
              Add Location
            </Modal.Title>
          ) : (
            <Modal.Title id='contained-modal-title-vcenter'>
              Update Location
            </Modal.Title>
          )}
        </Modal.Header>
        <Modal.Body>
          <Form style={{ padding: '1vw' }}>
            <Form.Row style={{ paddingBottom: '1vw' }}>
              <Col xs='6'>
                <Form.Label>Location Name*</Form.Label>
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
                <Form.Label>Type*</Form.Label>
                <Form.Control
                  type='text'
                  onChange={(e) => {
                    setInput({ ...input, type: e.target.value })
                    setErr({ ...err, type: '' })
                  }}
                  value={input.type}
                />
                {err.type ? (
                  <Form.Text className='error'>{err.type}</Form.Text>
                ) : (
                  <Form.Text>&nbsp;</Form.Text>
                )}
              </Col>
              <Col xs='6'>
                <Form.Label>Capacity*</Form.Label>
                <Form.Control
                  type='text'
                  onChange={(e) => {
                    setInput({ ...input, capacity: e.target.value })
                    setErr({ ...err, capacity: '' })
                  }}
                  value={input.capacity}
                />
                {err.capacity ? (
                  <Form.Text className='error'>{err.capacity}</Form.Text>
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
