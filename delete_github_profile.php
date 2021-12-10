<?php
    if($_SERVER["REQUEST_METHOD"] != "POST")
    {
        exit();
    }

    $dbFile = './db/database.sqlite3';

    $id = $_POST['ID'];
    if(!$id)
    {
        exit();
    }
   
    if(!is_numeric($id))
    {
        exit();
    }

    $db = new PDO("sqlite:$dbFile");
    $sql = "DELETE FROM users WHERE ID = $id";
    $db->exec($sql);
?>
