import {SVG_NS} from "../settings.js"

export default class Board{
    constructor(width, height){
        this.width=width
        this.height=height
    }
    render(svg){
        let rect = document.createElementNS(SVG_NS, "rect")
        rect.setAttributeNS(null,"width",this.width)
        rect.setAttributeNS(null,"height",this.height)
        rect.setAttributeNS(null,"fill","#353535")
        rect.setAttributeNS(null,"x",0)
        rect.setAttributeNS(null,"y",0)
        rect.setAttributeNS(null,"stroke","black")
        rect.setAttributeNS(null, "stroke-width",8)
        svg.appendChild(rect)

        let line=document.createElementNS(SVG_NS, "line")
        line.setAttributeNS(null,"x1",5)
        line.setAttributeNS(null,"y1",this.height-5)
        line.setAttributeNS(null,"x2",this.width-5)
        line.setAttributeNS(null,"y2",5)
        line.setAttributeNS(null,"stroke","white")
        line.setAttributeNS(null,"stroke-dasharray",4)
        line.setAttributeNS(null,"stroke-width",2)
        svg.appendChild(line)
        //line x1="256" y1="256" x2="256" y2="0" stroke="white" stroke-dasharray="4" stroke-width="2"
    }
    
}