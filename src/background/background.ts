let printData: { number: string; status: string }[]

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.print) {
    printData = request.data
    chrome.tabs.create({
      url: chrome.runtime.getURL('print.html'),
      active: false,
    })
  }
})

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.getPrintData) {
    sendResponse({ data: printData })
  }
})
