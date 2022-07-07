let nomeUsuario = String(prompt('Digite o seu nome'))
let escolherModelo
let escolherGola
let escolherTecido
let urlImagem
let blusas
let verificaUrl = /^[a-zA-Z0-9-_]+[:./\\]+([a-zA-Z0-9 -_./:=&"'?%+@#$!])+$/

buscarBlusas()
function buscarBlusas() {
  let promise = axios.get(
    'https://mock-api.driven.com.br/api/v4/shirts-api/shirts'
  )
  promise.then(renderizarUltimosPedidos)
}

function renderizarUltimosPedidos(resposta) {
  blusas = resposta.data
  document.querySelector('.ultimos-pedidos').innerHTML = ''
  for (let i = 0; i <= 10; i++) {
    document.querySelector('.ultimos-pedidos').innerHTML += `
    <div class="pedido" onclick="repetirPedido(this)">
    <div class="fundo-pedido">
    <p class="modelo-escolhido">${blusas[i].model}</p>
    <p class="gola-escolhida">${blusas[i].neck}</p>
    <p class="tecido-escolhido">${blusas[i].material}</p>
      <img src="${blusas[i].image}" alt="" />
      <h3><strong>Criador:</strong> <span>${blusas[i].owner}</span></h3>`
  }
}

function repetirPedido(pedidoEscolhido) {
  let pegarModelo = pedidoEscolhido.querySelector('.modelo-escolhido').innerHTML
  let pegarGola = pedidoEscolhido.querySelector('.gola-escolhida').innerHTML
  let pegarMaterial =
    pedidoEscolhido.querySelector('.tecido-escolhido').innerHTML
  let pegarImagem = pedidoEscolhido.querySelector('img').src
  let pegarCriador = pedidoEscolhido.querySelector('span').innerHTML
  let confirmarPedido = confirm(
    'Você tem certeza que gostaira de pedir esse produto novamente?'
  )
  if (confirmarPedido) {
    let promise = axios.post(
      'https://mock-api.driven.com.br/api/v4/shirts-api/shirts',
      {
        model: pegarModelo,
        neck: pegarGola,
        material: pegarMaterial,
        image: pegarImagem,
        owner: pegarCriador,
        author: pegarCriador
      }
    )
    promise.then(encomendaCriada)
    promise.catch(erroNaEncomenda)
  }
}

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
  buscarBlusas()
}

function erroNaEncomenda() {
  alert('Houve um erro ao finalizar seu pedido, tente novamente')
}
