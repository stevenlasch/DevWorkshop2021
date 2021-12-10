<?php
    if($_SERVER["REQUEST_METHOD"] != "POST")
    {
        exit();
    }

    $dbFile = './db/database.sqlite3';

    $username = $_POST['username'];
    if(!$username)
    {
        exit();
    }
    $url_user = "https://api.github.com/users/" . $username;

    $headers = array(
        "Accept: application/vnd.github.v3+json",
        "User-Agent: Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.111 YaBrowser/16.3.0.7146 Yowser/2.5 Safari/537.36"
    );

    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_URL, $url_user);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $res = curl_exec($ch);
    curl_close($ch);
    
    if($res === false)
    {
        exit();
    }

    $jsonres = json_decode($res, true);

    $db = new PDO("sqlite:$dbFile");
    $login_var = $jsonres['login'];
    $name_var = $jsonres['name'];
    $avatar_url_var = $jsonres['avatar_url'];
    $created_at_var = $jsonres['created_at'];
    $sql = "INSERT INTO users (login, name, avatar_url, created_at) VALUES ('$login_var', '$name_var', '$avatar_url_var', '$created_at_var')";
    $db->exec($sql);
?>
