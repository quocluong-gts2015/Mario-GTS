//------------timecd-----------
var timecd;
var opar_Item,oHoa,timeDuring;
//-------------nhanvat-mario------------------------
var mario,obj_follow;
var key_left,key_right,key_jump,key_down,key_attack,oFireball;
var canjump= false;
var dir = 1,grv = 1;
var giatoc = 0;
var marioState; var Died;
//-----------------pha-huy-trai+duoi----------
var oDestroys,oDesL,oDesD;
//---------------------gach----------
var opar_Cucgach,oCucgach,opar_Cucgach01,oCucgach01,opar_Invi,oInvi,oMay;
var getID=0;
var ofallDown,ofall;
//-----------------quaivat---------
var omonLife;
var opar_Namdoc,oNamdoc;
var opar_Conrua,oConrua,chaynhanh;
//--------------coins------------
var opar_Coins,oCoins,rem,oCo,opar_Co;
//----------game-state--------------------
var gameOver  = false,gameWin = 0;
//----------music------------
var jumpMusic, stompMusic, bgMusic;
var huongdan = true;
var tsize = 20;

function setGroup(){
	opar_Namdoc = new Group();
	opar_Conrua = new Group();
	opar_Cucgach01 = new Group();
	opar_Cucgach = new Group();
	oDestroys = new Group();
	opar_Invi = new Group();
	opar_Fireball = new Group();
	opar_Item = new Group();
	opar_Coins = new Group();opar_Co = new Group();
}

function preload(){
	mario = createSprite(112,240,32,32);mario.getName = 'mario';
	mario.marioState = {idle:0,movexy:1,die:0};mario.timeDuring = 0;
	mario.Died = 1;mario.dir = 1;mario.canShoot = 0; mario.timecd = 0;
	mario.hspd = 0;mario.vspd = 0;
	mario.setCollider('rectangle');
	mario.addAnimation("standingr","image/mario_standing_right.png");
	mario.addAnimation("runningr","image/mario_moving_right_01.png","image/mario_moving_right_03.png");
	mario.addAnimation("jumpingr","image/mario_jumping_right.png");
	mario.addAnimation("standingl","image/mario_standing_left.png");
	mario.addAnimation("runningl","image/mario_moving_left_01.png","image/mario_moving_left_03.png");
	mario.addAnimation("jumpingl","image/mario_jumping_left.png");
	mario.addAnimation("died","image/mario_died.png");

	jumpMusic = loadSound("sound/jump.wav");
	stompMusic = loadSound("sound/stomp.wav");
	bgMusic = loadSound("sound/BG.mp3");
}

function setup(){
	var canvas = createCanvas(960,480);
	canvas.parent("myCanvas");
	setGroup();
	bgMusic.play();
	//mario.debug=!mouseIsPressed;
	drawMap();
	gameStartedTime = millis();
}

