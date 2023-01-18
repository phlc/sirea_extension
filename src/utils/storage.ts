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
