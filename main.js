import './style.css'
import Phaser from 'phaser'

const sizes = {
  width: 500,
  height: 500
}

const speedDown = 300

class GameScene extends Phaser.Scene{
  constructor(){
    super("scene-game")
    this.player
    this.target
    this.cursor
    this.playerSpeed=speedDown+50
    this.points = 0
  }

  preload(){
    this.load.image("bg", "/public/assets/bg.png")
    this.load.image("player", "/public/assets/basket.png")
    this.load.image("apple", "/public/assets/apple.png")
  }

  create(){
    this.add.image(0,0, "bg").setOrigin(0,0)
    this.player = this.physics.add.image(60, sizes.height - 50, "player")
    this.player.body.allowGravity = false
    this.player.setCollideWorldBounds(true)


    this.pWidth = this.player.width - this.player.width/4
    this.pHeight = this.player.height - this.player.height/4
    this.player.setSize(this.pWidth, this.pHeight)

    this.target = this.physics.add
      .image(0, 0, "apple")
      .setOrigin(0,0)

    this.target.setMaxVelocity(0, speedDown)
    //this.physics.add.overlap(this.target, this.player, this.targetHit, null, this)
    //this.physics.add.collider(this.target, this.player)
    this.cursor = this.input.keyboard.createCursorKeys()

    this.score = this.add.text(sizes.width - 120, 10, `Score 0`, {
      font:"25px Arial",
      fill: "#000000"
    })
  }
  
  update(){
    if(this.physics.collide(this.target, this.player)){
      this.target.setY(0)
      this.target.setX(this.getRandomX())
      this.points++
      this.score.setText(`Score ${this.points}`)
    }
    
    if(this.target.y >= sizes.height){
      this.target.setY(0)
      this.target.setX(this.getRandomX())
    }

    const{left, right} = this.cursor

    if(left.isDown){
      this.player.setVelocityX(-this.playerSpeed)
    }
    else if(right.isDown){
      this.player.setVelocityX(this.playerSpeed)
    }else{
      this.player.setVelocityX(0)
    }
  }

  getRandomX(){
    return Math.floor(Math.random() * 480) 
  }


}

const config = {
  type:Phaser.WEBGL,
  width: sizes.width,
  height: sizes.height,
  canvas: gameCanvas,

  physics: {
    default: "arcade",
    arcade:{
      debug: true,
      gravity:{y:speedDown}
    }
  },
  scene: [GameScene]
}

const game = new Phaser.Game(config)
