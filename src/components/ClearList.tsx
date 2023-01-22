import React from 'react'
import ClearIcon from '@mui/icons-material/Clear'
import { Button } from '@mui/material'

function ClearList(prop) {
  return (
    <Button
      disabled={prop.disabled}
      sx={{ ml: 2 }}
      size="small"
      color="inherit"
      startIcon={<ClearIcon />}
      onClick={prop.onClick}
    >
      Limpar
    </Button>
  )
}

export default ClearList
