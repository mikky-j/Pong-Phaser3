class GameOver extends Phaser.Scene {
    constructor() {
        super("Game Over");
    }
    init() {
        this.cameras.main.setBackgroundColor("0x222222");
        this.winner = winner;
    }
    create() {
        this.text = this.add.text((this.sys.game.config.width / 2)-108, (this.sys.game.config.height / 2)-40, "Game Over", {fontSize: "40px"});
        this.win = this.add.text(this.text.x + (this.text.width / 2) - 67, this.text.y + this.text.height, this.winner + " wins", {textSize:"20px"});
        
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    update(delta) {
        if (this.cursors.space.isDown) {
            winner = "";
            console.log("hi");
            this.scene.start("pong");
        }
    }
}