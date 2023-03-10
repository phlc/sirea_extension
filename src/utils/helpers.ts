import { tabClasses } from '@mui/material'

export interface LocalStorage {
  processes?: { number: string; status: string }[]
  consent?: boolean
}

export type LocalStorageKeys = keyof LocalStorage

export function setStoredProcesses(
  processes: { number: string; status: string }[]
): Promise<void> {
  const vals: LocalStorage = {
    processes,
  }
  return new Promise((resolve) => {
    chrome.storage.local.set(vals, () => {
      resolve()
    })
  })
}

export function getStoredProcesses(): Promise<
  { number: string; status: string }[]
> {
  const keys: LocalStorageKeys[] = ['processes']
  return new Promise((resolve) => {
    chrome.storage.local.get(keys, (res: LocalStorage) => {
      resolve(res.processes ?? [])
    })
  })
}

export function setStoredConsent(consent: boolean): Promise<void> {
  const vals: LocalStorage = {
    consent,
  }
  return new Promise((resolve) => {
    chrome.storage.local.set(vals, () => {
      resolve()
    })
  })
}

export function getStoredConsent(): Promise<boolean> {
  const keys: LocalStorageKeys[] = ['consent']
  return new Promise((resolve) => {
    chrome.storage.local.get(keys, (res: LocalStorage) => {
      resolve(res.consent ?? false)
    })
  })
}

export function sendProcess(
  tab: number,
  name: string,
  data: { number: string; status: string },
  speed: number,
  index: number,
  remove: number
): Promise<{
  result: string
  data: { number: string; status: string }
  index: number
}> {
  return new Promise((resolve) => {
    chrome.tabs.sendMessage(
      tab,
      { name, data, speed, index, remove },
      (res) => {
        resolve(res)
      }
    )
  })
}
