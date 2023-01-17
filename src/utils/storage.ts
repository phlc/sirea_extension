export interface LocalStorage {
  processes?: { number: string; status: string }[]
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
