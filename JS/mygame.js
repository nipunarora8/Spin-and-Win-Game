let prizes_config = {
    count:12,
    prize_names : ["3000 Credits","35% Off","Hard Luck","70% OFF","Swagpack","100% OFF","Netflix","50% Off","Amazon Voucher","2 Extra Spin", "CB Tshirt","CB Book"]
}

let config = {
    type  :Phaser.CANVAS,
    width :800,
    height:385,
    backgroundColor : 0xffcc00,

    scene : {

        preload : preload,
        create : create,
        update : update,

        }

};

let game = new Phaser.Game(config);
spinning = false;
spin=2;

function preload() {
    console.log("Preload");
    this.load.image('background','../Assets/back.jpg');
    this.load.image('wheel','../Assets/wheel.png');
    this.load.image('pin','../Assets/pin.png');
    this.load.image('stand','../Assets/stand.png');
    this.load.image('button','../Assets/button.png');
    this.load.audio('start', '../Assets/start.mp3');
    this.load.audio('win', '../Assets/win.mp3');

    
}

function create() {
    console.log("Create");

    

    let W = game.config.width;
    let H = game.config.height;
    let background = this.add.sprite(0,0,'background');
    background.setPosition(W/2,H/2);
    background.setScale(0.20);

    let stand = this.add.sprite(W/2,H/2+164,'stand');
    stand.setScale(0.15);

    this.wheel = this.add.sprite(W/2,H/2,'wheel');
    this.wheel.setScale(0.16);

    let pin = this.add.sprite(W/2,H/2-159,'pin');
    pin.setScale(0.15);


    this.button = this.add.sprite(W/2-300, H/2, 'button');
    this.button.setScale(0.40);
    this.button2 = this.add.sprite(W/2+300, H/2, 'button');
    this.button2.setScale(0.40);
    this.button.setInteractive();
    this.button2.setInteractive();

    this.start = this.sound.add('start');
    this.win = this.sound.add('win');

    

    

    
    //for mouse click
    
        // this.input.on("pointerdown",spinwheel,this);

        this.button.on("pointerdown",spinwheel,this);
        this.button2.on("pointerdown",spinwheel,this);
        

    font_style ={
        font: "bold 30px Arial",
        align : "center",
        color : "red",
    }

    this.game_text = this.add.text(10,10,"Welcome to Spin & Win",font_style);
    this.game_text2 = this.add.text(W-120,10,"Spin:"+spin,font_style);
    
}

//gameloop
function update() {
    console.log("Inside Update");


    // this.wheel.angle +=1;
    // this.wheel.alpha -=0.01;
}

    


function spinwheel() {
        if(spinning!=true){

        spin-=1;
        this.game_text2.setText("Spin:"+spin);
        
        this.start.play();
        
        
        console.log("You clicked mouse");
        spinning=true;
        // this.game_text.setText("You Clicked the Mouse"); 

        let rounds = Phaser.Math.Between(2,4);
        let degree = Phaser.Math.Between(0,11)*30;

        let total_angle = rounds*360 + degree;

        let idx = prizes_config.count - 1 - Math.floor(degree/(360/prizes_config.count));

        tween2 = this.tweens.add({
            targets:[this.button,this.button2],
            alpha:0,
            duration:1000
        });
        
        

        tween = this.tweens.add({
            targets: this.wheel,
            angle: total_angle, //should be random number
            ease: "Cubic.easeOut",
            duration : 6000,
            // scaleX:0.5,
            // scaleY:0.5,
            callbackScope:this,
            onComplete: function () {
                this.start.stop();
                this.win.play();
                this.game_text.setText("You won: " + prizes_config.prize_names[idx]);
                spinning=false;
                console.log(idx);
                
                if (spin>0){
                    this.button.alpha=1;
                    this.button2.alpha=1;
                    if(idx==9){
                    spin+=2;
                    this.game_text2.setText("Spin:"+spin);
                    }
                }
                

                
            }

        });
    }   
}




