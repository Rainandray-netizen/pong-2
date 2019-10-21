import {SVG_NS, KEYS} from "../settings.js"
import Board from "./Board.js"
import Paddle from "./Paddle.js"
import Hpaddle from "./Horizontal-Paddle"
import Ball from "./Ball"
import Score from "./Score"
import { url } from "inspector"

export default class Game {
  constructor(element, width, height) {
    //this constructor is called in the index.js
    this.element = element;
    this.width = width;
    this.height = height;

    this.gameElement = document.getElementById(this.element)

    //create a new instance of the pong board
    this.board= new Board(this.width, this.height)

    // step 2 create instances of paddle for both players
    this.paddleHeight = 66
    this.paddleWidth = 8
    this.boardGap = 10

    this.player1 = new Paddle(
      this.height,
      this.paddleWidth,
      this.paddleHeight,
      this.boardGap,
      ((this.height- this.paddleHeight)/2),
      KEYS.a,
      KEYS.z
    )

    this.hplayer1 = new Hpaddle(
      this.width,
      this.paddleHeight,
      this.paddleWidth,
      ((this.width-this.paddleHeight)/2),
      this.boardGap,
      KEYS.a,
      KEYS.z
    )

    this.player2 = new Paddle(
      this.height,
      this.paddleWidth,
      this.paddleHeight,
      this.width - this.boardGap - this.paddleWidth,
      ((this.height- this.paddleHeight)/2),
      KEYS.k,
      KEYS.m
    )

    this.hplayer2 = new Hpaddle(
      this.width,
      this.paddleHeight,
      this.paddleWidth,
      ((this.width-this.paddleHeight)/2),
      this.height-this.boardGap-this.paddleWidth,
      KEYS.k,
      KEYS.m
    )

    this.ball = new Ball(
      8,
      this.width,
      this.height,
      KEYS.t,
      KEYS.g,
      KEYS.c
    )

    this.score1 = new Score(this.width/3-50,this.height/3,150)
    this.score2 = new Score(this.width*2/3+25,this.height*3/4,150)

    this.gameOn=true
    document.addEventListener("keydown",event=>{
      switch(event.key){
        case KEYS.spaceBar:
          this.gameOn= !this.gameOn
          this.player1.speed=40
          this.player2.speed=40
          this.hplayer1.speed=40
          this.hplayer2.speed=40
          break
      }
    })
  }

  render() {
    if(!this.gameOn){
    this.player1.speed=0
    this.player2.speed=0
    this.hplayer1.speed=0
    this.hplayer2.speed=0
    return
    }

    let svg = document.createElementNS(SVG_NS, "svg")

    this.gameElement.innerHTML = ""

    svg.setAttributeNS(null, "width", this.width)
    svg.setAttributeNS(null, "height", this.height)
    svg.setAttributeNS(null, "viewbox", `0 0 ${this.width} ${this.height}`)
    this.gameElement.appendChild(svg)
    this.board.render(svg)
    this.player1.render(svg)
    this.hplayer1.render(svg)
    this.player2.render(svg)
    this.hplayer2.render(svg)
    this.score1.render(svg,this.player1.score,"#4CA2C4")
    this.score2.render(svg,this.player2.score,"#B30000")
    this.ball.render(svg,this.player1,this.player2,this.hplayer1,this.hplayer2)
  }
}


