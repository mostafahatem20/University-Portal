import React, { useState } from 'react'
import Card from 'react-bootstrap/Card'
import '../../Stylesheets/Profiles.css'
import { Image } from 'react-bootstrap'
import DeleteIcon from '../../images/delete.png'
import EditIcon from '../../images/editIcon.png'
import DeleteModal from '../Department/DeleteDepartment'
import UpdateDepartment from '../Department/AddDepartment'
export default function Department(props) {
  const Dep = props.department

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
                style={{ width: '55vw', marginLeft: '5.5vw' }}
              >
                <table
                  className='TextInsideProfileCardS'
                  style={{ textAlign: 'left' }}
                >
                  <tbody>
                    <tr>
                      <td style={{ width: '18.5vw' }}>{Dep && Dep.name}</td>
                      <td
                        style={{
                          width: '23vw',
                          fontSize: '0.7vw',
                          fontWeight: 'bold',
                        }}
                      >
                        {Dep && Dep.id}
                      </td>
                      <td style={{ width: '16vw' }}>
                        {Dep && Dep.facultyName}
                      </td>
                      <td style={{ width: '13vw' }}>{Dep && Dep.HODName}</td>
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
        id={Dep.id}
      />
      <UpdateDepartment
        add={false}
        show={showEdit}
        onHide={handleCloseUpdate}
        reload={props.reload}
        setReload={props.setReload}
        id={Dep.id}
        department={Dep}
      />
    </div>
  )
}
