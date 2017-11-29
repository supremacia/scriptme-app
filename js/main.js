var STX,
	PAGEMAX = 0,
	PAGEPRO = 2,
	PAGENOW = 1;

var TMP, CONT = 0;

window.onload = function(){

	initPages();


	/*
	  Para abrir opções quando segurar algum tópico
	  Tipo "menu de contexto" no desktop
	 */
	var li = _c("topicolink")[0].children;

	for(var i in li){
		li[i].oncontextmenu = function (e){
			e.preventDefault();
			alert(e.target.innerHTML);
			TMP = e;
		}
	}



	//Hide or Show button "full screen"
	document.onwebkitfullscreenchange = function(){
		if(null == document.webkitCurrentFullScreenElement){
			_('btFs').style.display = "inline-block";
		} else {
			_('btFs').style.display = "none";
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
	STX = e.touches[0].clientX;
	PAGENOW = parseInt(me.id.replace('page',''));

	//_('page'+PAGENOW).style.zIndex = 1000;

	for(var i = 1; i <= PAGEMAX; i++){
		if(i != PAGENOW) {
			_('page'+i).style.left = '100%';
			_('page'+i).style.display = 'none';
			_('page'+i).style.transition = '0s';
		}
	}
}

function otmove(e, me){

	var change = STX - e.touches[0].clientX;

	if(change < 0){
		//console.log('STX: '+STX+' | change: '+change);
		return;
	}

	//_('page'+PAGENOW).style.left = '-' + change + 'px';

	_('page'+PAGENOW).style.zIndex = "0";
    
    _('page'+PAGEPRO).style.display = 'block';
    _('page'+PAGEPRO).style.left = (screen.width - change) + 'px';
    _('page'+PAGEPRO).style.transform = 'rotate(-6deg)'

    e.preventDefault();
}

function otend(e, me){

	var change = STX - e.changedTouches[0].clientX;
	var threshold = screen.width / 2;

	var p1 = _('page'+PAGENOW);
	var p2 = _('page'+PAGEPRO);

	if(change < threshold) {

		p1.style.left = 0;
		p2.style.left = '100%';
		p2.style.display = 'none';

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

	//_('page1').style.zIndex = "30";

	//console.log('PAGENOW: '+PAGENOW+' | PAGEPRO: '+PAGEPRO)
}


function gotopage(p){

	//console.log('antes ->  Page: '+p+' | PAGEPRO: '+PAGEPRO);

	//console.log(typeof p);

	if("number" == typeof p && PAGENOW != p) PAGEPRO = p;
	if(PAGENOW == p) return;

	//if(p == PAGENOW) return;	
	//p = "number" == typeof p ? p : 1;

	//console.log('parsed: '+p);

	
	//PAGEPRO = p;


	//console.log('depois -> Page: '+p+' | PAGEPRO: '+PAGEPRO);
	//
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


function _(e){return document.getElementById(e) || false}
function _c(e){return document.getElementsByClassName(e) || false}