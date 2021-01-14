import React, { useState } from 'react'
import Card from 'react-bootstrap/Card'
import Accordion from 'react-bootstrap/Accordion'
import '../../Stylesheets/Profiles.css'
import '../../Stylesheets/Leave.css'
import { Image } from 'react-bootstrap'
import DeleteIcon from '../../images/delete.png'
import CancelModal from './CancelRequestModal'
import AcceptModal from './AcceptRequestModal'
import RejectModal from './RejectRequestModal'
import Moment from 'react-moment'
import { useSelector } from 'react-redux'

export default function RequestCard(props) {
  const request = props.request
  const [showCancel, setShowCancel] = useState(false)
  const [showAccept, setShowAccept] = useState(false)
  const [showReject, setShowReject] = useState(false)

  const myId = useSelector((state) => state.id)
  const type = useSelector((state) => state.type)

  const handleCloseCancel = () => {
    setShowCancel(false)
  }
  const handleCloseAccept = () => {
    setShowAccept(false)
  }
  const handleCloseReject = () => {
    setShowReject(false)
  }
  return (
    <div>
      <table>
        <tbody>
          <tr>
            <td style={{ width: '4vw' }}>
              {' '}
              {request.senderId === myId && request.status === 'pending' ? (
                <Image
                  src={DeleteIcon}
                  alt=""
                  className="DeleteIconLeave"
                  onClick={() => setShowCancel(true)}
                ></Image>
              ) : null}
            </td>
            <td>
              <div style={{ marginBottom: '1.2vw' }}>
                <Accordion className="AccLeave">
                  <Card className="AccLeave">
                    <Accordion.Toggle
                      eventKey="0"
                      className="ProfileCardSLeave"
                    >
                      <table className="TextInsideProfileCardS">
                        <tbody>
                          <tr>
                            <td className="ProfileCardColWidthLL">
                              {request.staffName ? request.staffName : '-'}
                            </td>
                            <td className="ProfileCardColWidthLL">
                              {request.targetStartDate ? (
                                <Moment format="DD/MM/YYYY">
                                  {request.targetStartDate}
                                </Moment>
                              ) : (
                                '-'
                              )}
                            </td>
                            <td className="ProfileCardColWidthLL">
                              {request.targetEndDate ? (
                                <Moment format="DD/MM/YYYY">
                                  {request.targetEndDate}
                                </Moment>
                              ) : (
                                '-'
                              )}
                            </td>
                            <td className="ProfileCardColWidthLL">
                              {request.status ? request.status : '-'}
                            </td>
                            <td className="ProfileCardColWidthLL">
                              {request.dateSent ? (
                                <Moment format="DD/MM/YYYY">
                                  {request.dateSent}
                                </Moment>
                              ) : (
                                '-'
                              )}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="0" className="AccPart2">
                      <Card.Body>
                        <table>
                          <tbody>
                            <tr>
                              <td className="col1Leave">Reason:</td>
                              <td className="col2Leave">
                                {request.reason ? request.reason : '-'}
                              </td>
                              <td className="col3Leave">Rejection Message:</td>
                              <td className="col4Leave">
                                {request.message ? request.message : '-'}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                </Accordion>
              </div>
            </td>
            <td
              className="SendReplacementAcceptRejLeave"
              onClick={() => setShowAccept(true)}
            >
              {request.status === 'pending' && type === 'hod' ? (
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1.7vw"
                    height="1.7vw"
                    fill="currentColor"
                    class="bi bi-check-circle"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                    <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z" />
                  </svg>
                </div>
              ) : null}
            </td>
            <td
              className="SendReplacementRejectLeave"
              onClick={() => setShowReject(true)}
            >
              {request.status === 'pending' && type === 'hod' ? (
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1.7vw"
                    height="1.7vw"
                    fill="currentColor"
                    class="bi bi-x-circle"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                  </svg>
                </div>
              ) : null}
            </td>
          </tr>
        </tbody>
      </table>
      <CancelModal
        show={showCancel}
        handleClose={handleCloseCancel}
        reload={props.reload}
        setReload={props.setReload}
        id={request._id}
      />
      <AcceptModal
        show={showAccept}
        handleClose={handleCloseAccept}
        reload={props.reload}
        setReload={props.setReload}
        id={request._id}
      />
      <RejectModal
        show={showReject}
        handleClose={handleCloseReject}
        reload={props.reload}
        setReload={props.setReload}
        id={request._id}
      />
    </div>
  )
}
