import * as React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import { Box } from '@mui/material'

export default function DataCard(prop) {
  let color = 'blue'
  if (prop.status === 'Erro') {
    color = 'red'
  } else if (prop.status === 'Migrada') {
    color = 'green'
  }

  return (
    <Box mx={'4px'} my={'16px'}>
      <Card sx={{ minWidth: 275 }}>
        <Grid container direction={'row'}>
          <Grid item sx={{ minWidth: 330 }}>
            <CardContent>
              <Typography>Processo:</Typography>
              <Typography
                variant="body1"
                component="div"
                style={{ color: color }}
              >
                {prop.number}
              </Typography>
            </CardContent>
          </Grid>
          <Grid item>
            <CardContent>
              <Typography>Status:</Typography>
              <Typography
                variant="body1"
                component="div"
                style={{ color: color }}
              >
                {prop.status}
              </Typography>
            </CardContent>
          </Grid>
        </Grid>
      </Card>
    </Box>
  )
}
