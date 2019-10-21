import {SVG_NS} from "../settings"

export default class Ball{
    constructor(radius, boardWidth, boardHeight, timeFreeze, ghostBall, curveBall){
        this.r= radius
        this.boardWidth = boardWidth
        this.boardHeight= boardHeight
        this.direction = (Math.round(Math.random())*2-1)
        this.reset()
        this.hitcount = 0
        this.speed = 1
        this.storedSpeed = 0
        this.color = "white"

        document.addEventListener("keydown",event=>{
            switch(event.key){
                case timeFreeze:
                    this.timeFreeze()
                    break  
                case ghostBall:
                    this.ghostBall()
                    break
                case curveBall:
                    this.curveBall()
                    break
            }
        })
    }
    
    curveBall(){
        console.log(this.vx)
        console.log(this.vy)
        if (Math.abs(this.vx) > Math.abs(this.vy)){
            this.vy *= 3.5
        }else if(Math.abs(this.vx) < Math.abs(this.vy)){
            this.vx*= 3.5
        }
    }

    ghostBall(){
        this.color= "#353535"
    }

    visibleBall(){
        this.color="white"
    }

    timeFreeze(){
        if(this.speed!==.25){
        this.storedSpeed = this.speed
        this.speed = .25
        console.log(this.storedSpeed)
        }
    }

    timeResume(){
        this.speed= this.storedSpeed
        console.log(this.speed)
    }

    wallCollision(){
        const hitLeft = this.x - this.r<=0
        const hitRight = this.x + this.r >= this.boardWidth
        const hitTop = this.y - this.r <= 0
        const hitBottom = this.y + this.r >= this.boardHeight

        if(hitLeft||hitRight){
            this.vx = -this.vx
        }else if (hitTop||hitBottom){
            this.vy = -this.vy
        }
    }

    paddleCollision(player1,player2){
        if (this.vx > 0){
            let paddle= player2.coordinates(player2.x,player2.y,player2.width,player2.height)
            let [leftX, rightX, topY, bottomY] = paddle
            if(
            (this.x+this.r>=leftX)
            && (this.x+this.r<=rightX)
            &&(this.y>=topY && this.y<=bottomY)
            ){
                this.vx= -this.vx
                this.hitcounter()
            }
        }else{
            let paddle = player1.coordinates(player1.x,player1.y,player1.width,player1.height)
            let [leftX, rightX, topY, bottomY] = paddle
                if(
                    (this.x-this.r<=rightX)
                    && (this.x+this.r>=leftX)
                    &&(this.y>=topY && this.y<=bottomY)
                ){
                    this.vx = -this.vx
                    this.hitcounter()
                }
        }
    }

    hpaddleCollision(hplayer1,hplayer2){
        if (this.vy > 0){
            let paddle=hplayer2.hcoordinates(hplayer2.x,hplayer2.y,hplayer2.width,hplayer2.height)
            let [leftX, rightX, topY,bottomY] = paddle
                if(
                    (this.y + this.r >= topY)
                    && (this.y + this.r<= bottomY)
                    &&(this.x <= rightX && this.x >= leftX)
                ){
                    this.vy = -this.vy
                    this.hitcounter()
                }
        }else{
            let paddle = hplayer1.hcoordinates(hplayer1.x,hplayer1.y,hplayer1.width,hplayer1.height)
            let [leftX, rightX, topY, bottomY] = paddle
                if(
                    (this.y-this.r<=bottomY)
                    &&(this.y-this.r>=topY)
                    &&(this.x<=rightX && this.x>=leftX)
                ){
                    this.vy = -this.vy
                    this.hitcounter()
                }
        }
    }

    reset(){
        this.hitcount=0
        this.speed=1
        this.x=this.boardWidth/2
        this.y=this.boardHeight/2
        this.visibleBall()

        this.vy=0
        while (this.vy===0||Math.abs(this.vy)===3) {
        this.vy =(Math.floor(Math.random() * 10-5)) //generates a value between 4 and -5
        }

        this.vx= this.direction*(6-Math.abs(this.vy))*(Math.round(Math.random())*2-1)
    }

    hitcounter(){
        this.hitcount++
        console.log(this.hitcount)
        if(this.speed===.25){
            this.timeResume()
        }
        if(this.color==="#353535"){
            this.visibleBall()
        }
        if(this.hitcount===3){
            this.speed*=1.2
            console.log(this.speed)
            this.hitcount=0
        }
    }

    goal(player){
        player.score++
        this.reset()
    }

    render(svg,player1,player2,hplayer1,hplayer2){
        this.x += this.vx * this.speed * .7
        this.y += this.vy * this.speed * .7
        this.paddleCollision(player1,player2)
        this.hpaddleCollision(hplayer1,hplayer2)
        this.wallCollision()

        let circle = document.createElementNS(SVG_NS,"circle") 
        circle.setAttributeNS(null, "cx", this.x)
        circle.setAttributeNS(null, "cy", this.y)
        circle.setAttributeNS(null, "r", this.r)
        circle.setAttributeNS(null, "fill", this.color)
        svg.appendChild(circle)
        let hitRight = this.x + this.r >= this.boardWidth
        let hitLeft = this.x - this.r <= 0
        let hitTop = this.y - this.r <= 0
        let hitBottom = this.y + this.r >= this.boardHeight

        if (hitRight){
            this.goal(player1)
        }else if (hitLeft){
            this.goal(player2)
        }else if (hitTop){
            this.goal(player2)
        }else if (hitBottom){
            this.goal(player1)
        }
    }
}