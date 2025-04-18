class Monster extends Phaser.Scene {
    constructor() {
        super("monsterScene");
        this.my = { sprite: {} };

        this.bodyX = 300;
        this.bodyY = 350;

        this.speed = 2; // movement speed
    }

    preload() {
        this.load.setPath("./assets/");
        this.load.atlasXML("monsterParts", "spritesheet_default.png", "spritesheet_default.xml");

        document.getElementById('description').innerHTML = '<h2>Monster.js<br>S - smile // F - show fangs<br>A - move left // D - move right</h2>';
    }

    create() {
        let my = this.my;

        // Base position
        let x = this.bodyX;
        let y = this.bodyY;

        // Body
        my.sprite.body = this.add.sprite(x, y, "monsterParts", "body_blueA.png");

        // Legs (2 legs)
        my.sprite.leg1 = this.add.sprite(x - 30, y + 130, "monsterParts", "leg_blueD.png");
        my.sprite.leg2 = this.add.sprite(x + 60, y + 130, "monsterParts", "leg_blueD.png");

        // Arms (2 arms)
        my.sprite.arm1 = this.add.sprite(x + 105, y + 60, "monsterParts", "arm_blueA.png");
        my.sprite.arm2 = this.add.sprite(x - 105, y + 60, "monsterParts", "arm_blueA.png");
        my.sprite.arm2.flipX = true;

        // Eye
        my.sprite.eye = this.add.sprite(x, y - 40, "monsterParts", "eye_angry_blue.png");

        // Mouth (only one will show at a time)
        my.sprite.smile = this.add.sprite(x, y + 20, "monsterParts", "mouthA.png");
        my.sprite.fangs = this.add.sprite(x, y + 20, "monsterParts", "mouth_closed_fangs.png");
        my.sprite.fangs.visible = false;

        // Accessories
        my.sprite.horn = this.add.sprite(x - 25, y - 90, "monsterParts", "detail_blue_horn_small.png");
        my.sprite.antenna = this.add.sprite(x + 25, y - 90, "monsterParts", "detail_white_antenna_small.png");

        this.cursors = this.input.keyboard.createCursorKeys();
        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
    }

    update() {
        let my = this.my;

        // Handle mouth swap
        if (Phaser.Input.Keyboard.JustDown(this.keyS)) {
            my.sprite.smile.visible = true;
            my.sprite.fangs.visible = false;
        } else if (Phaser.Input.Keyboard.JustDown(this.keyF)) {
            my.sprite.smile.visible = false;
            my.sprite.fangs.visible = true;
        }

        // Handle movement
        let moveX = 0;
        if (this.keyA.isDown) {
            moveX = -this.speed;
        } else if (this.keyD.isDown) {
            moveX = this.speed;
        }

        if (moveX !== 0) {
            for (let part in my.sprite) {
                my.sprite[part].x += moveX;
            }
        }
    }
}
