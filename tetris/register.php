<?php 
  include "./backend/conexao.php";
  include "./backend/registrar_user.php"; 
?>

<!DOCTYPE html>
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
  </head>

  <body>
    <div class="container">
      <div class="content">
        <h1>Bem vindo ao Rolling Tetris!</h1>
        <h3>Realize seu cadastro</h3>

        <div class="register">
          <form action="register" method="POST">
            <div class="input-icon">
              <i class="far fa-address-card"></i>
              <input type="text" name="name" placeholder="Primeiro e Último nome" onblur="up(this)" onkeyup="check_number(this)" required />
            </div>

            <div class="input-icon">
              <i class="fas fa-passport"></i>
              <input type="text" name="cpf" placeholder="CPF" onkeyup="check_text(this)" required />
            </div>

            <div class="input-icon">
              <i class="far fa-envelope"></i>
              <input type="email" name="mail" placeholder="E-mail" onkeyup="lower(this)" required />
            </div>

            <div class="double-input">
              <div class="input-phone-date icon">
                <i class="fas fa-phone"></i>
                <input type="tel" name="phone" placeholder="DDD+Telefone" onkeyup="check_text(this)" required />
              </div>
              <div class="input-phone-date icon2">
                <input type="date" name="birth" class="input-date" required/>
              </div>
            </div>

            <div class="input-icon">
              <i class="fas fa-user"></i>
              <input type="text" name="user" placeholder="Usuário" required />
            </div>

            <div class="input-icon">
              <i class="fas fa-lock"></i>
              <input type="password" name="password" placeholder="Senha" required />
            </div>

            <button id="but_cad" class="submit-button" type="submit">Cadastrar</button>
          </form>
        </div>

        <a href="login" class="link"> 
          <i class="fas fa-long-arrow-alt-left"></i>
          Voltar para o login 
        </a>
      </div>
    </div>
    <script src="./forms_check.js"></script>
  </body>
</html>
