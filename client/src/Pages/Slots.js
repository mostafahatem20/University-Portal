import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Col, Dropdown, Modal, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import Alert from '../Components/Layout/Alert'
import ClickableSlotList from '../Components/Slots/ClickableSlotList'
import TeachingAssignments from '../Components/Slots/TeachingAssignments'
import { staffType } from '../Constants/StatusCodes'

import { backendLink } from '../keys_dev'
//make sure only the people that can do something are able to do it:

//scrolling in listviews

const Slots = (props) => {
  const errorStyle = {
    fontSize: '12px',
    fontWeight: '600',
    color: '#8a0303',
  }
  const myDepartment = useSelector((state) => state.department)
  const myType = useSelector((state) => state.type)
  const token = useSelector((state) => state.token)
  const myId = useSelector((state) => state.id)

  const [showSlotsModal, setShowSlotsModal] = useState(false)
  const [showAssignModal, setShowAssignModal] = useState(false)
  const [deleteAssignModal, setDeleteAssignModal] = useState(false)
  const [deleteSlotModal, setDeleteSlotModal] = useState(false)
  const [editAssignModal, setEditAssignModal] = useState(false)
  const [addSlotModal, setAddSlotModal] = useState(false)
  const [updateSlotModal, setUpdateSlotModal] = useState(false)
  const [updateStaffSlotId, setUpdateStaffSlotId] = useState('')

  const [updateSlotModalInfo, setUpdateSlotModalInfo] = useState({
    day: 'saturday',
    time: 1,
    location: '',
    courseName: '',
    type: 'lab',
    courseId: '',
    locationId: '',
    slotId: '',
  })
  const [pageLoading, setPageLoading] = useState(false)
  const [allSlotsLoading, setAllSlotsLoading] = useState(false)
  const [slotsLoading, setSlotsLoading] = useState(false)
  const [tALoading, setTALoading] = useState(false)
  const [locationsLoading, setLocationsLoading] = useState(false)
  const [staffInDepartmentLoading, setStaffInDepartmentLoading] = useState(
    false
  )
  const [coursesInDepartmentLoading, setCoursesInDepartmentLoading] = useState(
    false
  )
  const [alert, setAlert] = useState(false)
  const [alertMsg, setAlertMsg] = useState('')
  const [notAuthorized, setNotAuthorized] = useState(false)
  const [pageError, setPageError] = useState('')
  const [slotError, setSlotError] = useState('')
  const [assignError, setAssignError] = useState('')
  const [deleteAssignError, setDeleteAssignError] = useState('')
  const [editAssignError, setEditAssignError] = useState('')
  const [addSlotError, setAddSlotError] = useState('')
  const [updateSlotError, setUpdateSlotError] = useState('')
  const [deleteSlotError, setDeleteSlotError] = useState('')
  const [addSlotModalInfo, setAddSlotModalInfo] = useState({
    day: 'saturday',
    time: 1,
    location: '',
    staffName: '',
    courseName: '',
    type: 'lab',
    staffId: '',
    courseId: '',
    locationId: '',
  })
  const [deleteSlotModalInfo, setDeleteSlotModalInfo] = useState('')
  const [deleteSlotModalCourse, setDeleteSlotModalCoure] = useState('')
  const [updateStaffModalInfo, setUpdateStaffModalInfo] = useState({
    staffName: '',
    staffId: '',
    slotId: '',
  })
  const [deleteStaffModalInfo, setDeleteStaffModalInfo] = useState('')
  const [staffInDepartment1, setStaffIndepartment] = useState([])
  const [teachingAssignments1, setTeachingAssignments] = useState([])
  const [allSlots1, setAllSlots] = useState([])
  const [availableSlots1, setAvailableSlots] = useState([])
  const [allLocations, setAllLocations] = useState([])
  const [coursesInDepartment, setCoursesInDepartment] = useState([])
  const [assignStaffInfo, setAssignStaffInfo] = useState({
    staffName: '',
    staffId: '',
    slotId: '',
  })
  const [refresh, setRefresh] = useState(0)
  var teachingAssignmentRes = { data: [] }
  var allSlotsRes = { data: [] }
  var staffInDepartment = []
  var availableSlots = []
  const days = [
    'saturday',
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
  ]
  useEffect(() => {
    setPageError('')
    setSlotError('')
    setAssignError('')
    setAddSlotError('')
    setEditAssignError('')
    setDeleteAssignError('')
    setDeleteSlotError('')
    setUpdateSlotError('')
  }, [
    showSlotsModal,
    showAssignModal,
    editAssignModal,
    deleteAssignModal,
    updateSlotModal,
    addSlotModal,
    deleteSlotModal,
  ])
  const types = ['lab', 'lecture', 'tutorial']
  const times = [1, 2, 3, 4, 5]
  const fetchTeachingAssignments = async () => {
    try {
      myType === 'hod'
        ? (teachingAssignmentRes = await axios({
            method: 'POST',
            url: `${backendLink}/slot/viewTeachingAssignmentHOD`,
            headers: { Authorization: token },
            data: { id: myId },
          }))
        : (teachingAssignmentRes = await axios({
            method: 'POST',
            url: `${backendLink}/slot/viewTeachingAssignmentCI`,
            headers: { Authorization: token },
            data: { id: myId },
          }))
      if (teachingAssignmentRes.data.statusCode === '000')
        setTeachingAssignments(teachingAssignmentRes.data.returnData)
      else {
        setPageLoading(false)
        setPageError(teachingAssignmentRes.data.error)
        if (teachingAssignmentRes.data.statusCode === '001')
          setNotAuthorized(true)
      }
    } catch (err) {
      teachingAssignmentRes = { data: [] }
      setAllSlotsLoading(false)
      setPageError(err.message)
    }
    setTALoading(false)
  }
  const fetchAllSlots = async () => {
    try {
      myType === 'hod'
        ? (allSlotsRes = await axios({
            url: `${backendLink}/slot/viewAllDepartmentSlots`,
            headers: { Authorization: token },
            method: 'POST',
            data: { departmentId: myDepartment },
          }))
        : (allSlotsRes = await axios({
            url: `${backendLink}/slot/viewAllCoursesSlots`,
            headers: { Authorization: token },
            method: 'POST',
            data: { staffId: myId },
          }))
      if (allSlotsRes.data.statusCode === '000')
        setAllSlots(allSlotsRes.data.slots)
      else {
        setSlotError(allSlotsRes.data.error)
        setAllSlotsLoading(false)
      }
    } catch (err) {
      teachingAssignmentRes = { data: [] }
      setAllSlotsLoading(false)
      setPageError(err.message)
    }
    setSlotsLoading(false)
  }
  const fetchLocations = async () => {
    try {
      const locations = await axios({
        method: 'POST',
        url: `${backendLink}/location/viewLocations`,
        headers: { Authorization: token },
      })

      if (locations.data.statusCode === '000') {
        setAllLocations(locations.data.locations)
        setUpdateSlotModalInfo({
          ...updateSlotModalInfo,
          location: locations.data.locations[0].name,
          locationId: locations.data.locations[0]._id,
        })
        setAddSlotModalInfo({
          ...updateSlotModalInfo,
          location: locations.data.locations[0].name,
          locationId: locations.data.locations[0]._id,
        })
      } else {
        setPageLoading(false)
        setPageError(locations.data.error)
      }
    } catch (err) {
      setPageLoading(false)
      setPageError(err.message)
    }
    setLocationsLoading(false)
  }
  const fetchCoursesInDepartment = async () => {
    try {
      const courses = await axios({
        method: 'POST',
        url: `${backendLink}/course/viewCoursesInDepartment`,
        headers: { Authorization: token },
        data: { departmentId: myDepartment },
      })

      if (courses.data.statusCode === '000') {
        setCoursesInDepartment(courses.data.courses)
        setAddSlotModalInfo({
          ...addSlotModalInfo,
          courseName: courses.data.courses[0].name,
          courseId: courses.data.courses[0]._id,
        })
        setUpdateSlotModalInfo({
          ...updateSlotModalInfo,
          courseName: courses.data.courses[0].name,
          courseId: courses.data.courses[0]._id,
        })
      } else {
        setPageLoading(false)
        setPageError(courses.data.error)
      }
    } catch (err) {
      setPageLoading(false)
      setPageError(err.message)
    }
    setCoursesInDepartmentLoading(false)
  }

  const fetchStaffInDepartment = async () => {
    try {
      staffInDepartment = await axios({
        url: `${backendLink}/staff/viewStaffPerDepartment1`,
        headers: { Authorization: token },
        method: 'POST',
        data: { id: myId },
      })

      if (staffInDepartment.data.statusCode === '000') {
        staffInDepartment = staffInDepartment.data.staff
        setStaffIndepartment(staffInDepartment)
        setAssignStaffInfo({
          ...assignStaffInfo,
          staffName: staffInDepartment[0].name,
          staffId: staffInDepartment[0]._id,
        })
      } else {
        setPageError(staffInDepartment.data.error)
        setPageLoading(false)
      }
    } catch (err) {
      setPageError(err.message)
      setPageLoading(false)
    }
    setStaffInDepartmentLoading(false)
  }
  const fetchAvailableSlots = async () => {
    try {
      availableSlots =
        myType === staffType.HOD
          ? await axios({
              method: 'POST',
              url: `${backendLink}/slot/viewDepartmentSlots`,
              headers: { Authorization: token },
              data: { departmentId: myDepartment },
            })
          : await axios({
              method: 'POST',
              url: `${backendLink}/slot/viewCoursesSlots`,
              headers: { Authorization: token },
              data: { staffId: myId },
            })

      if (availableSlots.data.statusCode === '000')
        setAvailableSlots(availableSlots.data.slots)
      else {
        setPageLoading(false)
        setAssignError(availableSlots.data.error)
      }
    } catch (err) {
      setPageLoading(false)
      setAssignError(err.message)
    }
  }
  useEffect(() => {
    setPageLoading(true)
    setAllSlotsLoading(true)
    setSlotsLoading(true)
    setTALoading(true)
    setLocationsLoading(true)
    setStaffInDepartmentLoading(true)
    setCoursesInDepartmentLoading(true)
    fetchTeachingAssignments()
    fetchAllSlots()
    fetchStaffInDepartment()
    fetchAvailableSlots()
    fetchLocations()
    fetchCoursesInDepartment()
  }, [refresh])
  const titleStyle = { fontSize: '20px', fontWeight: '600' }
  const handleSelectionAddSlot = (selection) => {
    setAssignStaffInfo((previous) => {
      return { ...previous, slotId: selection }
    })
  }
  return (
    <div style={{ height: '100%' }}>
      <p
        style={{
          marginLeft: '5vw',
          marginTop: '30px',
          fontSize: '40px',
          color: '#009999',
          marginBottom: '20px',
        }}
      >
        Slot Assignments
      </p>
      <Row>
        <Col md={1}></Col>
        <Col md={10}>
          {pageLoading &&
          (locationsLoading ||
            coursesInDepartmentLoading ||
            staffInDepartmentLoading ||
            // availableSlotsLoading ||
            tALoading) ? (
            <p
              style={{
                fontSize: '20px',
                color: '#858585',
                fontWeight: '600',
                marginTop: '30px',
                marginBottom: '30px',
              }}
            >
              Loading...
            </p>
          ) : (
            <TeachingAssignments
              slots={teachingAssignments1}
              delete={(info) => {
                setDeleteStaffModalInfo(info)
                setDeleteAssignModal(true)
              }}
              edit={(info) => {
                setUpdateStaffSlotId(info.slotId)
                setUpdateStaffModalInfo({
                  staffId: info.staffId,
                  staffName: info.staffName,
                })
                setEditAssignModal(true)
              }}
              // updateInfo={updateStaffModalInfo}
            />
          )}
        </Col>
      </Row>
      <Row style={{ marginTop: '30px' }}>
        <Col sm={!notAuthorized ? 7 : 5}></Col>
        <Col>
          <p style={errorStyle}>{pageError}</p>
        </Col>
      </Row>
      <Row style={{ marginBottom: '20px' }}>
        <Col md={4}></Col>
        <Col md={2}>
          <Button
            style={{ width: '70%' }}
            variant='info'
            onClick={() => {
              setShowSlotsModal(true)
            }}
          >
            View All Slots
          </Button>
        </Col>
        {myType !== 'ta' ? (
          <Col md={2}>
            <Button
              style={{ width: '70%' }}
              variant='info'
              onClick={() => {
                setShowAssignModal(true)
              }}
            >
              Assign Staff
            </Button>
          </Col>
        ) : null}
      </Row>
      {/* Slots Modal */}
      <Modal
        size='lg'
        show={showSlotsModal}
        onHide={() => {
          setShowSlotsModal(false)
        }}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Slots</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {myType === 'ta' ? (
            <Button
              variant='info'
              onClick={() => {
                setShowSlotsModal(false)
                setAddSlotModal(true)
              }}
            >
              Add Slot
            </Button>
          ) : null}

          <Row>
            <Col md={1}></Col>
            <Col md={10}>
              {allSlotsLoading &&
              (locationsLoading ||
                coursesInDepartmentLoading ||
                staffInDepartmentLoading ||
                // availableSlotsLoading ||
                slotsLoading) ? (
                <p
                  style={{
                    fontSize: '20px',
                    color: '#858585',
                    fontWeight: '600',
                    marginTop: '30px',
                    marginBottom: '30px',
                  }}
                >
                  Loading...
                </p>
              ) : (
                <TeachingAssignments
                  delete={(info) => {
                    setDeleteSlotModalInfo(info._id)
                    setDeleteSlotModalCoure(info.courseId)
                    setShowSlotsModal(false)
                    setDeleteSlotModal(true)
                  }}
                  edit={(info) => {
                    setUpdateSlotModalInfo(info)
                    setShowSlotsModal(false)
                    setUpdateSlotModal(true)
                  }}
                  slots={allSlots1}
                  updateInfo={updateSlotModalInfo}
                  locations={allLocations}
                  courses={coursesInDepartment}
                  staff={staffInDepartment1}
                />
              )}
            </Col>
          </Row>
          <Row style={{ marginTop: '15px' }}>
            <Col sm={1}></Col>
            <Col>
              <p style={errorStyle}>{slotError}</p>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
      {/* Assign staff Modal */}
      <Modal
        size='lg'
        show={showAssignModal}
        onHide={() => {
          setShowAssignModal(false)
        }}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Assign Staff</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Dropdown>
            <Dropdown.Toggle style={{ width: '50%', marginLeft: '24%' }}>
              {assignStaffInfo.staffName}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {staffInDepartment1.map((staff) => {
                return (
                  <Dropdown.Item
                    onSelect={() => {
                      setAssignStaffInfo({
                        ...assignStaffInfo,
                        staffName: staff.name,
                        staffId: staff._id,
                      })
                    }}
                  >
                    {staff.name}
                  </Dropdown.Item>
                )
              })}
            </Dropdown.Menu>
          </Dropdown>
          <ClickableSlotList
            slots={availableSlots1}
            handleSelection={handleSelectionAddSlot}
          />
          <Row style={{ marginTop: '10px' }}>
            <Col sm={5}></Col>
            <Col>
              <p style={errorStyle}>{assignError}</p>
            </Col>
          </Row>
          <Row>
            <Col sm={5}></Col>
            <Col sm={3}>
              <Button
                onClick={async () => {
                  try {
                    const response = await axios({
                      method: 'post',
                      url: `${backendLink}/slot/assignStaff`,
                      headers: { Authorization: token },
                      data: {
                        id: assignStaffInfo.slotId,
                        staffId: assignStaffInfo.staffId,
                      },
                    })
                    if (response.data.statusCode !== '000')
                      setAssignError(response.data.error)
                    else {
                      setShowAssignModal(false)
                      setAlert(true)
                      setAlertMsg('Staff assigned successfully')
                      setRefresh(refresh + 1)
                    }
                  } catch (err) {
                    setAssignError(err.message)
                  }
                }}
              >
                Assign Staff
              </Button>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
      {/* Delete assignment Modal */}
      <Modal
        size='lg'
        show={deleteAssignModal}
        onHide={() => {
          setDeleteAssignModal(false)
        }}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete Staff Assignment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p style={{ textAlign: 'center', fontSize: '25px' }}>
            Are you sure you want to delete this record?
          </p>
          <Row style={{ marginTop: '20px', marginBottom: '10px' }}>
            <Col md={4}></Col>
            <Col>
              <p style={errorStyle}>{deleteAssignError}</p>
            </Col>
          </Row>
          <Row>
            <Col sm={4}></Col>
            <Col sm={2}>
              <Button
                onClick={async () => {
                  try {
                    const deleteAssignRes = await axios({
                      method: 'delete',
                      url: `${backendLink}/slot/deleteStaff`,
                      headers: { Authorization: token },
                      data: {
                        id: deleteStaffModalInfo.slotId,
                      },
                    })
                    if (deleteAssignRes.data.statusCode !== '000')
                      setDeleteAssignError(deleteAssignRes.data.error)
                    else {
                      setDeleteAssignModal(false)
                      setAlert(true)
                      setAlertMsg('Staff assignment deleted successfully')
                      setRefresh(refresh + 1)
                    }
                  } catch (err) {
                    setDeleteAssignError(err.message)
                  }
                }}
              >
                Delete
              </Button>
            </Col>
            <Col sm={2}>
              <Button
                variant='secondary'
                onClick={() => {
                  setDeleteAssignModal(false)
                }}
              >
                Cancel
              </Button>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
      {/* Delet Slot Modal */}
      <Modal
        size='lg'
        show={deleteSlotModal}
        onHide={() => {
          setDeleteSlotModal(false)
        }}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete Slot</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p style={{ textAlign: 'center', fontSize: '25px' }}>
            Are you sure you want to delete this record?
          </p>
          <Row style={{ marginTop: '20px', marginBottom: '10px' }}>
            <Col md={4}></Col>
            <Col>
              <p style={errorStyle}>{deleteSlotError}</p>
            </Col>
          </Row>
          <Row>
            <Col sm={4}></Col>
            <Col sm={2}>
              <Button
                onClick={async () => {
                  try {
                    const deleteSlotRes = await axios({
                      method: 'delete',
                      url: `${backendLink}/slot/deleteSlot`,
                      headers: { Authorization: token },
                      data: {
                        id: deleteSlotModalInfo,
                        courseId: deleteSlotModalCourse,
                      },
                    })
                    if (deleteSlotRes.data.statusCode !== '000')
                      setDeleteSlotError(deleteSlotRes.data.error)
                    else {
                      setDeleteSlotModal(false)
                      setAlert(true)
                      setAlertMsg('Slot deleted successfully')
                      setRefresh(refresh + 1)
                    }
                  } catch (err) {
                    setDeleteSlotError(err.message)
                  }
                }}
              >
                Delete
              </Button>
            </Col>
            <Col sm={2}>
              <Button
                variant='secondary'
                onClick={() => {
                  setDeleteSlotModal(false)
                }}
              >
                Cancel
              </Button>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
      {/* Add slot Modal */}
      <Modal
        size='lg'
        show={addSlotModal}
        onHide={() => {
          setAddSlotModal(false)
          setAddSlotModalInfo({
            day: 'saturday',
            time: 1,
            location: '',
            staffName: '',
            courseName: '',
            type: 'lab',
            staffId: '',
            courseId: '',
            locationId: '',
          })
        }}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Slot</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col sm={1}></Col>
            <Col sm={2}>
              <p style={titleStyle}>Day </p>
            </Col>
            <Col>
              <Dropdown>
                <Dropdown.Toggle style={{ width: '50%', marginLeft: '24%' }}>
                  {addSlotModalInfo.day}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {days.map((day) => {
                    return (
                      <Dropdown.Item
                        onSelect={() => {
                          setAddSlotModalInfo({
                            ...addSlotModalInfo,
                            day: day,
                          })
                        }}
                      >
                        {day}
                      </Dropdown.Item>
                    )
                  })}
                </Dropdown.Menu>
              </Dropdown>
            </Col>
          </Row>
          <Row>
            <Col sm={1}></Col>
            <Col sm={2}>
              <p style={titleStyle}>Time </p>
            </Col>
            <Col>
              <Dropdown>
                <Dropdown.Toggle style={{ width: '50%', marginLeft: '24%' }}>
                  {addSlotModalInfo.time}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {times.map((time) => {
                    return (
                      <Dropdown.Item
                        onSelect={() => {
                          setAddSlotModalInfo({
                            ...addSlotModalInfo,
                            time: time,
                          })
                        }}
                      >
                        {time}
                      </Dropdown.Item>
                    )
                  })}
                </Dropdown.Menu>
              </Dropdown>
            </Col>
          </Row>
          <Row>
            <Col sm={1}></Col>
            <Col sm={2}>
              <p style={titleStyle}>Type </p>
            </Col>
            <Col>
              <Dropdown>
                <Dropdown.Toggle style={{ width: '50%', marginLeft: '24%' }}>
                  {addSlotModalInfo.type}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {types.map((type) => {
                    return (
                      <Dropdown.Item
                        onSelect={() => {
                          setAddSlotModalInfo({
                            ...addSlotModalInfo,
                            type: type,
                          })
                        }}
                      >
                        {type}
                      </Dropdown.Item>
                    )
                  })}
                </Dropdown.Menu>
              </Dropdown>
            </Col>
          </Row>
          <Row>
            <Col sm={1}></Col>
            <Col sm={2}>
              <p style={titleStyle}>Staff</p>
            </Col>
            <Col>
              <Dropdown>
                <Dropdown.Toggle style={{ width: '50%', marginLeft: '24%' }}>
                  {addSlotModalInfo.staffName}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {staffInDepartment1.map((staff) => {
                    return (
                      <Dropdown.Item
                        onSelect={() => {
                          setAddSlotModalInfo({
                            ...addSlotModalInfo,
                            staffId: staff._id,
                            staffName: staff.name,
                          })
                        }}
                      >
                        {staff.name}
                      </Dropdown.Item>
                    )
                  })}
                </Dropdown.Menu>
              </Dropdown>
            </Col>
          </Row>
          <Row>
            <Col sm={1}></Col>
            <Col sm={2}>
              <p style={titleStyle}>Course </p>
            </Col>
            <Col>
              <Dropdown>
                <Dropdown.Toggle style={{ width: '50%', marginLeft: '24%' }}>
                  {addSlotModalInfo.courseName}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {coursesInDepartment.map((course) => {
                    return (
                      <Dropdown.Item
                        onSelect={() => {
                          setAddSlotModalInfo({
                            ...addSlotModalInfo,
                            courseId: course._id,
                            courseName: course.name,
                          })
                        }}
                      >
                        {course.name}
                      </Dropdown.Item>
                    )
                  })}
                </Dropdown.Menu>
              </Dropdown>
            </Col>
          </Row>
          <Row>
            <Col sm={1}></Col>
            <Col sm={2}>
              <p style={titleStyle}>Location </p>
            </Col>
            <Col>
              <Dropdown>
                <Dropdown.Toggle style={{ width: '50%', marginLeft: '24%' }}>
                  {addSlotModalInfo.location}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {allLocations.map((location) => {
                    return (
                      <Dropdown.Item
                        onSelect={() => {
                          setAddSlotModalInfo({
                            ...addSlotModalInfo,
                            location: location.name,
                            locationId: location._id,
                          })
                        }}
                      >
                        {location.name}
                      </Dropdown.Item>
                    )
                  })}
                </Dropdown.Menu>
              </Dropdown>
            </Col>
          </Row>
          <Row>
            <Col sm={5}></Col>
            <Col sm={1}>
              <Button
                onClick={async () => {
                  try {
                    let data
                    if (addSlotModalInfo.staffId) {
                      data = {
                        type: addSlotModalInfo.type,
                        day: addSlotModalInfo.day,
                        time: addSlotModalInfo.time,
                        locationId: addSlotModalInfo.locationId,
                        courseId: addSlotModalInfo.courseId,
                        staffId: addSlotModalInfo.staffId,
                      }
                    } else {
                      data = {
                        type: addSlotModalInfo.type,
                        day: addSlotModalInfo.day,
                        time: addSlotModalInfo.time,
                        locationId: addSlotModalInfo.locationId,
                        courseId: addSlotModalInfo.courseId,
                      }
                    }
                    const addSlotRes = await axios({
                      data,
                      method: 'POST',
                      url: `${backendLink}/slot/addSlot`,
                      headers: { Authorization: token },
                    })
                    if (addSlotRes.data.statusCode !== '000')
                      setAddSlotError(addSlotRes.data.error)
                    else {
                      setAddSlotModalInfo({
                        day: 'saturday',
                        time: 1,
                        location: '',
                        staffName: '',
                        courseName: '',
                        type: 'lab',
                        staffId: '',
                        courseId: '',
                        locationId: '',
                      })
                      setAddSlotModal(false)
                      setAlert(true)
                      setAlertMsg('Slot added successfully')
                      setRefresh(refresh + 1)
                    }
                  } catch (err) {
                    setAddSlotError(err.message)
                  }
                }}
              >
                Add
              </Button>
            </Col>
            <Col sm={1}></Col>
            <Col sm={1}>
              <Button
                onClick={() => {
                  setAddSlotModal(false)
                  setAddSlotModalInfo({
                    day: 'saturday',
                    time: 1,
                    location: '',
                    staffName: '',
                    courseName: '',
                    type: 'lab',
                    staffId: '',
                    courseId: '',
                    locationId: '',
                  })
                }}
              >
                Cancel
              </Button>
            </Col>
          </Row>
          <Row style={{ marginTop: '10px', marginBottom: '5px' }}>
            <Col md={4}></Col>
            <Col>
              <p style={errorStyle}>{addSlotError}</p>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
      {/* edit assign Modal */}
      <Modal
        size='lg'
        show={editAssignModal}
        onHide={() => {
          setEditAssignModal(false)
        }}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Slot Assignment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Dropdown>
            <Dropdown.Toggle style={{ width: '50%', marginLeft: '24%' }}>
              {updateStaffModalInfo.staffName}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {staffInDepartment1.map((staff) => {
                return (
                  <Dropdown.Item
                    onSelect={() => {
                      setUpdateStaffModalInfo({
                        ...assignStaffInfo,
                        staffName: staff.name,
                        staffId: staff._id,
                      })
                    }}
                  >
                    {staff.name}
                  </Dropdown.Item>
                )
              })}
            </Dropdown.Menu>
          </Dropdown>
          <Row style={{ marginTop: '20px' }}>
            <Col sm={3}></Col>
            <Col sm={1}>
              <Button
                onClick={async () => {
                  try {
                    const editAssignRes = await axios({
                      method: 'put',
                      url: `${backendLink}/slot/updateStaff`,
                      headers: { Authorization: token },
                      data: {
                        id: updateStaffSlotId,
                        staffId: updateStaffModalInfo.staffId,
                      },
                    })
                    if (editAssignRes.data.statusCode !== '000')
                      setEditAssignError(editAssignRes.data.error)
                    else {
                      setEditAssignModal(false)
                      setAlert(true)
                      setAlertMsg('Staff updated successfully')
                      setRefresh(refresh + 1)
                    }
                  } catch (err) {
                    setEditAssignError(err.message)
                  }
                }}
              >
                Update
              </Button>
            </Col>
            <Col sm={3}></Col>
            <Col sm={1}>
              <Button
                variant='secondary'
                onClick={() => {
                  setEditAssignModal(false)
                }}
              >
                Cancel
              </Button>
            </Col>
          </Row>
          <p style={errorStyle}>{editAssignError}</p>
        </Modal.Body>
      </Modal>
      {/* update Slot Modal */}
      <Modal
        size='lg'
        show={updateSlotModal}
        onHide={() => {
          setUpdateSlotModal(false)
        }}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Slot</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col sm={1}></Col>
            <Col sm={2}>
              <p style={titleStyle}>Day </p>
            </Col>
            <Col>
              <Dropdown>
                <Dropdown.Toggle style={{ width: '50%', marginLeft: '24%' }}>
                  {updateSlotModalInfo.day}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {days.map((day) => {
                    return (
                      <Dropdown.Item
                        onSelect={() => {
                          setUpdateSlotModalInfo({
                            ...updateSlotModalInfo,
                            day: day,
                          })
                        }}
                      >
                        {day}
                      </Dropdown.Item>
                    )
                  })}
                </Dropdown.Menu>
              </Dropdown>
            </Col>
          </Row>
          <Row>
            <Col sm={1}></Col>
            <Col sm={2}>
              <p style={titleStyle}>Time </p>
            </Col>
            <Col>
              <Dropdown>
                <Dropdown.Toggle style={{ width: '50%', marginLeft: '24%' }}>
                  {updateSlotModalInfo.time}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {times.map((time) => {
                    return (
                      <Dropdown.Item
                        onSelect={() => {
                          setUpdateSlotModalInfo({
                            ...updateSlotModalInfo,
                            time: time,
                          })
                        }}
                      >
                        {time}
                      </Dropdown.Item>
                    )
                  })}
                </Dropdown.Menu>
              </Dropdown>
            </Col>
          </Row>
          <Row>
            <Col sm={1}></Col>
            <Col sm={2}>
              <p style={titleStyle}>Type </p>
            </Col>
            <Col>
              <Dropdown>
                <Dropdown.Toggle style={{ width: '50%', marginLeft: '24%' }}>
                  {updateSlotModalInfo.type}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {types.map((type) => {
                    return (
                      <Dropdown.Item
                        onSelect={() => {
                          setUpdateSlotModalInfo({
                            ...updateSlotModalInfo,
                            type: type,
                          })
                        }}
                      >
                        {type}
                      </Dropdown.Item>
                    )
                  })}
                </Dropdown.Menu>
              </Dropdown>
            </Col>
          </Row>

          <Row>
            <Col sm={1}></Col>
            <Col sm={2}>
              <p style={titleStyle}>Course </p>
            </Col>
            <Col>
              <Dropdown>
                <Dropdown.Toggle style={{ width: '50%', marginLeft: '24%' }}>
                  {updateSlotModalInfo.courseName}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {coursesInDepartment.map((course) => {
                    return (
                      <Dropdown.Item
                        onSelect={() => {
                          setUpdateSlotModalInfo({
                            ...updateSlotModalInfo,
                            courseId: course._id,
                            courseName: course.name,
                          })
                        }}
                      >
                        {course.name}
                      </Dropdown.Item>
                    )
                  })}
                </Dropdown.Menu>
              </Dropdown>
            </Col>
          </Row>
          <Row>
            <Col sm={1}></Col>
            <Col sm={2}>
              <p style={titleStyle}>Location </p>
            </Col>
            <Col>
              <Dropdown>
                <Dropdown.Toggle style={{ width: '50%', marginLeft: '24%' }}>
                  {updateSlotModalInfo.location}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {allLocations.map((location) => {
                    return (
                      <Dropdown.Item
                        onSelect={() => {
                          setUpdateSlotModalInfo({
                            ...updateSlotModalInfo,
                            location: location.name,
                            locationId: location._id,
                          })
                        }}
                      >
                        {location.name}
                      </Dropdown.Item>
                    )
                  })}
                </Dropdown.Menu>
              </Dropdown>
            </Col>
          </Row>
          <Row style={{ marginTop: '15px' }}>
            <Col sm={5}></Col>
            <Col sm={1}>
              <Button
                onClick={async () => {
                  try {
                    const updateSlotRes = await axios({
                      data: {
                        id: updateSlotModalInfo.slotId,
                        type: updateSlotModalInfo.type,
                        day: updateSlotModalInfo.day,
                        time: updateSlotModalInfo.time,
                        locationId: updateSlotModalInfo.locationId,
                        courseId: updateSlotModalInfo.courseId,
                      },
                      method: 'PUT',
                      url: `${backendLink}/slot/updateSlot`,
                      headers: { Authorization: token },
                    })
                    if (updateSlotRes.data.statusCode !== '000')
                      setUpdateSlotError(updateSlotRes.data.error)
                    else {
                      setUpdateSlotModal(false)
                      setAlert(true)
                      setAlertMsg('Slot updated successfully')
                      setRefresh(refresh + 1)
                    }
                  } catch (err) {
                    setUpdateSlotError(err.message)
                  }
                }}
              >
                Update
              </Button>
            </Col>
            <Col sm={1}></Col>
            <Col sm={1}>
              <Button
                variant='secondary'
                onClick={() => {
                  setUpdateSlotModal(false)
                }}
              >
                Cancel
              </Button>
            </Col>
          </Row>
          <Row style={{ marginTop: '10px', marginBottom: '5px' }}>
            <Col md={4}></Col>
            <Col>
              <p style={errorStyle}>{updateSlotError}</p>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
      <Alert
        msg={alertMsg}
        showAlert={alert}
        handleClose={() => {
          setAlert(false)
        }}
        severity='success'
      />
    </div>
  )
}

export default Slots
