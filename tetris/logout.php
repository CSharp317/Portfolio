<?php
include "verify-login.php";

if (isset($_COOKIE['user'])) {
    unset($_COOKIE['user']); 
    setcookie('user', "", time()-3600);
    echo"<script language='javascript' type='text/javascript'>
    alert('Logout realizado com sucesso.');window.location
    .href='login';</script>";
    die();
}
?>
