/**
 * Constantes globais
 */
const tabuleiro = document.getElementById("tabuleiro");
const tabuleiroNext = document.getElementById("next-piece");
const tabuleiroStock = document.getElementById("stock-piece");
const pontuacao = document.getElementById("score-display");
const minutos = document.getElementById("duration-display-minutes");
const segundos = document.getElementById("duration-display-seconds");
const textoDificuldade = document.getElementById("dificulty-display-text");
const textoLinhas = document.getElementById("lines-display-text");
const parametrosURL = new URLSearchParams(window.location.search);
const LINHAS = parseInt(parametrosURL.get("r")) || 20;
const COLUNAS = parseInt(parametrosURL.get("c")) || 10;
const QUADRADO = LINHAS > 20 ? 10 : 20;
const COR = "black";
const contexto = tabuleiro.getContext("2d");
// Abribui os tabuleiros menores as "context"
const contexto2 = tabuleiroNext.getContext("2d");
const contexto3 = tabuleiroStock.getContext("2d");

const DIFICULDADES = {
  FÁCIL: 800,
  MÉDIO: 600,
  DIFÍCIL: 400,
  MESTRE: 200,
};

const PIECES = [
  [I, "#d10000e8"],
  [O, "#00a500e8"],
  [L, "#eaee00e8"],
  [J, "blue"],
  [T, "#9f00cfe8"],
  [U, "#ee8700e8"],
  [E, "#00eaffe8"],
];

let pontos = 0;
let linhas = 0;
let min = 0;
let sec = 0;
let rotacionado = false;
let dificuldade = DIFICULDADES["FÁCIL"];
let gameOver = false;
let ESQUERDA = 37;
let DIREITA = 39;
let CIMA = 38;
let BAIXO = 40;
let PAUSE = 80;
let REMAP_KEY_T = 5019;
let jogoPausado = false;



/**
 * @author Furlan
 * Cria um array multidimensional
 * O array ajuda a mapear as cores da tela
 * O item do array segura a cor padrão se não tiver peça
 * O item do array segura a cor da peça se tiver peça
 */
let tela = [];
for (let li = 0; li < LINHAS; li++) {
  tela[li] = [];
  for (let col = 0; col < COLUNAS; col++) {
    //todas as unidades do tabuleiro contem um valor de cor para validar espeços vazios e colisão
    tela[li][col] = COR;
  }
}

/**
 * @author Cicero
 * Cria 1 quadrado de 20 pixels
 * Pinta os quadrados do tabuleiro conforme a peça escolhida
 * @param x Posição do ponto X do tabuleiro
 * @param y Posição do ponto Y do tabuleiro
 * @param color Cor do quadrado
 */
function pintarQuadrado(x, y, color) {
  contexto.fillStyle = color;
  contexto.fillRect(x * QUADRADO, y * QUADRADO, QUADRADO, QUADRADO);

  contexto.strokeStyle = "#0c0c0ce8";
  contexto.strokeRect(x * QUADRADO, y * QUADRADO, QUADRADO, QUADRADO);
}
/**
 * @author Carlos
 * Pinta os quadrados dos tabuleiros menores nas laterais do tabuleiro
 */
function pintarQuadrado2(x, y, color, con) {
  // c recebe o contexto a ser alterado(contexto2 ou contexto3)
  var c = con;
  c.fillStyle = color;
  c.fillRect(x * 15, y * 15, 15, 15);
  c.strokeStyle = "#0c0c0ce8";
  c.strokeRect(x * 15, y * 15, 15, 15);
}

/**
 * @author Cicero
 * Cria o tabuleiro inteiro
 * Baseado no tamanho selecionado pelo jogador
 */
function desenharTabuleiroNaTela() {
  tabuleiro.setAttribute("width", COLUNAS * QUADRADO);
  tabuleiro.setAttribute("height", LINHAS * QUADRADO);

  for (let linha = 0; linha < LINHAS; linha++) {
    for (let coluna = 0; coluna < COLUNAS; coluna++) {
      pintarQuadrado(coluna, linha, tela[linha][coluna]);
    }
  }
}

/**
 * @author Carlos
 * Cria tabuleiros menores que iraom conter proxima peça e peca guardada
 */
