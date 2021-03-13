import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Input } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore'
import { User } from 'src/app/models/user.models';
import { DataService } from 'src/app/services/data.service';
@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit, AfterViewInit {

  constructor(public fire: AngularFirestore, public data: DataService, public itemSer: DataService, private auth: AngularFireAuth) { }
  
  users: User[];
  public userName: firebase.default.UserInfo;
  
  ngOnInit(): void {
    this.itemSer.getUsers().subscribe(users => {
      this.users = users;
    })
    this.auth.authState.subscribe((userName) => {
      if (userName) {
        this.userName = userName;
        this.game(this.fire, userName.displayName);
      }
    })
  }
  
  ngAfterViewInit(): void {
  }
  
  @ViewChild('myCanvas')
  public myCanvas: ElementRef<HTMLCanvasElement>;
  public context: CanvasRenderingContext2D;
  public game(fire, userName) {
    //set img and sound
    let bird = new Image();
    let bg = new Image();
    let fg = new Image();
    let pipeNorth = new Image();
    let pipeSouth = new Image();
    let start = new Image();
    let restart = new Image();
    let gameover = new Image();
    let die = new Audio();
    let fly = new Audio();
    let scoreSound = new Audio();
    //set src
    die.src = "../../assets/sfx_hit.mp3"
    gameover.src = "../../assets/gameover.png";
    restart.src = "../../assets/restart_1.png"
    fly.src = "../../assets/fly.mp3";
    scoreSound.src = "../../assets/score.mp3"
    bg.src = "../../assets/background-night.png";
    bird.src = "../../assets/yellow.gif";
    pipeSouth.src = "../../assets/pipe-green-north.png";
    pipeNorth.src = "../../assets/pipe-green-south.png";
    fg.src = "../../assets/base.png";
    start.src = "../../assets/message.png";
    //getcontext 2d
    let ctx = this.myCanvas.nativeElement.getContext('2d');
    //set variable
    let gap = 100;
    //gap 85
    let score = 0;
    let bX = 80;
    let bY = 150;
    let gravity = 8;
    let constant = 320 + gap;
    let width = 1500;
    // pipe coordinates
    let pipe = [];
    pipe[0] = {
      x: width,
      y: Math.floor(Math.random() * pipeNorth.height) - pipeNorth.height
    }
    // on mouse click bY move up by 50px;
    document.addEventListener("mousedown", moveUp);
    function moveUp() {
      bY -= 50;
      fly.play();
    }
    //0 true
    //1 false
    let state = 0;
    // draw images
    function draw() {
      //draw background
      ctx.drawImage(bg, 0, 0);
      //let pipe moving
      for (let i = 0; i < pipe.length; i++) {
        //set pipe grap;
        //set pipe moving
        ctx.drawImage(pipeNorth, pipe[i].x, pipe[i].y);
        ctx.drawImage(pipeSouth, pipe[i].x, pipe[i].y + constant);
        pipe[i].x -= 8;
        //if pipe.x reach certain point push a new pipe in
        if (pipe[i].x == 1084) {
          pipe.push({
            x: width,
            //random pipe position.
            y: Math.floor(Math.random() * pipeNorth.height) - pipeNorth.height
          })
        }
        //detect collision
        //if bX >pX
        if (bX + bird.width >= pipe[i].x &&
          //if bird in the pipe
          bX <= pipe[i].x + pipeNorth.width &&
          //behind pipe
          (bY <= pipe[i].y + pipeNorth.height ||
            //upper pipe
            bY + bird.height >= pipe[i].y + constant) ||
          //if bird touch ground
          bY + bird.height >= 515 - fg.height) {
          state = 1;
          die.play();
          //if click reload page
          document.addEventListener("mousedown", startover);
          function startover() {
            location.reload();
          }
        }
        //if pipe reach certain point and the game is playing score +1 else the game is over score is the same
        if (pipe[i].x == 84) {
          score++;
          scoreSound.play();
        } else {
          score = score;
        }
      }
      //draw img  fg and bird
      ctx.drawImage(bird, bX, bY);
      ctx.drawImage(fg, 0, 515 - fg.height);
      //bird go down by gravity;
      bY += gravity;
      //set score on screen.
      ctx.fillStyle = '#000';
      ctx.font = "20px Verdana";
      ctx.fillText("Score:" + score, 10, 550 - 50);
    }
    //draw gameover screen;
    function drawGameover() {
      ctx.drawImage(gameover, 620, 200);
      ctx.drawImage(restart, 590, 250);
    }
    function drawStartGame() {
      ctx.drawImage(bg, 0, 0);
      ctx.drawImage(fg, 0, 515 - fg.height);
      ctx.drawImage(start, 630, 70);
    }
    let gameState = "false";
    function loop() {
      if (gameState == "false") {
        drawStartGame();
        setTimeout(loop, 1000);
        //if press game start over
        document.addEventListener("mousedown", gameStartOver);
        function gameStartOver() {
          gameState = "true";
        }

      } else {
        if (state == 1) {
          for(let i = 0;i<20;i++){
            drawGameover();
          }
          // setTimeout(loop, 1000);
          createScore(score);
        } else {
          draw();
          setTimeout(loop, 60);
        }
      }
    }

    //call  loop to loop the game
    loop();
    //add to db
    function createScore(score) {
      let Record = {};
      if (score > 0) {
        Record['score'] = score;
        Record['name'] = userName;
        fire.collection('score').add(Record);
      }
    }
  }




}


