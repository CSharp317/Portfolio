<?php 
    if( isset( $_POST["name"] ) ){
        $nome = $_POST["name"];
        $cpf = $_POST["cpf"];
        $email = $_POST["mail"];
        $telefone = $_POST["phone"];
        $dataNasc = $_POST["birth"];
        $usuario = $_POST["user"];         
        $senha = md5($_POST["password"]);
        
        $sql = "INSERT INTO usuarios 
        (nome, cpf, email, telefone, dt_nascimento, usuario, senha) 
        VALUES 
        ('$nome', '$cpf', '$email', '$telefone', '$dataNasc', '$usuario', '$senha') ";

        if ($conn->query($sql) === TRUE) {
        header("location: ./login");
        exit();
        } else {
            //echo "Error: " . $sql . "<br>" . $conn->error;
        }
        $conn->close();
    }
?>
