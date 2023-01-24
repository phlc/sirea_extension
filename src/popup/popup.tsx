import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import './popup.css'
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing'
import LoadProcesses from '../components/LoadProcesses'
import Migrate from '../components/Migrate'
import PrintList from '../components/PrintList'
import ClearList from '../components/ClearList'
import BottomMenu from '../components/BottomMenu'
import { Box, AppBar, Toolbar, TextField, Alert } from '@mui/material'
import DataCard from '../components/DataCard'
import {
  getStoredProcesses,
  setStoredProcesses,
  getStoredConsent,
  sendProcess,
} from '../utils/helpers'

const App: React.FC<{}> = () => {
  const [processes, setProcesses] = useState<
    { number: string; status: string }[]
  >([])
  const [inputList, setInputList] = useState<string>('')
  const [consent, setConsent] = useState<boolean>(false)
  const [tab, setTab] = useState<number>(0)
  const [migrating, setMigrating] = useState<boolean>(false)
  const [speed, setSpeed] = useState<number>(1)
  const [remove, setRemove] = useState<number>(0)
  const [errorCondition, setErrorCondition] = useState<boolean>(false)

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
      try {
        setMigrating(true)
        for (let i = 0; i < processes.length; i++) {
          if (processes[i].status != 'Pendente') {
            continue
          }
          const res = await sendProcess(
            tab,
            'sirea-extension',
            processes[i],
            speed,
            i,
            remove
          )
          processes[i] = res.data
          await setStoredProcesses(processes)
          setProcesses([...processes])
          window.scrollTo({
            top: 103 * i,
            behavior: 'smooth',
          })
        }
      } catch {
        setErrorCondition(true)
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        })
      } finally {
        setMigrating(false)
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
      <div>
        <Alert
          sx={{
            display: errorCondition ? {} : { xs: 'none', md: 'block' },
            margin: 1,
          }}
          severity="error"
          variant="filled"
        >
          Erro de Conexão com o Sirea. Ao clicar em MIGRAR de novo, a extensão
          retoma de onde parou. Se preciso, abra e feche a extensão e tente
          MIGRAR novamente. Caso a falha permaneça, SALVE o relatório, e
          reinicie o navegador.
        </Alert>
      </div>
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
        disabled={migrating}
        checked={consent}
        setChecked={setConsent}
        speedChange={setSpeed}
        speed={speed}
        remove={remove}
        setRemove={setRemove}
      />
    </Box>
  )
}

const root = document.createElement('div')
document.body.appendChild(root)
ReactDOM.render(<App />, root)
