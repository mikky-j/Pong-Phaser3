
class pong extends Phaser.Scene {
  constructor() {
    super("pong");
  }

  init() {
    this.cameras.main.setBackgroundColor("0x222222");
    this.width = this.sys.game.config.width;
    this.height = this.sys.game.config.height;
    this.rectHeight = 30;
    this.dashSpacing = 5;
    this.ballspeed = 10;
    this.angle = {
      30: Math.PI / 6,
      60: Math.PI / 3,
      90: Math.PI / 2,
      180: Math.PI
    };
    this.speed = 100
    this.VelocityX = this.speed * Phaser.Math.DegToRad(30);
    this.VelocityY = this.speed * Phaser.Math.DegToRad(30);
    console.log(this.VelocityX);
  }

  preload() {
    this.load.image("ball", "Assets/Ball.png");
    // this.load.image("background", "Assets/BG.png");
    // this.load.image("goal", "Assets/Goal.png");
    // this.load.image("player", "Assets/Player.png");
    // this.load.image("wall", "Assets/Wall.png");
    // this.load.image("line", "Assets/MidLine.png");
  }

  create() {
    this.line = this.add.group();
    this.ball = this.physics.add.sprite(this.width / 2, this.height / 2, "ball");
    this.player1 = this.add.rectangle(1, (this.height / 2) - 50, 15, 100, 0xffffff).setOrigin(0, 0);
    this.player2 = this.add.rectangle(this.width - 16, (this.height / 2) - 50, 15, 100, 0xffffff).setOrigin(0, 0);

    // GameObjects Manipulation
    for (var x = 0; x < Math.floor(this.height / (this.rectHeight + this.dashSpacing)); x++) {
      var rect = this.add.rectangle(this.width / 2, x * (this.rectHeight + this.dashSpacing) + 20, 5, this.rectHeight, 0xffffff);
      this.line.add(rect);
    }
    this.line.setOrigin(0, 0);
    this.ball.body.isCircle = true;
    this.physics.add.existing(this.player1);
    this.physics.add.existing(this.player2);
    this.ball.scale = 0.7;
    this.player1.body.immovable = true;
    this.player2.body.immovable = true;
    this.ball.setCircle(24, 14, 14);
    this.physics.velocityFromAngle(-50, 200, this.ball.body.velocity);
    this.ball.body.setBounce(1, 1);
    this.physics.add.collider(this.ball, this.player1);
    this.physics.add.collider(this.ball, this.player2);
    this.ball.body.collideWorldBounds = true;
  }

  update(delta) {
  }
}
