import React from 'react'

export default function Dashboard() {

    const imgStyle = {
        width: '150px',
        height: '150px',
        borderRadius: '50%', // This will make the image round
        marginLeft: 'auto',
        marginRight: 'auto',
        display: 'block',
        marginTop: '20px',
        marginBottom: '20px',
        objectFit: 'cover',
    };


  return (
    <div>
    <img style={imgStyle} src="../../assets/profilePic.png" alt="" />
      <h3>Hey Manpreet</h3>
    </div>
  )
}
