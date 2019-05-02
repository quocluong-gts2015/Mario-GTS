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

function DestroyObject(objColli,objDestroy){objDestroy.remove();}
function scr_getItem(objColli,objItem){
	if(objItem.getId == 1)
	{
		mario.canShoot = 1;
	}
	objItem.remove();}

function x_Object(objColli,obj_x)/*----------------------------quaivat<0>.colition.oCucgach<1>----------------------------*/{
	var Left_0 = objColli.position.x-16;
	var Right_0 = objColli.position.x+16;
	var Down_0 = objColli.position.y+16;
	
	var Left_1 = obj_x.position.x-16;
	var Right_1 = obj_x.position.x+16;
	var Up_1 = obj_x.position.y-16;
	var Down_1 = obj_x.position.y+16;
	if(objColli.getId ==0)//-------------------0.namdoc
	{
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
	else if(objColli.getId ==1)//-------------1.fireball--------------
	{
		if(Down_0-8 == Up_1 || Down_0 - 7 == Up_1)
		{objColli.position.y -= 10;}
		if((Left_0+8 == Right_1 || Left_1== Right_0-8) && objColli.position.y>Up_1 && objColli.position.y <Down_1 )
		{
			objColli.remove();
		}
	}	
}
function scr_fallDown(objColli,obj_x){objColli.position.y+=2;}//--------------quaivat.collition.fall----------------------------
function scr_fallUp(objColli,obj_x){
	objColli.velocity.y=-2;
	if(objColli.position.y+16<obj_x.position.y-32) objColli.remove();
}

function Vacham_xy(objColli,obj_x)/*----------------------------mario<0>.colition.oCucgach<1>----------------------------*/{
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
		if(obj_x.getID >0 )//-------------getcoinsup----------
		{
			vspd=0;
			canjump = false;
			objColli.velocity.y+=2;
			objColli.position.y+=2;
			obj_x.getID--;
			oCoins = createSprite(obj_x.position.x, obj_x.position.y-16, 32, 32);
			//oCoins.rem = 600;
			//oCoins.velocity.y=-1;
			//scr_timecd(oCoins,2);
			
		}
		else if(obj_x.getID ==-1)//-------------gethoa
		{
			vspd=0;
			canjump = false;
			objColli.velocity.y+=2;
			objColli.position.y+=2;
			oHoa = createSprite(obj_x.position.x,obj_x.position.y-32,16,16);
			oHoa.setCollider('rectangle');oHoa.addImage(loadImage('image/oHoa.png'));oHoa.getId = 1;
			oHoa.scale = 2;oHoa.debug=!mouseIsPressed;
			opar_Item.add(oHoa);
			obj_x.getID = 0;
		}
		else {
			vspd=0;
			canjump = false;
			objColli.velocity.y+=2;
			objColli.position.y+=2;
			//console.log('obj_x.getID');
			console.log('a');
		}
	}
}
function Vacham_mons(objColli,obj_x)/*----------------------------mario<0>.colition.quaivat<1>----------------------------*/{
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
function drawMap(){
	var dem = 0;
	var docao = height+16;
	for(var ai=0;ai<mapx.length;ai++)
	{
		var het = ai%90;
		if(het==0){docao-=32;}
		if(mapx[ai]==1)
		{
			oCucgach = createSprite(16+32*het,height-docao,32,32);
			oCucgach.setCollider('rectangle');
			oCucgach.addImage(loadImage('image/oCucgach.png'));
			oCucgach.getID = 0;
			//oCucgach.debug=!mouseIsPressed; 
			opar_Cucgach.add(oCucgach);
		}
		else if(mapx[ai]==2)
		{
			oNamdoc = createSprite(16+32*het,height-docao,32,32);
			oNamdoc.setCollider('rectangle');
			oNamdoc.addAnimation("quaiLR","image/eNamL.png","image/eNamR.png");
			oNamdoc.dir = 1;
			oNamdoc.velocity.y += 1;
			oNamdoc.getId = 0;
			oNamdoc.omonLife = 1;
			oNamdoc.chaynhanh = 0;
			opar_Namdoc.add(oNamdoc);
		}
		else if(mapx[ai] == -1)
		{
			ofall = createSprite(16+32*het,height-docao,32,32);
			ofall.setCollider('rectangle');
			ofallDown.add(ofall);
		}
		else if(mapx[ai] == 3)//-----------------------conrua---------------
		{
			oCucgach01 = createSprite(16+32*het,height-docao,32,32);
			oCucgach01.setCollider('rectangle');
			oCucgach01.addImage(loadImage('image/block03.png'));
			oCucgach01.getID = 3;
			opar_Cucgach01.add(oCucgach01);
		}
		else if(mapx[ai]==5)
		{
			oCucgach = createSprite(16+32*het,height-docao,32,32);
			oCucgach.setCollider('rectangle');
			oCucgach.addImage(loadImage('image/oCucgach.png'));
			oCucgach.getID = 5;
			opar_Cucgach.add(oCucgach);
		}
		else if(mapx[ai]==10)
		{
			oCucgach = createSprite(16+32*het,height-docao,32,32);
			oCucgach.setCollider('rectangle');
			oCucgach.addImage(loadImage('image/oCucgach.png'));
			oCucgach.getID = -1;
			opar_Cucgach.add(oCucgach);
		}
		
	}
}