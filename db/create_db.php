<?php
  $dbFile = 'database.sqlite3';
  
  if (file_exists($dbFile)) {
     echo("The file <code>$dbFile</code> already exists. It will be deleted.");
     unlink($dbFile);
  }

  $db = new PDO("sqlite:$dbFile");
  
  $db -> exec('CREATE TABLE users (
                  ID         INTEGER PRIMARY KEY AUTOINCREMENT,
                  login      TEXT UNIQUE NOT NULL,
                  name       TEXT,
                  avatar_url TEXT,
                  created_at DATE
              );'
            );
?>
