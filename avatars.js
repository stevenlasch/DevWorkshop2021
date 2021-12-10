
async function username_lookup() {
    try {
        let formData = new FormData();
        formData.append('username', document.getElementById("usernametext").value);

        const response = await fetch('/github_profile.php',
                {method: "POST", body: formData});

        if (response.ok) {
            let textResponse = await response.text();
            console.log("Username lookup request sent.");
            list_users();
            return;
        }
    } catch {
        console.log("Error sending username lookup request!");
    }
}

async function list_users() {
    try {
        const response = await fetch('/inspect_db.php');

        if (response.ok) {
            const usersJson = await response.json();
            var user = null;
            var data = "";

            for (var i = usersJson.length - 1; i >= 0; i--) {
                user = usersJson[i];

                data += '<div class="avatar">'
                + '<div class="content">'
                + '<div><span>Login:</span>' + user['login'] + '</div>'
                + '<div><span>Name:</span>' + user['name'] + '</div>'
                + '<div class="image"><img src="' + user['avatar_url'] + '" /></div>'
                + '</div>'
                + '<div class="created"><span>Created:</span>' + user['created_at'] + '</div>'
                + '</div>';
            }

            document.getElementById("container").innerHTML = data;
            console.log("Successfully fetched users list.");
            return;
        }
    } catch {
        console.log("Error users list!");
    }
}

list_users();
