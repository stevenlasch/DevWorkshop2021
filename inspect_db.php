<?php
    $dbFile = './db/database.sqlite3';
    $db = new PDO("sqlite:$dbFile");
    
    $select = "SELECT * FROM users";
    $results = $db->query($select);
    
    echo(json_encode($results->fetchAll(PDO::FETCH_ASSOC)));
?>
