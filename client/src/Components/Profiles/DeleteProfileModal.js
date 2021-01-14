import { Modal, Button } from 'react-bootstrap'
import '../../Stylesheets/Profiles.css'
import React from 'react'
import { backendLink } from '../../keys_dev'
import { useSelector } from 'react-redux'
import axios from 'axios'
export default function DeleteProfileModal(props) {
  const token = useSelector((state) => state.token)
  const handleDelete = () => {
    axios({
      method: 'delete',
      url: `${backendLink}/staff/deleteStaff`,
      headers: {
        authorization: token,
      },
      data: {
        staffId: props.id,
      },
    })
      .then((res) => {
        if (res.data.statusCode === '000') {
          props.handleClose()
          props.setReload(!props.reload)
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
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
          Are you sure you would like to delete this staff?
        </p>
      </Modal.Body>
      <Modal.Footer style={{ borderTop: '0px' }}>
        <Button
          style={{ backgroundColor: 'rgba(1, 155, 157, 1)' }}
          onClick={handleDelete}
        >
          YES
        </Button>
        <Button
          style={{ backgroundColor: 'rgba(1, 155, 157, 1)' }}
          onClick={props.handleClose}
        >
          CANCEL
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
