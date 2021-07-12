<?php

include "backend/conexao.php";

if (isset($_POST["user"]) && isset($_POST["password"])) {
  $password_encrypted = md5($_POST['password']);
  $user = $_POST['user'];

  $sql = mysqli_query($conn, "SELECT * FROM usuarios WHERE usuario = '$user' and senha = '$password_encrypted'");
    
  $userfound = mysqli_fetch_assoc($sql);
  
  if (mysqli_num_rows($sql)<=0){
      echo"<script language='javascript' type='text/javascript'>
      alert('Login e/ou senha incorretos');window.location
      .href='login';</script>";
      die();
    }else{
      setcookie("user", $userfound['id']);
      header("Location:game-type");
    }
}

?>
