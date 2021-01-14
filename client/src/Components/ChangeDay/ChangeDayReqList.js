import React, { useState, useEffect } from 'react'
import { backendLink } from '../../keys_dev'
import { useSelector } from 'react-redux'
import '../../Stylesheets/Profiles.css'
import '../../Stylesheets/SendReplacementReq.css'
import '../../Stylesheets/ChangeDay.css'
import axios from 'axios'
import RequestCard from './RequestCard'
import Button from 'react-bootstrap/Button'
import SendReplacementRequest from './SendChangeDayReq'
export default function ChangeDayReqList() {
  const [requests, setRequests] = useState([])
  const [reload, setReload] = useState(false)
  const [loading, setLoading] = useState(true)
  const [showAdd, setShowAdd] = useState(false)
  const token = useSelector((state) => state.token)
  const type = useSelector((state) => state.type)

  useEffect(() => {
    setLoading(true)
    setRequests([])
    if (type === 'hod') {
      axios({
        method: 'get',
        url: `${backendLink}/schedule/viewChangeDayOff`,
        headers: {
          authorization: token,
        },
      })
        .then((res) => {
          if (res.data.statusCode === '000') {
            setRequests(res.data.scheduleRequest)
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
          type: 'changeDay',
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

  return (
    <>
      <p className='ProfileTitleS Requests'>Change Day Off Requests</p>
      <table className='AllProfileCardsTitlesS'>
        <tbody>
          <tr>
            <td className='TitleCardMidColWidthCR'>Sender Name</td>
            <td className='TitleCardColWidthCR'>Day Off</td>
            <td className='TitleCardColWidthCR'>Status</td>
            <td className='TitleCardColBigWidthCR'>Reason</td>
            <td className='TitleCardColBigWidthCR'>Rejection Message</td>
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
          ) : loading ? (
            <div style={{ marginTop: '2vw' }}>Loading...</div>
          ) : (
            <div style={{ marginTop: '2vw' }}>No Results</div>
          )}
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
