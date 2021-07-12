  
<?php 
  $userid = $_COOKIE["user"];
  $dt = "0000-00-00";
  $usuariologado = array(
    "id" => "",
    "nome" => "", 
    "cpf" => "", 
    "email" => "", 
    "telefone" => "", 
    "dt_nascimento" => new DateTime('2000-01-01'), 
    "usuario" => "", 
    "senha" => "" 
  );

  $sql = "SELECT * FROM usuarios WHERE id = '$userid'";
  $result = $conn->query($sql);

  if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
      $usuariologado = $row;
    }
    $dt = $usuariologado['dt_nascimento'];
    $usuariologado['dt_nascimento'] = new DateTime($row['dt_nascimento']);
  } else {
    echo "0 results";
  }
  
  if(isset($_POST["nome"])){
    $nome = $_POST["nome"];
    $cpf = $usuariologado["cpf"];
    $email = $_POST["email"];
    $telefone = $_POST["telefone"];
    $dataNasc = $dt;
    $usuario = $usuariologado["usuario"];         
    $senha = md5($_POST["senha"]);

    $sql = "UPDATE usuarios SET
      nome='$nome', cpf='$cpf', email='$email', 
      telefone='$telefone', dt_nascimento=$dataNasc, usuario='$usuario', senha='$senha'
    WHERE id='$userid'";
    
    if ($conn->query($sql) === TRUE) {
      header("location: ./edit-profile");
      exit();
    } else {
      echo "Error: " . $sql . "<br>" . $conn->error;
    }

    $conn->close();
  }
?>
