<!doctype html>
<html>
    <head>
        <meta charset="utf-8">
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>ScriptMe :: notes</title>
        <link href="https://fonts.googleapis.com/css?family=Open+Sans+Condensed:400,700|Raleway:400|Lato:300,400,700" rel="stylesheet">
        <link rel="stylesheet" href="css/style_old.css">
        <link rel="stylesheet" id="theme" href="">
        <link rel="shortcut icon" href="/favicon.ico">
        <link rel="author" href="humans.txt">
    </head>
    <body>
        <div class="container" id="container">
            <div id="page1" class="page">
                <div class="content">
                    <header>
                        <h1 class="pgtitulo" contenteditable="true" data-placeholder="Título (digite)"></h1>
                    </header>
                    <h2>Texto Bíblico</h2>
                    <div class="textobasico" contenteditable="true" data-placeholder="Cole aqui o texto bíblico de base."></div>
                    
                    <h2>Prelúdio</h2>
                    <p class="prelude" id="preludio" contenteditable="true" data-placeholder="Digite um texto para introdução aqui (opcional)."></p>
                    
                    <h2>Tópicos</h2>
                    <span class="helper">Toque para acessar & mantenha pressionado para exibir menu</span>
                    <ul class="topicolink" id="topicolink"></ul>
                    <button id="btNewTopic" placeholder="Adicionar novo tópico (página)">+</button>
                </div>
            </div>
        </div>
        <ul class="toplink">
            <li id="tl_menu" onclick="menu()"></li>
            <li id="tl_back" onclick="gotopage('pre')"></li>
            <li id="tl_home" onclick="gotopage(1)"></li>
            <li id="tl_next" onclick="gotopage('nxt')"></li>
            <li id="tl_full" onclick="document.body.webkitRequestFullscreen()"></li>
        </ul>
        <div class="menu off" id="menu">
            <div class="item">
                <span>Themes</span>
                <ul>
                    <li id="mn_theme1" onclick="chgtheme()">Default</li>
                    <li id="mn_theme2" onclick="chgtheme('blue')">Blue</li>
                    <li id="mn_theme3" onclick="chgtheme('black')">Black</li>
                </ul>
            </div>
            <div class="item">
                <span>Library</span>
                <ul>
                    <li id="mn_save" onclick="save()">Save Active Script</li>
                    <li id="mn_load" onclick="load()">Load New Script</li>
                    <li id="mn_list" onclick="list()">Show my Libraries</li>
                </ul>
            </div>
        </div>
        
        <script src="js/jquery.js"></script>
        <script src="js/main_old.js"></script>
    </body>
</html>