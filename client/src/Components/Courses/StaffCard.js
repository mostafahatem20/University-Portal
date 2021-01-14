import React, { useState } from 'react'
import Card from 'react-bootstrap/Card'
import '../../Stylesheets/Profiles.css'
import { useSelector } from 'react-redux'

import { Image } from 'react-bootstrap'
import DeleteIcon from '../../images/delete.png'
import DeleteModal from './DeleteInstructor'
import DeleteStaff from './DeleteStaff'
export default function ProfileCard(props) {
  const type = useSelector((state) => state.type)

  const profile = props.profile
  const [showDelete, setShowDelete] = useState(false)
  const [showDelete1, setShowDelete1] = useState(false)

  const handleCloseDelete = () => {
    setShowDelete(false)
  }
  const handleCloseDelete1 = () => {
    setShowDelete1(false)
  }
  return (
    <div>
      <table>
        <tbody>
          <tr>
            {type !== 'hr' ? (
              type === 'hod' && profile.type === 'instructor' ? (
                <td>
                  {' '}
                  <Image
                    src={DeleteIcon}
                    alt=''
                    className='DeleteIconS'
                    onClick={() => setShowDelete(true)}
                  ></Image>
                </td>
              ) : type === 'instructor' && profile.type === 'ta' ? (
                <td>
                  {' '}
                  <Image
                    src={DeleteIcon}
                    alt=''
                    className='DeleteIconS'
                    onClick={() => setShowDelete1(true)}
                  ></Image>
                </td>
              ) : (
                <td style={{ width: '3.5vw' }}></td>
              )
            ) : (
              <td style={{ width: '3.5vw' }}></td>
            )}
            <td>
              <Card className='ProfileCardS'>
                <table className='TextInsideProfileCardS'>
                  <tbody>
                    <tr>
                      <td className='ProfileCardColBigWidthS'>
                        {profile.name}
                      </td>
                      <td className='ProfileCardColWidthS'>{profile.type}</td>
                      {type === 'hr' ? (
                        <td className='ProfileCardColWidthS'>
                          {parseFloat(profile.salary).toFixed(2)}
                        </td>
                      ) : (
                        <td className='ProfileCardColWidthS'>
                          {parseFloat(profile.leaveBalance).toFixed(2)}
                        </td>
                      )}
                      <td className='ProfileCardColWidthS'>{profile.dayOff}</td>
                      <td className='ProfileCardColWidthS'>{profile.id}</td>
                      <td className='ProfileCardColWidthS'>
                        {parseFloat(profile.totalHrs).toFixed(2)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </Card>
            </td>
            <td style={{ width: '3vw' }}></td>
          </tr>
        </tbody>
      </table>
      <DeleteModal
        show={showDelete}
        handleClose={handleCloseDelete}
        reload={props.reload}
        setReload={props.setReload}
        id={profile._id}
        courseId={props.courseId}
      />
      <DeleteStaff
        show={showDelete1}
        handleClose={handleCloseDelete1}
        reload={props.reload}
        setReload={props.setReload}
        id={profile._id}
        courseId={props.courseId}
      />
    </div>
  )
}
