import React, { useState, useEffect } from 'react'
import { backendLink } from '../../keys_dev'
import { useSelector } from 'react-redux'
import '../../Stylesheets/Profiles.css'
import axios from 'axios'
import RequestCard from './RequestCard'
import Button from 'react-bootstrap/Button'
import SendReplacementRequest from './SendReplacementReq'
export default function ReplacementReqList() {
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
        method: 'post',
        url: `${backendLink}/leave/viewAllRequests`,
        headers: {
          authorization: token,
        },
        data: {
          type: 'replacement',
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
        method: 'get',
        url: `${backendLink}/replacement/viewReplacementRequest`,
        headers: {
          authorization: token,
        },
      })
        .then((res) => {
          if (res.data.statusCode === '000') {
            setRequests(res.data.request)
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
      <p className='ProfileTitleS Requests'>Replacement Requests</p>
      <table className='AllProfileCardsTitlesS'>
        <tbody>
          <tr>
            <td className='TitleCardColBigWidthRR'>Sender Name</td>
            <td className='TitleCardColBigWidthRR'>Reciever Name</td>
            <td
              className='TitleCardColBigWidthRR'
              style={{ paddingLeft: '2vw' }}
            >
              Slot
            </td>
            <td className='TitleCardColWidthRR' style={{ paddingLeft: '1vw' }}>
              Status
            </td>
            <td className='TitleCardColWidthRR' style={{ paddingLeft: '1vw' }}>
              Target Date
            </td>
            <td className='TitleCardColWidthRR' style={{ paddingLeft: '2vw' }}>
              Date Sent
            </td>
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
