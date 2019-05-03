function scr_Destroy(oA,oB){oB.remove();}
function scr_Win(oA,oB){
	gameOver = true; gameWin = 1;
}
function scr_destroyAll(oA,oB){oB.remove();oA.remove();}
function scr_getItem(oA,oB)
{
	oA.canShoot = 1;
	oA.timeDuring = 200;
	oB.remove();
}
function scr_fireBall(oA,oB)/*----------------------------fireBall<0>.colition.oCucgach<1>----------------------------*/
{
	if(oA.position.y+8 == oB.position.y-16)
	{	
		oA.position.y-=10;
	}
	if((oA.position.x+8 == oB.position.x-16 || oA.position.x-8 == oB.position.x+16) && oA.position.y < oB.position.y+16 && oA.position.y > oB.position.y-16)
	{
		console.log('aaa');
		oA.remove();
	}
}

function scr_MonsColli(oA,oB)/*----------------------------quaivat<0>.colition.oCucgach<1>----------------------------*/
{
	//----------------------------------------quaivat----------------------------
	if(oA.getName == 'oNamdoc')
	{
		
		if(oA.position.y+16 == oB.position.y-16)
		{	
			oA.velocity.y=0;
			oA.velocity.x = oA.dir*2;
		}
		if((oA.position.x+16 == oB.position.x-16 || oA.position.x-16 == oB.position.x+16) && oA.position.y == oB.position.y)
		{
			oA.dir = oA.dir * -1;
			oA.velocity.x = oA.dir*2;
		}
	}
}
function scr_Invi(oA,oB)/*----------------------------quaivat<0>.colition.oCucgach<1>----------------------------*/
{
	//----------------------------------------quaivat----------------------------
	if((oA.position.x+16 == oB.position.x-16 || oA.position.x-16 == oB.position.x+16) && oA.position.y == oB.position.y)
	{
		oA.dir = oA.dir * -1;
		oA.velocity.x = oA.dir*2;
	}
}
//--------------------------vacham-----------------------------
function Vacham_xy(oA,oB)
{
	if(oA.getName == 'mario')//----------------------------mario----------------------------
	{
		if(oB.getName == 'none')
		{
			if((oA.position.y+16 == oB.position.y-16 || oA.position.y+15 == oB.position.y-16)&& oA.position.x-16-floor(oA.hspd) != oB.position.x+16 && oA.position.x+16-floor(oA.hspd) != oB.position.x-16)// && oA.position.x-16 != oB.position.x+16 && oA.position.x+16 != oB.position.x-16)
			{
				oA.vspd = 0;
				oA.velocity.y=0;
				oA.canjump = true;
			}
			if((oA.position.x-32-floor(oA.hspd) == oB.position.x || oA.position.x+32-floor(oA.hspd) == oB.position.x) && oA.position.y+16 != oB.position.y-16 && oA.position.y+15 != oB.position.y-16 && oA.position.y!= oB.position.y)
			{
				oA.canjump = false;
				oA.hspd = 0;giatoc=0;
				oA.velocity.x=0;
			}
		}
			if(oA.position.y-16 == oB.position.y+16)// && oA.position.x <= oB.position.x+16 && oA.position.x >= oB.position.x-16 )
			{
				if(oB.getName == 'getFlower')//-------------getflower------------------
				{
					console.log('aa');
					oA.vspd=0;
					oA.canjump = false;
					oA.velocity.y+=2;oA.position.y+=2;
					oFlower = createSprite(oB.position.x,oB.position.y-32,8,8);
					oFlower.setCollider('rectangle');oFlower.addImage(loadImage('image/oFlower.png'));oFlower.getName = 1;
					oFlower.scale = 2;
					opar_Item.add(oFlower);
					oB.getName = 'none';
					oB.addImage(loadImage('image/onoCoins.png'));
				}
				else if(oB.getName == 'none')
				{
					mario.vspd=0;
					mario.canjump = false;
					oA.velocity.y+=2;
					oA.position.y+=2;	
				}
			}
	}
}

