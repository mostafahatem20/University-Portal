import React, { useEffect, useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import ListViewRow from './ListViewRow'

const styles = {
  headers: {
    fontSize: '20px',
    fontWeight: '600',
  },
}
const ListView = (props) => {
  const [id, setId] = useState(props.signOutId)
  useEffect(() => {
    props.setSignOutId(id)
  })
  const hr = props.hr

  return (
    <div style={{}}>
      <Row style={{ marginLeft: '10px' }}>
        {hr && props.all ? (
          <Col>
            <p style={styles.headers}>Name</p>
          </Col>
        ) : null}
        <Col>
          <p style={styles.headers}>SignIn</p>
        </Col>
        <Col>
          <p style={styles.headers}>SignOut</p>
        </Col>
      </Row>
      <div style={{}}>
        {props.records.map((record) => (
          <ListViewRow
            hr={hr}
            all={props.all}
            record={record}
            signOutId={id}
            setSignOutId={setId}
          />
        ))}
      </div>
    </div>
  )
}
export default ListView
