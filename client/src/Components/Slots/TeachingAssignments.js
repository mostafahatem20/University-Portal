import React from 'react'
import { Row, Col } from 'react-bootstrap'

import TeachingAssignmentRow from './TeachingAssignmentRow'

const styles = {
  headers: {
    fontSize: '20px',
    fontWeight: '600',
  },
}
const TeachingAssignments = (props) => {
  return (
    <div>
      <Row style={{ marginLeft: '10px' }}>
        <Col>
          <p style={styles.headers}>Name</p>
        </Col>
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
        <Col md={2}></Col>
      </Row>
      <div>
        {props.slots.map((slot) => (
          <TeachingAssignmentRow
            slot={slot}
            edit={props.edit}
            delete={props.delete}
            updateInfo={props.updateInfo}
          />
        ))}
      </div>
    </div>
  )
}
export default TeachingAssignments
