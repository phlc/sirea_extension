import React from "react";
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import { Button } from "@mui/material";



function Migrate() {
  return (
    <Button
        sx={
            {ml:2}
        }
        size='small'
        color="inherit"
        startIcon={<ElectricBoltIcon />}
        >
        Migrar
    </Button>    
  )
}

export default Migrate