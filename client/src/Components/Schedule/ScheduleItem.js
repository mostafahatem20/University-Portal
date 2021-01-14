import React from 'react'

const ScheduleItem = (props) => {
  const textStyle = {
    textAlign: 'center',
    fontSize: '0.8vw',
    marginBottom: '3px',
    marginTop: '3px',
    fontWeight: '700',
    color: 'white',
  }

  return (
    <div style={{ marginLeft: '20px' }}>
      {!props.slotData ? (
        <div
          style={{
            width: '10vw',
            height: '5vw',
            borderRadius: '12px',
            backgroundColor: 'white',

            borderWidth: '2px',
            borderColor: 'rgba(1,15,31,1)',
            boxShadow: '3px 3px 3px #cfcfcf',
            marginBottom: '10px',
          }}
        ></div>
      ) : (
        <div
          style={{
            width: '10vw',
            height: '5vw',
            borderRadius: '10px',
            marginBottom: '10px',
            boxShadow: '3px 3px 3px #cfcfcf',
            backgroundColor: 'rgba(1,155,157,1)',
            paddingTop: '3px',
          }}
        >
          <p style={textStyle}>{props.slotData.courseName}</p>
          <p style={textStyle}>{props.slotData.type}</p>
          <p style={textStyle}>{props.slotData.locationName}</p>
        </div>
      )}
    </div>
  )
}
export default ScheduleItem
