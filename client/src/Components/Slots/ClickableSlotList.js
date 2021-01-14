import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import ClickableSlot from './ClickableSlot'

const ClickableSlotList = (props) => {
  const [selected, setSelected] = useState('')
  const handleSelection = (selection) => {
    props.handleSelection(selection)
    setSelected(selection)
  }
  const styles = {
    headers: {
      fontSize: '20px',
      fontWeight: '600',
    },
  }
  return (
    <div>
      <p
        style={{
          fontSize: '15px',
          fontWeight: '700',
          marginTop: '10px',
          marginLeft: '10px',
        }}
      >
        {' '}
        Pick a slot to assign to
      </p>
      <Row style={{ paddingLeft: '10px' }}>
        <Col>
          <p style={styles.headers}>Location</p>
        </Col>
        <Col>
          <p style={styles.headers}>Course</p>
        </Col>
        <Col>
          <p style={styles.headers}>Type</p>
        </Col>
        <Col>
          <p style={styles.headers}>Time</p>
        </Col>
        <Col>
          <p style={styles.headers}>Day</p>
        </Col>
        {/* <Col md={2}></Col> */}
      </Row>
      {props.slots.map((slot) => (
        <ClickableSlot
          slot={slot}
          selected={selected}
          select={handleSelection}
        />
      ))}
    </div>
  )
}
export default ClickableSlotList
