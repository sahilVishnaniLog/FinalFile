import React from 'react'
import { List, ListItem, ListItemButton, ListItemText , Popover , ListItemIcon , Dialog  , DialogActions , DialogContent } from '@mui/material'  ; 
import { AiOutlineStop } from "react-icons/ai";
import { RiDeleteBin5Line } from "react-icons/ri";
export default function FormMorePopover   ({anchorEl, handleClose}) {
    const open = Boolean(anchorEl) ; 
  return (
    <Popover anchorOrigin={{ vertical: 'bottom', horizontal: 'left'}}
    transformOrigin={{ vertical: 'top' , horizontal: 'left' }}
    open={open} anchorEl={anchorEl} onClose={handleClose}  disableEnforceFocus  >
    <List> 
        <ListItem disablePadding> 
            <ListItemButton> 
                <ListItemIcon> 
                    <AiOutlineStop/> 
                </ListItemIcon>
                
                <ListItemText primary="Deactivate form" /> 
                
            </ListItemButton>
        </ListItem> 

        <ListItem disablePadding>
            <ListItemButton>
                <ListItemIcon sx={{ padding: 0 }}>
                    <RiDeleteBin5Line />
                </ListItemIcon>
                
                <ListItemText primary="Delete form" />
            </ListItemButton> 

        </ListItem>
    </List>
     </Popover>
  )
}
