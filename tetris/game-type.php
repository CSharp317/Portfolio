<!DOCTYPE html>

<?php 
include "verify-login.php";

if(!isset($_COOKIE['user'])){
  echo"<script language='javascript' type='text/javascript'>
  alert('Login necessário para acessar a página.');window.location
  .href='login';</script>";
  die();
}
?>

<html lang="pt">
  <head>
    <meta charset="UTF-8" />
    <title>TETRIS</title>
    <link
      href="https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@500&display=swap"
      rel="stylesheet"
    />
    <script src="https://kit.fontawesome.com/a076d05399.js"></script>

    <link rel="stylesheet" type="text/css" href="./styles/global.css" />
    <link rel="stylesheet" type="text/css" href="./styles/game-type.css" />
  </head>

  <body>
    <div class="container">
      <div class="content">
        <h1>Selecione o tamanho do tabuleiro:</h1>
        <div class="types">
          <a href="game?c=10&r=20">
            <div class="box blue">
              <table>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </table>
              <span>10x20</span>
            </div> </a
          ><a href="game?c=22&r=44">
            <div class="box green">
              <table>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </table>
              <span>22x44</span>
            </div>
          </a>
        </div>
      </div>
    </div>
  </body>
</html>

