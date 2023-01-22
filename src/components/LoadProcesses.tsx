import React from 'react'
import ListAltIcon from '@mui/icons-material/ListAlt'
import { Button } from '@mui/material'

function LoadProcesses(prop) {
  return (
    <Button
      disabled={prop.disabled}
      sx={{ ml: 8 }}
      size="small"
      color="inherit"
      startIcon={<ListAltIcon />}
      onClick={prop.onClick}
    >
      Carregar
    </Button>
  )
}

export default LoadProcesses
