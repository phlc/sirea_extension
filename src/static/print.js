chrome.runtime.sendMessage({ getPrintData: true }, function (response) {
  const div = document.getElementById('data-in')
  for (let i = 0, l = response.data.length; i < l; i++) {
    let color = 'blue'
    if (response.data[i].status == 'Erro') color = 'red'
    else if (response.data[i].status == 'Migrada') color = 'green'

    div.innerHTML +=
      '<li class="table-row">' +
      '<div class="col col-1">' +
      '<div style="font-size: 16px; padding-bottom: 5px">Processo:</div>' +
      `<div style="color: ${color}">${response.data[i].number}</div>` +
      '</div>' +
      '<div class="col col-2">' +
      '<div style="font-size: 16px; padding-bottom: 5px">Status:</div>' +
      `<div style="color: ${color}">${response.data[i].status}</div>` +
      '</div>' +
      '</li>'
  }
  window.print()
})
