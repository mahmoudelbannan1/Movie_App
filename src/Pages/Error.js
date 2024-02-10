import React from 'react'
import error from "./../Assets/Images/404.jpg"
import { useNavigate } from 'react-router-dom'

export default function Error() {
  const navigate = useNavigate()

  return (
    <div className='container d-flex flex-column justify-content-center align-items-center '>
      <img src={error} width={350} className='my-5'/>
      <button className='btn text-white' style={{backgroundColor: 'var(--mainColor)'}} onClick={() => navigate("/")}>Back To Home</button>
    </div>
  )
}
