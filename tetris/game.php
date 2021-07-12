  
<?php 

include "backend/conexao.php"; 
include "backend/salvar-jogo.php";
include "verify-login.php";

if(!isset($_COOKIE['user'])){
  echo"<script language='javascript' type='text/javascript'>
  alert('Login necessário para acessar a página.');window.location
  .href='login';</script>";
  die();
}

?>

<!DOCTYPE html>
<html lang="pt">

<head>
  <meta charset="UTF-8" />
  <title>TETRIS</title>
  <link href="https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@500&display=swap" rel="stylesheet" />
  <script src="https://kit.fontawesome.com/a076d05399.js"></script>


  <link rel="stylesheet" type="text/css" href="./styles/global.css" />
  <link rel="stylesheet" type="text/css" href="./styles/game.css" />
</head>

<body>
  <div class="container">
    <div class="content">  
      <div class="all">
        <a href="edit-profile" class="profile">
          <i class="fas fa-user"></i>
        </a>       
        <div class="painel">
          <div class="painel1">
            <div class="div-info-caixas">
                <!-- Exibe prómixa peça a a ser coloca em jogo -->
                <div class="caixas">
                  <div><p>Próxima Peça</p></div>
                  <div><canvas id="next-piece"></canvas></div>
                </div>
              <!-- Exibe informações sobre o game -->
              <div class="game-info">
                <div class="duration">
                <h3 class="text-header">Tempo</h3>
                <h3 class="text-content" id="duration-display-minutes">00</h3>
                <h3 class="text-content">:</h3>
                <h3 class="text-content" id="duration-display-seconds">00</h3>
                </div>          

                <div class="dificulty">
                <h3 class="text-header">Dificuldade</h3>
                <h3 class="text-content" id="dificulty-display-text">FÁCIL</h3>
                </div>
              </div>
            </div>
            
            <!-- Exibe o jogo -->
            <div class="game-window">
              <canvas id="tabuleiro"></canvas>
            </div>
            
              <div class="div-info-caixas">
                <!-- Exibe a peça guardada -->
                <div class="caixas">
                  <button id="but-stock" onclick="guardarPeca()">Guardar Peça</button>
                  <div><canvas id="stock-piece"></canvas></div>
                </div>
              
                <!-- Exibe informações sobre o jogo -->
                <div class="game-info">
                  <div class="score">
                  <h3 class="text-header">Pontuação</h3>
                  <h3 class="text-content" id="score-display">0</h3>
                  </div>

                  <div class="lines">
                  <h3 class="text-header">Linhas</h3>
                  <h3 class="text-content" id="lines-display-text">0</h3>
                  </div>
                </div>
            </div>
          </div>
          <div>
            <!-- Botões da tela do jogo -->
            <div class="div-buttons">
              <div>
                <!-- Botão iniciar jogo -->
                <a class="but play-button" href="./game-type">
                  <i class="fas fa-dice" style="padding-right: 4px"></i>
                  NOVO JOGO
                </a>

                <!-- Botão sair do jogo -->
                <a class="but quit-button" href="./logout">
                  <i class="fas fa-backspace"></i>
                  SAIR
                </a>
              </div>
              <div>
                <!-- Botão pausar do jogo -->
                <a id= "pauseButton"class="but pauseGame-button" href="#" onclick="pause()">
                  <i class="far fa-pause-circle"></i>
                  Pausar Jogo
                </a>
          
                <!-- Botão ir para ranking -->
                <a class="but ranking-button" href="./ranking">
                  <i class="fas fa-award"></i>
                  Ranking
                </a>
              </div>
            </div>
          </div>  
        </div>

        <!-- Mostra ranking ao lado do jogo -->
        <div class="ranking">
        <?php
        include "backend/conexao.php";

        $userid = $_COOKIE['user'];
        
        $sql = "SELECT * FROM historico_jogos 
        INNER JOIN usuarios
        ON historico_jogos.usuario_id = usuarios.id
        WHERE historico_jogos.usuario_id = '$userid';";
        $resultado_usuarios = $conn->query($sql);

        while($row = $resultado_usuarios->fetch_assoc()) {
            echo"<div class='row'>";
            echo"<p class='rank-score'>". $row['pontuacao']."</p>";
            echo"<p class='rank-dificulty'>". $row['dificuldade']."</p>";
            echo"<p class='rank-duration'>". $row['duracao']."</p>";
            echo"</div>";
        }
        ?>
        </div>
      </div>
    </div>
  </div>

  <div id="loading">
    <div id="loading-image">
      <img src="img/loading.gif" alt="Loading..." />
      <h3 class="load-text">Salvando seu progresso, aguarde um momento...</h3>
    </div>
  </div>

  <script src="pecas.js"></script>
  <script src="game.js"></script>
  <script language="javascript">document.onkeydown = aplicaTeclado;</script>

</body>

</html>
