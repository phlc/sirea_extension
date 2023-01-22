chrome.runtime.sendMessage({ getPrintData: true }, function (response) {
  const div = document.getElementById('data-in')
  const header = document.getElementById('total')
  let migradas = 0
  let pendentes = 0
  let erros = 0
  for (let i = 0, l = response.data.length; i < l; i++) {
    let color = 'blue'
    if (response.data[i].status == 'Erro') {
      color = 'red'
      erros += 1
    } else if (response.data[i].status == 'Migrada') {
      color = 'green'
      migradas += 1
    } else {
      pendentes += 1
    }

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

  header.innerHTML =
    '<li class="table-row">' +
    '<div class="col" style="flex-basis: 25%">' +
    `<div style="font-size: 16px; padding-bottom: 5px; color: green"> Migradas: ${migradas}</div>` +
    '</div>' +
    '<div class="col" style="flex-basis: 30%">' +
    `<div style="font-size: 16px; padding-bottom: 5px; color: blue"> Pendentes: ${pendentes} </div>` +
    '</div>' +
    '<div class="col" style="flex-basis: 20%">' +
    `<div style="font-size: 16px; padding-bottom: 5px; color: red"> Erros: ${erros} </div>` +
    '</div>' +
    '<div class="col" style="flex-basis: 20%">' +
    `<div style="font-size: 16px; font-weight: bold; padding-bottom: 5px; color: black"> Total: ${
      migradas + pendentes + erros
    } </div>` +
    '</div>' +
    '</li>'
})