function scr_Vachammons(oA,oB)/*----------------------------mario<0>.colition.quaivat<1>----------------------------*/
{
	if(oA.position.y+16 == oB.position.y-16)// && oA.position.x < Right_1 && oA.position.x > Left_1)
	{
		stompMusic.play();
		oA.vspd =-8;
		oB.remove();
	}
	if(oA.position.x-16 == oB.position.x+16 || oA.position.x+16 == oB.position.x-16 || oA.position.y-16 == oB.position.y+16)
	{
		gameOver = true;
	}
}
function drawMap()
{
	oDestL = createSprite(-16,height/2,10,600);
	oDestroys.add(oDestL);
	var dem = 0;var cotx = 0;
	var docao = height-16;
	for(var ai=1;ai<=mapx.length;ai++)
	{
		var het = ai%14;
		if(het==0){cotx++;}
		if(mapx[ai]==1)
		{
			oCucgach = createSprite(16+cotx*32,height-32*het,32,32);
			oCucgach.setCollider('rectangle');oCucgach.addImage(loadImage('image/oCucgach.png'));
			oCucgach.getName = 'none';
			opar_Cucgach.add(oCucgach);
		}
		else if(mapx[ai]==2)
		{
			oNamdoc = createSprite(16+cotx*32,height-32*het,32,32);
			oNamdoc.setCollider('rectangle');
			oNamdoc.addAnimation("quaiLR","image/eNamL.png","image/eNamR.png");
			oNamdoc.dir = 1;
			oNamdoc.velocity.y += 4;
			oNamdoc.velocity.x = oNamdoc.dir;
			oNamdoc.getName = 'oNamdoc';
			opar_Namdoc.add(oNamdoc);
		}
		else if(mapx[ai]==4)
		{
			oCucgach = createSprite(16+cotx*32,height-32*het,32,32);
			oCucgach.setCollider('rectangle');oCucgach.addImage(loadImage('image/oCucgach0.png'));
			oCucgach.getName = 'none';
			opar_Cucgach.add(oCucgach);
		}
		else if(mapx[ai] == 5)
		{
			oInvi = createSprite(16+cotx*32,height-32*het,32,32);
			oInvi.setCollider('rectangle');
			oInvi.addImage(loadImage('image/oInvi.png'));
			opar_Invi.add(oInvi);
		}
		else if(mapx[ai]==6)
		{
			oMay = createSprite(16+cotx*32,height-32*het,0,0);
			oMay.addImage(loadImage('image/oCucgach2.png'));
		}
		else if(mapx[ai]==8)
		{
			oCucgach = createSprite(16+cotx*32,height-32*het,32,32);
			oCucgach.setCollider('rectangle');oCucgach.addImage(loadImage('image/onoCoins.png'));
			oCucgach.getName = 'none';
			opar_Cucgach.add(oCucgach);
		}
		else if(mapx[ai]==10)
		{
			oCucgach = createSprite(16+cotx*32,height-32*het,32,32);
			oCucgach.setCollider('rectangle');
			oCucgach.addImage(loadImage('image/ogetCoins.png'));
			oCucgach.getName = 'getFlower';
			opar_Cucgach.add(oCucgach);
		}
		else if(mapx[ai]==15)
		{
			oCo = createSprite(16+cotx*32,height-32*het,32,32);
			oCo.setCollider('rectangle');
			oCo.addImage(loadImage('image/co1.png'));
			opar_Co.add(oCo);
		}
		else if(mapx[ai]==16)
		{
			oCo = createSprite(16+cotx*32,height-32*het,32,32);
			oCo.setCollider('rectangle');
			oCo.addImage(loadImage('image/co0.png'));
			opar_Co.add(oCo);
		}
	}
		obj_follow = createSprite(480,240,8,8);
		obj_follow.addImage(loadImage('image/oInvi.png'));
}