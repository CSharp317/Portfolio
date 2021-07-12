<?php 
  $userid = $_COOKIE["user"];
  
  if(isset($_POST["pontuacao"])){
    $pontuacao = $_POST["pontuacao"];
    $duracao = $_POST["duracao"];
    $dificuldade = $_POST["dificuldade"];
    $linhas = $_POST["linhas"];

    $sql = "INSERT INTO historico_jogos 
            (usuario_id, pontuacao, duracao, dificuldade, linhas) 
            VALUES 
            ($userid, $pontuacao, '$duracao', '$dificuldade', $linhas)
          ";
    
    if ($conn->query($sql) === TRUE) {
        header("location: ./game");
        exit();
    } else {
        //echo "Error: " . $sql . "<br>" . $conn->error;
    }

    $conn->close();
  }
?>
