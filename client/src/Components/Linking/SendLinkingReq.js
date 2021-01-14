import React, { useState, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { backendLink } from '../../keys_dev'
import Alert from '../Layout/Alert'
// import { ReactDatez, ReduxReactDatez } from 'react-datez'
import 'react-datez/dist/css/react-datez.css'
import '../../Stylesheets/SendReplacementReq.css'
import { Form } from 'react-bootstrap'
export default function SendReplacementReq(props) {
  const token = useSelector((state) => state.token)
  // const myId = useSelector((state) => state.id)

  const [slotList, setSlotList] = useState([])
  const [slot, setSlot] = useState('')
  const [problem, setProblem] = useState('')
  const [err, setErr] = useState('')

  const [showAlert, setShowAlert] = useState(false)

  const [msg] = useState('Request Sent Successfully')
  const handleCloseAlert = () => {
    setShowAlert(false)
  }

  const sendRequest = () => {
    setErr('')
    if (!slot) {
      setErr('Please choose a slot')
    }

    if (slot) {
      axios({
        url: `${backendLink}/schedule/sendLinkingRequest`,
        method: 'POST',
        headers: {
          Authorization: token,
        },
        data: {
          slotId: slot,
        },
      })
        .then((res) => {
          if (res.data.statusCode === '000') {
            setShowAlert(true)
            props.setShow(false)
            props.setReload(!props.reload)
          } else {
            setErr(res.data.error)
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
  useEffect(() => {
    setSlot('')
    setSlotList([])
    axios({
      url: `${backendLink}/slot/viewAvailableSlots`,
      method: 'GET',
      headers: {
        Authorization: token,
      },
      data: {},
    })
      .then((res) => {
        if (res.data.statusCode === '000') {
          setSlotList(res.data.result)
          if (res.data.result.length > 0) {
            setSlot(res.data.result[0]._id)
          } else {
            setProblem('There are no free slots that you can be assigned to')
          }
        }
      })
      .catch((err) => {
        console.log(err)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.show])
  return (
    <div className='SendReplacementReq'>
      <Modal show={props.show} centered size='lg'>
        <Modal.Header
          closeButton
          onHide={props.handleClose}
          style={{ borderBottom: '0px' }}
        ></Modal.Header>
        <Modal.Body>
          <table className='SendReplacementReqDatetable'>
            <tbody>
              <Form.Group>
                <tr>
                  <td className='SendReplacementReqCol1'>
                    <Form.Label
                      column
                      sm='2'
                      className='SendReplacementReqGeneral'
                    >
                      {' '}
                      Slot:*
                    </Form.Label>
                  </td>
                  <td className='SendReplacementReqCol2'>
                    <Form.Control
                      as='select'
                      className='SendReplacementReqForm'
                      onChange={(e) => setSlot(e.target.value)}
                    >
                      {slotList.map((slot) => {
                        return (
                          <option value={slot._id}>
                            {slot.courseName}: {slot.day}, {slot.time} slot
                          </option>
                        )
                      })}
                    </Form.Control>
                  </td>
                </tr>
                <tr>
                  <td colSpan='5' className='SendReplacementReq3'>
                    {err ? (
                      <div className='SendReplacementReqError'>{err}</div>
                    ) : null}
                  </td>
                </tr>
                <tr>
                  <td colSpan='5'>
                    {problem ? (
                      <div className='SendReplacementReqProblem'>{problem}</div>
                    ) : (
                      <Button
                        className='SendReplacementReqButton'
                        onClick={sendRequest}
                      >
                        Send{' '}
                      </Button>
                    )}
                  </td>
                </tr>
              </Form.Group>
            </tbody>
          </table>
        </Modal.Body>
      </Modal>
      <Alert
        showAlert={showAlert}
        severity='success'
        msg={msg}
        handleClose={handleCloseAlert}
      />
    </div>
  )
}
