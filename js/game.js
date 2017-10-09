var cursors;
let sprite = null;


/* --- main --- */
window.onload = function() {
  // game object
  let game = new Phaser.Game("100", "100", Phaser.AUTO, null, {
                               preload: preload,
                               create: create,
                               update: update,
                               render: render
                             }, false, false);

   function foo() {}

   /* This function is called before the game begins. */
   function preload() {
     /* game settings */
     game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
     game.scale.pageAlignHorizontally = true;
     game.scale.pageAlignVertically = true;

     /* maps */
     game.load.tilemap('test', 'res/map/test.json', null,
                       Phaser.Tilemap.TILED_JSON);
     game.load.image('dungeon-tiles-2', 'res/img/dungeon-tiles-2.png');

     /* characters */
     game.load.spritesheet('characters', 'res/img/characters.png', 32, 32, 73);
   }

   /* This function is called when the game is created. */
   function create() {
     /* test map */
     var map = game.add.tilemap('test');
     map.addTilesetImage('dungeon-tiles-2', 'dungeon-tiles-2', 16, 16, 0, 1);

     var layer = map.createLayer('Tile Layer 1');
     var scaleX = game.canvas.width / (map.width * map.tileWidth);
     var scaleY = game.canvas.height / (map.height * map.tileHeight);
     layer.setScale(scaleX, scaleY);
     layer.resizeWorld();

     /* test character */
     sprite = game.add.sprite(140 * scaleX, 140 * scaleY, 'characters', 23);
     sprite.scale.setTo(scaleX, scaleY);

     sprite.animations.add('walk', [23,24,25,26]);
     sprite.animations.play('walk', 5, true);

     /* controls */
     cursors = game.input.keyboard.createCursorKeys();
   }

   /* This function is called when the game is updated. */
   function update() {
     /* controls */
     if (cursors.left.isDown) {
       sprite.x = sprite.x - 1;
     }

     if (cursors.right.isDown) {
       sprite.x = sprite.x + 1;
     }

     if (cursors.up.isDown) {
       sprite.y = sprite.y - 1;
     }

     if (cursors.down.isDown) {
       sprite.y = sprite.y + 1;
     }
   }

   /* This function is called when the game is rendered. */
   function render() {
     game.debug.inputInfo(16, 16);
   }
}