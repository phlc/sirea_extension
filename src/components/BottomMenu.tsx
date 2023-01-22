import * as React from 'react'
import Box from '@mui/material/Box'
import BottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import ReportIcon from '@mui/icons-material/Report'
import WebIcon from '@mui/icons-material/Web'
import ConsentButton from './ConsentButton'
import SpeedSelect from './SpeedSelect'
import RemoveSelect from './RemoveSelect'

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
        disabled={prop.disabled}
        onClick={Sirea}
        label="Sirea"
        icon={<WebIcon />}
      />
      <BottomNavigationAction
        disabled={prop.disabled}
        onClick={OpenManual}
        label="Manual"
        icon={<MenuBookIcon />}
      />
      <BottomNavigationAction
        disabled={prop.disabled}
        style={{ paddingRight: '10px' }}
        onClick={OpenTerms}
        label="Termos"
        icon={<ReportIcon />}
      />
      <ConsentButton
        checked={prop.checked}
        setChecked={prop.setChecked}
        disabled={prop.disabled}
      />
      <SpeedSelect
        disabled={prop.disabled}
        speed={prop.speed}
        speedChange={prop.speedChange}
      ></SpeedSelect>
      <RemoveSelect
        disabled={prop.disabled}
        remove={prop.remove}
        setRemove={prop.setRemove}
      ></RemoveSelect>
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
