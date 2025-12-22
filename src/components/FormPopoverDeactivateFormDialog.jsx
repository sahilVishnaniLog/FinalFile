import React, {useState} from 'react' ; 
import { Dialog, DialogTitle, DialogContent, DialogActions, IconButton , Stack ,Button } from '@mui/material'  ; 
import { Warning as WarningIcon , Close as CloseIcon} from '@mui/icons-material' ; 

export default function FormPopoverDeactivateFormDialog({ isOpen , handleClose, }) {
    handleDeactivation = () => {} ; 

    return 
    <Dialog open={isOpen} 
    onClose={handleClose} 
    >
        <DialogTitle> 
            <Stack> 
                <WarningIcon sx={{ color: '#fbc828' }} />
                 
                 <Typography sx={{ fontWeight: 'bold' }}> 
                    Deactivate this form ? 
                 </Typography>
            </Stack> 
          
        </DialogTitle>

        <IconButton onClick={handleClose} > 
            <CloseIcon/> 
        </IconButton>
        <DialogContent> 
            <Typography> 
                Deactivating a form means it cant be accessed by anyone,even users with the link. You can activate it again at any time. 
            </Typography>
            <Typography sx={{ marginTop: 16 }}> 
                Are you sure you want to deactivate this form? 
            </Typography>
        </DialogContent>
        <DialogActions> 
            <Button onClick={handleClose} color='inherit' variant='text'> 
                Cancel
            </Button>
            <Button onClick={ handleDeactivation} variant='contained' color="#fbc828" > 
                Deactivate
            </Button>
        </DialogActions> 


    
    
    </Dialog>
}
