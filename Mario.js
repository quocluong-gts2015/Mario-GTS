//-------------nhanvat-mario------------------------
var mario,obj_follow;
var key_left,key_right,key_jump,key_down;
var canjump= false;
var dir = 1,grv = 1;
var hspd = 0, vspd = 0, giatoc = 0; //hspd: toc do ngang (horizontal speed); vspd: toc do doc (vertical speed)
var marioState; var Died;
//-----------------pha-huy-trai+duoi----------
var oDestroys,oDesL,oDesD;
//---------------------gach----------
var opar_Cucgach,oCucgach,getCoins=0;
var ofallDown,ofall;
//-----------------quaivat---------
var omonLife;
var opar_Namdoc,oNamdoc;
var opar_Conrua,oConrua,chaynhanh;
//--------------coins------------
var oCoins,rem;
//----------game-state--------------------
var gameOver  = false;

function DestroyObject(objColli,objDestroy){objDestroy.remove();}

function x_Object(objColli,obj_x)//----------------------------quaivat<0>.collition.oCucgach<1>----------------------------
{
	var Left_0 = objColli.position.x-16;
	var Right_0 = objColli.position.x+16;
	var Down_0 = objColli.position.y+16;
	
	var Left_1 = obj_x.position.x-16;
	var Right_1 = obj_x.position.x+16;
	var Up_1 = obj_x.position.y-16;
	
	if(Down_0 == Up_1 && objColli.position.x < Right_1 && objColli.position.x > Left_1)
	{objColli.velocity.y=0;}
	if(Left_0+objColli.dir < Right_1 || Left_1 > Right_0+objColli.dir )
	{
		objColli.dir=objColli.dir * -1;
		if(objColli.chaynhanh == 0)
		{
			objColli.velocity.x = objColli.dir;
			objColli.position.x+=objColli.dir;
		}
		else
		{
			objColli.velocity.x = objColli.dir*3;
			objColli.position.x+=objColli.dir*3;
				
		}
	}
}
function scr_fallDown(objColli,obj_x){objColli.position.y+=2;}//--------------quaivat.collition.fall----------------------------

function Vacham_xy(objColli,obj_x)//----------------------------mario<0>.collition.oCucgach<1>----------------------------
{
	var Down_0 = objColli.position.y+16;
	var Up_0 = objColli.position.y-16;
	var Left_0 = objColli.position.x-16;
	var Right_0 = objColli.position.x+16;
	var Left_1 = obj_x.position.x-16;
	var Right_1 = obj_x.position.x+16;
	var Up_1 = obj_x.position.y-16;
	var Down_1 = obj_x.position.y+16;
	if((Down_0 == Up_1||Down_0-1 == Up_1) && objColli.position.y<obj_x.position.y && (Left_0 != Right_1 || Right_0 != Left_1))
	{
		vspd = 0;
		objColli.velocity.y=0;
		canjump = true;
		
	}
	if((Left_0 == Right_1|| Right_0 == Left_1) && (Down_0-1 != Up_1 && Down_0 != Up_1))
	{
		hspd = 0;giatoc=0;
		objColli.velocity.x=0;
		//canjump = false;
		//console.log(Down_0);
	
	}
	//if(Down_0 != Up_1 ){canjump = false;console.log('vspdff');}
	if(Up_0 == Down_1 && objColli.position.x <= Right_1 && objColli.position.x >= Left_1 )
	 {
		if(obj_x.getCoins >-1)
		{
			vspd=0;
			canjump = false;
			objColli.velocity.y+=2;
			objColli.position.y+=2;
			obj_x.getCoins--;
			oCoins = createSprite(obj_x.position.x, obj_x.position.y-24, 32, 32);
			//oCoins.rem = 600;
			oCoins.velocity.y=-1;
			//scr_coinsUp(oCoins,60);
			console.log(obj_x.getCoins);
		}
		else {
			vspd=0;
			canjump = false;
			objColli.velocity.y+=2;
			objColli.position.y+=2;
			//console.log('obj_x.getCoins');
		}
	 }
}
function Vacham_mons(objColli,obj_x)//----------------------------mario<0>.collition.quaivat<1>----------------------------
{
	var Left_0 = objColli.position.x-16;
	var Right_0 = objColli.position.x+16;
	var Up_0 = objColli.position.y-16;
	var Down_0 = objColli.position.y+16;
	var Left_1 = obj_x.position.x-16;
	var Right_1 = obj_x.position.x+16;
	var Up_1 = obj_x.position.y-16;
	var Down_1 = obj_x.position.y+16;
	if(Down_0 == Up_1)// && objColli.position.x < Right_1 && objColli.position.x > Left_1)
	{
		if(obj_x.omonLife == 1)
		{
			vspd =-8;
			obj_x.remove();
		}
		else if(obj_x.omonLife == 2)
		{
			vspd =-8;
			obj_x.velocity.x += obj_x.dir*3;
			obj_x.chaynhanh = 1;
			obj_x.omonLife--;
		}
		else
		{
			vspd =-8;
			obj_x.omonLife--;obj_x.velocity.x = 0;

		}
	}
	if(Left_0 == Right_1 || Left_1 == Right_0 || Down_1 == Up_0)
	{
		gameOver = true;
	}
}
function preload(){
	mario = createSprite(112,0,32,32);
	mario.marioState = {idle:0,movexy:1,die:0}
	mario.Died = 1;mario.dir = 1;
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
	createCanvas(800,416);
	//mario.depth = 1000;
	//mario.debug=!mouseIsPressed;
	opar_Namdoc = new Group();
	opar_Conrua = new Group();
	opar_Cucgach = new Group();
	oDestroys = new Group();
	ofallDown = new Group();
	
	//createSprite(450,320,50,50);------//(vi tri'x,y,chieu rong,chieu cao);
	//ground.addImage(loadImage('image/block.png'));------//('rectangle',0,0,50,50)==(di chuyen tam tinh' tu` vien`x,y,vien va cham x,y)
	var dem = 0;
	var docao = 320;
	//Map
	for(var ai=0;ai<mapx.length;ai++)
	{
		var het = ai%26;
		if(het==0){docao-=32;}
		if(mapx[ai]==1)
		{
			oCucgach = createSprite(16+32*het,height-docao,32,32);
			oCucgach.setCollider('rectangle');oCucgach.addImage(loadImage('image/oCucgach.png'));oCucgach.getCoins = 0;
			//oCucgach.debug=!mouseIsPressed; 
			opar_Cucgach.add(oCucgach);
		}
		else if(mapx[ai]==2)
		{
			oNamdoc = createSprite(16+32*het,height-docao,32,32);
			oNamdoc.setCollider('rectangle');oNamdoc.addAnimation("quaiLR","image/eNamL.png","image/eNamR.png");oNamdoc.dir = 1;
			oNamdoc.velocity.y += 1;
			oNamdoc.omonLife = 1;oNamdoc.chaynhanh = 0;
			//oCucgach.debug=!mouseIsPressed
			opar_Namdoc.add(oNamdoc);
		}
		else if(mapx[ai]==-1)
		{
			ofall = createSprite(16+32*het,height-docao,32,32);
			ofall.setCollider('rectangle');
			ofallDown.add(ofall);
		}
		else if(mapx[ai] == 3)//-----------------------conrua---------------
		{
			oConrua = createSprite(16+32*het,height-docao,32,32);
			oConrua.setCollider('rectangle');oConrua.addAnimation("conrua","image/conrua.png");oConrua.dir = 1;
			oConrua.velocity.y += 1;
			oConrua.omonLife = 3;oConrua.chaynhanh = 0;
			opar_Conrua.add(oConrua);
		}
		else if(mapx[ai]==5)
		{
			oCucgach = createSprite(16+32*het,height-docao,32,32);
			oCucgach.setCollider('rectangle');oCucgach.addImage(loadImage('image/oCucgach.png'));oCucgach.getCoins = 5;
			opar_Cucgach.add(oCucgach);
		}
		
	}
	//oDesL = createSprite(0,height/2-20,10,height);
	//oDesD = createSprite(width/2,height,width,10);
	/* obj_follow = createSprite(112,height-16,32,32);
		obj_follow.setCollider('rectangle'); */
  gameStartedTime = millis();
}
function scr_coinsUp(obj_x,timecd) {
	
	timecd--;
	if(timecd<0){oCoins.velocity.y=-2;console.log('giatoc');}
	console.log(timecd);
}

