import * as React from 'react'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import NativeSelect from '@mui/material/NativeSelect'

export default function RemoveSelect(prop) {
  return (
    <Box sx={{ width: 55, fontSize: 10, paddingTop: 1.5, paddingRight: 2 }}>
      <InputLabel
        variant="standard"
        htmlFor="uncontrolled-native"
        sx={{ width: 55, fontSize: 10 }}
      >
        Excluir
      </InputLabel>
      <NativeSelect
        disabled={prop.disabled}
        defaultValue={prop.remove}
        onChange={(e) => prop.setRemove(Number(e.target.value))}
        sx={{ width: 45, fontSize: 10 }}
      >
        <option value={0}> Não</option>
        <option value={1}> Sim</option>
      </NativeSelect>
    </Box>
  )
}
