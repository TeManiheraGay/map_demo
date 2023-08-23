import React, { useState } from 'react'
import "./Modal.css";

export default function Modal({closeModal}) {


  return (
    <>
    <div className='modal'>
        {/* <div className='overlay'></div> */}
        <div className='modal-content'>
          <div className='title'>
            <h2>Hello Modal</h2>
          </div>
          <div className='body'>
            <p>Description of asdfoiuasdoifghasljdhg</p>
          </div>
          <div className='footer'>
            <button
              className='close-modal'
              onClick={() => closeModal(false)}
            >CLOSE</button>
          </div>
        </div>
    </div>
    </>
  );
}
