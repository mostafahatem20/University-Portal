import React from 'react'
import { useSelector } from 'react-redux'

export default function Welcome() {
  const name = useSelector((state) => state.name)
  return (
    <div style={{ fontSize: '3rem', marginTop: '5vw', textAlign: 'center' }}>
      <span style={{ fontSize: '5rem', color: 'black' }}>Welcome,</span> {name}
      <div style={{ marginTop: '3vw' }}>
        <a href="https://mail.guc.edu.eg/" style={{ color: '#7f7f7f' }}>
          GUC mail
        </a>
      </div>
      <div>
        <a href="https://cms.guc.edu.eg/" style={{ color: '#7f7f7f' }}>
          CMS system
        </a>
      </div>
    </div>
  )
}
