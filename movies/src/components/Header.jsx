import React from 'react'
import {AppBar, Toolbar, Box} from '@mui/material'
import MovieIcon from '@mui/icons-material/Movie';

function Header() {
  return (
    <AppBar>
        <Toolbar>
            <Box width={'20%'}>
                <MovieIcon/> 
            </Box>
        </Toolbar>
        
    </AppBar>
  )
}

export default Header