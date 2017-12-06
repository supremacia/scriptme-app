var STX,
	PAGEMAX = 0,
	PAGEPRO = 2,
	PAGENOW = 1;

var TMP, CONT = 0;

window.onload = function(){

	initPages();


	



	//Hide or Show button "full screen"
	document.onwebkitfullscreenchange = function(){
		if(null == document.webkitCurrentFullScreenElement){
			_('btFs').style.display = "inline-block";
		} else {
			_('btFs').style.display = "none";
		}
	}


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

			if(p > 1) {
				n[p].style.left = '100%';
				n[p].style.display = 'none';
			}

			PAGEMAX ++;
		}
	}
}

function otstart(e, me){
	if(PAGEMAX == 1) return;

	STX = e.touches[0].clientX;
	PAGENOW = parseInt(me.id.replace('page',''));

	for(var i = 1; i <= PAGEMAX; i++){
		if(i != PAGENOW) {
			_('page'+i).style.left = '100%';
			_('page'+i).style.display = 'none';
			_('page'+i).style.transition = '0s';
		}
	}
}

function otmove(e, me){
	if(PAGEMAX == 1) return;
	var change = STX - e.touches[0].clientX;

	if(change < 0){
		return;
	}

	_('page'+PAGENOW).style.zIndex = "0";
    
    _('page'+PAGEPRO).style.display = 'block';
    _('page'+PAGEPRO).style.left = (screen.width - change) + 'px';
    _('page'+PAGEPRO).style.transform = 'rotate(-6deg)'

    e.preventDefault();
}

function otend(e, me){
	if(PAGEMAX == 1) return;

	var change = STX - e.changedTouches[0].clientX;
	var threshold = screen.width / 2;

	var p1 = _('page'+PAGENOW);
	var p2 = _('page'+PAGEPRO);

	if(change < threshold) {
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
	    			+'<h1 class="pgtitulo" contenteditable="true" data-placeholder="Digite o Título aqui"></h1>'
	    			+'<div class="pgtexto" contenteditable="true" data-placeholder="Digite seu conteúdo aqui"></div>'
	    		+'</div></div>';
	_('container').insertAdjacentHTML('beforeEnd',pghtml);

	//conteúdo do botão de acesso a nova página
	var tphtml = '<li id="tplink'+pgnew+'" onclick="gotopage('+pgnew+')">Digite o Título aqui</li>';
	_('topicolink').insertAdjacentHTML('beforeEnd',tphtml);

	//ajustando o título no TOPICLINK
	var page = _('page'+pgnew).getElementsByClassName('pgtitulo')[0];
	_('tplink'+pgnew).innerHTML = ("" == page.innerHTML) ? page.getAttribute('data-placeholder') : page.innerHTML;

	//Corrigindo o titulo no topiclink na EDIÇÃO
	_('page'+pgnew).onkeyup = function(e){
		var p = e.target.parentNode.parentNode.id.replace('page', '');
		_('tplink'+p).innerHTML = e.target.innerHTML;
	}

	PAGEMAX = pgnew;
	
	initPages();
	gotopage(PAGEMAX);
}


//Salvando a página
function savepage(p){
	pagenow = p || PAGENOW;

	alert('salvadinho...');
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


function _(e){return document.getElementById(e) || false}
function _c(e){return document.getElementsByClassName(e) || false}