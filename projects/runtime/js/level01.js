var level01 = function (window) {

    window.opspark = window.opspark || {};

    var draw = window.opspark.draw;
    var createjs = window.createjs;

    window.opspark.runLevelInGame = function(game) {
        // some useful constants 
        var groundY = game.groundY;

        // this data will allow us to define all of the
        // behavior of our game
        var levelData = {
            "name": "Robot Romp",
            "number": 1, 
            "speed": -3,
            "gameItems": [
                { "type": "sawblade", "x": 400, "y": groundY },
                { "type": "sawblade", "x": 600, "y":groundY - 120 },
                { "type": "sawblade", "x": 900, "y": groundY - 120 },
                { "type":  "projectile","x": 700, "y": groundY},
                { "type":  "red enemy ","x": 700, "y": groundY},
                { "type": "reward", "x": 2000, "y": groundY - 60},
            ]
        };
        window.levelData = levelData;
        // set this to true or false depending on if you want to see hitzones
        game.setDebugMode(true);

        // TODO 6 and on go here
        // BEGIN EDITING YOUR CODE HERE
        //Sawblades  
        function createSawblade(x,y){
           var hitZoneSize = 25;
           var damageFromObstacle = 10; 
           var sawBladeHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);
            sawBladeHitZone.x = x;
            sawBladeHitZone.y = y;
            game.addGameItem(sawBladeHitZone); 
        var obstacleImage = draw.bitmap('img/sawblade.png');
            sawBladeHitZone.addChild(obstacleImage);
            obstacleImage.x = -25
            obstacleImage.y = -25
            
        }
             for(var i = 0; i < levelData.gameItems.length; i++) {
        var gameItemObject = levelData.gameItem[i];
        if (gameItemObject.type === "sawblade"){
            createSawblade(gameItemObject.x,gameItemObject.y)
        }
    }
        //projectile
        function myProjectile(x,y){
            var hitZoneSize = 10;
            var damageFromObstacle = 80; 
            var sawBladeHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);
            sawBladeHitZone.x = x;
            sawBladeHitZone.y = y;
            game.addGameItem(sawBladeHitZone); 
           var obstacleImage = draw.bitmap('img/projectile.png');
            sawBladeHitZone.addChild(obstacleImage);  
            obstacleImage.x = -10;
            obstacleImage.y = -10; 
        }
        myProjectile(900,groundY - 80);
        //Red enemy
        function createEnemyR(x,y){
        var enemy = game.createGameItem('enemy',25);
        var redSquare = draw.rect(50,50,'red');
        redSquare.x = -25;
        redSquare.y = -25;
        enemy.addChild(redSquare);
        enemy.x = x;
        enemy.y = y;
        game.addGameItem(enemy);
        enemy.velocityX = -1;

        enemy.onPlayerCollision = function() {
        console.log('The enemy has hit Halle');
        game.changeIntegrity(-10)
};
        enemy.onProjectileCollision = function(){
        console.log('Halle has hit the enemy');
        game.increaseScore(100);
        enemy.fadeOut();
        }
    }

        createEnemyR(400,groundY-50)
//health packs 
        function healthPack(x, y) {
        var enemy = game.createGameItem('enemy',25);
        var greenSquare = draw.rect(25,25,'green');
        greenSquare.x = -25;
        greenSquare.y = -25;
        enemy.addChild(greenSquare);
        enemy.x = x;
        enemy.y = y;
        game.addGameItem(enemy);
        enemy.velocityX = -1;
        
         enemy.onPlayerCollision = function() {
        console.log('The enemy has hit Halle');
        game.changeIntegrity(70)
        enemy.fadeOut();
};
    }
     
        
        healthPack(800,250)

   
   
        // DO NOT EDIT CODE BELOW HERE
    }
    
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = level01;
}
