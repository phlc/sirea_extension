chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  let speed = 1
  if (request.name === 'sirea-extension' && request.data) {
    let process = request.data
    console.log(process)
    speed = request.speed
    if (process.status === 'Pendente') {
      process.status = autoClicks(process, speed, request.index, sendResponse)
    } else {
      sendResponse({
        result: 'data-error',
        data: process,
        index: request.index,
      })
    }
  }
  return true
})

function modal(apply = true) {
  const [body] = document.getElementsByTagName('body')
  if (apply) {
    body.style.opacity = '0.4'
    body.style.backgroundColor = 'rgba(0,0,0,1)'
  } else {
    body.style.opacity = ''
    body.style.backgroundColor = ''
  }
}

function wait(ms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, ms)
  })
}

async function autoClicks(process, speed, index, sendResponse) {
  try {
    while (document.readyState != 'complete') {}
    const number = process.number
    modal()
    let [input] = document.getElementsByClassName(
      'input p-inputtext p-component'
    )
    input.value = number
    input.dispatchEvent(
      new Event('input', {
        bubbles: true,
        cancelable: true,
      })
    )
    await wait(500 * speed)
    let selector = document.getElementsByClassName('p-dropdown p-component')
    if (selector.length == 1) {
      let [addProc] = document.getElementsByClassName(
        'botao-adicionar p-button p-component'
      )
      addProc.click()
      await wait(500 * speed)
      let np = document.getElementById('inputNumeroProcesso')
      np.value = number
      np.dispatchEvent(
        new Event('input', {
          bubbles: true,
          cancelable: true,
        })
      )
      await wait(3000 * speed)

      let [input] = document.getElementsByClassName(
        'input p-inputtext p-component'
      )
      input.value = ''
      input.dispatchEvent(
        new Event('input', {
          bubbles: true,
          cancelable: true,
        })
      )
      await wait(500 * speed)

      input.value = number
      input.dispatchEvent(
        new Event('input', {
          bubbles: true,
          cancelable: true,
        })
      )
      await wait(500 * speed)

      if (selector.length != 2) {
        cancel = document.querySelector('[label = "Cancelar"]')
        cancel.click()
        await wait(500 * speed)

        let [input] = document.getElementsByClassName(
          'input p-inputtext p-component'
        )
        input.value = ''
        input.dispatchEvent(
          new Event('input', {
            bubbles: true,
            cancelable: true,
          })
        )
        await wait(500 * speed)
        throw new Error('Processo Inexistente')
      }
    }

    selector = document.getElementsByClassName('p-dropdown p-component')
    selector[0].click()
    await wait(500 * speed)

    let mag = document.querySelector('[aria-label="Magistrado"]')
    mag.click()
    await wait(3000 * speed)

    checkBox = document.getElementsByClassName('p-checkbox-box')
    if (checkBox[0] == undefined) {
      console.log('Error')
    }
    checkBox[0].click()
    await wait(500 * speed)

    let btn = document.getElementsByClassName('p-button p-component p-ripple')
    btn[0].click()
    await wait(3000 * speed)

    let [cert] = document.getElementsByClassName(
      'botao-acao p-button p-component'
    )
    cert.click()
    await wait(3000 * speed)

    let voltar = document.querySelector('[label="Voltar"]')
    await wait(500 * speed)

    process.status = 'Migrada'
    voltar.click()
    await wait(3000 * speed)

    let [input2] = document.getElementsByClassName(
      'input p-inputtext p-component'
    )
    input2.value = number
    input2.dispatchEvent(
      new Event('input', {
        bubbles: true,
        cancelable: true,
      })
    )
    await wait(3000 * speed)
    let [excluir] = document.getElementsByClassName(
      'ui-button-secondary p-button p-component p-button-icon-only'
    )
    // excluir.click()
    // let confirma = document.querySelector('[label="Confirmar"]')
    // confirma.click()

    input2.value = ''
    input2.dispatchEvent(
      new Event('input', {
        bubbles: true,
        cancelable: true,
      })
    )
  } catch {
    await wait(500 * speed)
    let voltar = document.querySelector('[label="Voltar"]')
    if (voltar) voltar.click()
    process.status = 'Erro'
  } finally {
    sendResponse({ result: 'data-ok', data: process, index: index })
    await wait(2000 * speed)
    modal(false)
  }
}

console.log('content script loaded')
