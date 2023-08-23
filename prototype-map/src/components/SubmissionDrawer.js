import { Drawer, Box, Typography, IconButton } from '@mui/material'
import { useState } from 'react'
import "./Drawer.css"

export const SubmissionDrawer = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  return (
    <>
        <Drawer
            className='drawerContainer'
            anchor='left'
            open={isDrawerOpen}
            onClose={() => setIsDrawerOpen(false)}
        >
            <box p={2} width='250px' textAlign='center' role='presentation'>
                <Typography variant='h6' component='div'>
                    Side Panel
                </Typography>
            </box>
        </Drawer>
    </>
  )
}

export default SubmissionDrawer