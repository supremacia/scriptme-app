var MAX,
    NEXT,
    NOW = 1,
    BACK,
    STX,
    STXM,
    SCROLL = 0,
    DATA = function(){return {error:false, action:false, name:false, script:false}};


window.onload = function(){
    STXM = screen.width / 3;
    initPages();
    restNewTopicBtn();
    _c('toTop').onclick = function(){scrollTop()}
    _('page'+NOW).className = "page";
}

function initPages(){
    var pg = _s('.page');
    var top = _s('.page .toTop');
    MAX = 0;
    for(i in pg){
        if("object" == typeof pg[i]){
            pg[i].setAttribute('ontouchstart', 	'otstart(event, this)');
			pg[i].setAttribute('ontouchmove', 	'otmove(event, this)');
			pg[i].setAttribute('ontouchend', 	'otend(event, this)');

			if(i !== '0') {
				pg[i].className = "page preback";
			}
            MAX ++;
        }
    }
    calcBackNext();
    toGo();
}

//Faz o scroll to top (0) da página atual
function scrollTop(){
	if(NOW == 1) return;
	SCROLL = _('page'+NOW).scrollTop;

	setTimeout(function(){
		SCROLL-= 100;
		_('page'+NOW).scrollTop = SCROLL;
		if(SCROLL > 0) scrollTop();
	}, 30);
}

//Para adicionar ação ao botão "new topc"
function restNewTopicBtn(){
    _('btNewTopic').onclick = function(){
        newtopic();
        tplinkOtp();
    }
}

function resetPages(p){
	if("number" !== typeof p) p = 1;
	if(p > MAX || p < 1) p = 1;
	var pg = _s('.page');
    for(i in pg){
        if("object" == typeof pg[i]){
			if(i != p) pg[i].className = "page preback";
        }
    }
}


//rotação para frente
function gonext(){    
    toGo(); //Posiciona as páginas para o inicio da transição
    NOW = (NOW +1 > MAX)  ? 1   : NOW +1; //calcula a rotação
    calcBackNext(); //calcula back/next
    toGo(); //executa
}

//rotação para traz
function goback(){    
    toGo(); //Posiciona as páginas para o inicio da transição
    NOW = (NOW -1 < 1) ? MAX : NOW -1; //calcula a rotação
    calcBackNext(); //calcula back/next
    toGo(); //executa
}

//calcula o BACK e NEXT
function calcBackNext(){
    BACK = (NOW -1 < 1)   ? MAX : NOW -1;
    NEXT = (NOW +1 > MAX) ? 1   : NOW +1;
}

//Execute rotates
function toGo(){
	SCROLL = 0;
	if(MAX == 1) return;

    scrollTop();
	_('page'+BACK).className="page preback";
    _('page'+NOW).className="page prenow";
    _('page'+NEXT).className="page prenext";
}

/* --- DROP/DRAW --- BEGIN */
function otstart(e, me){
	STX = e.touches[0].clientX;
}

function otmove(e, me){
	var change = STX - e.touches[0].clientX;
	var valor = (change < 0) ? change *-1 : change; 

    if(valor < STXM) {
        me.className = "page";
        me.style.left = "0px";
        return;
    }
	me.style.left = ((change > 0) ? '-' : '')+'20px';
    me.className = "page toMove";
}

function otend(e, me){
	me.style.left = "0px";
	var change = STX - e.changedTouches[0].clientX;

	var dir = (change > 0) ? 'right' : 'left'; 
	var valor = (change < 0) ? change *-1 : change;    
	if(valor < STXM) return; //se o valor não for maior que o prefixado, returna 	

	if(dir == 'left') goback();
	if(dir == 'right') gonext();
}


/* --- NAVIGATION by commands --- BEGIN */
function togleMenu(){
	if(_('navMenu').className == ""){
		_('navMenu').className = "open";
	} else {
		_('navMenu').className = "";
	}
}

function goFull(){

    if(null == document.webkitCurrentFullScreenElement){
            document.body.webkitRequestFullscreen()
        } else {
            document.webkitExitFullscreen()
        }
    togleMenu();
}
function goPage(p){
	if("number" !== typeof p) p = 1;
	if(p > MAX || p < 1) p = 1;

	if(NOW == p) return;
	
	resetPages(p);
	_('page'+NOW).className = "page toPage";
	NOW = p;	
	calcBackNext();
	toGo()
}


function chgtheme(){
	togleMenu();
}
function save(){
	togleMenu();
}
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
                                +'<div class="scrumb">Home ('+(script.topics.length -1)+' pages)</div>'
                                +'<div class="content">'
                                    +'<header>'
                                        +'<h1 class="pgtitle" contenteditable="true" data-placeholder="Digite o Título aqui">'+script.title+'</h1>'
                                    +'</header>'
                                    +'<h2>Texto Bíblico</h2>'
                                    +'<div class="txtbase" contenteditable="true" data-placeholder="Cole aqui o texto bíblico de base.">'+script.text+'</div>'
                                    +'<h2>Prelúdio</h2>'
                                    +'<p class="prelude" id="preludio" contenteditable="true" data-placeholder="Digite um texto para introdução aqui (opcional).">'+script.prelude+'</p>'
                                    +'<h2>Tópicos</h2>'
                                    +'<ul class="tpclink" id="tpclink"></ul>'
                                    +'<button id="btNewTopic" placeholder="Adicionar novo tópico (página)">+</button>'
                                    +'</div>'
                                +'</div>'
                            +'</div>';
                                
                _('container').innerHTML = pghtml;
                
                for(var i in script.topics){
                    if(script.topics[i] !== null){
                        var tphtml = '<li id="tplink'+i+'" onclick="goPage('+i+')">'+script.topics[i]+'</li>';
                        _('tpclink').insertAdjacentHTML('beforeEnd',tphtml);

                        //Conteudo da nova página
                        var pghtml = '<div id="page'+i+'" class="page">'
                                        +'<div class="scrumb">pag. <b>'+i+'</b> / '+(script.topics.length -1)+'</div>'
                                        +'<div class="content">'
                                            +'<header>'
                                                +'<h1 class="pgtitle" contenteditable="true" onkeyup="edtitle(this,'+i+')" data-placeholder="Digite o Título aqui">'+script.pages[i].title+'</h1>'
                                            +'</header>'
                                            +'<section contenteditable="true" data-placeholder="Digite seu conteúdo aqui">'+script.pages[i].text+'</section>'
                                        +'</div>'
                                    +'</div>';
                        _('container').insertAdjacentHTML('beforeEnd',pghtml);
                    }
                }
                
                //configuran as novas páginas
                initPages();
                //reiniciando o botão new topics
                restNewTopicBtn();
            } else {
                alert('Ué?!\nDesistiu de carregar o Script?');
            }

        } else {
            alert('Não consegui carregar essa p@rr@ :( ');
        }
        //fechando o menu
        togleMenu();  
    })
}

function list(){
	togleMenu();
}


/* --- UTILS --- */
function _(e){return document.getElementById(e) || false}
function _c(e){return document.getElementsByClassName(e)[0] || false}
function _s(e){return document.querySelectorAll(e) || []}




