import React, { useEffect, useState } from 'react'
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
import { getStoredProcesses, setStoredProcesses } from '../utils/storage'

const App: React.FC<{}> = () => {
  const [processes, setProcesses] = useState<
    { number: string; status: string }[]
  >([])
  const [inputList, setInputList] = useState<string>('')

  useEffect(() => {
    getStoredProcesses().then((processes) => setProcesses(processes))
  }, [])

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
    const newCards = lines.map((line) => ({
      number: line,
      status: line.length == 25 ? 'Pendente' : 'Erro',
    }))
    setStoredProcesses(newCards).then(() => setProcesses(newCards))
  }

  // 0001842-67.2017.5.01.0246
  // 000184297.2017.5.01.0246
  // 0001842-67.2017.5.01246

  return (
    <Box sx={{ width: '500px' }}>
      <AppBar position="sticky" component="nav">
        <Toolbar>
          <PrecisionManufacturingIcon />
          <LoadProcesses onClick={createCards} />
          <Migrate />
          <PrintList
            onClick={() => {
              chrome.runtime.sendMessage({
                print: true,
                data: processes,
              })
            }}
          />
          <ClearList
            onClick={() => {
              setStoredProcesses([]).then(() => {
                setProcesses([])
                setInputList('')
              })
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
