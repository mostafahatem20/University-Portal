import { Modal, Button } from 'react-bootstrap'
import '../../Stylesheets/Profiles.css'
import React, { useState } from 'react'
import { backendLink } from '../../keys_dev'
import { useSelector } from 'react-redux'
import Alert from '../Layout/Alert'

import axios from 'axios'
export default function DeleteProfileModal(props) {
  const token = useSelector((state) => state.token)
  const [showAlert, setShowAlert] = useState(false)
  const handleDelete = () => {
    axios({
      method: 'delete',
      url: `${backendLink}/course/deleteCourse`,
      headers: {
        authorization: token,
      },
      data: {
        courseId: props.id,
      },
    })
      .then((res) => {
        if (res.data.statusCode === '000') {
          setShowAlert(true)
          props.handleClose()
          props.setReload(!props.reload)
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <>
      <Modal size='lg' show={props.show} centered onHide={props.handleClose}>
        <Modal.Header
          closeButton
          onHide={props.handleClose}
          style={{ borderBottom: '0px' }}
        ></Modal.Header>

        <Modal.Body>
          {' '}
          <p className='DeleteModalTextS'>
            {' '}
            Are you sure you would like to delete this course?
          </p>
        </Modal.Body>
        <Modal.Footer style={{ borderTop: '0px' }}>
          <Button
            onClick={props.handleClose}
            style={{ background: 'rgba(1, 155, 157, 1)' }}
          >
            CANCEL
          </Button>
          <Button
            onClick={handleDelete}
            style={{ background: 'rgba(1, 155, 157, 1)' }}
          >
            YES
          </Button>
        </Modal.Footer>
      </Modal>
      <Alert
        showAlert={showAlert}
        msg='Course Deleted Successfully'
        severity='success'
        handleClose={() => setShowAlert(false)}
      />
    </>
  )
}
