import React, { useState, useEffect } from 'react'
import { backendLink } from '../../keys_dev'
import { useSelector } from 'react-redux'
import '../../Stylesheets/Profiles.css'
import '../../Stylesheets/SendReplacementReq.css'
import '../../Stylesheets/ChangeDay.css'
import axios from 'axios'
import RequestCard from './RequestCard'
import Button from 'react-bootstrap/Button'
import SendReplacementRequest from './SendLinkingReq'
export default function ChangeDayReqList() {
  const [requests, setRequests] = useState([])
  const [coorinatorRequests, setCoorinatorRequests] = useState([])
  const [reload, setReload] = useState(false)
  const [loading, setLoading] = useState(true)
  const [loading2, setLoading2] = useState(true)

  const [showAdd, setShowAdd] = useState(false)

  const token = useSelector((state) => state.token)
  const type = useSelector((state) => state.type)

  useEffect(() => {
    setRequests([])
    setCoorinatorRequests([])
    setLoading(true)
    setLoading2(true)
    if (type === 'ta') {
      //check if he is course coordinator
      axios({
        method: 'get',
        url: `${backendLink}/schedule/viewCourseLinkingRequest`,
        headers: {
          authorization: token,
        },
      })
        .then((res) => {
          if (res.data.statusCode === '000') {
            setCoorinatorRequests(res.data.scheduleRequests)
          }
          setLoading2(false)
        })
        .catch((error) => {
          console.log(error)
        })
    } else {
      setLoading2(false)
    }
    if (type === 'hod') {
      axios({
        method: 'post',
        url: `${backendLink}/leave/viewAllRequests`,
        headers: {
          authorization: token,
        },
        data: {
          type: 'linking',
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
          type: 'linking',
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
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, reload])

  useEffect(() => {
    var requestshere = requests
    for (var i = 0; i < coorinatorRequests.length; i++) {
      // eslint-disable-next-line no-loop-func
      var filtered = requestshere.filter(function (request) {
        return request._id !== coorinatorRequests[i]._id
      })
      requestshere = filtered
    }
    setRequests(requestshere)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, loading2, coorinatorRequests, reload])

  return (
    <>
      <p className='ProfileTitleS Requests'>Linking Requests</p>
      <table className='AllProfileCardsTitlesS'>
        <tbody>
          <tr>
            <td className='TitleCardMidColWidthLR'>Sender Name</td>
            <td className='TitleCardColWidthLR'>Status</td>
            <td className='TitleCardColBigWidthLR'>Slot Info</td>
            <td className='TitleCardColBigWidthLR'>Rejection Message</td>
          </tr>
        </tbody>
      </table>
      <table className='AllProfileCardsS'>
        <tbody>
          {requests && requests.length > 0 ? (
            requests.map((request) => {
              return (
                <tr>
                  <td>
                    <RequestCard
                      request={request}
                      reload={reload}
                      setReload={setReload}
                    />
                  </td>
                </tr>
              )
            })
          ) : loading || loading2 ? (
            <div style={{ marginTop: '2vw' }}>Loading...</div>
          ) : null}

          {coorinatorRequests && coorinatorRequests.length > 0
            ? coorinatorRequests.map((request) => {
                return (
                  <tr>
                    <td>
                      <RequestCard
                        request={request}
                        reload={reload}
                        setReload={setReload}
                        coordinator={true}
                      />
                    </td>
                  </tr>
                )
              })
            : null}

          {requests.length === 0 &&
          coorinatorRequests.length === 0 &&
          !loading &&
          !loading2 ? (
            <div style={{ marginTop: '2vw' }}>No Results</div>
          ) : null}
        </tbody>
      </table>
      {type !== 'hod' ? (
        <div className='AddStaffButtonS'>
          <Button
            className='SendNewReplacementReqButton'
            onClick={() => setShowAdd(true)}
          >
            {' '}
            SEND A REQUEST
          </Button>
        </div>
      ) : null}
      <SendReplacementRequest
        show={showAdd}
        setShow={setShowAdd}
        handleClose={() => setShowAdd(false)}
        reload={reload}
        setReload={setReload}
      />
    </>
  )
}
