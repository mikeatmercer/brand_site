import bodyContent from "../../util/bodyContent.js"
import style from "./style.scss";
import sharedStyles from "../../sharedStyles.scss";

const {
    grifoHeadline,
    readingText,
    makeNavy
} = sharedStyles;
const {
    overviewContainer, 
    textContainer,
    h2,
    text,
    diagram,
    headerSize,
    
} = style

export default function({mod,clickScroll}) {
    let body  = bodyContent(mod.html),
        text = $(body).clone();
    $(text).find("a ,img").remove();
    let posClasses = [style.topLeft,style.topCenter,style.topRight,style.bottomCenter]
    let digLink = [];
    $(body).find("a").each((i,e) =>{
        digLink.push(<a onClick={clickScroll} href={$(e).attr("href")} class={`${posClasses[i]} ${grifoHeadline} ${headerSize}`}>{$(e).text()}</a>)
    } );
 

    return <div class={overviewContainer}>
        <div class={textContainer}>
            <h2 class={`${h2} ${grifoHeadline} ${makeNavy} ${headerSize}`}>{mod.header}</h2>
            <div class={`${readingText}`} dangerouslySetInnerHTML={{__html: $(text).html()}} />
        </div>
        <div class={diagram} style={{backgroundImage: `url(${$(body).find("img").attr("src")})`}}>
                {digLink}
                
            
        </div>
    </div>
}