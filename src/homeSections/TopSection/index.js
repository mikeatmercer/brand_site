import $ from "jquery";
import style from "./style.scss";
import sharedStyles from "../../sharedStyles.scss";

const {
    tSec,
    kicker,
    contentBox,
    h1,
    content
} = style;
const {
    greenGradient,
    grifoHeadline
} = sharedStyles;

export default function({clickScroll, mod}) {
   if(!mod) {
       return false; 
   }
    const parser = new DOMParser()
   
    var newC = parser.parseFromString(mod.html, "text/html");
    
    let bodyC = $(newC).find(".ms-rtestate-field");
    let text = $(bodyC).clone();
    $(text).find('h1').remove();
  
    return <div class={`${tSec} ${greenGradient}`}>
        <div class={contentBox}>
            <div class={kicker}>{mod.header}</div> 
            <h1 class={`${h1} ${grifoHeadline}`}>{$(newC).find(".ms-rtestate-field h1").text()}</h1>
            <div class={content} dangerouslySetInnerHTML={{__html: $(text).html()}}  />
            <a href="#overview" onClick={clickScroll}>Explore our strategy</a>
        </div>
       
        
        
    </div>
}