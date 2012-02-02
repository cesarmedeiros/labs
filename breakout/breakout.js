/*
 * Breakout in Canvas
 * 
 */

(function(){
	var screen_width = 500;
	var screen_height = 550;

	var bar_width = 100;
	var bar_height = 20;
	var bar_x = 200;
	var bar_y = screen_height - bar_height - 5;
	var bar_speed = 20;

	var ball_radius = 10;
	var ball_x = screen_width / 2;
	var ball_y = bar_y - ball_radius - 5;
	var ball_moving = false;
	var ball_xdirection = 1;
	var ball_ydirection = -1;
	var ball_speed = 5;

	var brick_width = 50;
	var brick_height = 20;
	var brick_lines = 5;
	var brick_columns = screen_width / brick_width;
	
	//keys
	var KEY_LEFT = 37;
	var KEY_RIGHT = 39;
	var KEY_SPACE = 32;
	
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	
	canvas.width = screen_width;
	canvas.height = screen_height;
	
	//matriz q identifica os blocos presentes=1(estado inicial) ou destruídos=0
	var bricks_board = new Array();
	
	
	for(var i=0; i<brick_lines; i++){
		bricks_board[i] = new Array();
		for(var j=0; j<brick_columns; j++){
			bricks_board[i][j] = 1;
		}
	}

	var bar_collided = function(){
		var xspace = ball_x >= bar_x && ball_x <= bar_x + bar_width;
		var yspace = ball_y + ball_speed + ball_radius > bar_y;

		return xspace && yspace;
	}
	
	var bricks_collided = function(ball_x, ball_y){
		var xspace = ball_x/brick_width;
		var yspace = ball_y/brick_height;
		
		return [xspace,yspace];
	}
	
	
	var update = function(){
		//clear the screen
		ctx.fillStyle = "white";
		ctx.fillRect(0, 0, screen_width, screen_height);

		//draw bar
		ctx.fillStyle = "black";
		ctx.strokeStyle = "white";
		ctx.fillRect(bar_x, bar_y, bar_width, bar_height);

		//draw ball
		ctx.fillStyle = "red";
		ctx.beginPath();
		ctx.arc(ball_x, ball_y, ball_radius, 0, Math.PI * 2, true);
		ctx.fill();

		if(ball_moving){
			//alert(ball_y);
			bricks_point = bricks_collided(ball_x, ball_y);
			if (bricks_point[0]>0 && bricks_point[0]<=10 && bricks_point[1]>0 && bricks_point[1]<=5 && (bricks_board[parseInt(bricks_point[1],10)-1][parseInt(bricks_point[0],10)]==1)){
				bricks_board[parseInt(bricks_point[1],10)-1][parseInt(bricks_point[0],10)] = 0;

				ball_ydirection *= -1;
			}
			else {
				if(ball_x - ball_speed <= 0 || ball_x >= screen_width - ball_radius)
					ball_xdirection *= -1;
				if(ball_y - ball_speed <= ball_radius / 2 || bar_collided())
					ball_ydirection *= -1;
			}
			ball_x += ball_speed * ball_xdirection;	
			ball_y += ball_speed * ball_ydirection;
			

			if(ball_y > screen_height + ball_speed){
				alert("Game over!");
				ball_moving = false;
			}
		}

		//draw bricks
		ctx.fillStyle = "#5FF";
		ctx.strokeStyle = "black";
		ctx.lineWidth = 2;
		for(var i=0; i<brick_lines; i++){
			for(var j=0; j<brick_columns; j++){
				if (bricks_board[i][j]==1) {
					ctx.beginPath();
					ctx.rect(j*brick_width, i*brick_height, brick_width, brick_height);
					ctx.fill();
					ctx.stroke();
				}
			}
		}
	}

	document.onkeydown = function(e){
		if(e.keyCode == KEY_LEFT){
			if(bar_x - bar_speed >= 0)
				bar_x -= bar_speed;
		}
		if(e.keyCode == KEY_RIGHT){
			if(bar_x < screen_width - bar_width)
				bar_x += bar_speed;
		}
		if(e.keyCode == KEY_SPACE){
			ball_moving = true;
		}
	}
	
	setInterval(update, 20);
	
})();

