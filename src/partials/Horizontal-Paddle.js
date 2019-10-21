import {SVG_NS} from "../settings"

export default class Hpaddle {
    constructor(boardWidth, width, height, x, y, up, down){
        this.boardWidth = boardWidth
        this.width = width
        this.height = height
        this.x = x
        this.y = y
        this.speed = 40
        this.score = 0

        document.addEventListener("keydown", event=>{
            switch(event.key){
                case up :
                    this.right()
                    break
                case down :
                    this.left()
                    break
            }
        })
    }

    right(){
        this.x = Math.max(0, this.x-this.speed)
    }

    left(){
        this.x = Math.min(this.boardWidth- this.width, this.x + this.speed)
    }

    hcoordinates(x,y,width,height){
        let leftX=x
        let rightX=x+width
        let topY=y
        let bottomY=y+height
        return[leftX,rightX,topY,bottomY]
    }

    render(svg) {
        let rect= document.createElementNS(SVG_NS, "rect")
        rect.setAttributeNS(null,"fill","white")
        rect.setAttributeNS(null,"width",this.width)
        rect.setAttributeNS(null,"height",this.height)
        rect.setAttributeNS(null,"x",this.x)
        rect.setAttributeNS(null,"y",this.y)
        svg.appendChild(rect)
    }
}