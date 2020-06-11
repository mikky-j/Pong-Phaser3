
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
    this.speed = 300;
    this.playerspeed = 10;
    this.player1Score = 0;
    this.player2Score = 0;
    this.cursors = this.input.keyboard.createCursorKeys();
    this.anglesRight = [-60, -45, -30, 30, 45, 60];
    this.anglesLeft = [120, 135, 150, 210, 225, 240];
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
    this.goal2 = this.add.rectangle(this.width - 1, 0, 2, this.height, 0x000000, 0).setOrigin(0, 0);
    this.goal1 = this.add.rectangle(0, 0, 2, this.height, 0x000000, 0).setOrigin(0, 0);
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
    this.physics.add.existing(this.goal1);
    this.physics.add.existing(this.goal2);
    this.ball.scale = 0.7;
    this.player1.body.immovable = true;
    this.player2.body.immovable = true;
    this.ball.setCircle(24, 14, 14);
    this.physics.velocityFromAngle(Phaser.Math.RND.pick(this.anglesRight), this.speed, this.ball.body.velocity);
    this.ball.body.setBounce(1, 1);
    this.physics.add.collider(this.ball, this.player1);
    this.physics.add.collider(this.ball, this.player2);
    this.ball.body.collideWorldBounds = this.player1.body.collideWorldBounds = this.player2.body.collideWorldBounds = true;
    this.score1 = this.add.text(this.width / 2 - 100, 20, this.player1Score, { fontSize: "40px" }).setOrigin(0, 0);
    this.score2 = this.add.text(this.width / 2 + 100, 20, this.player2Score, { fontSize: "40px" }).setOrigin(0, 0);
  }

  update(delta) {

    if (this.cursors.up.isDown) {
      this.player1.y -= this.playerspeed;
    }
    if (this.cursors.down.isDown) {
      this.player1.y += this.playerspeed;
    }
    this.physics.overlap(this.ball, this.goal1, () => {
      this.ball.x = this.width / 2;
      this.ball.y = this.height / 2;
      this.physics.velocityFromAngle(Phaser.Math.RND.pick(this.anglesRight), this.speed, this.ball.body.velocity);
      this.player2Score++;
      this.score2.text = this.player2Score;
    }, null, this);
    this.physics.overlap(this.ball, this.goal2, () => {
      this.ball.x = this.width / 2;
      this.ball.y = this.height / 2;
      this.physics.velocityFromAngle(Phaser.Math.RND.pick(this.anglesLeft), this.speed, this.ball.body.velocity);
      this.player1Score++;
      this.score1.text = this.player1Score;
    }, null, this);
  }
}


