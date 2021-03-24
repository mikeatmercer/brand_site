import styles from "./styles.scss";
import sharedStyles from "../sharedStyles.scss";
import Btn from "../Btn";
import bodyContent from "../util/bodyContent.js";
import {attTrue,varFind} from "../util/attFinders.js"
import SVG from "../util/SVG"


const {
    tSec,
    h1,
    contentBox,
    kicker,
    bgImg,
    content,
    btnHolder,
    wAlert,
    hasBgImg,
    callout,
    calloutHeadline,
    calloutKick
} = styles

const {grifoHeadline} = sharedStyles

function CalloutBox(mod) {
    const   html = bodyContent(mod.html),
            link = $(html).find("a"),
            url = $(link).attr("href");
    
    if(!link.length || !url){
        return null; 
    }
    
    return <a href={url} target={$(link).attr("target")} class={callout}>
        <span class={`${calloutHeadline} ${grifoHeadline}`}>{mod.header}</span>
        <span class={calloutKick}><span>{$(link).text()}</span> {SVG("arrow")}</span>
    </a>

}

export default function({mod, clickScroll, alert, order, allMods}) {
    let showAlert = (alert && order === 0);
    let body  = bodyContent(mod.html),
        text = $(body).clone();
    $(text).find("h1, a, img").remove();
    let img = $(body).find("img");
    let imgBg = (img.length) ? <div class={bgImg} style={{backgroundImage: `url(${$(img).attr("src")})`}}></div> : null;
    let attClasses = mod.attributes.map(e => styles[e]).join(" ");
    let btns = [];
    $(body).find("a").each(function(i,e){
        let url = $(e).attr('href');
        let outbound = ($(e).attr("target") === "_blank");
        let type = ($(e).attr('title') ==="sub") ? "secondary" : "reverse";
        btns.push(
            <Btn style={type} outbound={outbound} text={$(e).text().trim()} clickHandler={(!outbound)?clickScroll:null} href={url} />
        );
    });
    const   calloutMod = allMods.filter(e => e.type == varFind(mod.attributes, "callout"))
    

    
    
    return <div class={`${tSec} ${attClasses} ${(showAlert)? wAlert : ""}`}>
        {imgBg}
        <div class={`${contentBox} ${(img.length)?hasBgImg: ""}`}>
            {(attTrue(mod.attributes,"noTitle"))? null:<div class={kicker}>{mod.header}</div>}
            <h1 class={`${h1} ${grifoHeadline}`}>{$(body).find("h1").text().trim()}</h1>
            {($(text).text().trim().length)?  <div class={content}>{$(text).text().trim()}</div> : null}
            {(btns.length)? <div class={btnHolder} >{btns}</div> : null}
            
        </div>
        
        {(!calloutMod.length) ? null : CalloutBox(calloutMod[0])}
    </div>
}