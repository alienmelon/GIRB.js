function girb(){
	console.log("This website is girb enabled.");
	
	//various
	var num_docWidth = $(document).width();
	var	num_docHeight = $(document).height();
	var	num_width = 190; //girb's width and height
	var	num_height = 180;
	var num_int = 5000;//interval number
	
	//paths to image and sound folders
	var str_path_img = "girbgif/";
	var str_path_snd = "girbsnd/";
	
	//interval
	var girb_int = setInterval(girb_interval, num_int);
	
	//arrays of images
	var arr_img_idle = ["IMG_IDLE01.gif", "IMG_IDLE02.gif", "IMG_IDLE03.gif", "IMG_IDLE04.gif", "IMG_IDLE05.gif", "IMG_IDLE06.gif", "IMG_IDLE07.gif"];
	var arr_img_walk = ["IMG_WALK01.gif", "IMG_WALK02.gif"];
	
	//misc
	var arr_str_msg = ["What is Girb?", "Is Girb a bird?", "Girb is a bird!", "Girb is not a bird...", "Girb is the word!", "Girb is girb?", "Girb is a verb...", "Girb is so girb!", "But is Girb girb?", "Yes. Girb is girb."];
	
	//random image from array
	function return_randImg(arr){
		var str_return = str_path_img+arr[Math.ceil(Math.random()*arr.length)-1];
		//i'm feeling lucky
		return(str_return);
	}
	
	//set girb's animation / replace image...
	//
	//this is a bad way of doing this and you should
	//probably load all the images on first run and show / hide as you need them
	//of course this way presents a number of issues
	//playback of gifs in firefox would be one of them
	//let alone the potential numerous server calls you will get from running this
	//but that kind of makes me laugh... i like that...
	//your server's bandwidth. done. you've been girb'd.
	//so...
	//infamy before quality:
	function set_animation(str_path){
		$('#girbimg').attr('src', str_path);
	}
	
	//was a todo
	//not going todo this
	/*function play_sound(tag){
		console.log("play sound: "+tag);
	}*/
	
	//small squish animation for rightclick and drop
	function squish_girb(){
		clear_interval();
		girb_int = setInterval(girb_interval, 500);
		set_animation(str_path_img+"IMG_DROP01.gif");
	}
	
	//determines what girb should do
	//walk, idle...
	function girb_interval(){
		//
		clearInterval(girb_int);
		//
		if(Math.random()*100 > 50){
			move_girb();
		}else{
			reset_interval();
			set_animation(return_randImg(arr_img_idle));
		}
	}
	function clear_interval(){
		$girb.clearQueue();
		$girb.stop();
		//
		clearInterval(girb_int);
	}
	//reset interval
	function reset_interval(){
		clear_interval();//preventative
		girb_int = setInterval(girb_interval, num_int);
	}
	
	//move
	function move_girb(){
		//
		var num_duration = Math.ceil(1000 + Math.random()*8000);
		var num_randY = Math.ceil(Math.random()*num_docHeight) - num_height;
		var num_randX = Math.ceil(Math.random()*num_docWidth) - num_height;
		//
		set_animation(return_randImg(arr_img_walk));
		//need to randomly chose from
		//Directional properties (top, right, bottom, left)
		//either top or bottom
		//either right or left
		//
		$girb.animate(
		{
			top: num_randY,
			left: num_randX
		},
		num_duration,
		"linear",
		function(){
			//count down again
			//return to normal
			reset_interval();
			set_animation(return_randImg(arr_img_idle));
		}	
		);
	}
	
	//girb
	var $girb = $('<div id="girb" />').css(
		{
			'position' : 'absolute',
			'top' : String(num_docHeight/2 - num_height)+'px',
			'left' : String(num_docWidth/2 - num_width/2)+'px',
			'width' : num_width,
			'height' : num_height,
			'background' : 'none'
		}
		).html('<img id="girbimg" src='+'"'+return_randImg(arr_img_idle)+'"'+' alt="">');
		
	$girb.appendTo('body');
	
	$girb.contextmenu(function(){
		squish_girb();
		//ask the tough questions
		window.alert(arr_str_msg[Math.ceil(Math.random()*arr_str_msg.length)-1]);
		return false;
	});
	
	$girb.mousedown(function(){
		clear_interval();
		set_animation(str_path_img+"IMG_PICKUP01.gif");
	});
	
	$girb.mouseup(function(){
		squish_girb();
	});
	
	$girb.draggable();
	
}