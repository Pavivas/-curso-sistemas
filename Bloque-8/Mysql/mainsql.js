let HTMLApplicationView = () =>
{
	let HTMLCode = `<nav class="w3-sidebar w3-bar-block w3-collapse w3-animate-left w3-card" style="z-index:3;width:250px;" id="mySidebar">
  <a class="w3-bar-item w3-button w3-border-bottom w3-large" href="#"><img src="https://www.w3schools.com/images/w3schools.png" style="width:80%;"></a>
  <a id="closeSidebarButton" class="w3-bar-item w3-button w3-hide-large w3-large">Close <i class="fa fa-remove"></i></a>
  <a class="w3-bar-item w3-button w3-teal" href="#">Home</a>
  <a id="userModuleButton" class="w3-bar-item w3-button" href="#">Gestiรณn de usuarios</a>
  <div>
    <div id="demo" class="w3-hide">
      <a class="w3-bar-item w3-button" href="#">Link</a>
      <a class="w3-bar-item w3-button" href="#">Link</a>
      <a class="w3-bar-item w3-button" href="#">Link</a>
    </div>
  </div>
</nav>

<div class="w3-overlay w3-hide-large w3-animate-opacity" style="cursor:pointer" id="myOverlay"></div>

<div class="w3-main" style="margin-left:250px;">

<div id="myTop" class="w3-container w3-top w3-theme w3-large">
  <p><i id="openSidebarButton" class="fa fa-bars w3-button w3-teal w3-hide-large w3-xlarge"></i>
  <span id="myIntro" class="w3-hide">W3.CSS: Introduction</span></p>
</div>

<header class="w3-container w3-theme" style="padding:64px 32px">
  <h1 class="w3-xxxlarge">W3.CSS</h1>
</header>

<div id="moduleView"></div>`;
	
	return HTMLCode;

}

let openSidebar = () =>
{
	document.getElementById("mySidebar").style.display = "block";
	document.getElementById("myOverlay").style.display = "block";
}

let closeSidebar = () =>
{
	document.getElementById("mySidebar").style.display = "none";
	document.getElementById("myOverlay").style.display = "none";
}

let applicationView = () =>
{
	document.getElementById('application').innerHTML = HTMLApplicationView();

	document.getElementById('openSidebarButton').addEventListener('click', openSidebar);
    document.getElementById('closeSidebarButton').addEventListener('click', closeSidebar);
    document.getElementById('myOverlay').addEventListener('click', closeSidebar);

    document.getElementById('userModuleButton').addEventListener('click', ()=>{ userModule.read(); closeSidebar();} );
}

let start =() =>
{
    applicationView();
}

window.addEventListener('DOMContentLoaded', start );