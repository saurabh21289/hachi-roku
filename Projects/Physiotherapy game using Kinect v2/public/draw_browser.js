/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



		var socket = io.connect('/');
		// var canvas = document.getElementById('bodyCanvas');
		//var ctx = canvas.getContext('2d');
                var new_level_audio = new Audio('img/level_up.wav');
                var ball_touch_audio = new Audio('img/ball_touch.wav');
                var background_audio = new Audio('img/background.wav');
                var background_audio1 = new Audio('img/wind.au');
                background_audio.loop = true;
                background_audio1.loop = true;
                background_audio.play();
                background_audio1.play();
                var mycanvas = document.getElementById('my_Canvas');
                mycanvas.addEventListener('mousemove', canvas_mousemove, false);
                var ctx2 = mycanvas.getContext('2d');
		var colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#00ffff', '#ff00ff'];
                var welcome_button;
                var welcome_innerH;
                var game_start = false,level_start = false,current_level=false,game_mode = 0;
                var level = 0,level_array = [],level_array_track = [];
                welcome_button = document.getElementById('welcome_btn');
                var levels_created=false;


                var back_img = new Image();
                back_img.src = "img/background.jpg";

                ctx2.drawImage(back_img,100,100);
                if(levels_created == false){
                        var ret = create_levels();

                        if(ret ==true){
                            levels_created = false;
                        }

                    }

                function  Ball(level,num){
                    this.level = level;
                    this.num_of_circles = num;
                    this.x = new Array(num);
                    this.y = new Array(num);
                    this.r = new Array(num);
                    this.color = new Array(num);
                    this.touch = new Array(num);
                    for(var i=0;i<num;i++){
                        this.touch[i] = false;
                    }
                    this.level_complete = false;
                }

		// handstate circle size
		var HANDSIZE = 20;

		// closed hand state color
		var HANDCLOSEDCOLOR = "red";

		// open hand state color
		var HANDOPENCOLOR = "green";

		// lasso hand state color
		var HANDLASSOCOLOR = "blue";

                var white = 'white';

		function updateHandState(handState, jointPoint,hand_value) {
			switch (handState) {
				case 3:
					drawHand(jointPoint, HANDCLOSEDCOLOR,hand_value);
				break;

				case 2:
					drawHand(jointPoint, HANDOPENCOLOR,hand_value);
				break;

				case 4:
					drawHand(jointPoint, HANDLASSOCOLOR,hand_value);
				break;
			}
		}

		function drawHand(jointPoint, handColor,hand_value) {


			// draw semi transparent hand cicles
			// ctx.globalAlpha = 0.75;
			// ctx.beginPath();
			// ctx.fillStyle = handColor;
			// ctx.arc(jointPoint.depthX * 512, jointPoint.depthY * 424, HANDSIZE, 0, Math.PI * 2, true);
      //                   //console.log("x " + jointPoint.depthX + " y: " + jointPoint.depthY);
      //                   if(hand_value == 'R')
      //                       document.getElementById('x_y_value_R').innerHTML = '<label>' + "x " + jointPoint.depthX + " y: " + jointPoint.depthY + '</label>';
      //                   else
      //                       document.getElementById('x_y_value_L').innerHTML = '<label>' + "x " + jointPoint.depthX + " y: " + jointPoint.depthY + '</label>';
			// ctx.fill();
			// ctx.closePath();
			// ctx.globalAlpha = 1;

                        fill_mycanvas(jointPoint, handColor,hand_value);
		}
		socket.on('bodyFrame', function(bodyFrame){
			// ctx.clearRect(0, 0, canvas.width, canvas.height);
			var index = 0;
			bodyFrame.bodies.forEach(function(body){
				if(body.tracked) {
					for(var jointType in body.joints) {
						var joint = body.joints[jointType];
						// ctx.fillStyle = colors[index];
						// ctx.fillRect(joint.depthX * 512, joint.depthY * 424, 10, 10);
					}
					//draw hand states
					updateHandState(body.leftHandState, body.joints[7],'L');
					updateHandState(body.rightHandState, body.joints[11],'R');
					index++;
				}
			});
		});               //uncomment this for kinect version


       function fill_mycanvas(jointPoint, handColor,hand_value){

			ctx2.beginPath();
                        if(hand_value == 'R')
                            ctx2.fillStyle = handColor;
                        else
                            ctx2.fillStyle = white;
      var x = jointPoint.depthX * 1300; var y = jointPoint.depthY * 700;
			ctx2.arc(x, y, 6, 0, Math.PI * 2, true);


              //  x *= 5; y*=5;
               update_x_y(x,y);

                        //console.log("x " + jointPoint.depthX + " y: " + jointPoint.depthY);
                        //if(hand_value == 'R')
                            //document.getElementById('kinect_x').innerHTML = '<label>' + "x " +x + " y: " + y + '</label>';
                        //else
                            //document.getElementById('kinect_y').innerHTML = '<label>' + "x " + x + " y: " + y + '</label>';
			ctx2.fill();
			ctx2.closePath();

       }


       function convert_cordinates(canvas,x,y){
            var bbox = canvas.getBoundingClientRect();
          //  console.log(x);
          //  console.log(y);                     //Remeber to remove this, might not work with kinect;
            x = x - bbox.left * (canvas.width / bbox.width);
            y = y - bbox.top * (canvas.height / bbox.height);
            return { x: x,
                     y: y
            };
       }

       function update_x_y(x,y){
           if(game_start == false){
               wait_for_game_start(x,y);
           }
           else{
               if(game_start== true){
                   if(level_start == false){
                       if(game_mode == 0){
                           display_game_mode_selector(x,y);
                       }
                       else{
                           wait_for_level_start(x,y);
                       }
                   }
                   else{
                     if(current_level == false){
                         level++;;
                       start_level(level);
                     }
                     else{
                         update_level(x,y);
                     }
                   }
               }
           }
       }

       function wait_for_game_start(x,y){

           if(x>430 && x< 810 && y > 235 && y < 360){
               setTimeout(function(){game_start = true;
                   clear_div();
                   set_mode_btn_pos();
                   document.getElementById('game_selector_1').innerHTML = 'Trial';
                   document.getElementById('game_selector_2').innerHTML = 'Excercise'
                },3000);
           }
       }
       function wait_for_level_start(x,y){
           if(x>445 && x< 810 && y > 230 && y < 380){
               setTimeout(function(){level_start = true;
                   clear_div();
                },3000);
           }
       }

       function display_game_mode_selector(x,y){
           if(x> 730 & y > 235 &&x <960 && y<325){
               setTimeout(function(){game_mode = 10;
               reset_div_pos();
               level = 0;
               reset_div_to('Level ' + (level+1).toString());
               clear_mode_btn();
               },3000);

           }
           else if(x>275 && y > 235 && x < 520 && y < 325){
               setTimeout(function(){game_mode = 20;
               reset_div_pos();
               level = 15;
               reset_div_to('Level ' + (level - 14).toString());
               clear_mode_btn();
               },3000);
           }
       }
       function restart(){
           reset_div_to('Welcome!');
           reset_div_pos();
           game_start = false;
           leve_start = false;
           current_level = false;
           game_mode = 0;
           level = 0;
           clear_canvas();
           for(var i=0;i<level_array.length;i++){
               var obj = level_array[i];
               var len = obj.num_of_circles;
               for(var j =0;j<len;j++){
                   obj.color[j] = '#'+(Math.random()*0xFFFF33<<0).toString(16);
                   obj.touch[j] = false;
               }
           }
       }
       //reset_div_to('Level ' + (level+1).toString());
       function canvas_mousemove(evt){
           var loc = convert_cordinates(mycanvas,evt.clientX,evt.clientY);
           document.getElementById('x_y_value_R').innerHTML = '<label>' + "x " + loc.x + " y: " + loc.y + '</label>';
           update_x_y(loc.x,loc.y);
       }

    function reset_div_to(str){
        document.getElementById('welcome_btn').innerHTML = str;
    }
    function clear_mode_btn(){
        document.getElementById('game_selector_1').setAttribute("style","top:-1000px;" + "left:-1000px;" + "z-index=-1");
        document.getElementById('game_selector_2').setAttribute("style","top:-1000px;" + "left:-1000px;" + "z-index=-1");
    }
    function set_mode_btn_pos(){
        document.getElementById('game_selector_2').setAttribute("style","top:250px;" + "left:300px;" + "z-index=110");
        document.getElementById('game_selector_1').setAttribute("style","top:250px;" + "left:750px;" + "z-index=110");
    }
    function clear_div(){
        document.getElementById('welcome_btn').setAttribute("style","top:-1000px;" + "left:-1000px;" + "z-index=-1");
    }
    function reset_div_pos(){
        document.getElementById('welcome_btn').setAttribute("style","top:250px;" + "left:450px;" + "z-index=110");
    }

    function start_level(l){
        var pos = level_array_track.indexOf(l);
        if(pos != -1){
            var obj = level_array[pos];
            draw_level(obj);
        }
    }

    function update_level(x,y){
        if(game_start ==true && level_start == true){
        var pos = level_array_track.indexOf(level);
        if(pos != -1){
            var obj = level_array[pos];
            var len = obj.num_of_circles;
            for(var j=0;j<len;j++){
                if(game_start ==true && level_start == true){
                if(obj.touch[j] ==false){
                    break;
                }
                else if(j == len-1){
                    setTimeout(function(){new_level_audio.play();},500);
                    setTimeout(function(){level_start = false;
                    current_level = false;
                    clear_canvas();
                    var level_num ;
                    if(game_mode == 10){
                        level_num = level+1;
                        if(level_num == 16)
                            restart();
                    }
                    else{
                        level_num = level -14;
                            if(level_num == 16)
                                restart();
                    }
                    if(level_num < 16 && game_start == true){
                        reset_div_to('Level ' + (level_num).toString());
                        reset_div_pos();
                    }

                },1500);

                }
            }}
            for(var i=0;i<len;i++){
                if(current_level == true && level_start == true && obj.touch[i] == false){
                    var check = hand_over_circle(x,y,obj.x[i],obj.y[i],obj.r[i]);
                    if(check == true){
                        ball_touch_audio.play();
                        obj.touch[i] = true;
                        obj.color[i] = '#000000';
                        drawBall(obj.x[i],obj.y[i],obj.r[i],obj.color[i]);
                    }
                }
            }
        }
    }}

    function clear_canvas(){
        var c = document.getElementById('my_Canvas');
        var ctx = c.getContext('2d');
        ctx.clearRect(0, 0, 1300, 700);
    }