function draw()//----------------------------------draw-------------------------
{
	if(gameOver == false && gameWin == 0)
	{
		oDestroys.collide(opar_Cucgach,scr_Destroy);
		
		background(80,200,250);
		var key_o = keyDown("O");
		textSize(tsize);
		if(key_o) huongdan = !huongdan;

		if(huongdan == true)
		{
			text("Press O to open/hide instruction.",camera.position.x-460,32);
		text("Press W to jump.",camera.position.x-460,64);
		text("Press A to move left.",camera.position.x-460,96);
		text("Press D to move right.",camera.position.x-460,128);
		text("Eat flower to shot fireBall.",camera.position.x-460,160);
		text("Press F to shot fireBall",camera.position.x-460,192);
		}
		text("TimeDuring: "+round(mario.timeDuring),camera.position.x+320,32);
		text("Canshoot: "+mario.canShoot,camera.position.x+320,64);
		mario.collide(opar_Item,scr_getItem);
		mario.collide(opar_Namdoc,scr_Vachammons);
		mario.collide(opar_Cucgach,Vacham_xy);
		mario.collide(opar_Co,scr_Win);

		opar_Namdoc.collide(opar_Cucgach,scr_MonsColli);
		opar_Namdoc.collide(opar_Invi,scr_Invi);
		opar_Fireball.collide(opar_Namdoc,scr_destroyAll);
		opar_Fireball.collide(opar_Cucgach,scr_fireBall);
				
				
		mario.key_left = keyDown("A");
		mario.key_right = keyDown("D");
		mario.key_jump = keyDown("W");
		mario.key_down = keyDown("S");
		mario.key_attack = keyDown("F");
		var movex = -mario.key_left + mario.key_right;
		mario.vspd += grv;
		if(mario.vspd>10) mario.vspd=10;
		mario.hspd = movex*2 + giatoc;
		if(mario.timecd>0)
		{
			mario.timecd--;
			if(mario.timecd<=0)
			{
				mario.timecd = 0;
			}
		}
		if(mario.canShoot == 1)
		{
			mario.timeDuring--;
			if(mario.timeDuring<0)
			{
				mario.canShoot = 0;
				mario.timeDuring = 0;
			}
		}
		if(mario.key_attack && mario.canShoot == 1 && mario.timecd ==0)
		{
			oFireball = createSprite(mario.position.x,mario.position.y,16,16);
			oFireball.setCollider('rectangle');
			oFireball.addImage(loadImage('image/fireBall.png'));
			oFireball.velocity.x = 8*mario.dir;
			oFireball.velocity.y = 4;
			oFireball.getId = 1;
			opar_Fireball.add(oFireball);
			mario.timecd = 30;
		}
		
		if(mario.Died <= 0){mario.marioState.die = 1;mario.marioState.movexy = 0;mario.marioState.idle = 0;}
		if(mario.marioState.idle == 1)//----------------------------------idle----------------------------------
		{
			//vspd += grv;
				if(mario.dir == 1)
				{
					mario.changeAnimation("standingr");
				}
				else {mario.changeAnimation("standingl");
				}
			if(mario.key_left || mario.key_right|| mario.key_jump){mario.marioState.movexy = 1;mario.marioState.idle = 0;}
		}
		if(mario.marioState.movexy == 1)//----------------------------------movexy----------------------------------
		{
			if(mario.key_jump)
			{
				if(mario.canjump)
				{	jumpMusic.play();
					mario.vspd = -16;
					if(mario.dir == 1) mario.changeAnimation("jumpingr");
					else mario.changeAnimation("jumpingl");
					mario.canjump = false;
					}
			}
		
			if(mario.key_right)
				{
					mario.dir = 1;
					if(mario.canjump == true)
					mario.changeAnimation("runningr");
					giatoc+=0.2;
					if(giatoc>=5)
					{giatoc = 5;}
				}
			if(mario.key_left)
				{
					mario.dir = -1;
					if(mario.canjump == true)
					mario.changeAnimation("runningl");
					giatoc-=0.2;
					if(giatoc<=-5) giatoc = -5;
				}
			

			if(movex == 0)
			{
				if(mario.dir == 1)
				{
				giatoc-=0.3;
				if(giatoc<0)
					giatoc = 0;
				}
				else{
				giatoc+=0.3;
				if(giatoc>0)
					giatoc = 0;
				}
				if(giatoc>0)
				{
					mario.changeAnimation("runningr");
				}
				if(giatoc<0)
				{
					mario.changeAnimation("runningl");
				}
			}
		
			if(mario.canjump == true && mario.hspd == 0){mario.marioState.idle = 1;mario.marioState.movexy = 0;}
		}
		if(mario.marioState.die == 1)//-----------die----------
		{
			gameOver = true;
		}
		if(mario.position.y>height) gameOver = true;
		
		if(mario.position.x<camera.position.x-470 && mario.dir == -1) mario.hspd = 0;
		
		//---follow--
		if(mario.position.x > obj_follow.position.x)
		{
			obj_follow.position.x = mario.position.x;
		}
		if(obj_follow.position.x<=width/2)
		{
			camera.position.x =width/2;
		}
		else
		{
		var xcam = (obj_follow.position.x-camera.position.x)/1;
		camera.position.x += xcam;
		}
		oDestL.position.x = camera.position.x-550;
		

		drawSprites();

		mario.position.x +=	mario.hspd;
		mario.position.y += mario.vspd;
	
	}
	else if(gameOver == true && gameWin == 0) {
		fill(0,0,0,150);
    	rect(0,0,width,height);
		fill(250);
		bgMusic.stop();
		//textAlgin(LEFT);
		textSize(tsize*3);
		text("You have lose",camera.position.x,camera.position.y);
		//noFill();
	}
	else if(gameOver == true && gameWin == 1) {
		fill(0,0,0,150);
    	rect(0,0,width,height);
		fill(250);
		bgMusic.stop();
		//textAlgin(LEFT);
		textSize(tsize*3);
		text("You have Win",camera.position.x,camera.position.y);
		//noFill();
	}
}