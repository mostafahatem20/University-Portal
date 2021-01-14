import React, { useState, useEffect } from 'react'
import { Modal, Button, Form, Col } from 'react-bootstrap'
import axios from 'axios'
import { backendLink } from '../../keys_dev'
import { useSelector } from 'react-redux'
import Alert from '../Layout/Alert'
export default function AddCourse(props) {
  const token = useSelector((state) => state.token)
  const id = useSelector((state) => state.id)
  const [snackMsg, setSnackMsg] = useState('')
  var officeId = ''
  var departmentId = ''
  const [name, setName] = useState(
    props.add
      ? { val: '', err: '' }
      : { val: props.profile.name && props.profile.name, err: '' }
  )
  const [email, setEmail] = useState(
    props.add
      ? { val: '', err: '' }
      : { val: props.profile.email && props.profile.email, err: '' }
  )
  const [department, setDepartment] = useState(
    props.add
      ? { val: '', err: '' }
      : props.profile.department
      ? { val: props.deptName && props.deptName, err: '' }
      : { val: '', err: '' }
  )
  const [officeLocation, setOfficeLocation] = useState(
    props.add
      ? { val: '', err: '' }
      : { val: props.locName && props.locName, err: '' }
  )
  const [salary, setSalary] = useState(
    props.add
      ? { val: '', err: '' }
      : { val: props.profile.salary && props.profile.salary, err: '' }
  )
  const [type, setType] = useState(
    props.add
      ? { val: '', err: '' }
      : { val: props.profile.type && props.profile.type, err: '' }
  )
  const [gender, setGender] = useState(
    props.add
      ? { val: '', err: '' }
      : props.profile.gender
      ? { val: props.profile.gender && props.profile.gender, err: '' }
      : { val: '', err: '' }
  )
  const [dayOff, setDayOff] = useState(
    props.add
      ? { val: '', err: '' }
      : { val: props.profile.dayOff && props.profile.dayOff, err: '' }
  )
  useEffect(() => {
    if (!props.add && props.profile) {
      setName({ val: props.profile.name && props.profile.name, err: '' })
      setEmail({ val: props.profile.email && props.profile.email, err: '' })
      setDepartment({ val: props.deptName && props.deptName, err: '' })
      setOfficeLocation({ val: props.locName && props.locName, err: '' })
      setType({ val: props.profile.type && props.profile.type, err: '' })
      setSalary({ val: props.profile.salary && props.profile.salary, err: '' })
      setGender({ val: props.profile.gender && props.profile.gender, err: '' })
      setDayOff({ val: props.profile.dayOff && props.profile.dayOff, err: '' })
    }
  }, [props])
  const [departmentsArr, setDepartmentsArr] = useState([''])
  const [officeLocationsArr, setOfficeLocationsArr] = useState([])
  const typesArr = ['hr', 'hod', 'instructor', 'ta']
  const genderArr = ['male', 'female']
  const [dayOffArr, setDayOffArr] = useState([
    'saturday',
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
  ])

  const [deptDis, setDeptDis] = useState(
    props.profile && props.profile,
    type === 'hr' ? true : false
  )

  const [showAlert, setShowAlert] = useState(false)

  useEffect(() => {
    axios({
      url: `${backendLink}/department/getDepartments`,
      method: 'POST',
      headers: {
        authorization: token,
      },
    })
      .then((res) => {
        if (res.data.statusCode === '000') {
          let dept = ['None']
          dept = dept.concat(res.data.departments)
          setDepartmentsArr(dept)
        }
      })
      .catch((err) => {
        console.log(err)
      })
    axios({
      url: `${backendLink}/location/getLocations`,
      method: 'GET',
      headers: {
        authorization: token,
      },
    })
      .then((res) => {
        if (res.data.statusCode === '000') {
          setOfficeLocationsArr(res.data.locations)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }, [props.show, token])

  const handleClose = () => {
    if (props.add) {
      setName({ val: '', err: '' })
      setEmail({ val: '', err: '' })
      setDepartment({ val: '', err: '' })
      setOfficeLocation({ val: '', err: '' })
      setSalary({ val: '', err: '' })
      setType({ val: '', err: '' })
      setGender({ val: '', err: '' })
      setDayOff({ val: '', err: '' })
    }
    props.onHide()
  }

  const handleDoneButton = async () => {
    for (let i = 0; i < officeLocationsArr.length; i++) {
      if (officeLocationsArr[i].name === officeLocation.val) {
        officeId = officeLocationsArr[i]._id
        break
      }
    }
    if (department.val !== '') {
      for (let i = 0; i < departmentsArr.length; i++) {
        if (departmentsArr[i].name === department.val) {
          departmentId = departmentsArr[i]._id
          break
        }
      }
    }
    if (props.add) {
      var sentData = {
        email: email.val,
        name: name.val,
        officeLocation: officeId && officeId,
        salary: Number(salary.val),
        type: type.val,
        dayOff: dayOff.val,
      }
      if (department.val !== '') {
        sentData = { ...sentData, department: departmentId }
      }

      if (gender.val !== '') {
        sentData = { ...sentData, gender: gender.val }
      }
      await axios({
        url: `${backendLink}/staff/addStaff`,
        method: 'POST',
        headers: {
          authorization: token,
        },
        data: sentData,
      })
        .then((res) => {
          if (res.data.statusCode === '000') {
            setSnackMsg('Staff Added Successfully')
            setShowAlert(true)
            handleClose()
            if (props.setReload) {
              props.setReload(!props.reload)
            }
          } else if (res.data.statusCode === '003') {
            let x = res.data.error.split('"')
            switch (x[1]) {
              case 'email':
                setEmail({ ...email, err: res.data.error })
                break
              case 'name':
                setName({ ...name, err: res.data.error })
                break
              case 'officeLocation':
                setOfficeLocation({ ...officeLocation, err: res.data.error })
                break
              case 'salary':
                setSalary({
                  ...salary,
                  err: res.data.error,
                })
                break
              case 'type':
                setType({ ...type, err: res.data.error })
                break
              case 'dayOff':
                setDayOff({ ...dayOff, err: res.data.error })
                break
              case 'department':
                setDepartment({ ...department, err: res.data.error })
                break
              case 'gender':
                setGender({ ...gender, err: res.data.error })
                break
              default:
                break
            }
          } else if (res.data.statusCode === '013') {
            setOfficeLocation({ ...officeLocation, err: res.data.error })
          } else if (res.data.statusCode === '011') {
            setEmail({ ...email, err: res.data.error })
          } else if (res.data.statusCode === '111') {
            setDepartment({ ...department, err: res.data.error })
          } else if (
            res.data.statusCode === '071' ||
            res.data.statusCode === '44'
          ) {
            setDepartment({ ...department, err: res.data.error })
          } else if (res.data.statusCode === '012') {
            setOfficeLocation({ ...officeLocation, err: res.data.error })
          }
        })
        .catch((err) => {
          console.log(err)
        })
    } else {
      if (
        email.val === props.profile.email &&
        name.val === props.profile.name &&
        email.department === props.profile.department &&
        salary.val === props.profile.salary &&
        gender.val === props.profile.salary &&
        dayOff.val === props.profile.dayOff
      ) {
        setShowAlert(true)
        handleClose()
      } else {
        sentData = {}
        if (email.val !== props.profile.email) sentData.email = email.val
        if (name.val !== props.profile.name) sentData.name = name.val
        if (salary.val !== props.profile.salary) sentData.salary = salary.val
        if (props.profile.department) {
          if (
            departmentId !== props.profile.department &&
            departmentId !== '' &&
            departmentId
          ) {
            sentData.department = departmentId
          }
        }
        if (dayOff.val !== props.profile.dayOff) sentData.dayOff = dayOff.val

        if (gender.val !== props.profile.gender && gender !== '' && gender) {
          sentData.gender = gender.val
        }

        sentData.staffId = props.profile._id && props.profile._id

        await axios({
          url: `${backendLink}/staff/updateProfile`,
          method: 'PUT',
          headers: {
            authorization: token,
          },
          data: sentData,
        })
          .then((res) => {
            if (res.data.statusCode === '000') {
              setSnackMsg('Staff Updated Successfully')
              props.setProfile(res.data.staff)
              setShowAlert(true)
              handleClose()
            } else if (res.data.statusCode === '003') {
              let x = res.data.error.split('"')
              switch (x[1]) {
                case 'email':
                  setEmail({ ...email, err: res.data.error })
                  break
                case 'name':
                  setName({ ...name, err: res.data.error })
                  break
                case 'officeLocation':
                  setOfficeLocation({ ...officeLocation, err: res.data.error })
                  break
                case 'salary':
                  setSalary({
                    ...salary,
                    err: res.data.error,
                  })
                  break
                case 'type':
                  setType({ ...type, err: res.data.error })
                  break
                case 'dayOff':
                  setDayOff({ ...dayOff, err: res.data.error })
                  break
                case 'department':
                  setDepartment({ ...department, err: res.data.error })
                  break
                case 'gender':
                  setGender({ ...gender, err: res.data.error })
                  break
                default:
                  break
              }
            } else if (res.data.statusCode === '013') {
              setOfficeLocation({ ...officeLocation, err: res.data.error })
            } else if (res.data.statusCode === '011') {
              setEmail({ ...email, err: res.data.error })
            } else if (
              res.data.statusCode === '111' ||
              res.data.statusCode === '44'
            ) {
              setDepartment({ ...department, err: res.data.error })
            } else if (res.data.statusCode === '071') {
              setDepartment({ ...department, err: res.data.error })
            } else if (res.data.statusCode === '012') {
              setOfficeLocation({ ...officeLocation, err: res.data.error })
            }
          })
          .catch((err) => {
            console.log(err)
          })
      }
    }
  }
  const handleSelectType = (e) => {
    setType({ val: e.target.value, err: '' })
    if (e.target.value === 'hr') {
      setDeptDis(true)
      setDayOffArr(['saturday'])
    } else {
      setDeptDis(false)
      setDayOffArr([
        'saturday',
        'sunday',
        'monday',
        'tuesday',
        'wednesday',
        'thursday',
      ])
    }
  }

  return (
    <>
      <Modal
        show={props.show}
        onHide={handleClose}
        size='lg'
        aria-labelledby='contained-modal-title-vcenter'
        centered
      >
        <Modal.Header closeButton onHide={handleClose}>
          {props.add ? (
            <Modal.Title
              id='contained-modal-title-vcenter'
              style={{ color: 'rgba(1, 155, 157, 1)' }}
            >
              Add Staff
            </Modal.Title>
          ) : (
            <Modal.Title
              id='contained-modal-title-vcenter'
              style={{ color: 'rgba(1, 155, 157, 1)' }}
            >
              Update Staff
            </Modal.Title>
          )}
        </Modal.Header>
        {props.profile && props.profile._id === id ? (
          <Modal.Body>
            <Form style={{ padding: '1vw' }}>
              <Form.Row style={{ paddingBottom: '1vw' }}>
                <Col>
                  <Form.Label>Staff Name*</Form.Label>
                  <Form.Control
                    type='text'
                    onChange={(e) => {
                      setName({ val: e.target.value, err: '' })
                    }}
                    value={name.val}
                  />
                  {name.err !== '' ? (
                    <Form.Text className='error'>{name.err}</Form.Text>
                  ) : (
                    <Form.Text>&nbsp;</Form.Text>
                  )}
                </Col>
                <Col>
                  <Form.Label>Email*</Form.Label>
                  <Form.Control
                    type='text'
                    onChange={(e) => {
                      setEmail({ val: e.target.value, err: '' })
                    }}
                    value={email.val}
                  />
                  {email.err !== '' ? (
                    <Form.Text className='error'>{email.err}</Form.Text>
                  ) : (
                    <Form.Text>&nbsp;</Form.Text>
                  )}
                </Col>
              </Form.Row>
            </Form>
          </Modal.Body>
        ) : (
          <Modal.Body>
            <Form style={{ padding: '1vw' }}>
              <Form.Row style={{ paddingBottom: '1vw' }}>
                <Col>
                  <Form.Label>Staff Name*</Form.Label>
                  <Form.Control
                    type='text'
                    onChange={(e) => {
                      setName({ val: e.target.value, err: '' })
                    }}
                    value={name.val}
                  />
                  {name.err !== '' ? (
                    <Form.Text className='error'>{name.err}</Form.Text>
                  ) : (
                    <Form.Text>&nbsp;</Form.Text>
                  )}
                </Col>
                <Col>
                  <Form.Label>Email*</Form.Label>
                  <Form.Control
                    type='text'
                    onChange={(e) => {
                      setEmail({ val: e.target.value, err: '' })
                    }}
                    value={email.val}
                  />
                  {email.err !== '' ? (
                    <Form.Text className='error'>{email.err}</Form.Text>
                  ) : (
                    <Form.Text>&nbsp;</Form.Text>
                  )}
                </Col>
              </Form.Row>
              <Form.Row style={{ paddingBottom: '1vw' }}>
                <Col>
                  <Form.Label>Department</Form.Label>
                  <Form.Control
                    as='select'
                    onChange={(e) => {
                      setDepartment({ val: e.target.value, err: '' })
                    }}
                    defaultValue='Choose...'
                    value={department.val}
                    disabled={deptDis}
                  >
                    <option hidden>Choose...</option>
                    {departmentsArr.map((depart) => {
                      return <option>{depart.name}</option>
                    })}{' '}
                  </Form.Control>
                  {department.err !== '' ? (
                    <Form.Text className='error'>{department.err}</Form.Text>
                  ) : (
                    <Form.Text>&nbsp;</Form.Text>
                  )}
                </Col>
                <Col>
                  <Form.Label>Office Location*</Form.Label>
                  <Form.Control
                    as='select'
                    onChange={(e) => {
                      setOfficeLocation({ val: e.target.value, err: '' })
                    }}
                    defaultValue='Choose...'
                    value={officeLocation.val}
                    disabled={!props.add}
                  >
                    <option hidden>Choose...</option>
                    {officeLocationsArr.map((office) => {
                      return <option>{office.name}</option>
                    })}{' '}
                  </Form.Control>
                  {officeLocation.err !== '' ? (
                    <Form.Text className='error'>
                      {officeLocation.err}
                    </Form.Text>
                  ) : (
                    <Form.Text>&nbsp;</Form.Text>
                  )}
                </Col>
              </Form.Row>
              <Form.Row style={{ paddingBottom: '1vw' }}>
                <Col>
                  <Form.Label>Salary*</Form.Label>
                  <Form.Control
                    type='text'
                    onChange={(e) => {
                      setSalary({ val: e.target.value, err: '' })
                    }}
                    value={salary.val}
                    disabled={props.fromMine}
                  />
                  {salary.err !== '' ? (
                    <Form.Text className='error'>{salary.err}</Form.Text>
                  ) : (
                    <Form.Text>&nbsp;</Form.Text>
                  )}
                </Col>
                <Col>
                  <Form.Label>Type*</Form.Label>
                  <Form.Control
                    as='select'
                    onChange={handleSelectType}
                    defaultValue='Choose...'
                    value={type.val}
                    disabled={!props.add}
                  >
                    <option hidden>Choose...</option>
                    {typesArr.map((type) => {
                      return <option>{type}</option>
                    })}{' '}
                  </Form.Control>
                  {type.err !== '' ? (
                    <Form.Text className='error'>{type.err}</Form.Text>
                  ) : (
                    <Form.Text>&nbsp;</Form.Text>
                  )}
                </Col>
              </Form.Row>
              <Form.Row style={{ paddingBottom: '1vw' }}>
                <Col>
                  <Form.Label>Gender</Form.Label>
                  <Form.Control
                    as='select'
                    onChange={(e) => {
                      setGender({ val: e.target.value, err: '' })
                    }}
                    defaultValue='Choose...'
                    value={gender.val}
                  >
                    <option hidden>Choose...</option>
                    {genderArr.map((type) => {
                      return <option>{type}</option>
                    })}{' '}
                  </Form.Control>
                  {gender.err !== '' ? (
                    <Form.Text className='error'>{gender.err}</Form.Text>
                  ) : (
                    <Form.Text>&nbsp;</Form.Text>
                  )}
                </Col>
                <Col>
                  <Form.Label>Day Off*</Form.Label>
                  <Form.Control
                    as='select'
                    onChange={(e) => {
                      setDayOff({ val: e.target.value, err: '' })
                    }}
                    defaultValue='Choose...'
                    value={dayOff.val}
                  >
                    <option hidden>Choose...</option>
                    {dayOffArr.map((dayOffss) => {
                      return <option>{dayOffss}</option>
                    })}{' '}
                  </Form.Control>
                  {dayOff.err !== '' ? (
                    <Form.Text className='error'>{dayOff.err}</Form.Text>
                  ) : (
                    <Form.Text>&nbsp;</Form.Text>
                  )}
                </Col>
              </Form.Row>
            </Form>
          </Modal.Body>
        )}

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
      <Alert
        showAlert={showAlert}
        msg={snackMsg}
        severity='success'
        handleClose={() => setShowAlert(false)}
      />
    </>
  )
}
