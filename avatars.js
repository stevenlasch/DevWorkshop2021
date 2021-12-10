
async function add_profile() {
    try {
        let formData = new FormData();
        formData.append('username', document.getElementById("usernametext").value);

        const response = await fetch('/add_github_profile.php',
                {method: "POST", body: formData});

        if (response.ok) {
            let textResponse = await response.text();
            document.getElementById("usernametext").value = "";
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
                const d = new Date(user['created_at']);

                data += '<div class="avatar">'
                + '<div class="content">'
                + '<div><span>Login:</span>' + user['login'] + '</div>'
                + '<div><span>Name:</span>' + user['name'] + '</div>'
                + '<div class="image"><img src="' + user['avatar_url'] + '" /></div>'
                + '</div>'
                + '<div class="created"><span>Created:</span>' + d.getFullYear() + '</div>'
                + '<button type="button" class="close" aria-label="Close" onclick="delete_profile(' 
                + user['ID'] + ')"><span aria-hidden="true">&times;</span></button>'
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

async function delete_profile(id) {
        try {
        let formData = new FormData();
        formData.append('ID', id);

        const response = await fetch('/delete_github_profile.php',
                {method: "POST", body: formData});

        if (response.ok) {
            let textResponse = await response.text();
            console.log("Username delete request sent.");
            list_users();
            return;
        }
    } catch {
        console.log("Error sending username delete request!");
    }
}

function check_enter() {
    if(event.key === 'Enter') {
        add_profile();
    }
}

list_users();
