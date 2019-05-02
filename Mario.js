//------------timecd-----------
var timecd;
var opar_Item,oHoa,getId;
//-------------nhanvat-mario------------------------
var mario,obj_follow;
var key_left,key_right,key_jump,key_down,key_attack,oFireball;
var canjump= false;
var dir = 1,grv = 1;
var hspd = 0, vspd = 0, giatoc = 0;
var marioState; var Died;
//-----------------pha-huy-trai+duoi----------
var oDestroys,oDesL,oDesD;
//---------------------gach----------
var opar_Cucgach,oCucgach,opar_Cucgach01,oCucgach01;
var getID=0;
var ofallDown,ofall;
//-----------------quaivat---------
var omonLife;
var opar_Namdoc,oNamdoc;
var opar_Conrua,oConrua,chaynhanh;
//--------------coins------------
var opar_Coins,oCoins,rem;
//----------game-state--------------------
var gameOver  = false;

function setGroup(){
	opar_Namdoc = new Group();
	opar_Cucgach01 = new Group();
	opar_Cucgach = new Group();
	oDestroys = new Group();
	ofallDown = new Group();
	opar_Fireball = new Group();
	opar_Item = new Group();
	opar_Coins = new Group();
}

function preload(){
	mario = createSprite(112,0,32,32);
	mario.marioState = {idle:0,movexy:1,die:0}
	mario.Died = 1;mario.dir = 1;mario.canShoot = 0; mario.timecd = 0;
	mario.setCollider('rectangle');//,0,0,32,32);
	mario.addAnimation("standingr","image/mario_standing_right.png");
	mario.addAnimation("runningr","image/mario_moving_right_01.png","image/mario_moving_right_03.png");
	mario.addAnimation("jumpingr","image/mario_jumping_right.png");
	mario.addAnimation("standingl","image/mario_standing_left.png");
	mario.addAnimation("runningl","image/mario_moving_left_01.png","image/mario_moving_left_03.png");
	mario.addAnimation("jumpingl","image/mario_jumping_left.png");
	mario.addAnimation("died","image/mario_died.png");
}

function setup(){
	var canvas = createCanvas(960,480);
	canvas.parent("myCanvas");
	
	setGroup();
	//mario.depth = 1000;
	//mario.debug=!mouseIsPressed;
	drawMap();
	//createSprite(450,320,50,50);------//(vi tri'x,y,chieu rong,chieu cao);
	//ground.addImage(loadImage('image/block.png'));------//('rectangle',0,0,50,50)==(di chuyen tam tinh' tu` vien`x,y,vien va cham x,y
  gameStartedTime = millis();
}

function draw()//----------------------------------draw-------------------------
{
	if(gameOver != true)
	{
		background(80,200,250);
		//scr_timecd(oCoins,10);
		mario.collide(opar_Item,scr_getItem);
		opar_Namdoc.collide(opar_Cucgach,x_Object);
		opar_Fireball.collide(opar_Cucgach,x_Object);
		opar_Namdoc.collide(ofallDown,scr_fallDown);
		opar_Coins.collide(opar_Cucgach,scr_fallUp);
				
		mario.key_left = keyDown("A");
		mario.key_right = keyDown("D");
		mario.key_jump = keyDown("W");
		mario.key_down = keyDown("S");
		mario.key_attack = keyDown("F");
		var movex = -mario.key_left + mario.key_right;
		vspd += grv;
		if(mario.timecd>0)
		{
			mario.timecd--;
			if(mario.timecd<0)
			{
				mario.timecd = 0;
			}
		}
		if(mario.key_attack && mario.canShoot == 1 && mario.timecd ==0)
		{
			
			oFireball = createSprite(mario.position.x,mario.position.y,16,16);
			oFireball.setCollider('rectangle');
			oFireball.addImage(loadImage('image/fireBall.png'));
			oFireball.velocity.x = 4*mario.dir;
			oFireball.velocity.y = 4;
			oFireball.getId = 1;
			opar_Fireball.add(oFireball);
			mario.timecd = 50;
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
			mario.collide(opar_Cucgach,Vacham_xy);
			mario.collide(opar_Cucgach01,Vacham_xy);
			mario.collide(opar_Namdoc,Vacham_mons);
		
			if(mario.key_left || mario.key_right|| mario.key_jump){mario.marioState.movexy = 1;mario.marioState.idle = 0;}
		}
		if(mario.marioState.movexy == 1)//----------------------------------movexy----------------------------------
		{
			
			hspd = movex*2 + giatoc;
			
			if(mario.key_jump)
			{
				if(canjump)
				{	vspd = -14;
					if(mario.dir == 1) mario.changeAnimation("jumpingr");
					else mario.changeAnimation("jumpingl");
					canjump = false;
					}
			}
		
			if(mario.key_right)
				{
					mario.dir = 1;
					if(canjump == true)
					mario.changeAnimation("runningr");
					giatoc+=0.4;
					if(giatoc>=5)
					{giatoc = 5;}
				}
			if(mario.key_left)
				{
					mario.dir = -1;
					if(canjump == true)
					mario.changeAnimation("runningl");
					giatoc-=0.4;
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
		
			mario.collide(opar_Cucgach,Vacham_xy);
			mario.collide(opar_Cucgach01,Vacham_xy);
			mario.collide(opar_Namdoc,Vacham_mons);
			if(canjump == true && hspd == 0){mario.marioState.idle = 1;mario.marioState.movexy = 0;}
		}
		if(mario.marioState.die == 1)//-----------die----------
		{
			gameOver = true;
		}
		if(mario.position.y>height) gameOver = true;
		
		if(mario.position.x<16 && mario.dir == -1) hspd = 0;
		else if(mario.position.x > 2880-16 && mario.dir == 1) hspd = 0;
	
		if(mario.position.x<=width/2)
		{
			camera.position.x =width/2;
		}
		else
		{
		var xcam = (mario.position.x-camera.position.x)/1;
		camera.position.x += xcam;
		}

		drawSprites();

		mario.position.x +=	hspd;
		mario.position.y += vspd;
	
	}
	else {
		background("pink");
	}
}