function desenharTabuleiroNaTela2(){
  tabuleiroNext.setAttribute("width", "90");
  tabuleiroNext.setAttribute("height", "150");
  tabuleiroStock.setAttribute("width", "90");
  tabuleiroStock.setAttribute("height","150");

  for( li = 0; li < 5; li++){
      for(col = 0; col < 6; col++){
        pintarQuadrado2(col, li, tela[li][col], contexto2);
        pintarQuadrado2(col, li, tela[li][col], contexto3);
      }
  }
}
desenharTabuleiroNaTela();
desenharTabuleiroNaTela2();


/**
 * @author Cicero
 * Rotaciona o tabuleiro
 */
function rotacionaTabuleiro() {
  tabuleiro.style.transform = rotacionado ? "rotate(0deg)" : "rotate(180deg)";
  rotacionado = !rotacionado;
}

/**
 * @author Cicero
 * @param linha array de quadrados que compoem uma linha
 */
function verificaSeHaPecaEspecial(linha) {
  let temPecaEspecialNaLinha = linha.find(
    (item) => item === PIECES.find(item => item[0] === E)[1]
  );

  if (!!temPecaEspecialNaLinha) {
    rotacionaTabuleiro();

    CIMA = rotacionado ? 40 : 38;
    BAIXO = rotacionado ? 38 : 40;
    DIREITA = rotacionado ? 37 : 39;
    ESQUERDA = rotacionado ? 39 : 37;
  }
}

/**
 * @author Cicero
 * Reinicia o jogo 
 */
function reiniciaJogo() {
  for (let linha = 0; linha < LINHAS; linha++) {
    for (let coluna = 0; coluna < COLUNAS; coluna++) {
      tela[linha][coluna] = COR;
    }
  }

  rotacionado && rotacionaTabuleiro();
  gameOver = false;
  min = 0;
  sec = 0;
  pontos = 0;
  linhas = 0;
  textoLinhas.innerHTML = 0;
  dificuldade = DIFICULDADES["FÁCIL"];
  textoDificuldade.innerHTML = "FÁCIL";

  ESQUERDA = 37;
  DIREITA = 39;
  CIMA = 38;
  BAIXO = 40;
}

/**
 * @author Carlos
 * Cria conjunto de peças e chama a função criaPeca() 
 * que irá escolher uma peça a partir desse conjunto
 */
function pecaAleatoria() {
  let r = (randomN = Math.floor(Math.random() * PIECES.length)); // 0 -> 7
  criarPeca(PIECES[r][0], PIECES[r][1]);
}

// cria peça e conjunto de peça que será próxima peça
this.proxPeca = [];
this.proxPecaColor = "";
// cria próxima peça e peça atual do jogo
pecaAleatoria();
pecaAleatoria();

function criarPeca(tetromino, color) {
  this.conjuntoPecas = tetromino;
  this.cor = color;
  this.pecaN = 0; // we start from the first pattern
  this.pecaAtiva = [];
  this.x = 3;
  this.y = -3;

  if( this.proxPeca.length==0 ){
    // atribui a peça criada(tetromino) nos elementos proxPeca
    this.conjuntoProxPecas = conjuntoPecas;
    this.proxPeca = conjuntoPecas[pecaN]; 
    this.proxPecaColor = cor;    
  } else{
    // abribui os elementos proxPeca aos eelementos pecaAtiva
    this.conjuntoPecasAtiva = conjuntoProxPecas;
    pecaAtiva = this.proxPeca;
    cor = this.proxPecaColor;    
    // apaga as peças do tabuleiro pequeno(próxima peça)
    colocarPeca(COR, 2, this.proxPeca);  
    // atribui a peça criada(tetromino) nos elementos proxPeca 
    this.proxPeca = conjuntoPecas[pecaN]; 
    this.proxPecaColor = color;
    conjuntoProxPecas = conjuntoPecas;
   // pinta a peça atual no tabuleiro 
    colocarPeca(color, 1, this.pecaAtiva);  
  }  
  // pinta a proxima peça no tabuleiro pequeno(próxima peça)
  colocarPeca(color, 2, this.proxPeca);
}

