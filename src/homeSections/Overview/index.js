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
    headerSize
} = style

export default function({mod,clickScroll}) {
    let body = bodyContent(mod.html);
    let diagramLinks = [
        {hash:"enable", title : "How we enable"},
        {hash:"core", title : "Our core"},
        {hash:"behave", title : "How we behave"},
        {hash:"executive", title: "Executive Actions"}
    ].map(e => <a href={`#${e.hash}`} onClick={clickScroll} class={`${style[e.hash]} ${grifoHeadline} ${headerSize}`}>{e.title}</a>)
    return <div class={overviewContainer}>
        <div class={textContainer}>
            <h2 class={`${h2} ${grifoHeadline} ${makeNavy} ${headerSize}`}>{mod.header}</h2>
            <div class={`${readingText}`} dangerouslySetInnerHTML={{__html: $(body).html()}} />
        </div>
        <div class={diagram}>
                {diagramLinks}
                
            
        </div>
    </div>
}