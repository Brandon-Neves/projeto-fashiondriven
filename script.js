let nomeUsuario = String(prompt('Digite o seu nome'))
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
  habilitarBotao()
}

function golaEscolhida(gola) {
  let produtoClicado = document.querySelector('.escolher-gola .selecionado')
  if (produtoClicado !== null) {
    produtoClicado.classList.remove('selecionado')
  }
  gola.classList.add('selecionado')
  escolherGola = gola.parentNode.querySelector('.gola-escolhida').innerHTML
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
  habilitarBotao()
}

function urlImagemReferencia() {
  urlImagem = String(document.querySelector('.imagem-referencia input').value)
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
    ).innerHTML = `<button class="ativado" onclick="confirmarPedido()">Confirmar pedido</button>`
  }
}

function confirmarPedido() {
  let promise = axios.post(
    'https://mock-api.driven.com.br/api/v4/shirts-api/shirts',
    {
      model: escolherModelo,
      neck: escolherGola,
      material: escolherTecido,
      image: urlImagem,
      owner: nomeUsuario,
      author: nomeUsuario
    }
  )
  promise.then(encomendaCriada)
  promise.catch(erroNaEncomenda)
}

function encomendaCriada() {
  alert('Sua encomenda foi realizada com sucesso')
}

function erroNaEncomenda() {
  alert('Houve um erro ao finalizar seu pedido, tente novamente')
}
