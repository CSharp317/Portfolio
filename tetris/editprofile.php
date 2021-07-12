<!DOCTYPE html>

<?php 
include "verify-login.php";
include "backend/alterar_dados.php";

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
    <link rel="stylesheet" href="./styles/global.css" />
    <link rel="stylesheet" href="./styles/forms.css" />

    <link
      href="https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@500&display=swap"
      rel="stylesheet"
    />
    <script src="https://kit.fontawesome.com/a076d05399.js"></script>

    <style>
      .container {
        margin: 50px 0;
      }
    </style>
  </head>

  <body>
    <div class="container">
      <div class="content">
        <h3>Atualize seus dados</h3>

        <div class="register">
          <form action="edit-profile" method="POST">
            <div class="input-icon">
              <i class="far fa-address-card"></i>
              <?php 
                echo 
                "<input type='text' name='nome' value='".$usuariologado['nome']."' 
                  placeholder='Nome Completo' />"; ?>
            </div>

            <div class="input-icon blocked">
              <i class="fas fa-passport"></i>
              <?php 
                echo 
                "<input type='number' name='cpf' value='".$usuariologado['cpf']."' 
                disabled placeholder='CPF' />";
              ?>
            </div>

            <div class="input-icon">
              <i class="far fa-envelope"></i>
              <?php 
                echo 
                "<input type='email' name='email' value='".$usuariologado['email']."' 
                placeholder='E-mail' />";
              ?>
            </div>

            <div class="double-input">
              <div class="input-phone-date icon">
                <i class="fas fa-phone"></i>
                
                <?php 
                  echo 
                  "<input type='tel' name='telefone' value='".$usuariologado['telefone']."' 
                    placeholder='Telefone' />";
                ?>
              </div>
              <div class="input-phone-date blocked">
                <?php 
                  echo 
                  "<input
                    type='text'
                    name='dt_nascimento'
                    class='input-date'
                    value='".$usuariologado['dt_nascimento']->format('d/m/Y')."'
                    disabled
                  />";
                ?>
              </div>
            </div>

            <div class="input-icon blocked">
              <i class="fas fa-user"></i>
                <?php 
                  echo 
                  "<input type='text' name='usuario' value='".$usuariologado['usuario']."' disabled 
                  placeholder='Usuário' />";
                ?>
            </div>

            <div class="input-icon">
              <i class="fas fa-lock"></i>
                <?php 
                  echo 
                  "<input type='password' name='senha' value='".$usuariologado['senha']."'  
                  placeholder='Senha' />";
                ?>
            </div>

            <button class="submit-button" type="submit">Salvar</button>
          </form>
        </div>

        <a href="game" class="link"> 
          <i class="fas fa-long-arrow-alt-left"></i>
          Voltar ao jogo 
        </a>
      </div>
    </div>

  </div>
  </body>
</html>
