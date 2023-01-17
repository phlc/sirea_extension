import * as React from 'react'
import Box from '@mui/material/Box'
import BottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import ReportIcon from '@mui/icons-material/Report'
import WebIcon from '@mui/icons-material/Web'

export default function BottomMenu() {
  return (
    <BottomNavigation
      showLabels
      sx={{
        width: '100%',
        position: 'fixed',
        bottom: 0,
        height: '50px',
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
