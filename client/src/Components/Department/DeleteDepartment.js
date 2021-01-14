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
      url: `${backendLink}/department/deleteDepartment`,
      headers: {
        authorization: token,
      },
      data: {
        id: props.id,
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
            Are you sure you would like to delete this department?
          </p>
        </Modal.Body>
        <Modal.Footer style={{ borderTop: '0px' }}>
          <Button onClick={props.handleClose}>CANCEL</Button>
          <Button onClick={handleDelete}>YES</Button>
        </Modal.Footer>
      </Modal>
      <Alert
        showAlert={showAlert}
        msg='Department Deleted Successfully'
        severity='success'
        handleClose={() => setShowAlert(false)}
      />
    </>
  )
}
