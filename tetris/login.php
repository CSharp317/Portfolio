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
        <h1>Preencha seus dados e bom jogo!</h1>
        <div class="login">
          <form action="verify-login" method="post">
            <div class="input-icon">
              <i class="fas fa-user"></i>
              <input type="text" name="user" placeholder="Usuário" />
            </div>
            <div class="input-icon">
              <i class="fas fa-lock"></i>
              <input type="password" name="password" placeholder="Senha" />
            </div>
            <button class="submit-button" type="submit">Entrar</button>
          </form>
        </div>
        <a href="register" class="link"> Criar uma conta </a>
      </div>
    </div>
  </body>
</html>
