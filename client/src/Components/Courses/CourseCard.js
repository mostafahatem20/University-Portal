import React, { useState } from 'react'
import Card from 'react-bootstrap/Card'
import '../../Stylesheets/Profiles.css'
import { Image } from 'react-bootstrap'
import DeleteIcon from '../../images/delete.png'
import ViewMore from '../../images/viewMore.png'
import DeleteModal from './DeleteCourse'
import { useHistory } from 'react-router'
import { useSelector } from 'react-redux'

export default function ProfileCard(props) {
  const course = props.course
  const type = useSelector((state) => state.type)
  const history = useHistory()
  const [showDelete, setShowDelete] = useState(false)
  const handleCloseDelete = () => {
    setShowDelete(false)
  }

  return (
    <div>
      <table>
        <tbody>
          <tr>
            {type === 'hr' ? (
              <td>
                {' '}
                <Image
                  src={DeleteIcon}
                  alt=''
                  className='DeleteIconS'
                  onClick={() => setShowDelete(true)}
                ></Image>
              </td>
            ) : (
              <td style={{ width: '3.5vw' }}></td>
            )}
            <td>
              <Card className='ProfileCardS' style={{ width: '65vw' }}>
                <table
                  className='TextInsideProfileCardS'
                  style={{ textAlign: 'left' }}
                >
                  <tbody>
                    <tr>
                      <td style={{ width: '15vw', paddingLeft: '1vw' }}>
                        {course && course.name}
                      </td>
                      <td style={{ width: '5vw' }}>
                        {course && course.numberOfSlots}
                      </td>
                      <td style={{ width: '15vw' }}>
                        {course &&
                          course.coordinator &&
                          course.coordinator.name}
                      </td>
                      <td style={{ width: '15vw' }}>
                        {' '}
                        {course && course.department && course.department.name}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </Card>
            </td>
            {type === 'ta' ? (
              <td style={{ width: '3.5vw' }}></td>
            ) : (
              <td>
                <Image
                  src={ViewMore}
                  alt=''
                  className='ViewMoreIconS'
                  onClick={() => history.push('/courses/' + course.id)}
                ></Image>
              </td>
            )}
          </tr>
        </tbody>
      </table>
      <DeleteModal
        show={showDelete}
        handleClose={handleCloseDelete}
        reload={props.reload}
        setReload={props.setReload}
        id={course.id}
      />
    </div>
  )
}
