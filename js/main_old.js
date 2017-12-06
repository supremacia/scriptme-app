var STX,
	STXM,
	DATA = function(){return {error:false, action:false, name:false, script:false}},
	PAGES = [1],
	PAGEMAX = 0,
	PAGEPRO = 2,
	PAGENOW = 1;

var TMP, CONT = 0;

window.onload = function(){

	STXM = screen.width / 6;
	initPages();
	restNewTopicBtn();

	//Hide or Show button "full screen"
	document.onwebkitfullscreenchange = function(){
		if(null == document.webkitCurrentFullScreenElement){
			_('tl_full').style.display = "inline-block";
		} else {
			_('tl_full').style.display = "none";
		}
	}
}

//Para adicionar ação ao botão "new topc"
function restNewTopicBtn(){
	_('btNewTopic').onclick = function(){
		newtopic();
		tplinkOtp();
	}
}


/*
  Para abrir opções quando segurar algum tópico
  Tipo "menu de contexto" no desktop
 */
function tplinkOtp(){
	var li = _c("topicolink")[0].children;

	for(var i in li){
		li[i].oncontextmenu = function (e){
			e.preventDefault();
			alert(e.target.innerHTML);
			TMP = e;
		}
	}
}


function initPages(){
	PAGEMAX = 0;
	var n = _('container').childNodes;

	for(var p in n) { 
		if(n[p].className == "page"){
			n[p].setAttribute('ontouchstart', 	'otstart(event, this)');
			n[p].setAttribute('ontouchmove', 	'otmove(event, this)');
			n[p].setAttribute('ontouchend', 	'otend(event, this)'); 

			PAGEMAX ++;
		}
	}

	pageinit(1);
}


function pageinit(pi){

	var np = pi || 1;

	for(var i = 1; i <= PAGEMAX; i++){
		if(i != np) {
			_('page'+i).style.zIndex = 0;
			_('page'+i).style.opacity = 0;
			_('page'+i).style.transition = '1s';
			_('page'+i).style.transform = 'scale(.1) translate(-50%) rotateY(90deg)';
		} else {
			_('page'+np).style.zIndex = 2000;
			_('page'+np).style.opacity = 1;
			_('page'+i).style.transition = '.6s';
			_('page'+i).style.transform = 'scale(1) translate(0) rotateY(0deg)';
		}
	}
}

function otstart(e, me){
	if(PAGEMAX == 1) return;

	STX = e.touches[0].clientX;
	PAGENOW = parseInt(me.id.replace('page',''));
}

function otmove(e, me){
	if(PAGEMAX == 1) return;
	var change = STX - e.touches[0].clientX;

	console.log((0 - change) + 'px');
}

function otend(e, me){

	var change = STX - e.changedTouches[0].clientX;


	var dir = (change > 0) ? 'left' : 'right'; 
	var valor = (change < 0) ? change *-1 : change;

	//se o valor não for maior que o prefixado, returna 
	if(valor < STXM) return;

	var p1 = _('page'+PAGENOW);

	if (dir == 'left'){

		np = PAGENOW + 1;
		var np = (np > PAGEMAX) ? 1 : np;

	} else {

		np = PAGENOW -1;
		var np = (np < 1) ? PAGEMAX : np;
	}

	pageinit(np);

	PAGENOW = np;


	console.log('STXM: '+STXM+' | change: '+change+' | Direction: '+dir+' | Valor: '+valor);

	return;

	var p1 = _('page'+PAGENOW);
	var p2 = _('page'+PAGEPRO);

	
return;

	if(change < STXM) {
		p1.style.left = 0;
		
		if(p2){
			p2.style.left = '100%';
			p2.style.display = 'none';
		}

	} else {

		p1.style.transition = '4s';
		p1.style.left = '100%';

		p2.style.transition = '.3s cubic-bezier(0.855, -0.030, 1.000, 0.290)';
		p2.style.left = '0';
		p2.style.display = 'block';
		p2.style.transform = 'rotate(0)';

		PAGENOW = PAGEPRO;
		PAGEPRO = PAGEMAX == PAGENOW ? 1 : PAGENOW + 1;

		_('page'+PAGENOW).style.zIndex = (PAGENOW == 1) ? "30": "0";
		_('page'+PAGEPRO).style.zIndex = "40";
	}	
}


