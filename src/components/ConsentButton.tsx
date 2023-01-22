import * as React from 'react'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Typography from '@mui/material/Typography'
import { setStoredConsent } from '../utils/storage'
import { padding } from '@mui/system'

export default function ConsentButton(prop) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStoredConsent(event.target.checked).then()
    prop.setChecked(event.target.checked)
  }
  return (
    <FormGroup>
      <FormControlLabel
        style={{ paddingTop: '10px', paddingLeft: '2px' }}
        control={
          <Checkbox
            size="small"
            checked={prop.checked}
            onChange={handleChange}
          />
        }
        label={
          <Typography
            width="70px"
            variant="body2"
            color="textSecondary"
            textAlign="justify"
            alignContent="center"
            fontSize="x-small"
          >
            Li e Concordo
          </Typography>
        }
      />
    </FormGroup>
  )
}
