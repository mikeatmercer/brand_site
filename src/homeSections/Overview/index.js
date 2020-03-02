import bodyContent from "../../util/bodyContent.js"
import style from "./style.scss";
import sharedStyles from "../../sharedStyles.scss";

const {
    grifoHeadline,
} = sharedStyles;
const {
    textContainer,
    h2,
    diagram,
    contentContainer,
    rightLinks
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
    let diagramLink = {}
    $(body).find("a").each((i,e) =>{
        let text = $(e).text().trim(),
            url = $(e).attr("href")

        if(i === 0) {
            diagramLink = {
              url:  url,
              text: text
            }
            return ; 
        }
        
    digLink.push(<a data-text={text} onClick={clickScroll} href={url} ><span class={grifoHeadline}>{text}</span></a> );
    })
    
    return <div>
        <div class={textContainer}>
            <h2 class={`${h2} ${grifoHeadline}`}>{mod.header}</h2>
            <div  dangerouslySetInnerHTML={{__html: $(text).text().trim()}} />
        </div>
        <div class={contentContainer}>
            <a href={diagramLink.url} onClick={clickScroll} class={diagram} style={{backgroundImage: `url(${$(body).find("img").attr("src")})`}}>
                <div><span class={grifoHeadline}>{diagramLink.text}</span></div>
                {infoBlocks}
            </a>
            <div class={rightLinks}>
                {digLink}
            </div>
        </div>
    </div>

}

/*
    return <div class={overviewContainer}>
        <div class={textContainer}>
            <h2 class={`${h2} ${grifoHeadline} ${makeNavy} ${headerSize}`}>{mod.header}</h2>
            <div class={`${readingText}`} dangerouslySetInnerHTML={{__html: $(text).html().trim()}} />
        </div>
        <div class={diagram} style={{backgroundImage: `url(${$(body).find("img").attr("src")})`}}>
                {digLink}
                
                    
                
            
        </div>
    </div>
    */