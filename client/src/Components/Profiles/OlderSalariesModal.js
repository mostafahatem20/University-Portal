import React, { useState } from 'react'
import { Modal, Button, Form, Col } from 'react-bootstrap'
import axios from 'axios'
import { backendLink } from '../../keys_dev'
import { useSelector } from 'react-redux'

export default function ResetPassModal(props) {
  const token = useSelector((state) => state.token)
  const [month, setMonth] = useState({ val: '', err: '' })
  const [year, setYear] = useState({ val: '', err: '' })
  const [salary, setSalary] = useState('')
  const [err, setErr] = useState(false)

  let years = []
  for (let l = 2010; l < new Date().getFullYear() + 1; l++) {
    years.push(l)
  }
  const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

  const handleClose = () => {
    setMonth({ val: '', err: '' })
    setYear({ val: '', err: '' })
    setErr(false)
    props.onHide()
  }
  const viewOlderSalaries = () => {
    axios({
      url: `${backendLink}/salary/viewStaffSalary`,
      method: 'POST',
      headers: {
        authorization: token,
      },
      data: {
        staffId: props.staffId,
        month: month.val,
        year: year.val,
      },
    })
      .then((res) => {
        if (res.data.statusCode === '000') {
          if (res.data.salary) {
            setSalary(res.data.salary)
          } else {
            setSalary(null)
            setErr(true)
          }
        } else if (res.data.statusCode === '003') {
          let x = res.data.error.split('"')
          switch (x[1]) {
            case 'month':
              setMonth({ ...month, err: res.data.error })
              break
            case 'year':
              setYear({ ...year, err: res.data.error })
              break
            default:
              break
          }
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }
  const handleDoneButton = () => {
    viewOlderSalaries()
  }

  return (
    <>
      <Modal
        show={props.show}
        onHide={props.onHide}
        size='lg'
        aria-labelledby='contained-modal-title-vcenter'
        centered
      >
        <Modal.Header closeButton onHide={handleClose}>
          <Modal.Title
            id='contained-modal-title-vcenter'
            style={{ color: 'rgba(1, 155, 157, 1)' }}
          >
            Older Salaries
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form style={{ padding: '1vw' }}>
            <Form.Row style={{ paddingBottom: '1vw' }}>
              <Col>
                <Form.Label>Month*</Form.Label>
                <Form.Control
                  as='select'
                  onChange={(e) => {
                    setMonth({ val: e.target.value, err: '' })
                    setErr(false)
                    setSalary(null)
                  }}
                  defaultValue='Choose...'
                  value={month.val}
                >
                  <option hidden>Month</option>
                  {months.map((month) => {
                    return <option>{month}</option>
                  })}{' '}
                </Form.Control>
                {month.err !== '' ? (
                  <Form.Text className='error'>{month.err}</Form.Text>
                ) : (
                  <Form.Text>&nbsp;</Form.Text>
                )}
              </Col>
              <Col>
                <Form.Label>Year*</Form.Label>
                <Form.Control
                  as='select'
                  value={year.val}
                  onChange={(e) => {
                    setYear({ val: e.target.value, err: '' })
                    setErr(false)
                    setSalary(null)
                  }}
                >
                  <option hidden>Year</option>
                  {years.map((year) => {
                    return <option>{year}</option>
                  })}{' '}
                </Form.Control>
                {year.err !== '' ? (
                  <Form.Text className='error'>{year.err}</Form.Text>
                ) : (
                  <Form.Text>&nbsp;</Form.Text>
                )}
              </Col>
            </Form.Row>
            {salary ? (
              <Form.Row>
                <Col>
                  <Form.Label style={{ color: 'rgba(1, 155, 157, 1)' }}>
                    Salary:
                  </Form.Label>

                  <Form.Text>{salary.salary}</Form.Text>
                </Col>
              </Form.Row>
            ) : err ? (
              <Form.Row>
                <Col>
                  <Form.Text className='error'>
                    There is no salary in this month and year
                  </Form.Text>
                </Col>
              </Form.Row>
            ) : (
              ''
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={handleClose}
            style={{ backgroundColor: 'rgba(1, 155, 157, 1)' }}
          >
            Close
          </Button>
          <Button
            onClick={handleDoneButton}
            style={{ backgroundColor: 'rgba(1, 155, 157, 1)' }}
          >
            Done
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
