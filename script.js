let nomeUsuario
let escolherModelo
let escolherGola
let escolherTecido
let urlImagem
let verificaUrl = /^[a-zA-Z0-9-_]+[:./\\]+([a-zA-Z0-9 -_./:=&"'?%+@#$!])+$/

function modeloEscolhido(modelo) {
  let produtoClicado = document.querySelector('.escolher-modelo .selecionado')
  if (produtoClicado !== null) {
    produtoClicado.classList.remove('selecionado')
  }
  modelo.classList.add('selecionado')
  escolherModelo =
    modelo.parentNode.querySelector('.modelo-escolhido').innerHTML
  console.log(escolherModelo)
  habilitarBotao()
}

function golaEscolhida(gola) {
  let produtoClicado = document.querySelector('.escolher-gola .selecionado')
  if (produtoClicado !== null) {
    produtoClicado.classList.remove('selecionado')
  }
  gola.classList.add('selecionado')
  escolherGola = gola.parentNode.querySelector('.gola-escolhida').innerHTML
  console.log(escolherGola)
  habilitarBotao()
}

function tecidoEscolhido(tecido) {
  let produtoClicado = document.querySelector('.escolher-tecido .selecionado')
  if (produtoClicado !== null) {
    produtoClicado.classList.remove('selecionado')
  }
  tecido.classList.add('selecionado')
  escolherTecido =
    tecido.parentNode.querySelector('.tecido-escolhido').innerHTML
  console.log(escolherTecido)
  habilitarBotao()
}

function urlImagemReferencia() {
  urlImagem = document.querySelector('.imagem-referencia input').value
  habilitarBotao()
}

function habilitarBotao() {
  if (
    escolherModelo !== undefined &&
    escolherGola !== undefined &&
    escolherTecido !== undefined &&
    verificaUrl.test(urlImagem)
  ) {
    document.querySelector(
      '.confirmar-pedido'
    ).innerHTML = `<button class="ativado">Confirmar pedido</button>`
  }
}