function draw()//----------------------------------draw-------------------------
{
	if(gameOver != true)
	{
		/* var aa = mario.position.x-(16*mario.dir);//------------------objfollow mario--------------
		if(aa>obj_follow.position.x+16 && mario.dir == 1)
		{console.log('giatoc');
			obj_follow.position.x+=32;
		} 
		else if(aa<obj_follow.position.x-16 && mario.dir == -1)
		{console.log(giatoc);
			obj_follow.position.x-=32;
		}*/
		opar_Namdoc.collide(opar_Cucgach,x_Object);
		opar_Namdoc.collide(ofallDown,scr_fallDown);
		background(80,200,250);
		mario.key_left = keyDown("A");
		mario.key_right = keyDown("D");
		mario.key_jump = keyDown("W");
		mario.key_down = keyDown("S");
		var movex = -mario.key_left + mario.key_right;
		vspd += grv;
	
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
			mario.collide(opar_Namdoc,Vacham_mons);
		
			if(mario.key_left || mario.key_right|| mario.key_jump){mario.marioState.movexy = 1;mario.marioState.idle = 0;}
		}
		if(mario.marioState.movexy == 1)//----------------------------------movexy----------------------------------
		{
			
			hspd = movex*2 + giatoc;
			
			if(mario.key_jump)
			{
				if(canjump)
				{	vspd = -12;
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
			mario.collide(opar_Namdoc,Vacham_mons);
			if(canjump == true && hspd == 0){mario.marioState.idle = 1;mario.marioState.movexy = 0;}
		}
		if(mario.marioState.die == 1)//-----------die----------
		{
			gameOver = true;
		}
		
		if(mario.position.x<16 && mario.dir == -1) hspd = 0;
		else if(mario.position.x > width-16 && mario.dir == 1) hspd = 0;

	//--------------------------------------------------
		//oDesL.collide(opar_Cucgach,DestroyObject);
		//oDesL.collide(opar_Namdoc,DestroyObject);
	
		// if(oDesL.position.x < 1)
		// {
			// oDesL.velocity.x = 2;
		// }
		// else {oDesL.velocity.x = 0;}
		
		//oDesD.collide(opar_Namdoc,DestroyObject);
		//oDesD.collide(opar_Cucgach,DestroyObject);
		// if(oDesD.position.y > height)
		// {
			// oDesD.velocity.y = -2;
		// }
		// else {oDesD.velocity.y = 0;}
		//console.log(camera.position.x);
		
	
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