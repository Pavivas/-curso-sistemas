

let auth =
{
	//Peticiones al servidor
	login: ( username, password ) =>
	{
		let data =
		{
			username: username,
			password: password
		};

		let connection = new XMLHttpRequest();

        connection.open('POST', './backend/auth/login.php');

        connection.addEventListener('loadend', on_login );
        connection.send( JSON.stringify(data) );
	},

	logout: ( session_key ) =>
	{
		let connection = new XMLHttpRequest();

        connection.open('POST', './backend/auth/logout.php');

        connection.addEventListener('loadend', on_logout );
        connection.send( JSON.stringify(session_key) );
	},

	getAuthData: () =>
	{
		return sessionStorage.getItem('crud-session-key');
	},

	getUsername: () =>
	{

	},

	destroySession: () =>
	{
		sessionStorage.removeItem('crud-session-key');
	}
}

let authView =
{
	login: (id) =>
	{
		let HTMLCode =
		`<div class="w3-modal-content w3-card-4 w3-animate-zoom" style="max-width:600px">
  
	      <div class="w3-center"><br>
	        <img src="./resources/login.png" alt="Avatar" style="width:30%" class="w3-circle w3-margin-top">
	      </div>

	      <div class="w3-container">
	        <div class="w3-section">
	          <label><b>Username</b></label>
	          <input id="loginUsername" class="w3-input w3-border w3-margin-bottom" type="text" placeholder="Enter Username" name="usrname" required="">
	          <label><b>Password</b></label>
	          <input id="loginPassword" class="w3-input w3-border" type="text" placeholder="Enter Password" name="psw" required="">
	          <button id="loginBtn" class="w3-button w3-block w3-green w3-section w3-padding">Login</button>
	          
	        </div>
	      </div>
	    </div>`;

	    document.getElementById(id).innerHTML = HTMLCode;

	    document.getElementById("loginBtn").addEventListener("click", () =>
	    {
	    	let username = document.getElementById("loginUsername").value;
	    	let password = document.getElementById("loginPassword").value;

	    	auth.login(username,password);
	    });
	}
}