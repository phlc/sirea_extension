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
import {
  getStoredProcesses,
  setStoredProcesses,
  getStoredConsent,
  setStoredConsent,
} from '../utils/storage'

const App: React.FC<{}> = () => {
  const [processes, setProcesses] = useState<
    { number: string; status: string }[]
  >([])
  const [inputList, setInputList] = useState<string>('')
  const [consent, setConsent] = useState<boolean>(false)
  const [tab, setTab] = useState<number>(0)
  const [migrating, setMigrating] = useState<boolean>(false)
  const [speed, setSpeed] = useState<number>(1)

  useEffect(() => {
    getStoredProcesses().then((processes) => setProcesses(processes))
  }, [])

  useEffect(() => {
    getStoredConsent().then((consent) => setConsent(consent))
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
    const newCards = lines
      .filter((line) => line.length != 0)
      .map((line) => ({
        number: line,
        status: line.length == 25 ? 'Pendente' : 'Erro',
      }))
    setStoredProcesses(newCards).then(() => setProcesses(newCards))

    queryTab()
  }

  const queryTab = () => {
    let tabs = []
    let id = 0
    chrome.tabs.query({ active: true }, function (res) {
      tabs = res
      for (let i = 0; i < tabs.length; i++) {
        if (tabs[i].url.includes('sistemas.trf1.jus.br/sirea')) {
          id = tabs[i].id
        }
      }
      setTab(id)
    })
  }

  async function sendToContentScript() {
    queryTab()

    if (tab != 0) {
      setMigrating(true)
      for (let i = 0; i < processes.length; i++) {
        if (processes[i].status != 'Pendente') {
          setMigrating(false)
          continue
        }
        chrome.tabs.sendMessage(
          tab,
          {
            name: 'sirea-extension',
            data: processes[i],
            speed: speed,
            index: i,
          },
          (res) => {
            console.log(res.data)
            processes[i] = res.data
            setStoredProcesses(processes).then(() => setProcesses(processes))
            setMigrating(false)
          }
        )
      }
    }
  }

  queryTab()

  return (
    <Box sx={{ width: '500px' }}>
      <AppBar position="sticky" component="nav">
        <Toolbar>
          <PrecisionManufacturingIcon />
          <LoadProcesses
            onClick={createCards}
            disabled={!consent || migrating || processes.length != 0}
          />
          <Migrate
            disabled={
              !consent || tab === 0 || migrating || processes.length == 0
            }
            onClick={sendToContentScript}
          />
          <PrintList
            disabled={!consent || migrating}
            onClick={() => {
              chrome.runtime.sendMessage({
                print: true,
                data: processes,
              })
            }}
          />
          <ClearList
            disabled={!consent || migrating}
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
      <Box sx={{ height: '60px' }}></Box>
      <BottomMenu
        checked={consent}
        setChecked={setConsent}
        speedChange={setSpeed}
        speed={speed}
      />
    </Box>
  )
}

const root = document.createElement('div')
document.body.appendChild(root)
ReactDOM.render(<App />, root)