/**
 * @author Carlos
 * coloca peças no devido tabuleiro
 */
function colocarPeca(color, local, peca) {
  if( peca ){
    for (let r = 0; r < peca.length; r++) {
      for (let c = 0; c < peca.length; c++) {
        // pintar apenas em celulas que tem valor binário igual a 1
        if ( peca[r][c] ) {
          if( local == 1 )
            pintarQuadrado(this.x + c, this.y + r, color);
          if( local == 2 )  
            pintarQuadrado2( 1+c, 1+r, color, contexto2 );
          if( local == 3 )
            pintarQuadrado2( 1+c, 1+r, color, contexto3 );
        }
      }
    }
  }    
}


/**
 * @author Carlos
 * Guarda peça atual e pinta a mesma no tabuleiro pequeno(Guardar Peça)
 */
var clickButton = true;
this.pecaEstoque = [];
function guardarPeca(){
  // apaga a pecaEstoque no tabuleiro pequeno(Guardar Peça)
  colocarPeca(COR, 3, this.pecaEstoque);   
  if( clickButton == true ) {
       
    conjuntoEstoquePeca = this.conjuntoPecasAtiva; 
    this.pecaEstoque = this.conjuntoPecasAtiva[this.pecaN];
    estoquePecaColor = this.cor;  
    // pinta a pecaEstoque no tabuleiro pequeno(Guardar Peça)
    colocarPeca(estoquePecaColor, 3, this.pecaEstoque);
    // apaga a peca Ativa no tabuleiro 
    colocarPeca( COR, 1, this.pecaAtiva);
    clickButton = false;
    pecaAleatoria();
  }else{
    // pinta a peca Ativa no tabuleiro
    colocarPeca(COR, 1, this.pecaAtiva);
    // atribui os elementos da peça Estoque na peça Ativa
    this.conjuntoPecasAtiva = conjuntoEstoquePeca;
    this.pecaAtiva = conjuntoPecasAtiva[this.pecaN];
    this.cor = this.estoquePecaColor;
    // pinta a peca Ativa no tabuleiro
    colocarPeca(this.cor, 1, this.pecaAtiva);

    clickButton = true;
  }

  var butGuardarPeca = document.getElementById("but-stock").innerText;
  butGuardarPeca == "Guardar Peça" ? document.getElementById("but-stock").innerText = "Usar Peça" : document.getElementById("but-stock").innerText = "Guardar Peça";
}
/**
 * @author Alexsander
 * Coloca e tira peça no tabuleiro
 * Move peça para nova posição apagando da posição antiga e desenhando em uma nova posição
 * Rotaciona peça ativa na sua posição atual
 */

function desenhaPeca() {
  this.colocarPeca(this.cor, 1, this.pecaAtiva);
}

function apagaPeca() {
  this.colocarPeca(COR, 1, this.pecaAtiva);
}

function moveBaixo() {
  if (!this.colisao(0, 1, this.pecaAtiva)) {
    this.apagaPeca();
    this.y++;
    this.desenhaPeca();
  } else {
    this.travarPeça();
    p = pecaAleatoria();
  }
}

function moveDireita() {
  if (!this.colisao(1, 0, this.pecaAtiva)) {
    this.apagaPeca();
    this.x++;
    this.desenhaPeca();
  }
}

function moveEsquerda() {
  if (!this.colisao(-1, 0, this.pecaAtiva)) {
    this.apagaPeca();
    this.x--;
    this.desenhaPeca();
  }
}

function rotacionaPeca() {
  let nextPattern = this.conjuntoPecasAtiva[(this.pecaN + 1) % this.conjuntoPecasAtiva.length];
  let kick = 0;

  if (this.colisao(0, 0, nextPattern)) {
    if (this.x > COLUNAS / 2) {
      // it's the right wall
      kick = -1; // we need to move the piece to the left
    } else {
      // it's the left wall
      kick = 1; // we need to move the piece to the right
    }
  }

  if (!this.colisao(kick, 0, nextPattern)) {
    this.apagaPeca();
    this.x += kick;
    this.pecaN = (this.pecaN + 1) % this.conjuntoPecasAtiva.length; // (0+1)%4 => 1
    this.pecaAtiva = this.conjuntoPecasAtiva[this.pecaN];
    this.desenhaPeca();
  }
}

