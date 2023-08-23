import { Drawer, Box, Typography, IconButton } from '@mui/material'
import { useState } from 'react'
import "./Drawer.css"
import ImageUpload from './ImageUpload'

export const SubmissionDrawer = (props) => {
  return (
    <>
        <Drawer
            className='drawerContainer'
            anchor='left'
            open={props.isOpen}
            onClose={() => props.onClose()}
            width={500}
        >
            <box p={3} width='500px' textAlign='center' role='presentation'>
                <Typography className="drawerTitle" variant='h4' component='div'>
                    Sign Details
                </Typography>
                <div className='signType'>
                    <h5 className='signTypeTitle'>Enter the sign type</h5>
                    <div className='inputContainer'>
                        <input className='signTypeInput'/>
                    </div>
                </div>
                <div className='signType'>
                    <h5 className='signTypeTitle'>Enter the sign Name</h5>
                    <div className='inputContainer'>
                        <input className='signTypeInput'/>
                    </div>
                </div>

                <ImageUpload />

            </box>
        </Drawer>
    </>
  )
}

export default SubmissionDrawer