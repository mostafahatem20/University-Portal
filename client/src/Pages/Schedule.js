import React, { useState, useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import RequestCard from '../Components/Replacement/RequestCard'
import ScheduleItem from '../Components/Schedule/ScheduleItem'
import { day } from '../Constants/StatusCodes'
import { backendLink } from '../keys_dev'
const axios = require('axios')

const Schedule = (props) => {
  const errorStyle = {
    fontSize: '12px',
    fontWeight: '600',
    color: '#8a0303',
  }
  const token = useSelector((state) => state.token)
  const [error, setError] = useState('')
  const [schedule1, setSchedule] = useState([])
  const [loading, setLoading] = useState(false)
  const [replacementRequests, setReplacementRequests] = useState([])
  var scheduleResponse = { data: [] }
  useEffect(() => {
    setLoading(true)
    const fetchSchedule = async () => {
      try {
        scheduleResponse = await axios({
          method: 'GET',
          url: backendLink + '/slot/viewSchedule',
          headers: { Authorization: token },
        })
        if (scheduleResponse.data.statusCode === '000') {
          setSchedule(scheduleResponse.data.slots)
          setReplacementRequests(scheduleResponse.data.ReplacementRequests)
        } else setError(scheduleResponse.data.error)
      } catch (err) {
        setError(err.message)
      }
      setLoading(false)
    }
    fetchSchedule()
  }, [])

  const [scheduleObj, setScheduleObj] = useState([[], [], [], [], [], []])

  useEffect(() => {
    var tempSat = []
    schedule1.forEach((item) => {
      if (item.day === day.SATURDAY) tempSat.push(item)
    })

    var tempSun = []
    schedule1.forEach((item) => {
      if (item.day === day.SUNDAY) tempSun.push(item)
    })

    var tempMon = []
    schedule1.forEach((item) => {
      if (item.day === day.MONDAY) tempMon.push(item)
    })

    var tempTues = []
    schedule1.forEach((item) => {
      if (item.day === day.TUESDAY) tempTues.push(item)
    })

    var tempWed = []
    schedule1.forEach((item) => {
      if (item.day === day.WEDNESDAY) tempWed.push(item)
    })

    var tempThurs = []
    schedule1.forEach((item) => {
      if (item.day === day.THURSDAY) tempThurs.push(item)
    })

    var scheduleObjTemp = [[], [], [], [], [], []]

    scheduleObjTemp[0] = tempSat
    scheduleObjTemp[1] = tempSun
    scheduleObjTemp[2] = tempMon
    scheduleObjTemp[3] = tempTues
    scheduleObjTemp[4] = tempWed
    scheduleObjTemp[5] = tempThurs

    setScheduleObj(scheduleObjTemp)
    let tempArray = []
    let tempObj = []
    let tempScheduleObj = [...scheduleObjTemp]
    for (var k = 0; k < scheduleObjTemp.length; k++) {
      tempObj[k] = scheduleObjTemp[k]

      var flag = false
      for (let i = 0; i < scheduleObjTemp[k].length; i++) {
        if (scheduleObjTemp[k][i] !== null) flag = true
      }
      if (!flag || scheduleObjTemp[k].length === 0) {
        tempObj[k] = [null, null, null, null, null]

        tempScheduleObj[k] = tempObj[k]
      } else {
        for (let i = 0; i < scheduleObjTemp[k].length; i++) {
          for (
            var j = tempArray.length;
            j < scheduleObjTemp[k][i].time - 1;
            j++
          ) {
            tempArray.push(null)
          }
          if (scheduleObjTemp[k][i].time < tempArray.length)
            tempArray[scheduleObjTemp[k][i].time - 1] = scheduleObjTemp[k][i]
          else tempArray.push(scheduleObjTemp[k][i])
        }
        if (tempArray.length < 5) {
          for (var i = tempArray.length; i < 5; i++) tempArray.push(null)
        }
        tempObj[k] = tempArray

        tempScheduleObj[k] = tempObj[k]

        tempArray = []
      }
    }
    setScheduleObj(tempScheduleObj)
  }, [schedule1])
  return (
    <div>
      <p
        style={{
          marginLeft: '5vw',
          marginTop: '30px',
          fontSize: '40px',
          color: '#009999',
          marginBottom: '20px',
        }}
      >
        Schedule
      </p>
      {loading ? (
        <p
          style={{
            fontSize: '20px',
            color: '#858585',
            fontWeight: '600',
            marginTop: '20%',
            marginLeft: '30%',
          }}
        >
          Loading...
        </p>
      ) : (
        <div>
          <Row>
            <Col sm={1}></Col>
            <Col>
              <Row>
                <Col
                  md={2}
                  style={{ marginLeft: '10px', marginBottom: '10px' }}
                ></Col>
                <Col
                  md={2}
                  style={{
                    color: '#010f15',
                    marginLeft: '10px',
                    marginBottom: '10px',
                    fontWeight: '700',
                  }}
                >
                  1st
                </Col>
                <Col
                  md={2}
                  style={{
                    color: '#010f15',
                    marginLeft: '10px',
                    marginBottom: '10px',
                    fontWeight: '700',
                  }}
                >
                  2nd
                </Col>
                <Col
                  md={2}
                  style={{
                    color: '#010f15',
                    marginLeft: '10px',
                    marginBottom: '10px',
                    fontWeight: '700',
                  }}
                >
                  3rd
                </Col>
                <Col
                  md={2}
                  style={{
                    color: '#010f15',
                    marginLeft: '10px',
                    marginBottom: '10px',
                    fontWeight: '700',
                  }}
                >
                  4th
                </Col>
                <Col
                  md={1}
                  style={{
                    color: '#010f15',
                    marginLeft: '10px',
                    marginBottom: '10px',
                    fontWeight: '700',
                  }}
                >
                  5th
                </Col>
              </Row>
              <Row>
                <Col md={2} style={{ color: '#010f15', fontWeight: '700' }}>
                  <p style={{ color: '#010f15', fontWeight: '700' }}>
                    Saturday
                  </p>
                </Col>

                {scheduleObj[0].map((slot) => {
                  if (slot === null)
                    return (
                      <Col md={2}>
                        <ScheduleItem />
                      </Col>
                    )
                  return (
                    <Col md={2}>
                      <ScheduleItem slotData={slot} />
                    </Col>
                  )
                })}
              </Row>
              <Row>
                <Col md={2} style={{ color: '#010f15', fontWeight: '700' }}>
                  <p style={{ color: '#010f15', fontWeight: '700' }}>Sunday</p>
                </Col>
                {scheduleObj[1].map((slot) => {
                  if (slot === null)
                    return (
                      <Col md={2}>
                        <ScheduleItem />
                      </Col>
                    )
                  return (
                    <Col md={2}>
                      <ScheduleItem slotData={slot} />
                    </Col>
                  )
                })}
              </Row>
              <Row>
                <Col md={2} style={{ color: '#010f15', fontWeight: '700' }}>
                  <p style={{ color: '#010f15', fontWeight: '700' }}>Monday</p>
                </Col>
                {scheduleObj[2].map((slot) => {
                  if (slot === null)
                    return (
                      <Col md={2}>
                        <ScheduleItem />
                      </Col>
                    )
                  return (
                    <Col md={2}>
                      <ScheduleItem slotData={slot} />
                    </Col>
                  )
                })}
              </Row>
              <Row>
                <Col md={2}>
                  <p style={{ color: '#010f15', fontWeight: '700' }}>Tuesday</p>
                </Col>
                {scheduleObj[3].map((slot) => {
                  if (slot === null)
                    return (
                      <Col md={2}>
                        <ScheduleItem />
                      </Col>
                    )
                  return (
                    <Col md={2}>
                      <ScheduleItem slotData={slot} />
                    </Col>
                  )
                })}
              </Row>
              <Row>
                <Col md={2} style={{ color: '#010f15', fontWeight: '700' }}>
                  <p style={{ color: '#010f15', fontWeight: '700' }}>
                    Wednesday
                  </p>
                </Col>
                {scheduleObj[4].map((slot) => {
                  if (slot === null)
                    return (
                      <Col md={2}>
                        <ScheduleItem />
                      </Col>
                    )
                  return (
                    <Col md={2}>
                      <ScheduleItem slotData={slot} />
                    </Col>
                  )
                })}
              </Row>
              <Row>
                <Col md={2} style={{ color: '#010f15', fontWeight: '700' }}>
                  <p style={{ color: '#010f15', fontWeight: '700' }}>
                    Thursday
                  </p>
                </Col>
                {scheduleObj[5].map((slot) => {
                  if (slot === null)
                    return (
                      <Col md={2}>
                        <ScheduleItem />
                      </Col>
                    )
                  return (
                    <Col md={2}>
                      <ScheduleItem slotData={slot} />
                    </Col>
                  )
                })}
              </Row>
              <Row style={{ marginTop: '10px', marginBottom: '5px' }}>
                <Col md={4}></Col>
                <Col>
                  <p style={errorStyle}>{error}</p>
                </Col>
              </Row>
            </Col>
          </Row>
          <p
            style={{
              marginLeft: '5vw',
              marginTop: '30px',
              fontSize: '40px',
              color: '#009999',
              marginBottom: '20px',
            }}
          >
            Replacement Requests
          </p>
          <div style={{ marginBottom: '20px' }}>
            {replacementRequests.map((request) => {
              return (
                <tr>
                  <td>
                    <RequestCard
                      request={request}
                      // reload={reload}
                      // setReload={setReload}
                      schedule={true}
                    />
                  </td>
                </tr>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

export default Schedule
