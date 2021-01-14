import React, { useState } from 'react'
import Card from 'react-bootstrap/Card'
import '../../Stylesheets/Profiles.css'
import { Image } from 'react-bootstrap'
import DeleteIcon from '../../images/delete.png'
import EditIcon from '../../images/editIcon.png'
import DeleteModal from './DeleteFaculty'
import UpdateFaculty from '../Faculties/AddFaculty'
export default function Faculty(props) {
  const Faculty = props.faculty

  const [showDelete, setShowDelete] = useState(false)
  const [showEdit, setShowEdit] = useState(false)
  const handleCloseDelete = () => {
    setShowDelete(false)
  }
  const handleCloseUpdate = () => {
    setShowEdit(false)
  }

  return (
    <div>
      <table>
        <tbody>
          <tr>
            <td>
              <Card
                className='ProfileCardJ'
                style={{ width: '45vw', marginLeft: '6.5vw' }}
              >
                <table
                  className='TextInsideProfileCardS'
                  style={{ textAlign: 'left' }}
                >
                  <tbody>
                    <tr>
                      <td style={{ width: '18.5vw', paddingLeft: '2vw' }}>
                        {Faculty && Faculty.name}
                      </td>
                      <td
                        style={{
                          width: '30vw',
                          fontSize: '0.7vw',
                          fontWeight: 'bold',
                        }}
                      >
                        {Faculty && Faculty._id}
                      </td>
                      <td style={{ width: '28vw' }}>
                        {Faculty && Faculty.numberOfStudents}
                      </td>
                      <td style={{ width: '18vw' }}>
                        {Faculty && Faculty.building}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </Card>
            </td>
            <td>
              {' '}
              <Image
                src={DeleteIcon}
                alt=''
                className='DeleteIconJ'
                onClick={() => setShowDelete(true)}
              ></Image>
            </td>
            <td>
              {' '}
              <Image
                src={EditIcon}
                alt=''
                className='EditIconJ'
                onClick={() => setShowEdit(true)}
              ></Image>
            </td>
          </tr>
        </tbody>
      </table>
      <DeleteModal
        show={showDelete}
        handleClose={handleCloseDelete}
        reload={props.reload}
        setReload={props.setReload}
        id={Faculty._id}
      />
      <UpdateFaculty
        add={false}
        show={showEdit}
        onHide={handleCloseUpdate}
        reload={props.reload}
        setReload={props.setReload}
        id={Faculty._id}
        faculty={Faculty}
      />
    </div>
  )
}
