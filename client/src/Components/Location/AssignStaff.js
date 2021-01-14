import React, { useState, useEffect } from 'react'
import { Modal, Button, Form, Col } from 'react-bootstrap'
import axios from 'axios'
import { backendLink } from '../../keys_dev'
import { useSelector } from 'react-redux'
import Alert from '../Layout/Alert'
export default function AssignStaff(props) {
  const [staff, setStaff] = useState({ val: '', err: '' })
  const [loc, setLoc] = useState({ val: '', err: '' })
  var staffId = ''
  var locationId = ''
  const [staffMem, setS] = useState([])
  const [locArr, setLA] = useState([])
  const token = useSelector((state) => state.token)
  const [showAlert, setShowAlert] = useState(false)
  const [globaleError, setge] = useState('')
  const [updated, setUpdated] = useState(false)
  const [err, setErr] = useState({
    staffId: '',
    locationId: '',
  })

  const [input, setInput] = useState({
    staffId: '',
    locationId: '',
  })
  useEffect(() => {
    setLA(props.location)
    axios({
      url: `${backendLink}/staff/viewAllProfiles`,
      method: 'GET',
      headers: {
        authorization: token,
      },
    })
      .then((res) => {
        if (res.data.statusCode === '000') {
          let staff
          staff = res.data.profiles
          setS(staff)
        }
      })
      .catch((err) => {})
  }, [token, props])

  const handleDone = () => {
    if (staff.val !== '') {
      for (let i = 0; i < staffMem.length; i++) {
        if (staffMem[i].name === staff.val) {
          staffId = staffMem[i]._id
          break
        }
      }
    }

    if (loc.val !== '') {
      for (let i = 0; i < props.location.length; i++) {
        if (props.location[i].name === loc.val) {
          locationId = props.location[i]._id
          break
        }
      }
    }

    //numberOfStudents: input.numberOfStudents,
    //building: input.building,
    let data
    data = {
      staffId: staffId,
      locationId: locationId,
    }
    axios({
      url: `${backendLink}/location/assignOffice`,
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
          setge(res.data.error)
        } else if (res.data.statusCode === '026') {
          setge(res.data.error)
        } else if (res.data.statusCode === '027') {
          setErr({ ...err, locationId: res.data.error })
        } else if (res.data.statusCode === '012') {
          setErr({ ...err, locationId: res.data.error })
        } else if (res.data.statusCode === '022') {
          if (res.data.error.includes('location')) {
            setErr({ ...err, locationId: res.data.error })
          } else {
            setErr({ ...err, staffId: res.data.error })
          }
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }
  const handleClose = () => {
    if (props.add) {
      setInput({
        staffId: '',
        locationId: '',
      })
    } else if (!updated) {
      setInput({
        staffId: '',
        locationId: '',
      })
    }
    setErr({
      staffId: '',
      locationId: '',
    })
    setge('')
    setLA([])
    setS([])
    setLoc('')
    setStaff('')
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
            Assign Office
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form style={{ padding: '1vw' }}>
            <Form.Row style={{ paddingBottom: '1vw' }}>
              <Col xs='6'>
                <Form.Label>Location ID*</Form.Label>
                <Form.Control
                  as='select'
                  onChange={(e) => {
                    setLoc({ val: e.target.value, err: '' })
                  }}
                  defaultValue='Choose...'
                  value={loc.val}
                >
                  <option hidden>Choose...</option>
                  {locArr.map((loco) => {
                    return loco.type == 'office' ? (
                      <option>{loco.name}</option>
                    ) : (
                      ''
                    )
                  })}{' '}
                </Form.Control>
                {err.locationId ? (
                  <Form.Text className='error'>{err.locationId}</Form.Text>
                ) : (
                  <Form.Text>&nbsp;</Form.Text>
                )}
              </Col>
              <Col xs='6'>
                <Form.Label>Staff Member*</Form.Label>
                <Form.Control
                  as='select'
                  onChange={(e) => {
                    setStaff({ val: e.target.value, err: '' })
                  }}
                  defaultValue='Choose...'
                  value={staff.val}
                >
                  <option hidden>Choose</option>
                  {staffMem.map((mem) => {
                    return <option>{mem.name}</option>
                  })}{' '}
                </Form.Control>
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
        msg={'Staff Assigned successfully'}
        severity='success'
        handleClose={() => setShowAlert(false)}
      />
    </>
  )
}