/**
 * @author Alexsander
 * Verifica colizão das peças
 */
function colisao(x, y, peca) {
  for (let r = 0; r < peca.length; r++) {
    for (let c = 0; c < peca.length; c++) {
      if (!peca[r][c]) {
        continue;
      }
      let newX = this.x + c + x;
      let newY = this.y + r + y;

      if (newX < 0 || newX >= COLUNAS || newY >= LINHAS) {
        return true;
      }
      if (newY < 0) {
        continue;
      }
      if (tela[newY][newX] != COR) {
        return true;
      }
    }
  }
  return false;
}

/**
 * @author Furlan
 * Trava peças quando encontram outras peças
 * Trava peças quando encostam na extremidade do tabuleiro
 * Determina quando o jogo acaba
 * Controle pontuacao
 * Chama a função para alterar a dificuldade
 */
function travarPeça() {
  let linhasCompletas = 0;
  // trava peças na tela
  for (let li = 0; li < this.pecaAtiva.length; li++) {
    for (let col = 0; col < this.pecaAtiva.length; col++) {
      // peça conta como um array de 0 e 1, então ignoramos os espaços vazios da peça (0)
      if (!this.pecaAtiva[li][col]) {
        continue;
      }
      // controla peças que colidam com o topo da tela
      // r do loop controla a altura da tela em que a peça está
      // this.y controla a posição que a peça ocupa
      // se ficar menor que 0, a peça está fora do tabuleiro, na parte de cima
      if (this.y + li < 0) {
        if(!alert("Game Over")){
                  
          const resultadoJogo = {
            pontuacao: pontuacao.innerHTML,
            duracao: `${minutos.innerHTML}:${segundos.innerHTML}`,
            dificuldade: textoDificuldade.innerHTML,
            linhas: textoLinhas.innerHTML,
          }
          document.getElementById("loading").style.display = "block";
          this.enviaJogoParaSalvarNaBase('game', resultadoJogo);
        } 
        gameOver = true;
        break;
      }
      // muda a cor da tela na posição da peça para a cor da peça
      tela[this.y + li][this.x + col] = this.cor;
    }
  }
  // remove linhas completas (ponto)
  for (let li = 0; li < LINHAS; li++) {
    let linhaCompleta = true;
    // verifica se todas as unidades da linha possuem cor diferente da default
    for (let col = 0; col < COLUNAS; col++) {
      linhaCompleta = linhaCompleta && tela[li][col] != COR;
    }
    if (linhaCompleta) {
      verificaSeHaPecaEspecial(tela[li]);
      linhasCompletas += 1;
      // movimenta todas as cores de peça para baixo (eliminando a linha)
      for (let y = li; y > 1; y--) {
        for (let col = 0; col < COLUNAS; col++) {
          tela[y][col] = tela[y - 1][col];
        }
      }
      // pinta a linha de cima com cor default
      for (let col = 0; col < COLUNAS; col++) {
        tela[0][col] = COR;
      }
      textoLinhas.innerHTML = linhas += 1;
    }
  }
  //lógica para multiplicação da pontuacao
  pontos += (10 * linhasCompletas) * linhasCompletas;
  dificuldade = alteraDificuldade(pontos);
  gameOver && reiniciaJogo();
  // repinta a tela com as cores armazenadas no array tela
  desenharTabuleiroNaTela();
  pontuacao.innerHTML = pontos;
}

/**
 * @author Furlan
 * Controle de tempo
 * Atualiza a duração do jogo a cada segundo
 */
setInterval(() => {
  sec += 1;
  if (sec > 59) {
    sec = 0;
    min += 1;
  }
  minutos.innerHTML = (min < 10 ? "0" : "") + min;
  segundos.innerHTML = (sec < 10 ? "0" : "") + sec;
}, 1000);

/**
 * @author Furlan
 * Função jogo, roda até o jogo terminar
 * Termina o jogo
 * Controla a velocidade de caida das peças
 */
let começoQueda = new Date();

