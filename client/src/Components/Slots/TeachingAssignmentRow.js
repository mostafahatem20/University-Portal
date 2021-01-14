import React from 'react'
import { Col, Row } from 'react-bootstrap'

const TeachingAssignmentRow = (props) => {
  return (
    <div
      style={{
        backgroundColor: 'white',
        borderRadius: '10px',
        marginTop: '10px',
        height: '70px',
        boxShadow: '3px 3px 3px  #cdcdcd',
        // paddingLeft: '10px',
      }}
    >
      <Row
        style={{
          height: '100%',
          position: 'relative',
          top: '5px',
          marginLeft: '10px',
        }}
      >
        <Col>{props.slot.staffName}</Col>
        <Col>{props.slot.locationName}</Col>
        <Col>{props.slot.courseName}</Col>
        <Col>{props.slot.type}</Col>
        <Col>{props.slot.time}</Col>
        <Col>
          {props.slot.day === 'wednesday'
            ? 'Wed'
            : props.slot.day === 'thursday'
            ? 'Thurs'
            : props.slot.day === 'saturday'
            ? 'Sat'
            : props.slot.day === 'sunday'
            ? 'Sun'
            : props.slot.day === 'monday'
            ? 'Mon'
            : 'Tues'}
        </Col>
        <Col md={2}>
          <Row style={{ height: '50%' }}>
            <Col style={{ marginBottom: '0px' }}>
              <div
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  if (!props.updateInfo) {
                    props.edit(props.slot)
                  } else {
                    props.edit({
                      slotId: props.slot._id,
                      locationId: props.slot.locationId,
                      courseName: props.slot.courseName,
                      courseId: props.slot.courseId,
                      location: props.slot.locationName,
                      type: props.slot.type,
                      day: props.slot.day,
                      time: props.slot.time,
                    })
                  }
                }}
              >
                <p style={{ color: 'teal' }}>Edit</p>
              </div>
            </Col>
          </Row>
          <Row>
            <Col style={{}}>
              <div
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  props.delete(props.slot)
                }}
              >
                <p
                  style={{
                    color: 'tomato',
                    position: 'relative',
                    bottom: '10px',
                  }}
                >
                  Delete
                </p>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  )
}
export default TeachingAssignmentRow
