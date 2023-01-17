import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import './popup.css'
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing'
import LoadProcesses from '../components/LoadProcesses'
import Migrate from '../components/Migrate'
import PrintList from '../components/PrintList'
import ClearList from '../components/ClearList'
import BottomMenu from '../components/BottomMenu'
import { Box, AppBar, Toolbar, TextField } from '@mui/material'
import DataCard from '../components/DataCard'

const App: React.FC<{}> = () => {
  const [processes, setProcesses] = useState([])
  const [inputList, setInputList] = useState<string>()

  const createCards = function (event: React.MouseEvent<HTMLButtonElement>) {
    let lines = inputList.split('\n')
    lines = lines.map((line) =>
      line
        .replace(/\D/g, '')
        .replace(
          /(\d{7})(\d{2})(\d{4})(\d{1})(\d{2})(\d{4})/,
          '$1-$2.$3.$4.$5.$6'
        )
    )
    setProcesses(
      lines.map((line) => ({
        number: line,
        status: line.length == 25 ? 'Pendente' : 'Erro',
      }))
    )
  }

  // {number: '0001842-67.2017.5.01.0246',
  // status: 'Pendente'}
  return (
    <Box sx={{ width: '500px' }}>
      <AppBar position="sticky" component="nav">
        <Toolbar>
          <PrecisionManufacturingIcon />
          <LoadProcesses onClick={createCards} />
          <Migrate />
          <PrintList />
          <ClearList
            onClick={() => {
              setInputList('')
              setProcesses([])
            }}
          />
        </Toolbar>
      </AppBar>

      {processes.map((process, index) => (
        <DataCard number={process.number} status={process.status} key={index} />
      ))}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '15px',
        }}
      >
        <TextField
          sx={{
            display: processes.length == 0 ? {} : { xs: 'none', md: 'block' },
          }}
          id="processes-list"
          label="Cole aqui os processos para migrar e clique em carregar"
          multiline
          fullWidth
          rows={4}
          placeholder={'XXXXXXX-XX.XXXX.X.XX.X\nXXXXXXX-XX.XXXX.X.XX.X'}
          defaultValue=""
          value={inputList}
          onChange={(event) => {
            setInputList(event.target.value)
          }}
        />
      </div>
      <Box sx={{ height: '50px' }}></Box>
      <BottomMenu />
    </Box>
  )
}

const root = document.createElement('div')
document.body.appendChild(root)
ReactDOM.render(<App />, root)
