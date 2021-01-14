import React, { useState } from 'react'
import Card from 'react-bootstrap/Card'
import '../../Stylesheets/Profiles.css'
import { Image } from 'react-bootstrap'
import DeleteIcon from '../../images/delete.png'
import EditIcon from '../../images/editIcon.png'
import DeleteModal from '../Location/DeleteLocation'
import UpdateLocation from '../Location/AddLocation'
export default function Location(props) {
  const Loc = props.location
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
                      <td style={{ width: '18.5vw' }}>{Loc && Loc.name}</td>
                      <td
                        style={{
                          width: '23vw',
                          fontSize: '0.7vw',
                          fontWeight: 'bold',
                        }}
                      >
                        {Loc && Loc._id}
                      </td>
                      <td style={{ width: '16vw' }}>{Loc && Loc.type}</td>
                      <td style={{ width: '13vw' }}>{Loc && Loc.capacity}</td>
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
        id={Loc._id}
      />
      <UpdateLocation
        add={false}
        show={showEdit}
        onHide={handleCloseUpdate}
        reload={props.reload}
        setReload={props.setReload}
        id={Loc._id}
        location={Loc}
      />
    </div>
  )
}
