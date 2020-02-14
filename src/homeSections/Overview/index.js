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
    diagram,
    headerSize,
    infoList
} = style

export default function({mod,clickScroll}) {
    let body  = bodyContent(mod.html),
        text = $(body).clone();
    $(text).find("a ,img,.sections").remove();

    let infoBlocks = []

    $(body).find(".sections li").each(function(i,e){
        let ds = $(e).clone();
        $(ds).find("b").remove();
        
        infoBlocks.push(
            <div>
                <div >{$(ds).text()}</div>
                <div class={grifoHeadline}>{$(e).find("b").text()}</div>
            </div>
        )
        
    })
    
    let digLink = [];
    $(body).find("a").each((i,e) =>{
        let text = $(e).text().trim()
    digLink.push(<a data-text={text} onClick={clickScroll} href={$(e).attr("href")} class><span class={grifoHeadline}>{text}</span>{(i === 0)? <div class={infoList}>{infoBlocks}</div>: null}</a>)
    } );
 

    return <div class={overviewContainer}>
        <div class={textContainer}>
            <h2 class={`${h2} ${grifoHeadline} ${makeNavy} ${headerSize}`}>{mod.header}</h2>
            <div class={`${readingText}`} dangerouslySetInnerHTML={{__html: $(text).html().trim()}} />
        </div>
        <div class={diagram} style={{backgroundImage: `url(${$(body).find("img").attr("src")})`}}>
                {digLink}
                
                    
                
            
        </div>
    </div>
}