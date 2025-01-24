import { useState } from 'react'

import { Button, Dialog, Typography, DialogContent } from '@mui/material'

import DialogCloseButton from '@/components/dialogs/DialogCloseButton'

interface ModeToggleWarningProps {
  open: boolean
  onClose: () => void
  mode: string
  onConfirm: () => void
  name: string
}

const ModeToggleWarning: React.FC<ModeToggleWarningProps> = ({ open, onClose, mode, onConfirm, name }) => {
  const [openSuccess, setOpenSuccess] = useState(false)

  const handleOpenSuccess = () => {
    onClose()
    setOpenSuccess(true)
    onConfirm()
  }

  return (
    <>
      <Dialog open={open} onClose={onClose} sx={{ '& .MuiDialog-paper': { overflow: 'visible' } }}>
        <DialogCloseButton onClick={onClose} disableRipple>
          <i className='tabler-x' />
        </DialogCloseButton>
        <DialogContent className='overflow-visible px-12 py-8 flex flex-col items-center'>
          <i className='warning-icon h-[70px] w-[70px] text-warning' />
          <Typography variant='h6' className='text-[17px] text-center text-secondary mt-3'>
            Are you sure you want to {mode} the {name}?
          </Typography>
          <div className='flex flex-row w-full gap-4 mt-[30px] items-center justify-center'>
            <Button
              onClick={handleOpenSuccess}
              variant='outlined'
              className='h-10 w-[70px] border-warning text-warning'
            >
              Ok
            </Button>
            <Button onClick={onClose} variant='outlined' className='h-10 w-[70px] border-secondary text-secondary'>
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog
        open={openSuccess}
        onClose={() => setOpenSuccess(false)}
        sx={{ '& .MuiDialog-paper': { overflow: 'visible' } }}
      >
        <DialogCloseButton onClick={() => setOpenSuccess(false)} disableRipple>
          <i className='tabler-x' />
        </DialogCloseButton>
        <DialogContent className='overflow-visible px-12 py-8 flex flex-col items-center'>
          <i className='check-solid-icon h-[70px] w-[70px] text-success' />
          <Typography variant='h6' className='text-[17px] text-center text-secondary mt-3'>
            {name} {mode}d successfully!
          </Typography>
          <div className='flex flex-row w-full gap-4 mt-[30px] items-center justify-center'>
            <Button
              onClick={() => setOpenSuccess(false)}
              variant='outlined'
              className='h-10 w-[70px] border-success text-success'
            >
              Ok
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default ModeToggleWarning
