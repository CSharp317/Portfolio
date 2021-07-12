<?php
  $servername = "31.220.104.219";
  $username = "u363572247_tetris_user";
  $password = "Jk4@&D72";
  $dbname = "u363572247_tretris";

  $conn = new mysqli($servername, $username, $password, $dbname);

  if ($conn->connect_error) {
      die("Connection failed: " . $conn->connect_error);
  }

  if (!$conn->set_charset("utf8")) {
      printf("Error loading character set utf8: %s\n", $conn->error);
      exit();
  }

?>
