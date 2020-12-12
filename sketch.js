
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var foodGroup, obstacleGroup
var score;
var ground,ground2,invisibleGround;
var PLAY = 1;
var END = 0;
var gameState = PLAY;


function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600,200);
  
  monkey = createSprite(50,130,20,50);
  monkey.addAnimation("running",monkey_running);
  monkey.scale = 0.1;

  ground = createSprite(200,190,400,20);
  
  ground2 = createSprite(400,190,400,20);
  
  score = 0;
  
  invisibleGround = createSprite(200,190,400,20);
  invisibleGround.visible = false;
  
  obstacleGroup = createGroup();
  foodGroup = createGroup();
  
  monkey.setCollider("rectangle",-150,0,40,monkey.height);
 // monkey.debug = true
}


function draw() {
  background(180);
  
  if(gameState === PLAY){
    ground.velocityX = -4;
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    if(keyDown("space") && (monkey.y >= 100)){
        monkey.velocityY = -12;
  }
     monkey.velocityY = monkey.velocityY + 0.8;
    
     fill(10);
     textSize(20);
     text("Survival Time : " + score , 50 , 50);
    
     monkey.collide(invisibleGround);   
    
     if(foodGroup.isTouching(monkey)){
     foodGroup.destroyEach();
     score = score+1;
    }
  }else if(gameState === END){
    foodGroup.setLifetimeEach(-1);
   obstacleGroup.setLifetimeEach(-1);
   
   ground.velocityX = 0;
   monkey.velocityY = 0;
   
   fill("red");
   textSize(30);
   text("GAME OVER", 200,100);
   
   foodGroup.setVelocityXEach(0);
   obstacleGroup.setVelocityXEach(0);
   monkey.velocityX = 0;
  }
  
 if(monkey.isTouching(obstacleGroup)){
   gameState = END;
 }
  
 if(keyDown('r')){
   reset();
 } 
  
  spawnObstacle(); 
  spawnFood();
  drawSprites();
  
}
function spawnObstacle(){
  if(frameCount%60===0){
    var obstacle = createSprite(650,160,10,40);
    obstacle.velocityX = -6;
    
    var rand = Math.round(random(1,4));
    switch(rand) {
      case 1: obstacle.addImage(obstacleImage);
              obstacleGroup.add(obstacle);        
              obstacle.scale = 0.1; 
              break;
      case 2: obstacle.addImage(obstacleImage);
              obstacleGroup.add(obstacle);
              obstacle.scale = 0.18;
              break;
      case 3: obstacle.addImage(obstacleImage);
              obstacleGroup.add(obstacle);
              obstacle.scale = 0.14;
              break;
      case 4: obstacle.addImage(obstacleImage);
              obstacleGroup.add(obstacle);
              obstacle.scale = 0.2;
              break;
      default : break;        
  }
    obstacle.lifetime = 300;
    
  
  
 }
}
function spawnFood(){
  if(frameCount%80===0){
    var banana = createSprite(650,150,30,30);
    banana.y = Math.round(random(80,160));
    banana.velocityX = -4;
    
    var rand = Math.round(random(1,2));
    switch(rand){
      case 1 : banana.addImage(bananaImage);
               banana.scale = 0.1;
               break;
     case 2 : banana.addImage(bananaImage);
               banana.scale = 0.13;
               break;
      default : break;         
    }
    banana.lifetime = 300;
    foodGroup.add(banana);
  }
}
function reset(){
  gameState = PLAY;
  foodGroup.destroyEach();
  obstacleGroup.destroyEach();
  score = 0;
  
}





