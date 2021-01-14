import React from 'react'
import { Col, Row } from 'react-bootstrap'

const ClickableSlot = (props) => {
  var background =
    props.selected === props.slot._id
      ? {
          backgroundColor: '#add8e6',
          borderRadius: '10px',
          marginTop: '10px',
          height: '35px',
          boxShadow: '3px 3px 3px  #cdcdcd',
          paddingLeft: '15px',
          cursor: 'pointer',
        }
      : {
          backgroundColor: 'white',
          borderRadius: '10px',
          marginTop: '10px',
          height: '35px',
          boxShadow: '3px 3px 3px  #cdcdcd',
          paddingLeft: '15px',
          cursor: 'pointer',
        }
  return (
    <div
      style={background}
      onClick={() => {
        props.select(props.slot._id)
      }}
    >
      <Row style={{ height: '100%' }}>
        <Col>{props.slot.locationName}</Col>
        <Col>{props.slot.courseName}</Col>
        <Col>{props.slot.type}</Col>
        <Col>{props.slot.time}</Col>
        <Col>
          {props.slot.day === 'wednesday'
            ? 'Wed'
            : props.slot.day === 'thursday'
            ? 'Thurs'
            : props.slot.day === 'Saturday'
            ? 'Sat'
            : props.slot.day === 'sunday'
            ? 'Sun'
            : props.slot.day === 'monday'
            ? 'Mon'
            : 'Tues'}
        </Col>
        {/* <Col md={2}>
          <Row>
            <Col>
              <div onClick={()=>{props.edit(props.slot)}}>
                <p style={{ color: 'teal' }}>Edit</p>
              </div>
            </Col>
            <Col>
              <div onClick={()=>{props.delete(props.slot)}}>
                <p style={{ color: 'tomato' }}>Edit</p>
              </div>
            </Col>
          </Row>
        </Col> */}
      </Row>
    </div>
  )
}
export default ClickableSlot
