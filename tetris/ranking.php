<?php 
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
    <title>Ranking Tetris</title>
    <link rel="stylesheet" href="./styles/global.css" />
    <link rel="stylesheet" href="./styles/ranking.css" />

    <link
      href="https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@500&display=swap"
      rel="stylesheet"
    />
    <script src="https://kit.fontawesome.com/a076d05399.js"></script>
  </head>
  <body>
    <div class="container">
      <div class="content">
        <div id="text-top" class="img-text">
          <div class="trophyImg">
            <img src="./img/trop.png" alt="trophy" height="50" />
          </div>
          <div><h1>Ranking Top 10 Score</h1></div>
          <div class="trophyImg">
            <img src="./img/trop.png" alt="trophy" height="50" />
          </div>
        </div>
        <table>
        <thead>
            <tr>
              <th>Posição</th>
              <th>Username</th>
              <th>Pontuação</th>
            </tr>
          </thead>
        <?php 
          include "backend/conexao.php";
          $position = 1;
          $result_users = "SELECT * FROM historico_jogos 
          INNER JOIN usuarios
          ON historico_jogos.usuario_id = usuarios.id
           ORDER BY pontuacao DESC";
          $resultado_usuarios = mysqli_query($conn,$result_users);
  
          while($row_usuario = mysqli_fetch_assoc($resultado_usuarios)){
          
              echo"<tr><td> ".$position."</td>";
              echo"<td> ". $row_usuario['usuario']."</td>";
              echo"<td> ". $row_usuario['pontuacao']."</td> </tr>";
              $position++;

              if($position == 11){
                  break;
              }
          }
        ?>
        </table>
        <div id="text-bottom">
          <i class="fas fa-award"></i>
          <h2>Current Position</h2>
          <i class="fas fa-award"></i>
        </div>

        <table>
          <thead>
            <tr>
              <th>Posição</th>
              <th>Username</th>
              <th>Pontuação</th>
            </tr>
          </thead>
          
        <?php
        include "backend/conexao.php";
          
        $userid = $_COOKIE["user"];
        $position_player=0;
        $result_users = "SELECT * FROM historico_jogos 
        INNER JOIN usuarios
        ON  usuarios.id = historico_jogos.usuario_id 
        ORDER BY pontuacao DESC";

        $resultado_usuarios = mysqli_query($conn,$result_users);

        while($row_usuario = mysqli_fetch_assoc($resultado_usuarios)){
      
          $position_player++;
         
          if($row_usuario['usuario_id'] == $userid ){
            echo"<tr><td> ". $position_player."</td>";
            echo"<td> ". $row_usuario['usuario']."</td>";
            echo"<td> ". $row_usuario['pontuacao']."</td> </tr>";

              break;
          }
      }
        ?>
        </table>
        <!-- Botão voltar -->
        <a class="buttons return-button" href="./game">
          <i class="fas fa-arrow-left" style="padding-right: 4px"></i>
          VOLTAR
        </a>
      </div>
    </div>
  </body>
</html>