function gotopage(p){

	if("number" == typeof p && PAGENOW != p) PAGEPRO = p;
	if(PAGENOW == p) return;

	np = p || false;
	if(np === false) return;
	if(p == "nxt") np = PAGENOW + 1;
	if(p == "pre") np = PAGENOW - 1;

	if(np > PAGEMAX) np = 1;
	if(np < 1) np = PAGEMAX;

	pageinit(np);
	PAGENOW = np;

return;


	for(var i = 1; i <= PAGEMAX; i++){
		if(i != PAGENOW) {
			_('page'+i).style.left = '100%';
			_('page'+i).style.display = 'none';
			_('page'+i).style.transition = '0s';
			_('page'+i).style.zIndex = '0';
		}
	}
	
	var p1 = _('page'+PAGENOW);
	var p2 = _('page'+PAGEPRO);

	p1.style.zIndex = "0";

	p2.style.zIndex = "40";
	p2.style.transition = 'all 4s';
	p2.style.display = 'block';
    p2.style.left = (screen.width - 10) + 'px';
    p2.style.transform = 'rotate(-6deg)';

	setTimeout(function (){
		
		var p1 = _('page'+PAGENOW);
		var p2 = _('page'+PAGEPRO);

		p1.style.transition = '4s';
		p1.style.left = '100%';

		p2.style.transition = '.3s cubic-bezier(0.855, -0.030, 1.000, 0.290)';
		p2.style.left = '0';
		p2.style.display = 'block';
		p2.style.transform = 'rotate(0)';
		p2.style.transition = 'all 0';

		PAGENOW = PAGEPRO;
		PAGEPRO = PAGEMAX == PAGENOW ? 1 : PAGENOW + 1;

		_('page'+PAGENOW).style.zIndex = (PAGENOW == 1) ? "30": "0";
		_('page'+PAGEPRO).style.zIndex = "40";

		setTimeout(function(){p1.style.display = "none"}, 300);
	}, 5);

}


//Create a Topic
function newtopic(){
	var pgnew = PAGEMAX + 1;
	

	//Conteudo da nova página
	var pghtml = '<div id="page'+pgnew+'" class="page">'
    			+'<div class="content">'
	    			+'<header>'
						+'<h1 class="pgtitulo" contenteditable="true" onkeyup="edtitle(this,'+pgnew+')" data-placeholder="Digite o Título aqui"></h1>'
					+'</header>'
	    			+'<div class="pgtexto" contenteditable="true" data-placeholder="Digite seu conteúdo aqui"></div>'
	    		+'</div></div>';
	_('container').insertAdjacentHTML('beforeEnd',pghtml);

	//conteúdo do botão de acesso a nova página
	var tphtml = '<li id="tplink'+pgnew+'" onclick="gotopage('+pgnew+')">Digite o Título aqui</li>';
	_('topicolink').insertAdjacentHTML('beforeEnd',tphtml);

	//ajustando o título no TOPICLINK
	var page = _('page'+pgnew).getElementsByClassName('pgtitulo')[0];
	_('tplink'+pgnew).innerHTML = ("" == page.innerHTML) ? page.getAttribute('data-placeholder') : page.innerHTML;

	PAGEMAX = pgnew;
	
	initPages();
	gotopage(PAGEMAX);
}


//Editando o titulo das páginas
function edtitle(e, pg){
	_('tplink'+pg).innerHTML = e.innerHTML;
}


//Salvando a página
function save(){

	var LIB = {
		title: '',
		text: '',
		prelude: '',
		topics: [],
		pages: []
	}; 

	var pg = _('page1');

	LIB.title = pg.getElementsByClassName('pgtitulo')[0].innerHTML;
	LIB.text = pg.getElementsByClassName('textobasico')[0].innerHTML;
	LIB.prelude = document.getElementById('preludio').innerHTML;

	//buscando as páginas
	for(var i = 2; i <= PAGEMAX; i++){
		var PAGE = {'title':'','text':''};

		pg = _('page'+i);
		PAGE.title = pg.getElementsByClassName('pgtitulo')[0].innerHTML;
		PAGE.text = pg.getElementsByClassName('pgtexto')[0].innerHTML;	    
	    LIB.pages[i] = PAGE;
		
		LIB.topics[i] = PAGE.title
	}

	var data = new DATA;
	data.script = JSON.stringify(LIB);
	data.action = 'save';

	$.post('upload.php', data).done(function(d){
		var data = new DATA;
		try {
		data.error = JSON.parse(d).error;
		} catch (e) {}

		if(!data.error) alert('Tá salvadinho...');
		else alert('Não consegui salvar essa praga :(');

		menu()
	})
}


