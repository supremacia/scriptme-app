<!doctype html>
<html>
	<head>
		<meta charset="utf-8">
		<meta name="description" content="">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<title>Page to Card :: test</title>
		<link href="https://fonts.googleapis.com/css?family=Open+Sans+Condensed:400,700|Raleway:200,400|Lato:300,400,700" rel="stylesheet">
		<link rel="stylesheet" href="css/style.css">
		<link rel="author" href="humans.txt">
	</head>
	<body>
		<div id="nav">
			<div id="navHome" onclick="goPage()"></div>
			<div class="navMenu" onclick="togleMenu()"></div>
			<div id="navBack" onclick="goback()"></div>
			<div id="navNext" onclick="gonext()"></div>
			<div id="navMenu">
				<div class="content">
					<div class="navMenu" onclick="togleMenu()"></div>
					<span>Themes</span>
					<ul>
						<li id="mn_theme1" onclick="chgtheme()">Default</li>
						<li id="mn_theme2" onclick="chgtheme('blue')">Blue</li>
						<li id="mn_theme3" onclick="chgtheme('black')">Black</li>
					</ul>
					
					<span>Library</span>
					<ul>
						<li id="mn_save" onclick="save()">Save Active Script</li>
						<li id="mn_load" onclick="load()">Load New Script</li>
						<li id="mn_list" onclick="list()">Show my Libraries</li>
					</ul>
					<span>Configurations</span>
					<ul>
						<li id="mn_full" onclick="goFull()">Full Screen</li>
						<li id="mn_net" onclick="goFull()">Net Conections</li>
						<li id="mn_user" onclick="goFull()">User Perfil</li>
					</ul>
				</div>
			</div>
		</div>

		<div id="container" class="container">

			<div id="page1" class="page">
				<div class="scrumb">Home</div>
				<div class="content">
					<header>
						<h1 class="pgtitle" contenteditable="true" data-placeholder="Título (digite)"></h1>
						<p><b>Descrição:</b><br>digite (opcional) uma descrição aqui.</p>
					</header>
					
					<div class="helper">Começe carregando um Script a partir do <span onclick="togleMenu()">menu</span>, selecionando <b>Load New Script</b>.</div>

					<h2>Texto Bíblico</h2>
                    <div class="txtbase" contenteditable="true" data-placeholder="Cole aqui o texto bíblico de base."></div>
                    
                    <h2>Prelúdio</h2>
                    <p class="prelude" id="preludio" contenteditable="true" data-placeholder="Digite um texto para introdução aqui (opcional)."></p>
                    
                    <h2>Tópicos</h2>
                    <ul class="tpclink" id="tpclink"></ul>
                    
                    <button id="btNewTopic" placeholder="Adicionar novo tópico (página)">+</button>
				</div>
			</div>

		</div>
		
		<script src="js/jquery.js"></script>
		<script src="js/main.js"></script>
	</body>
</html>