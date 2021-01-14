import React, { useState } from 'react'
import { Modal, Button, Form, Col } from 'react-bootstrap'
import axios from 'axios'
import { backendLink } from '../../keys_dev'
import { useSelector } from 'react-redux'
import Alert from '../Layout/Alert'
import { setPasswordStatus } from '../../globalState/actions/AuthActions'
import { useDispatch } from 'react-redux'
// import { useHistory } from 'react-router'

export default function ResetPassModal(props) {
  const token = useSelector((state) => state.token)
  const dispatch = useDispatch()
  // const history = useHistory()
  const [snackMsg, setSnackMsg] = useState('')
  const [showAlert, setShowAlert] = useState(false)
  const [oldPass, setOldPass] = useState({ val: '', err: '' })
  const [newPass, setNewPass] = useState({ val: '', err: '' })

  const handleClose = () => {
    setOldPass({ val: '', err: '' })
    setNewPass({ val: '', err: '' })
    props.onHide()
  }
  const handleDoneButton = () => {
    if (oldPass.val !== newPass.val) {
      axios({
        url: `${backendLink}/staff/resetPassword`,
        method: 'PUT',
        headers: {
          authorization: token,
        },
        data: {
          oldPassword: oldPass.val,
          newPassword: newPass.val,
        },
      })
        .then((res) => {
          if (res.data.statusCode === '000') {
            setSnackMsg('Password changed successfully')
            setShowAlert(true)
            handleClose()
            if (props.default) {
              dispatch(setPasswordStatus('changed'))
            }
          } else if (res.data.statusCode === '003') {
            if (res.data.error.substring(1, 12) === 'oldPassword') {
              setOldPass({ ...newPass, err: res.data.error })
            } else {
              setNewPass({ ...newPass, err: res.data.error })
            }
          } else if (res.data.statusCode === '005') {
            setOldPass({ ...oldPass, err: 'Old password is not correct' })
          }
        })
        .catch((err) => {
          console.log(err)
        })
    } else {
      setNewPass({
        ...newPass,
        err: 'New password is the same as the old password',
      })
    }
  }

  return (
    <>
      <Modal
        show={props.show}
        onHide={props.default ? '' : props.onHide}
        size='lg'
        aria-labelledby='contained-modal-title-vcenter'
        centered
      >
        <Modal.Header
          closeButton={props.default ? false : true}
          onHide={handleClose}
        >
          <Modal.Title
            id='contained-modal-title-vcenter'
            style={{ color: 'rgba(1, 155, 157, 1)' }}
          >
            Reset Password
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form style={{ padding: '1vw' }}>
            <Form.Row style={{ paddingBottom: '1vw' }}>
              <Col>
                <Form.Label>Old Password*</Form.Label>
                <Form.Control
                  type='password'
                  onChange={(e) => {
                    setOldPass({ val: e.target.value + '', err: '' })
                  }}
                  value={oldPass.val}
                />
                {oldPass.err !== '' ? (
                  <Form.Text className='error'>{oldPass.err}</Form.Text>
                ) : (
                  <Form.Text>&nbsp;</Form.Text>
                )}
              </Col>
              <Col>
                <Form.Label>New Password*</Form.Label>
                <Form.Control
                  type='password'
                  onChange={(e) => {
                    setNewPass({ val: e.target.value + '', err: '' })
                  }}
                  value={newPass.val}
                />
                {newPass.err !== '' ? (
                  <Form.Text className='error'>{newPass.err}</Form.Text>
                ) : (
                  <Form.Text>&nbsp;</Form.Text>
                )}
              </Col>
            </Form.Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          {!props.default ? (
            <Button
              onClick={handleClose}
              style={{ backgroundColor: 'rgba(1, 155, 157, 1)' }}
            >
              Close
            </Button>
          ) : (
            ''
          )}
          <Button
            onClick={handleDoneButton}
            style={{ backgroundColor: 'rgba(1, 155, 157, 1)' }}
          >
            Done
          </Button>
        </Modal.Footer>
      </Modal>
      <Alert
        showAlert={showAlert}
        msg={snackMsg}
        severity='success'
        handleClose={() => setShowAlert(false)}
      />
    </>
  )
}
