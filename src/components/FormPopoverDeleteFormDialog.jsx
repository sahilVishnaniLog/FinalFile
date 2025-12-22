import React, {useState} from 'react' ; 
import { Dialog, DialogTitle, DialogContent, DialogActions, IconButton , Stack ,Button } from '@mui/material'  ; 
import { Error as ErrorIcon ,Close as CloseIcon}   from '@mui/icons-material/Error';
import { Task } from '@mui/icons-material';

export default function FormPopoverDeactivateFormDialog({ isOpen , handleClose, }) {
    handleDeletion = () => {} ; 

    return 
    <Dialog open={isOpen} 
    onClose={handleClose} 
    >
        <DialogTitle> 
            <Stack> 
                <WarningIcon sx={{ color: '#f15b50' }} />
                 
                 <Typography sx={{ fontWeight: 'bold' }}> 
                    Delete form ? 
                 </Typography>
            </Stack> 
          
        </DialogTitle>

        <IconButton onClick={handleClose} > 
            <CloseIcon/> 
        </IconButton>
        <DialogContent> 
            <Typography> 
                
            </Typography>
            <Typography sx={{ marginTop: 16 }}> 
                You're about to permanently delete { Task.title}  form . Work you have already received through this form will not be affected.
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
