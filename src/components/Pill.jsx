import React from 'react'

const Pill = ({image,text,onClick}) => {
  return (
    <span className='user-pill' onClick={onClick}>
     <img src={image} alt="" />
     <span>{text} &times;</span>
    </span>
  )
}

export default Pill
