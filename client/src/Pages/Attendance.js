import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { staffType } from '../Constants/StatusCodes'
import { backendLink } from '../keys_dev'
import { Button, Row, Col, Form } from 'react-bootstrap'
import '../Stylesheets/Attendance.css'
import ListView from '../Components/Attendance/ListView'

const axios = require('axios')
const Attendance = (props) => {
  const errorStyle = {
    fontSize: '12px',
    fontWeight: '600',
    color: '#8a0303',
  }
  const type = useSelector((state) => state.type)
  const hr = type === staffType.HR
  const [myAttendance, setMyAttendance] = useState(true)
  const [attendanceRecords, setAttendanceRecords] = useState([])
  const [filteredAttendance, setFilteredAttendance] = useState([])
  const [filteredAll, setFilteredAll] = useState([])
  const token = useSelector((state) => state.token)
  const [pageError, setPageError] = useState('')
  const [loading, setLoading] = useState(false)
  const [filtering, setFiltering] = useState(false)
  const [monthStr, setMonthStr] = useState('')

  const [manualSignOutId, setManualSignOutId] = useState('')
  const [allAttendanceRecords, setAllAttendanceRecords] = useState([])

  const fetchAttendanceNamesAndIds = async () => {
    try {
      var allAttendanceRecs = hr
        ? await axios({
            url: `${backendLink}/attendence/viewAllAttendance`,
            method: 'GET',
            headers: { Authorization: token },
          })
        : null
      var attendanceRecs = await axios({
        url: `${backendLink}/attendence/viewAttendance`,
        method: 'GET',
        headers: { Authorization: token },
      })
      const namesAndIds = await axios.get(
        backendLink + '/attendence/getNamesAndIds',
        {
          headers: { Authorization: token },
        }
      )
      if (namesAndIds.data.statusCode === '000') {
      }
      // setProfiles(namesAndIds.data.profiles)
      else {
        setPageError(namesAndIds.data.error)
      }

      if (attendanceRecs.data.statusCode === '000') {
        setAttendanceRecords(attendanceRecs.data.returnData)

        if (hr) {
          if (allAttendanceRecs.data.statusCode === '000') {
            let allAttendanceTemp = allAttendanceRecs.data.returnData
            const attendanceWithNames = []
            let attendanceWithName = {}
            let name
            let namesAndIdsTemp = namesAndIds.data.profiles
            for (let i = 0; i < allAttendanceTemp.length; i++) {
              attendanceWithName.signIn = allAttendanceTemp[i].signIn
              attendanceWithName.signOut = allAttendanceTemp[i].signOut
              name = namesAndIdsTemp.filter((profile) => {
                return allAttendanceTemp[i].staffId === profile._id
              })

              name = name.length > 0 ? name[0] : ''

              attendanceWithName.staffName = name.name

              attendanceWithName.staffId = allAttendanceTemp[i].staffId
              attendanceWithName.attendanceId = allAttendanceTemp[i]._id
              attendanceWithNames.push(attendanceWithName)
              attendanceWithName = {}
            }
            setAllAttendanceRecords(attendanceWithNames)
          } else {
            setPageError(allAttendanceRecs.data.error)
          }
        }
      } else {
        setPageError(attendanceRecs.data.error)
      }
    } catch (err) {
      setPageError(err.message)
    }
    setLoading(false)
  }

  useEffect(() => {
    setLoading(true)
    fetchAttendanceNamesAndIds()
  }, [])

  const months = [
    { str: '', month: '' },
    { str: '01', month: 'January' },
    { str: '02', month: 'February' },
    { str: '03', month: 'March' },
    { str: '04', month: 'April' },
    { str: '05', month: 'May' },
    { str: '06', month: 'June' },
    { str: '07', month: 'July' },
    { str: '08', month: 'August' },
    { str: '09', month: 'September' },
    { str: '10', month: 'October' },
    { str: '11', month: 'November' },
    { str: '12', month: 'December' },
  ]

  useEffect(() => {
    if (filtering) {
      const filteredTemp = attendanceRecords.filter(
        (rec) => rec.signIn.substring(5, 7) === monthStr
      )
      setFilteredAttendance(filteredTemp)
      const filteredAllTemp = allAttendanceRecords.filter(
        (rec) => rec.signIn.substring(5, 7) === monthStr
      )
      setFilteredAll(filteredAllTemp)
    }
  }, [monthStr])

  return (
    <div className='attendanceContainer'>
      <p
        style={{
          marginLeft: '5vw',
          marginTop: '30px',
          fontSize: '40px',
          color: '#009999',
          marginBottom: '20px',
        }}
      >
        Attendance
      </p>

      {hr ? (
        <Row>
          <Col md={4}></Col>
          <Col md={3}>
            <div>
              <Button
                style={{ width: '60%', float: 'right' }}
                variant='info'
                onClick={() => {
                  setMyAttendance(true)
                }}
              >
                My Attendance
              </Button>
            </div>
          </Col>
          <Col md={3}>
            <div style={{}}>
              <Button
                style={{ width: '60%' }}
                variant='info'
                onClick={() => {
                  setMyAttendance(false)
                }}
              >
                All Attendance
              </Button>
            </div>
          </Col>
        </Row>
      ) : null}
      <Row style={{ marginTop: '20px', marginBottom: '20px' }}>
        <Col sm={1}></Col>
        <Col sm={2}>
          <p
            style={{
              fontSize: '15px',
              fontWeight: '600',
            }}
          >
            Filter by Month
          </p>
        </Col>
        <Col>
          <Form.Control
            as='select'
            style={{ width: '20%' }}
            defaultValue=''
            value={monthStr}
            onChange={(e) => {
              if (e.target.value === '') {
                setFiltering(false)
              } else {
                setFiltering(true)
              }
              setMonthStr(e.target.value)
            }}
          >
            <option value=''>No Filters</option>
            {months.map((mon) => {
              return <option value={mon.str}>{mon.month}</option>
            })}
          </Form.Control>
        </Col>
      </Row>
      {loading ? (
        <p
          style={{
            fontSize: '20px',
            color: '#858585',
            fontWeight: '600',
            marginTop: '20%',
            marginLeft: '20%',
          }}
        >
          Loading...
        </p>
      ) : (
        <div>
          <Row style={{ marginTop: '40px' }}>
            <Col md={1}></Col>
            <Col md={8}>
              <ListView
                hr={hr}
                all={!myAttendance}
                records={
                  !filtering
                    ? myAttendance
                      ? attendanceRecords
                      : allAttendanceRecords
                    : myAttendance
                    ? filteredAttendance
                    : filteredAll
                }
                signOutId={manualSignOutId}
                setSignOutId={(info) => {
                  setManualSignOutId(info)
                }}
              />
            </Col>
            <Col style={{ marginLeft: '2vw' }}>
              <Row style={{ marginTop: '4vw', marginBottom: '50px' }}></Row>
              <Row></Row>
            </Col>
          </Row>
          <Row>
            <Col sm={4}></Col>
            <Col>
              <p style={errorStyle}>{pageError}</p>
            </Col>
          </Row>
        </div>
      )}
    </div>
  )
}

export default Attendance
