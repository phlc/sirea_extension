import React from "react";
import PrintIcon from '@mui/icons-material/Print';
import { Button } from "@mui/material";



function PrintList(prop) {
  return (
    <Button
        sx={
            {ml:2}
        }
        size='small'
        color="inherit"
        startIcon={<PrintIcon />}
        onClick={prop.onClick}
        >
        Imprimir
    </Button>    
  )
}

export default PrintList