import React from 'react'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf'
import { Button } from '@mui/material'

function PrintList(prop) {
  return (
    <Button
      disabled={prop.disabled}
      sx={{ ml: 2 }}
      size="small"
      color="inherit"
      startIcon={<PictureAsPdfIcon />}
      onClick={prop.onClick}
    >
      Relatório
    </Button>
  )
}

export default PrintList
