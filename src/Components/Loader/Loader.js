import React from 'react'

export default function Loader() {
    return (
      <div style={{height: '100vh'}} className='d-flex justify-content-center align-items-center'>
        <div class="spinner-border spinner-border-sm text-center" style={{color: 'var(--mainColor)'}} role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <div class="spinner-grow spinner-grow-sm text-center" style={{color: 'var(--mainColor)'}} role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>   
    )
}