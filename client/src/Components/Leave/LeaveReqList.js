import React, { useState, useEffect } from 'react'
import { backendLink } from '../../keys_dev'
import { useSelector } from 'react-redux'
import '../../Stylesheets/Profiles.css'
import '../../Stylesheets/SendReplacementReq.css'
import '../../Stylesheets/ChangeDay.css'
import axios from 'axios'
import AccidentalRequestCard from './AccidentalRequestCard'
import AnnualRequestCard from './AnnualRequestCard'
import MaternityRequestCard from './MaternityRequestCard'
import SickRequestCard from './SickRequestCard'
import CompensationRequestCard from './CompensationRequestCard'

import Button from 'react-bootstrap/Button'
import AccidentalRequest from './AccidentalSendLeaveReq'
import SickRequest from './SickSendLeaveReq'
import MaternityRequest from './MaternitySendLeaveReq'
import AnnualRequest from './AnnualSendLeaveReq'
import CompensationtRequest from './CompensationSendLeaveReq'

export default function ChangeDayReqList() {
  const [requests, setRequests] = useState([])

  const [accidentalReq, setAccidentalReq] = useState([])
  const [annualReq, setAnnualReq] = useState([])
  const [maternityReq, setMaternityReq] = useState([])
  const [sickReq, setSickReq] = useState([])
  const [compensationReq, setCompensationReq] = useState([])

  const [reload, setReload] = useState(false)
  const [loading, setLoading] = useState(true)
  const [showAccidental, setShowAccidental] = useState(false)
  const [showSick, setShowSick] = useState(false)
  const [showMaternity, setShowMaternity] = useState(false)
  const [showAnnual, setShowAnnual] = useState(false)
  const [showCompensation, setShowCompensation] = useState(false)
  const token = useSelector((state) => state.token)
  const type = useSelector((state) => state.type)
  const gender = useSelector((state) => state.gender)

  console.log('my gender is', gender)
  useEffect(() => {
    setLoading(true)
    setRequests([])
    if (type === 'hod') {
      axios({
        method: 'post',
        url: `${backendLink}/leave/viewAllRequests`,
        headers: {
          authorization: token,
        },
        data: {
          type: 'leave',
        },
      })
        .then((res) => {
          if (res.data.statusCode === '000') {
            setRequests(res.data.returnData)
          }
          setLoading(false)
        })
        .catch((error) => {
          console.log(error)
        })
    } else {
      axios({
        method: 'post',
        url: `${backendLink}/leave/viewAllMyRequests`,
        headers: {
          authorization: token,
        },
        data: {
          type: 'leave',
        },
      })
        .then((res) => {
          if (res.data.statusCode === '000') {
            setRequests(res.data.allRequests)
          }
          setLoading(false)
        })
        .catch((error) => {
          console.log(error)
        })
      axios({
        method: 'get',
        url: `${backendLink}/slot/viewAvailableSlots`,
        headers: {
          authorization: token,
        },
      })
        .then((res) => {
          if (res.data.statusCode === '000') {
            console.log('result', res.data.result)
          }
        })
        .catch((error) => {
          console.log(error)
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, reload])

  useEffect(() => {
    var accidental = requests.filter(function (request) {
      return request.type === 'accidental'
    })
    setAccidentalReq(accidental)

    var annual = requests.filter(function (request) {
      return request.type === 'annual'
    })
    setAnnualReq(annual)

    var maternity = requests.filter(function (request) {
      return request.type === 'maternity'
    })
    setMaternityReq(maternity)

    var sick = requests.filter(function (request) {
      return request.type === 'sick'
    })
    setSickReq(sick)

    var compensation = requests.filter(function (request) {
      return request.type === 'compensation'
    })
    setCompensationReq(compensation)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requests])

  return (
    <>
      <p className='ProfileTitleS Requests'>Leave Requests</p>
      <table className='AllProfileCardsTitlesS'>
        <tbody>
          <tr>
            <td className='TitleCardColWidthLL'>Sender Name</td>
            <td className='TitleCardColWidthLL'>Start Date</td>
            <td className='TitleCardColWidthLL'>End Date</td>
            <td className='TitleCardColWidthLL'>Status</td>
            <td className='TitleCardColWidthLL'> Date Sent</td>
          </tr>
        </tbody>
      </table>
      <table className='AllProfileCardsS'>
        <tbody>
          <tr className='rowLeave'>
            <td>
              <div className='rotatedTitle'>Sick</div>
            </td>
            <td>
              <div className='scrollableAreaLeave scroll'>
                <table>
                  <tbody>
                    {sickReq && sickReq.length > 0 ? (
                      sickReq.map((request) => {
                        return (
                          <tr>
                            <td>
                              <SickRequestCard
                                request={request}
                                reload={reload}
                                setReload={setReload}
                              />
                            </td>
                          </tr>
                        )
                      })
                    ) : loading ? (
                      <div
                        style={{
                          marginTop: '2vw',
                          marginLeft: '35vw',
                        }}
                      >
                        Loading...
                      </div>
                    ) : (
                      <div
                        style={{
                          marginTop: '2vw',
                          marginLeft: '35vw',
                        }}
                      >
                        No Results
                      </div>
                    )}
                  </tbody>
                </table>
              </div>
            </td>
            <td>
              {type !== 'hod' ? (
                <Button
                  className='SendNewReplacementReqButtonLeave'
                  onClick={() => setShowSick(true)}
                >
                  {' '}
                  <span className='rotatedTitle2'>SEND</span>
                </Button>
              ) : (
                ''
              )}
            </td>
          </tr>
          <tr>
            <td></td>
            <td>
              <div className='horizonatlLeave'></div>
            </td>
          </tr>
          <tr className='rowLeave'>
            <td>
              <div className='rotatedTitle'>Compensastion</div>
            </td>
            <td>
              <div className='scrollableAreaLeave scroll'>
                <table>
                  <tbody>
                    {compensationReq && compensationReq.length > 0 ? (
                      compensationReq.map((request) => {
                        return (
                          <tr>
                            <td>
                              <CompensationRequestCard
                                request={request}
                                reload={reload}
                                setReload={setReload}
                              />
                            </td>
                          </tr>
                        )
                      })
                    ) : loading ? (
                      <div
                        style={{
                          marginTop: '2vw',
                          marginLeft: '35vw',
                        }}
                      >
                        Loading...
                      </div>
                    ) : (
                      <div
                        style={{
                          marginTop: '2vw',
                          marginLeft: '35vw',
                        }}
                      >
                        No Results
                      </div>
                    )}
                  </tbody>
                </table>
              </div>
            </td>
            <td>
              {' '}
              {type !== 'hod' ? (
                <Button
                  className='SendNewReplacementReqButtonLeave'
                  onClick={() => setShowCompensation(true)}
                >
                  {' '}
                  <span className='rotatedTitle2'>SEND</span>
                </Button>
              ) : (
                ''
              )}
            </td>
          </tr>
          <tr>
            <td></td>
            <td>
              <div className='horizonatlLeave'></div>
            </td>
          </tr>

          <tr className='rowLeave'>
            <td>
              <div className='rotatedTitle'>Accidental</div>
            </td>
            <td>
              <div className='scrollableAreaLeave scroll'>
                <table>
                  <tbody>
                    {accidentalReq && accidentalReq.length > 0 ? (
                      accidentalReq.map((request) => {
                        return (
                          <tr>
                            <td>
                              <AccidentalRequestCard
                                request={request}
                                reload={reload}
                                setReload={setReload}
                              />
                            </td>
                          </tr>
                        )
                      })
                    ) : loading ? (
                      <div
                        style={{
                          marginTop: '2vw',
                          marginLeft: '35vw',
                        }}
                      >
                        Loading...
                      </div>
                    ) : (
                      <div
                        style={{
                          marginTop: '2vw',
                          marginLeft: '35vw',
                        }}
                      >
                        No Results
                      </div>
                    )}
                  </tbody>
                </table>
              </div>
            </td>
            <td>
              {' '}
              {type !== 'hod' ? (
                <Button
                  className='SendNewReplacementReqButtonLeave'
                  onClick={() => setShowAccidental(true)}
                >
                  <span className='rotatedTitle2'>SEND</span>
                </Button>
              ) : (
                ''
              )}
            </td>
          </tr>
          <tr>
            <td></td>
            <td>
              <div className='horizonatlLeave'></div>
            </td>
          </tr>
          <tr className='rowLeave'>
            <td>
              <div className='rotatedTitle'>Annual</div>
            </td>
            <td>
              <div className='scrollableAreaLeave scroll'>
                <table>
                  <tbody>
                    {annualReq && annualReq.length > 0 ? (
                      annualReq.map((request) => {
                        return (
                          <tr>
                            <td>
                              <AnnualRequestCard
                                request={request}
                                reload={reload}
                                setReload={setReload}
                              />
                            </td>
                          </tr>
                        )
                      })
                    ) : loading ? (
                      <div
                        style={{
                          marginTop: '2vw',
                          marginLeft: '35vw',
                        }}
                      >
                        Loading...
                      </div>
                    ) : (
                      <div
                        style={{
                          marginTop: '2vw',
                          marginLeft: '35vw',
                        }}
                      >
                        No Results
                      </div>
                    )}
                  </tbody>
                </table>
              </div>
            </td>
            <td>
              {' '}
              {type !== 'hod' ? (
                <Button
                  className='SendNewReplacementReqButtonLeave'
                  onClick={() => setShowAnnual(true)}
                >
                  <span className='rotatedTitle2'>SEND</span>
                </Button>
              ) : (
                ''
              )}
            </td>
          </tr>
          <tr>
            <td></td>
            <td>
              <div className='horizonatlLeave'></div>
            </td>
          </tr>
          <tr className='rowLeave'>
            <td>
              <div className='rotatedTitle'>Maternity</div>
            </td>
            <td>
              <div className='scrollableAreaLeave scroll'>
                <table>
                  <tbody>
                    {maternityReq && maternityReq.length > 0 ? (
                      maternityReq.map((request) => {
                        return (
                          <tr>
                            <td>
                              <MaternityRequestCard
                                request={request}
                                reload={reload}
                                setReload={setReload}
                              />
                            </td>
                          </tr>
                        )
                      })
                    ) : loading ? (
                      <div
                        style={{
                          marginTop: '2vw',
                          marginLeft: '35vw',
                        }}
                      >
                        Loading...
                      </div>
                    ) : (
                      <div
                        style={{
                          marginTop: '2vw',
                          marginLeft: '35vw',
                        }}
                      >
                        No Results
                      </div>
                    )}
                  </tbody>
                </table>
              </div>
            </td>
            <td>
              {' '}
              {type !== 'hod' ? (
                <Button
                  className='SendNewReplacementReqButtonLeave'
                  onClick={() => setShowMaternity(true)}
                >
                  {' '}
                  <span className='rotatedTitle2'>SEND</span>
                </Button>
              ) : (
                ''
              )}
            </td>
          </tr>
        </tbody>
      </table>
      {/* {type !== 'hod' ? (
        <div className="AddStaffButtonS">
          <Button
            className="SendNewReplacementReqButton"
            onClick={() => setShowAdd(true)}
          >
            {' '}
            SEND A REQUEST
          </Button>
        </div>
      ) : null} */}
      <AnnualRequest
        show={showAnnual}
        setShow={setShowAnnual}
        handleClose={() => setShowAnnual(false)}
        reload={reload}
        setReload={setReload}
      />
      <SickRequest
        show={showSick}
        setShow={setShowSick}
        handleClose={() => setShowSick(false)}
        reload={reload}
        setReload={setReload}
      />
      <MaternityRequest
        show={showMaternity}
        setShow={setShowMaternity}
        handleClose={() => setShowMaternity(false)}
        reload={reload}
        setReload={setReload}
      />
      <AccidentalRequest
        show={showAccidental}
        setShow={setShowAccidental}
        handleClose={() => setShowAccidental(false)}
        reload={reload}
        setReload={setReload}
      />
      <CompensationtRequest
        show={showCompensation}
        setShow={setShowCompensation}
        handleClose={() => setShowCompensation(false)}
        reload={reload}
        setReload={setReload}
      />
    </>
  )
}
