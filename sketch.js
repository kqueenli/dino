var PLAY=1;
var END=0;
var gameState=PLAY;

var trex,trex_running,trexcollided;
var xD,fnafImage,groundImage;
var freddysgroup,xp,xpImage;
var akatsukigroup,Hidan,Kakuzu,konan,tobi,itachi,Zetsu;

var gameover, gameoverImage;
var restart, restartImage;

var edges;
var score;
var risaTroll, salto, springtrap;




function preload(){
  
  fnafImage = loadImage("piso.png");
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trexcollided = loadImage("trex_collided.png");
  xpImage=loadImage("GF.png");
  
  Hidan=loadImage("Hidan.png");
  Zetsu=loadImage("Zetsu.png");
  itachi=loadImage("itachi.png");
  konan=loadImage("konan.png");
  Kakuzu=loadImage("kakuzu.png");
  tobi=loadImage("tobi.png");
  
  gameoverImage = loadImage("game over.png");
  restartImage = loadImage("restart.png");
  risaTroll = loadSound ("risa troll Efecto de sonido.mp3");
  salto = loadSound ("salto.mp3");
  springtrap = loadSound("FNaF 3 - Springtrap Jumpscare.mp3");
}

function setup(){
  
  createCanvas(600,200);
  
  
  score=0;
  
  groundImage=createSprite(300,180,600,20);
  groundImage.addImage(fnafImage);
    
  //crea el Trex  
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  
  //añade escala y posición al Trex
  trex.scale = 0.5;
  trex.x = 50;
  edges = createEdgeSprites();
  
  xD=createSprite(300,190,600,10);//Porque si no la compu se molesta >:v
  xD.visible=false;
  freddysgroup=createGroup ();
  akatsukigroup=createGroup ();
  
  trex.setCollider("circle",0,0,25);
  trex.debug = false;
  
  //Animación
  trex.addAnimation("collided" ,trexcollided);
  
  gameover = createSprite(300,90,10,10);
  gameover.addImage(gameoverImage);
  
  restart = createSprite(300,150,10,10);
  restart.addImage(restartImage);
  
 
}

function draw(){
  
  //establece un color de fondo 
  background("white");
  fill("white"); 
  text("score: "+score,400,20);
      
  if(gameState===PLAY){
    
    gameover.visible = false;
    restart.visible = false;
    
    //mueve el suelo
    groundImage.velocityX=-(8+score/1000); 
    //puntuación
    score=score+Math.round(getFrameRate()/60);
    if(score>0 && score % 1000===0) {
    risaTroll.play();
      
    }
    
    if(groundImage.x<0) {
     groundImage.x=groundImage.width/2;
    }
    //salta cuando se presiona la barra espaciadora
    if(keyDown("space")&& trex.y>=100){
      trex.velocityY = -10;
      salto.play();
    }
    //gravedad
    trex.velocityY = trex.velocityY + 0.8;
    //nubes de Freddy
    spawnObject();
    //obstaculos akatsuki
    spawnObstacles();
    
    if(akatsukigroup.isTouching(trex)){
      gameState = END;
      springtrap.play();
    }
  }
  
  else if(gameState===END){
    
    gameover.visible = true;
    gameover.scale = 0.2;
    
    restart.visible = true;
    restart.scale = 0.15;
    
    groundImage.velocityX=0;
    trex.velocityY = 0;
    
    //cambia la animación del Trex
    trex.changeAnimation("collided",trexcollided);
    
    akatsukigroup.setVelocityXEach(0);
    freddysgroup.setVelocityXEach(0);
        
    akatsukigroup.setLifetimeEach(-1);
    freddysgroup.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)){
     reset();
      
    }
    
    
  }
  
  //evita que el Trex caiga
  trex.collide([xD])
  
  drawSprites();
  
}

function spawnObject(){
  if(frameCount % 100 ===0){ 
    xp=createSprite(550,50,30,30);
    xp.velocityX=-5; 
    xp.addImage(xpImage);
    xp.scale=0.3;      
    xp.y=Math.round(random(7,100));                            
    xp.depth=trex.depth;
    trex.depth=xp.depth+1;                            
    xp.lifetime=120;      
    freddysgroup.add(xp);
  }
}

function spawnObstacles ()  {
  if(frameCount % 60===0)    {
    var akatsuki=createSprite(600,155,50,50); 
    akatsuki.velocityX=-(8+score/1000); 
    var Pain=Math.round(random(1,6));
    switch(Pain){
      case 1: akatsuki.addImage(Hidan); 
      break;

      case 2: akatsuki.addImage(Zetsu);
      break;

      case 3: akatsuki.addImage(konan); 
      break;

      case 4: akatsuki.addImage(Kakuzu); 
      break;
      case 5: akatsuki.addImage(itachi); 
      break;

      case 6: akatsuki.addImage(tobi); 
      break; 

      default:break;
    }  
  akatsuki.scale=0.1;
  akatsuki.lifetime=120;   
  akatsukigroup.add(akatsuki); 
  
 }
}

function reset() {
gameState=PLAY;
gameover.visible=false;
restart.visible=false;
  
  akatsukigroup.destroyEach();
  freddysgroup.destroyEach();
  
  
trex.changeAnimation("running",trex_running);
 score=0   
} 

