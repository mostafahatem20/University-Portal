import { Modal, Button } from 'react-bootstrap'
import '../../Stylesheets/Profiles.css'
import React, { useState, useEffect } from 'react'
import { backendLink } from '../../keys_dev'
import { useSelector } from 'react-redux'
import { Form } from 'react-bootstrap'

import axios from 'axios'
export default function RejectRequestModal(props) {
  const [err, setErr] = useState('')
  const [message, setMessage] = useState('')

  const token = useSelector((state) => state.token)
  useEffect(() => {
    setErr('')
  }, [props.show])
  const handleCancel = () => {
    if (message) {
      axios({
        method: 'put',
        url: `${backendLink}/schedule/rejectChangeDayOff`,
        headers: {
          authorization: token,
        },
        data: {
          id: props.id,
          message: message,
        },
      })
        .then((res) => {
          setErr('')
          if (res.data.statusCode === '000') {
            props.handleClose()
            props.setReload(!props.reload)
          } else {
            setErr(res.data.error)
          }
        })
        .catch((error) => {
          console.log(error)
        })
    } else {
      axios({
        method: 'put',
        url: `${backendLink}/schedule/rejectChangeDayOff`,
        headers: {
          authorization: token,
        },
        data: {
          id: props.id,
        },
      })
        .then((res) => {
          setErr('')
          if (res.data.statusCode === '000') {
            props.handleClose()
            props.setReload(!props.reload)
          } else {
            setErr(res.data.error)
          }
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }

  return (
    <Modal size="lg" show={props.show} centered onHide={props.handleClose}>
      <Modal.Header
        closeButton
        onHide={props.handleClose}
        style={{ borderBottom: '0px' }}
      ></Modal.Header>

      <Modal.Body>
        {' '}
        <p className="DeleteModalTextS">
          {' '}
          Are you sure you would like to reject this request?
        </p>
        <table>
          <tbody>
            <tr>
              <td className="SendReplacementReqCol1 CancelMessage CancelRow1">
                <Form.Label column> Reason:</Form.Label>
              </td>
              <td className="SendChangeDayReqCol2 CancelRow2">
                <Form.Control
                  as="textarea"
                  rows={3}
                  className="SendChangeDayReqForm"
                  onChange={(e) => setMessage(e.target.value)}
                ></Form.Control>
              </td>
            </tr>
          </tbody>
        </table>
        <p className="SendReplacementReqError" style={{ marginRight: '2vw' }}>
          {err}
        </p>
      </Modal.Body>
      <Modal.Footer style={{ borderTop: '0px' }}>
        <Button
          style={{ backgroundColor: 'rgba(1, 155, 157, 1)' }}
          onClick={handleCancel}
        >
          YES
        </Button>
        <Button
          style={{
            backgroundColor: 'rgba(1, 155, 157, 1)',
            marginRight: '2vw',
          }}
          onClick={props.handleClose}
        >
          CANCEL
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