function jogar() {
  let agora = new Date();
  let frame = agora - começoQueda;
  if (frame > dificuldade) {
    moveBaixo();
    começoQueda = new Date();
  }
  if (!gameOver) {
    requestAnimationFrame(jogar);
  }
}

/**
 * @author Furlan
 * Controle de dificuldade
 * A dificuldade determina a velocidade de caida das peças
 * Cada dificuldade faz as peças cairem mais rapido
 */
function alteraDificuldade(pontos) {
  if (pontos >= 900) {
    dificuldade = DIFICULDADES["MESTRE"];
    textoDificuldade.innerHTML = "MESTRE";
  } else if (pontos >= 600) {
    dificuldade = DIFICULDADES["DIFÍCIL"];
    textoDificuldade.innerHTML = "DIFÍCIL";
  } else if (pontos >= 300) {
    dificuldade = DIFICULDADES["MÉDIO"];
    textoDificuldade.innerHTML = "MÉDIO";
  } else {
    dificuldade = DIFICULDADES["FÁCIL"];
  }
  return dificuldade;
}

/**
 * @author Alexsander
 * Função que pausa o jogo
 * Checa e evento do tecla pressionada no navegador
 * Controla ação de movimento da peça no jogo
 */
 
function pausarJogo(){
  let backupTela = tela;
  if(jogoPausado == false){

    clearInterval(jogoPausado);
  }else{
    
    //alert("!!JOGO EM PAUSA!!\n !!!CLIQUE EM 'OK' E APERTE 'P' PARA RETOMAR!!!");
    const date = Date.now();
    let currentDate = null;
    this.y--;
    
    do {
      currentDate = Date.now();
    } while (currentDate - date < 2000);
  }
}

function checkEventObj (event){
  if ( window.event )
  return window.event;
  else
  return event;
  }

function aplicaTeclado (event){
  var winObj = checkEventObj(event);
  var intKeyCode = winObj.keyCode;

  if ( intKeyCode == DIREITA && jogoPausado == false){
    moveDireita();
    começoQueda = new Date();

  } else if(intKeyCode == ESQUERDA && jogoPausado == false){
    moveEsquerda();
    começoQueda = new Date();

  } else if(intKeyCode == BAIXO && jogoPausado == false){
    moveBaixo();
    começoQueda = new Date();

  } else if(intKeyCode == CIMA && jogoPausado == false){
    rotacionaPeca();
    começoQueda = new Date(); 
  }else{
    winObj.keyCode = intKeyCode = REMAP_KEY_T;
    winObj.returnValue = false;
  return false;
  }
}


function pause(){
   // Faz o backup da tela do jogo
   let backupTela = tela;
   // Limpa as peças do tabuleiro, "caixa próximas peças" e "caixa guarda peça"
   for (let linha = 0; linha < LINHAS; linha++) {
     for (let coluna = 0; coluna < COLUNAS; coluna++) {
       pintarQuadrado(coluna, linha, COR);
     }
   }
 
   colocarPeca(COR, 2, this.proxPeca);
   colocarPeca(COR, 3, this.pecaEstoque);
     if(jogoPausado == false){
       setInterval(pausarJogo,0);
       jogoPausado = true; 
 
     }else if(jogoPausado == true){
       tela = backupTela;
       desenharTabuleiroNaTela();
       colocarPeca(this.proxPecaColor, 2, this.proxPeca);
       colocarPeca(this.estoquePecaColor, 3, this.pecaEstoque);
       setInterval(pausarJogo,0);
       jogoPausado = false;
     }
     var butpause = document.getElementById("pauseButton").innerText;
  butpause == "Pausar Jogo" ? document.getElementById("pauseButton").innerText = "Retomar" : document.getElementById("pauseButton").innerText = "Pausar Jogo";
}


jogar();

function enviaJogoParaSalvarNaBase(path, params, method='post') {
  const form = document.createElement('form');
  form.method = method;
  form.action = path;

  for (const key in params) {
    if (params.hasOwnProperty(key)) {
    const hiddenField = document.createElement('input');
    hiddenField.type = 'hidden';
    hiddenField.name = key;
    hiddenField.value = params[key];

    form.appendChild(hiddenField);
    }
  }

  document.body.appendChild(form);
  form.submit();
}
