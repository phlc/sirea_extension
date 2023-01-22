import React from 'react'
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt'
import { Button } from '@mui/material'

function Migrate(prop) {
  return (
    <Button
      onClick={prop.onClick}
      disabled={prop.disabled}
      sx={{ ml: 2 }}
      size="small"
      color="inherit"
      startIcon={<ElectricBoltIcon />}
    >
      Migrar
    </Button>
  )
}

export default Migrate