//Carregando um SCRIPT
function load(){
	$.post('upload.php',{action: 'load', script: false, name: '0980889'}).done(function(d){
		var data = new DATA;
		try {
		data.error = JSON.parse(d).error;
		} catch (e) {}

		if(!data.error) {
			data = JSON.parse(d);
			var script = JSON.parse(data.script);

			if(confirm('Deseja realmente apagar os dados atuais e substituir pelo script:\n -- '+script.title.toUpperCase()+' -- ')){
				
				//Conteudo da nova página
				var pghtml = '<div id="page1" class="page">'
							+'<div class="content">'
								+'<header>'
									+'<h1 class="pgtitulo" contenteditable="true" data-placeholder="Digite o Título aqui">'+script.title+'</h1>'
								+'</header>'
								+'<h2>Texto Bíblico</h2>'
								+'<div class="textobasico" contenteditable="true" data-placeholder="Cole aqui o texto bíblico de base.">'+script.text+'</div>'
								+'<h2>Prelúdio</h2>'
								+'<p class="prelude" id="preludio" contenteditable="true" data-placeholder="Digite um texto para introdução aqui (opcional).">'+script.prelude+'</p>'
								+'<h2>Tópicos</h2>'
								+'<span class="helper">Toque para acessar & mantenha pressionado para exibir menu</span>'
								+'<ul class="topicolink" id="topicolink"></ul>'
								+'<button id="btNewTopic" placeholder="Adicionar novo tópico (página)">+</button>'
								+'</div></div>';
								
				_('container').innerHTML = pghtml;
				
				for(var i in script.topics){
					if(script.topics[i] !== null){
						var tphtml = '<li id="tplink'+i+'" onclick="gotopage('+i+')">'+script.topics[i]+'</li>';
						_('topicolink').insertAdjacentHTML('beforeEnd',tphtml);

						//Conteudo da nova página
						var pghtml = '<div id="page'+i+'" class="page">'
									+'<div class="content">'
										+'<header>'
											+'<h1 class="pgtitulo" contenteditable="true" onkeyup="edtitle(this,'+i+')" data-placeholder="Digite o Título aqui">'+script.pages[i].title+'</h1>'
										+'</header>'
										+'<div class="pgtexto" contenteditable="true" data-placeholder="Digite seu conteúdo aqui">'+script.pages[i].text+'</div>'
									+'</div></div>';
						_('container').insertAdjacentHTML('beforeEnd',pghtml);
					}
				}
				
				//configuran as novas páginas
				initPages();
				//reiniciando o botão new topics
				restNewTopicBtn();
				alert('Está carregadinho...');
			} else {
				alert('Desistiu, cagão?!');
			}

		} else {
			alert('Não consegui carregar essa p@rr@ :( ');
		}

		//fechando o menu
		menu(false);
	})
}

function list(){
	menu(false);
	alert('Essa você vai ter que me ajudar a DESENVOLVER :P');
}

//deletando a página
function deletepage(p){
	pagenow = p || PAGENOW;

	_('page'+pagenow).remove();
	_('tplink'+pagenow).remove();

	PAGEMAX --;
	initPages();
	gotopage(1);

}

/** Mostrar menu
 * var st = false -> force menu hide
 */

function menu(st){
	mn = _('menu');
	console.log(st)

	if(st === false || mn.className == "menu on"){
		mn.className = "menu off"	
	} else {
		mn.className = "menu on"
	}
}

//Trocar o tema
function chgtheme(t){
	tm = t || false;

	if(tm === false) _('theme').href = '';
	else _('theme').href = "/css/theme/"+tm+".css";

	setTimeout(function(){menu()},1000);
}




function _(e){return document.getElementById(e) || false}
function _c(e){return document.getElementsByClassName(e) || false}