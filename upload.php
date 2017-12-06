<?php



if(isset($_POST['script']) && isset($_POST['action'])){

	if($_POST['action'] == 'save'){
		file_put_contents(__DIR__.'/libs/page.scpt',$_POST['script']);
		
		exit(file_get_contents(__DIR__.'/libs/page.scpt'));
		exit(json_encode(['error'=>false]));
	}
	if($_POST['action'] == 'load'){
		exit(json_encode(['error'=>false,
						  'script'=>file_get_contents(__DIR__.'/libs/page.scpt'),
						  'name'=>'page.sctp',
						  'action'=>'load']));
	}
}



exit(print_r(json_encode(file_get_contents(__DIR__.'/libs/page.scpt')), true));