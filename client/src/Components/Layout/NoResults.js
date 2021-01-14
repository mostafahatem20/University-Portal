import React from 'react'
import { Card } from 'react-bootstrap'
export default function NoResults(props) {
  return (
    <Card className='ProfileCardS' style={{ width: props.width }}>
      {' '}
      <table className='TextInsideProfileCardS'>
        <tbody>
          <tr>
            <td style={{ textAlign: 'center' }}>No Results Found</td>
          </tr>
        </tbody>
      </table>
    </Card>
  )
}
