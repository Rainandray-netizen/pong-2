import{SVG_NS} from "../settings"

export default class Score{
    constructor (x,y,size){
        this.x = x
        this.y = y
        this.size = size
    }

    render(svg,score,color){
        let text=document.createElementNS(SVG_NS,"text")
        text.setAttributeNS(null,"x",this.x)
        text.setAttributeNS(null,"y",this.y)
        text.setAttributeNS(null,"font-family","Ginga>", 'monotype')
        text.setAttributeNS(null,"font-size",this.size)
        text.setAttributeNS(null,"fill", color)
        text.textContent = score
        svg.appendChild(text)
    }
}