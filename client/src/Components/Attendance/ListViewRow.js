import React from 'react'
import { Col, Row } from 'react-bootstrap'
import Moment from 'react-moment'

const ListViewRow = (props) => {
  return (
    <div
      style={{
        backgroundColor: 'white',
        borderRadius: '10px',
        marginTop: '10px',
        height: '40px',
        boxShadow: '3px 3px 3px  #cdcdcd',
        paddingLeft: '10px',
      }}
    >
      <Row style={{ height: '100%' }}>
        {props.hr && props.all ? (
          <Col style={{ alignItems: 'center', marginLeft: '15px' }}>
            {props.record.staffName}
          </Col>
        ) : null}
        <Col>
          {props.record.signIn ? (
            <Moment format='YYYY/MM/DD hh:mm'>{props.record.signIn}</Moment>
          ) : null}
        </Col>
        <Col>
          {props.record.signOut ? (
            <Moment format='YYYY/MM/DD hh:mm'>{props.record.signOut}</Moment>
          ) : null}
        </Col>
      </Row>
    </div>
  )
}
export default ListViewRow