function hand_over_circle(x,y,cx,cy,r){               // Detects if mouse pointer is clicked/hovered on an object (node in this case)
    var b = (r/ Math.SQRT2);
    if(x >= (cx - b) && x <= (cx + b) && y >= (cy - b) && y <= (cy + b)){
        return true;
    }
    else
        return false;
}
    function draw_level(obj){
      current_level = true;
        for(var i=0;i<obj.num_of_circles;i++){
            drawBall(obj.x[i],obj.y[i],obj.r[i],obj.color[i]);
        }
    }
/*ctx2.beginPath();
                  if(hand_value == 'R')
                      ctx2.fillStyle = handColor;
                  else
                      ctx2.fillStyle = white;
ctx2.arc(jointPoint.depthX * 300, jointPoint.depthY * 200, 1, 0, Math.PI * 2, true);
var x = jointPoint.depthX * 300; var y = jointPoint.depthY * 200;

         x *= 5; y*=5;
         update_x_y(x,y);

                  //console.log("x " + jointPoint.depthX + " y: " + jointPoint.depthY);
                  if(hand_value == 'R')
                      document.getElementById('kinect_x').innerHTML = '<label>' + "x " + jointPoint.depthX*300 + " y: " + jointPoint.depthY*200 + '</label>';
                  else
                      document.getElementById('kinect_y').innerHTML = '<label>' + "x " + jointPoint.depthX*300 + " y: " + jointPoint.depthY*200 + '</label>';
ctx2.fill();
ctx2.closePath();*/
    function drawBall(x,y,r,color){
      console.log(x + ' ' + y + ' ' + color + ' ' + r);
      var c = document.getElementById('my_Canvas');
      var ctx = c.getContext('2d');
        ctx = mycanvas.getContext('2d');
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.arc(x,y,r,0,2*Math.PI);
        ctx.fill();
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.closePath();
    }


      function create_levels(){
    var level1 = new Ball(1,1);
    level1.x[0] = 600;
    level1.y[0] = 300;
    level1.r[0] = 60;
    level1.color[0] = '#'+(Math.random()*0xFFFF33<<0).toString(16);
    level_array[0] = level1;
    level_array_track[0] = 1;

    var level2 = new Ball(2,2);
    level2.x[0] = 300;
    level2.y[0] = 300;
    level2.r[0] = 50;
    level2.color[0] = '#'+(Math.random()*0xFFFF33<<0).toString(16);
    level2.x[1] = 600;
    level2.y[1] = 600;
    level2.r[1] = 50;
    level2.color[1] = '#'+(Math.random()*0xFFFF33<<0).toString(16);
    level_array.push(level2);
    level_array_track.push(2);

    var level3 = new Ball(3,3);
    level3.x[0] = 400;
    level3.y[0] = 200;
    level3.r[0] = 50;
    level3.color[0] = '#'+(Math.random()*0xFFFF33<<0).toString(16);
    level3.x[1] = 340;
    level3.y[1] = 240;
   level3.r[1] = 50;
    level3.color[1] = '#'+(Math.random()*0xFFFF33<<0).toString(16);
    level3.x[2] = 880;
    level3.y[2] = 150;
   level3.r[2] = 50;
    level3.color[2] = '#'+(Math.random()*0xFFFF33<<0).toString(16);
    level_array.push(level3);
    level_array_track.push(3);



var level4 = new Ball(4,3);
    level4.x[0] = 1056;
    level4.y[0] = 207;
    level4.r[0] = 65;
    level4.color[0] = '#'+(Math.random()*0xFFFF33<<0).toString(16);
    level4.x[1] = 579;
    level4.y[1] = 160;
    level4.r[1] = 65;
    level4.color[1] = '#'+(Math.random()*0xFFFF33<<0).toString(16);
    level4.x[2] = 165;
    level4.y[2] = 279;
    level4.r[2] = 65;
    level4.color[1] = '#'+(Math.random()*0xFFFF33<<0).toString(16);
    level_array.push(level4);
    level_array_track.push(4);

var level5 = new Ball(5,3);
    level5.x[0] = 1098;
    level5.y[0] = 161;
    level5.r[0] = 60;
    level5.color[0] = '#'+(Math.random()*0xFFFF33<<0).toString(16);
    level5.x[1] = 1073;
    level5.y[1] = 333;
    level5.r[1] = 60;
    level5.color[1] = '#'+(Math.random()*0xFFFF33<<0).toString(16);
    level5.x[2] = 863;
    level5.y[2] = 260;
    level5.r[2] = 60;
    level5.color[2] = '#'+(Math.random()*0xFFFF33<<0).toString(16);
    level_array.push(level5);
    level_array_track.push(5);

var level6 = new Ball(6,4);
    level6.x[0] = 500;
    level6.y[0] = 335;
    level6.r[0] = 55;
    level6.color[0] = '#'+(Math.random()*0xFFFF33<<0).toString(16);
    level6.x[1] = 336;
    level6.y[1] = 337;
    level6.r[1] = 55;
    level6.color[1] = '#'+(Math.random()*0xFFFF33<<0).toString(16);
    level6.x[2] = 919;
    level6.y[2] = 240;
    level6.r[2] = 55;
    level6.color[2] = '#'+(Math.random()*0xFFFF33<<0).toString(16);
    level6.x[3] = 437;
    level6.y[3] = 170;
    level6.r[3] = 55;
    level6.color[3] = '#'+(Math.random()*0xFFFF33<<0).toString(16);
    level_array.push(level6);
    level_array_track.push(6);

var level7 = new Ball(7,4);
    level7.x[0] = 500;
    level7.y[0] = 335;
    level7.r[0] = 50;
    level7.color[0] = '#'+(Math.random()*0xFFFF33<<0).toString(16);
    level7.x[1] = 336;
    level7.y[1] = 337;
    level7.r[1] = 50;
    level7.color[1] = '#'+(Math.random()*0xFFFF33<<0).toString(16);
    level7.x[2] = 919;
    level7.y[2] = 240;
    level7.r[2] = 50;
    level7.color[2] = '#'+(Math.random()*0xFFFF33<<0).toString(16);
    level7.x[3] = 437;
    level7.y[3] = 170;
    level7.r[3] = 50;
    level7.color[3] = '#'+(Math.random()*0xFFFF33<<0).toString(16);
    level_array.push(level7);
    level_array_track.push(7);

var level8 = new Ball(8,5);
    level8.x[0] = 240;
    level8.y[0] = 173;
    level8.r[0] = 50;
    level8.color[0] = '#'+(Math.random()*0xFFFF33<<0).toString(16);
    level8.x[1] = 224;
    level8.y[1] = 112;
    level8.r[1] = 50;
    level8.color[1] = '#'+(Math.random()*0xFFFF33<<0).toString(16);
    level8.x[2] = 732;
    level8.y[2] = 336;
    level8.r[2] = 50;
    level8.color[2] = '#'+(Math.random()*0xFFFF33<<0).toString(16);
    level8.x[3] = 911;
    level8.y[3] = 187;
    level8.r[3] = 50;
    level8.color[3] = '#'+(Math.random()*0xFFFF33<<0).toString(16);
    level8.x[4] = 1119;
    level8.y[4] = 259;
    level8.r[4] = 50;
    level8.color[4] = '#'+(Math.random()*0xFFFF33<<0).toString(16);
    level_array.push(level8);
    level_array_track.push(8);

var level9 = new Ball(9,5);
    level9.x[0] = 559;
    level9.y[0] = 173;
    level9.r[0] = 55;
    level9.color[0] = '#'+(Math.random()*0xFFFF33<<0).toString(16);
    level9.x[1] = 853;
    level9.y[1] = 112;
    level9.r[1] = 55;
    level9.color[1] = '#'+(Math.random()*0xFFFF33<<0).toString(16);
    level9.x[2] = 784;
    level9.y[2] = 336;
    level9.r[2] = 55;
    level9.color[2] = '#'+(Math.random()*0xFFFF33<<0).toString(16);
    level9.x[3] = 1121;
    level9.y[3] = 187;
    level9.r[3] = 55;
    level9.color[3] = '#'+(Math.random()*0xFFFF33<<0).toString(16);
    level9.x[4] = 412;
    level9.y[4] = 259;
    level9.r[4] = 55;
    level9.color[4] = '#'+(Math.random()*0xFFFF33<<0).toString(16);
    level_array.push(level9);
    level_array_track.push(9);

var level10 = new Ball(10,4);
    level10.x[0] = 755;
    level10.y[0] = 285;
    level10.r[0] = 45;
    level10.color[0] = '#'+(Math.random()*0xFFFF33<<0).toString(16);
    level10.x[1] = 592;
    level10.y[1] = 327;
    level10.r[1] = 45;
    level10.color[1] = '#'+(Math.random()*0xFFFF33<<0).toString(16);
    level10.x[2] = 556;
    level10.y[2] = 293;
    level10.r[2] = 45;
    level10.color[2] = '#'+(Math.random()*0xFFFF33<<0).toString(16);
    level10.x[3] = 1065;
    level10.y[3] = 261;
    level10.r[3] = 45;
    level10.color[3] = '#'+(Math.random()*0xFFFF33<<0).toString(16);
    level_array.push(level10);
    level_array_track.push(10);

var level11 = new Ball(11,5);
    level11.x[0] = 607;
    level11.y[0] = 180;
    level11.r[0] = 45;
    level11.color[0] = '#'+(Math.random()*0xFFFF33<<0).toString(16);
    level11.x[1] = 264;
    level11.y[1] = 159;
    level11.r[1] = 45;
    level11.color[1] = '#'+(Math.random()*0xFFFF33<<0).toString(16);
    level11.x[2] = 619;
    level11.y[2] = 297;
    level11.r[2] = 45;
    level11.color[2] = '#'+(Math.random()*0xFFFF33<<0).toString(16);
    level11.x[3] = 901;
    level11.y[3] = 284;
    level11.r[3] = 45;
    level11.color[3] = '#'+(Math.random()*0xFFFF33<<0).toString(16);
    level11.x[4] = 259;
    level11.y[4] = 235;
    level11.r[4] = 45;
    level11.color[4] = '#'+(Math.random()*0xFFFF33<<0).toString(16);
    level_array.push(level11);
    level_array_track.push(11);

var level11 = new Ball(11,5);
    level11.x[0] = 607;
    level11.y[0] = 180;
    level11.r[0] = 45;
    level11.color[0] = '#'+(Math.random()*0xFFFF33<<0).toString(16);
    level11.x[1] = 264;
    level11.y[1] = 159;
    level11.r[1] = 45;
    level11.color[1] = '#'+(Math.random()*0xFFFF33<<0).toString(16);
    level11.x[2] = 619;
    level11.y[2] = 297;
    level11.r[2] = 45;
    level11.color[2] = '#'+(Math.random()*0xFFFF33<<0).toString(16);
    level11.x[3] = 901;
    level11.y[3] = 284;
    level11.r[3] = 45;
    level11.color[3] = '#'+(Math.random()*0xFFFF33<<0).toString(16);
    level11.x[4] = 259;
    level11.y[4] = 235;
    level11.r[4] = 45;
    level11.color[4] = '#'+(Math.random()*0xFFFF33<<0).toString(16);
    level_array.push(level11);
    level_array_track.push(11);

var level12 = new Ball(12,6);
    level12.x[0] = 361;
    level12.y[0] = 136;
    level12.r[0] = 45;
    level12.color[0] = '#'+(Math.random()*0xFFFF33<<0).toString(16);
    level12.x[1] = 374;
    level12.y[1] = 167;
    level12.r[1] = 45;
    level12.color[1] = '#'+(Math.random()*0xFFFF33<<0).toString(16);
    level12.x[2] = 412;
    level12.y[2] = 101;
    level12.r[2] = 45;
    level12.color[2] = '#'+(Math.random()*0xFFFF33<<0).toString(16);
    level12.x[3] = 507;
    level12.y[3] = 305;
    level12.r[3] = 45;
    level12.color[3] = '#'+(Math.random()*0xFFFF33<<0).toString(16);
    level12.x[4] = 557;
    level12.y[4] = 107;
    level12.r[4] = 45;
    level12.color[4] = '#'+(Math.random()*0xFFFF33<<0).toString(16);
    level12.x[5] = 1028;
    level12.y[5] = 261;
    level12.r[5] = 45;
    level12.color[5] = '#'+(Math.random()*0xFFFF33<<0).toString(16);
    level_array.push(level12);
    level_array_track.push(12);

var level13 = new Ball(13,6);
    level13.x[0] = 361;
    level13.y[0] = 136;
    level13.r[0] = 45;
    level13.color[0] = '#'+(Math.random()*0xFFFF33<<0).toString(16);
    level13.x[1] = 374;
    level13.y[1] = 167;
    level13.r[1] = 45;
    level13.color[1] = '#'+(Math.random()*0xFFFF33<<0).toString(16);
    level13.x[2] = 412;
    level13.y[2] = 101;
    level13.r[2] = 45;
    level13.color[2] = '#'+(Math.random()*0xFFFF33<<0).toString(16);
    level13.x[3] = 507;
    level13.y[3] = 305;
    level13.r[3] = 45;
    level13.color[3] = '#'+(Math.random()*0xFFFF33<<0).toString(16);
    level13.x[4] = 557;
    level13.y[4] = 107;
    level13.r[4] = 45;
    level13.color[4] = '#'+(Math.random()*0xFFFF33<<0).toString(16);
    level13.x[5] = 1028;
    level13.y[5] = 261;
    level13.r[5] = 45;
    level13.color[5] = '#'+(Math.random()*0xFFFF33<<0).toString(16);
    level_array.push(level13);
    level_array_track.push(13);

var level14 = new Ball(14,7);
    level14.x[0] = 726;
    level14.y[0] = 179;
    level14.r[0] = 45;
    level14.color[0] = '#'+(Math.random()*0xFFFF33<<0).toString(16);
    level14.x[1] = 1154;
    level14.y[1] = 276;
    level14.r[1] = 45;
    level14.color[1] = '#'+(Math.random()*0xFFFF33<<0).toString(16);
    level14.x[2] = 718;
    level14.y[2] = 226;
    level14.r[2] = 45;
    level14.color[2] = '#'+(Math.random()*0xFFFF33<<0).toString(16);
    level14.x[3] = 479;
    level14.y[3] = 106;
    level14.r[3] = 45;
    level14.color[3] = '#'+(Math.random()*0xFFFF33<<0).toString(16);
    level14.x[4] = 744;
    level14.y[4] = 139;
    level14.r[4] = 45;
    level14.color[4] = '#'+(Math.random()*0xFFFF33<<0).toString(16);
    level14.x[5] = 180;
    level14.y[5] = 159;
    level14.r[5] = 45;
    level14.color[5] = '#'+(Math.random()*0xFFFF33<<0).toString(16);
    level14.x[6] = 851;
    level14.y[6] = 318;
    level14.r[6] = 45;
    level14.color[6] = '#'+(Math.random()*0xFFFF33<<0).toString(16);
    level_array.push(level14);
    level_array_track.push(14);

var level15 = new Ball(15,7);
    level15.x[0] = 658;
    level15.y[0] = 187;
    level15.r[0] = 40;
    level15.color[0] = '#'+(Math.random()*0xFFFF33<<0).toString(16);
    level15.x[1] = 692;
    level15.y[1] = 270;
    level15.r[1] = 40;
    level15.color[1] = '#'+(Math.random()*0xFFFF33<<0).toString(16);
    level15.x[2] = 669;
    level15.y[2] = 329;
    level15.r[2] = 40;
    level15.color[2] = '#'+(Math.random()*0xFFFF33<<0).toString(16);
    level15.x[3] = 648;
    level15.y[3] = 191;
    level15.r[3] = 40;
    level15.color[3] = '#'+(Math.random()*0xFFFF33<<0).toString(16);
    level15.x[4] = 1038;
    level15.y[4] = 169;
    level15.r[4] = 40;
    level15.color[4] = '#'+(Math.random()*0xFFFF33<<0).toString(16);
    level15.x[5] = 693;
    level15.y[5] = 343;
    level15.r[5] = 40;
    level15.color[5] = '#'+(Math.random()*0xFFFF33<<0).toString(16);
    level15.x[6] = 561;
    level15.y[6] = 192;
    level15.r[6] = 40;
    level15.color[6] = '#'+(Math.random()*0xFFFF33<<0).toString(16);
    level_array.push(level15);
    level_array_track.push(15);


    //random colors '#'+(Math.random()*0xFFFF33<<0).toString(16);

    var level16 = new Ball(16,2);
        level16.x[0] = 500;
        level16.y[0] = 225;
        level16.r[0] = 40;
        level16.color[0] = '#'+(Math.random()*0xFFFF33<<0).toString(16);
        level16.x[1] = 800;
        level16.y[1] = 225;
        level16.r[1] = 40;
        level16.color[1] = '#'+(Math.random()*0xFFFF33<<0).toString(16);
        level_array.push(level16);
        level_array_track.push(16);
        // return true;

    var level17 = new Ball(17,2);
        level17.x[0] = 450;
        level17.y[0] = 225;
        level17.r[0] = 40;
        level17.color[0] = '#'+(Math.random()*0xFFFF33<<0).toString(16);
        level17.x[1] = 850;
        level17.y[1] = 225;
        level17.r[1] = 40;
        level17.color[1] = '#'+(Math.random()*0xFFFF33<<0).toString(16);
        level_array.push(level17);
        level_array_track.push(17);

    var level18 = new Ball(18,2);
        level18.x[0] = 400;
        level18.y[0] = 225;
        level18.r[0] = 40;
        level18.color[0] = '#'+(Math.random()*0xFFFF33<<0).toString(16);
        level18.x[1] = 900;
        level18.y[1] = 225;
        level18.r[1] = 40;
        level18.color[1] = '#'+(Math.random()*0xFFFF33<<0).toString(16);
        level_array.push(level18);
        level_array_track.push(18);

    var level19 = new Ball(19,2);
        level19.x[0] = 350;
        level19.y[0] = 225;
        level19.r[0] = 40;
        level19.color[0] = '#'+(Math.random()*0xFFFF33<<0).toString(16);
        level19.x[1] = 950;
        level19.y[1] = 225;
        level19.r[1] = 40;
        level19.color[1] = '#'+(Math.random()*0xFFFF33<<0).toString(16);
        level_array.push(level19);
        level_array_track.push(19);

    var level20 = new Ball(20,2);
        level20.x[0] = 300;
        level20.y[0] = 225;
        level20.r[0] = 40;
        level20.color[0] = '#'+(Math.random()*0xFFFF33<<0).toString(16);
        level20.x[1] = 1000;
        level20.y[1] = 225;
        level20.r[1] = 40;
        level20.color[1] = '#'+(Math.random()*0xFFFF33<<0).toString(16);
        level_array.push(level20);
        level_array_track.push(20);

    var level21 = new Ball(21,2);
        level21.x[0] = 250;
        level21.y[0] = 225;
        level21.r[0] = 40;
        level21.color[0] = '#'+(Math.random()*0xFFFF33<<0).toString(16);
        level21.x[1] = 1050;
        level21.y[1] = 225;
        level21.r[1] = 40;
        level21.color[1] = '#'+(Math.random()*0xFFFF33<<0).toString(16);
        level_array.push(level21);
        level_array_track.push(21);

    var level22 = new Ball(22,2);
        level22.x[0] = 200;
        level22.y[0] = 225;
        level22.r[0] = 40;
        level22.color[0] = '#'+(Math.random()*0xFFFF33<<0).toString(16);
        level22.x[1] = 1100;
        level22.y[1] = 225;
        level22.r[1] = 40;
        level22.color[1] = '#'+(Math.random()*0xFFFF33<<0).toString(16);
        level_array.push(level22);
        level_array_track.push(22);

    var level23 = new Ball(22,2);
        level23.x[0] = 150;
        level23.y[0] = 225;
        level23.r[0] = 40;
        level23.color[0] = '#'+(Math.random()*0xFFFF33<<0).toString(16);
        level23.x[1] = 1150;
        level23.y[1] = 225;
        level23.r[1] = 40;
        level23.color[1] = '#'+(Math.random()*0xFFFF33<<0).toString(16);
        level_array.push(level23);
        level_array_track.push(23);
                    var level24 = new Ball(24,4);
        level24.x[0] = 500;
        level24.y[0] = 225;
        level24.r[0] = 40;
        level24.color[0] = '#'+(Math.random()*0xFFFF33<<0).toString(16);
        level24.x[1] = 800;
        level24.y[1] = 225;
        level24.r[1] = 40;
        level24.color[1] = '#'+(Math.random()*0xFFFF33<<0).toString(16);
        level24.x[2] = 500;
        level24.y[2] = 450;
        level24.r[2] = 40;
        level24.color[2] = '#'+(Math.random()*0xFFFF33<<0).toString(16);
        level24.x[3] = 800;
        level24.y[3] = 450;
        level24.r[3] = 40;
        level24.color[3] = '#'+(Math.random()*0xFFFF33<<0).toString(16);
        level_array.push(level24);
        level_array_track.push(24);


    var level25 = new Ball(25,4);
        level25.x[0] = 450;
        level25.y[0] = 225;
        level25.r[0] = 40;
        level25.color[0] = '#'+(Math.random()*0xFFFF33<<0).toString(16);
        level25.x[1] = 850;
        level25.y[1] = 225;
        level25.r[1] = 40;
        level25.color[1] = '#'+(Math.random()*0xFFFF33<<0).toString(16);
        level25.x[2] = 450;
        level25.y[2] = 450;
        level25.r[2] = 40;
        level25.color[2] = '#'+(Math.random()*0xFFFF33<<0).toString(16);
        level25.x[3] = 850;
        level25.y[3] = 450;
        level25.r[3] = 40;
        level25.color[3] = '#'+(Math.random()*0xFFFF33<<0).toString(16);
        level_array.push(level25);
        level_array_track.push(25);

        var level26 = new Ball(26,4);
            level26.x[0] = 400;
            level26.y[0] = 225;
            level26.r[0] = 40;
            level26.color[0] = '#'+(Math.random()*0xFFFF33<<0).toString(16);
            level26.x[1] = 900;
            level26.y[1] = 225;
            level26.r[1] = 40;
            level26.color[1] = '#'+(Math.random()*0xFFFF33<<0).toString(16);
            level26.x[2] = 400;
            level26.y[2] = 450;
            level26.r[2] = 40;
            level26.color[2] = '#'+(Math.random()*0xFFFF33<<0).toString(16);
            level26.x[3] = 900;
            level26.y[3] = 450;
            level26.r[3] = 40;
            level26.color[3] = '#'+(Math.random()*0xFFFF33<<0).toString(16);
            level_array.push(level26);
            level_array_track.push(26);

            var level27 = new Ball(27,4);
                level27.x[0] = 350;
                level27.y[0] = 225;
                level27.r[0] = 40;
                level27.color[0] = '#'+(Math.random()*0xFFFF33<<0).toString(16);
                level27.x[1] = 950;
                level27.y[1] = 225;
                level27.r[1] = 40;
                level27.color[1] = '#'+(Math.random()*0xFFFF33<<0).toString(16);
                level27.x[2] = 350;
                level27.y[2] = 450;
                level27.r[2] = 40;
                level27.color[2] = '#'+(Math.random()*0xFFFF33<<0).toString(16);
                level27.x[3] = 950;
                level27.y[3] = 450;
                level27.r[3] = 40;
                level27.color[3] = '#'+(Math.random()*0xFFFF33<<0).toString(16);
                level_array.push(level27);
                level_array_track.push(27);

                var level28 = new Ball(28,4);
                    level28.x[0] = 300;
                    level28.y[0] = 225;
                    level28.r[0] = 40;
                    level28.color[0] = '#'+(Math.random()*0xFFFF33<<0).toString(16);
                    level28.x[1] = 1000;
                    level28.y[1] = 225;
                    level28.r[1] = 40;
                    level28.color[1] = '#'+(Math.random()*0xFFFF33<<0).toString(16);
                    level28.x[2] = 300;
                    level28.y[2] = 450;
                    level28.r[2] = 40;
                    level28.color[2] = '#'+(Math.random()*0xFFFF33<<0).toString(16);
                    level28.x[3] = 1000;
                    level28.y[3] = 450;
                    level28.r[3] = 40;
                    level28.color[3] = '#'+(Math.random()*0xFFFF33<<0).toString(16);
                    level_array.push(level28);
                    level_array_track.push(28);

                    var level29 = new Ball(29,4);
                        level29.x[0] = 250;
                        level29.y[0] = 225;
                        level29.r[0] = 40;
                        level29.color[0] = '#'+(Math.random()*0xFFFF33<<0).toString(16);
                        level29.x[1] = 1050;
                        level29.y[1] = 225;
                        level29.r[1] = 40;
                        level29.color[1] = '#'+(Math.random()*0xFFFF33<<0).toString(16);
                        level29.x[2] = 250;
                        level29.y[2] = 450;
                        level29.r[2] = 40;
                        level29.color[2] = '#'+(Math.random()*0xFFFF33<<0).toString(16);
                        level29.x[3] = 1050;
                        level29.y[3] = 450;
                        level29.r[3] = 40;
                        level29.color[3] = '#'+(Math.random()*0xFFFF33<<0).toString(16);
                        level_array.push(level29);
                        level_array_track.push(29);

                        var level30 = new Ball(30,4);
                            level30.x[0] = 200;
                            level30.y[0] = 225;
                            level30.r[0] = 40;
                            level30.color[0] = '#'+(Math.random()*0xFFFF33<<0).toString(16);
                            level30.x[1] = 1100;
                            level30.y[1] = 225;
                            level30.r[1] = 40;
                            level30.color[1] = '#'+(Math.random()*0xFFFF33<<0).toString(16);
                            level30.x[2] = 200;
                            level30.y[2] = 450;
                            level30.r[2] = 40;
                            level30.color[2] = '#'+(Math.random()*0xFFFF33<<0).toString(16);
                            level30.x[3] = 1100;
                            level30.y[3] = 450;
                            level30.r[3] = 40;
                            level30.color[3] = '#'+(Math.random()*0xFFFF33<<0).toString(16);
                            level_array.push(level30);
                            level_array_track.push(30);
                            return true;
}
