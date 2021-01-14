import React, { useState } from 'react'
import Card from 'react-bootstrap/Card'
import '../../Stylesheets/Profiles.css'
import { useHistory } from 'react-router'
import { useSelector } from 'react-redux'

import { Image } from 'react-bootstrap'
import DeleteIcon from '../../images/delete.png'
import ViewMore from '../../images/viewMore.png'
import DeleteModal from './DeleteProfileModal'

export default function ProfileCard(props) {
  const type = useSelector((state) => state.type)

  const history = useHistory()
  const profile = props.profile
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
              <td></td>
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
            {type === 'hr' || type === 'hod' || type === 'instructor' ? (
              <td>
                <Image
                  src={ViewMore}
                  alt=''
                  className='ViewMoreIconS'
                  onClick={() => {
                    history.push({
                      pathname: '/profileDetailed',
                      state: profile,
                    })
                  }}
                ></Image>
              </td>
            ) : (
              <td></td>
            )}
          </tr>
        </tbody>
      </table>
      <DeleteModal
        show={showDelete}
        handleClose={handleCloseDelete}
        reload={props.reload}
        setReload={props.setReload}
        id={profile._id}
      />
    </div>
  )
}
