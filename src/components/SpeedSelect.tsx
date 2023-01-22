import * as React from 'react'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import NativeSelect from '@mui/material/NativeSelect'

export default function SpeedSelect(prop) {
  return (
    <Box sx={{ width: 55, fontSize: 10, paddingTop: 1.5, paddingRight: 2 }}>
      <InputLabel
        variant="standard"
        htmlFor="uncontrolled-native"
        sx={{ width: 55, fontSize: 10 }}
      >
        Velocidade
      </InputLabel>
      <NativeSelect
        defaultValue={prop.speed}
        onChange={(e) => prop.speedChange(Number(e.target.value))}
        sx={{ width: 55, fontSize: 10 }}
      >
        <option value={1}> 1 x</option>
        <option value={1.5}> 0.75 x</option>
        <option value={2}> 0.5 x</option>
      </NativeSelect>
    </Box>
  )
}
