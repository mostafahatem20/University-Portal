import { Modal, Button } from 'react-bootstrap'
import '../../Stylesheets/Profiles.css'
import React, { useState, useEffect } from 'react'
import { backendLink } from '../../keys_dev'
import { useSelector } from 'react-redux'
import axios from 'axios'
export default function AcceptRequestModal(props) {
  const [err, setErr] = useState('')
  const token = useSelector((state) => state.token)

  useEffect(() => {
    setErr('')
  }, [props.show])
  const handleCancel = () => {
    axios({
      method: 'put',
      url: `${backendLink}/schedule/acceptChangeDayOff`,
      headers: {
        authorization: token,
      },
      data: {
        id: props.id,
      },
    })
      .then((res) => {
        setErr('')
        console.log(res)
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
          Are you sure you would like to accept this request?
        </p>
        <p className='SendReplacementReqError' style={{ marginRight: '2vw' }}>
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
