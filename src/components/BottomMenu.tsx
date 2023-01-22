import * as React from 'react'
import Box from '@mui/material/Box'
import BottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import ReportIcon from '@mui/icons-material/Report'
import WebIcon from '@mui/icons-material/Web'
import ConsentButton from './ConsentButton'
import InputLabel from '@mui/material/InputLabel'
import { FormControl, NativeSelect } from '@mui/material'
import SpeedSelect from './SpeedSelect'

export default function BottomMenu(prop) {
  return (
    <BottomNavigation
      showLabels
      sx={{
        width: '100%',
        position: 'fixed',
        bottom: 0,
        height: '60px',
      }}
    >
      <BottomNavigationAction
        onClick={Sirea}
        label="Sirea"
        icon={<WebIcon />}
      />
      <BottomNavigationAction
        onClick={OpenManual}
        label="Manual"
        icon={<MenuBookIcon />}
      />
      <BottomNavigationAction
        onClick={OpenTerms}
        label="Termos e Condições"
        icon={<ReportIcon />}
      />
      <ConsentButton checked={prop.checked} setChecked={prop.setChecked} />
      <SpeedSelect
        speed={prop.speed}
        speedChange={prop.speedChange}
      ></SpeedSelect>
    </BottomNavigation>
  )
}

function Sirea() {
  chrome.tabs.create({
    url: 'https://sistemas.trf1.jus.br/sirea/',
    active: false,
  })
}

function OpenManual() {
  chrome.tabs.create({ url: 'manual.html', active: false })
}

function OpenTerms() {
  chrome.tabs.create({ url: 'terms.html', active: false })
}
