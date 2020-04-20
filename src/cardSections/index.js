import $ from "jquery";
import cardStyles from "./cardStyles.scss";
import shareStyles from "../sharedStyles.scss";
import bodyContent from "../util/bodyContent.js";
import {Fragment} from "preact";
import {attTrue} from "../util/attFinders.js"
import isHome from "../util/isHome.js";
import SectionHeader from "../SectionHeader";
import SVG from "../util/SVG.js";
import { useState, useEffect, useRef } from "preact/hooks";
const {
    cardSection,
    cardList,
    cardItem,
    cardKicker,
    cardText,
    cardImg,
    cardLinkContainer,
    cardRow,
    cardLinka,
    cardLinksvg,
    cardLinkspan,
    wLink,
    iconHolder, 
    cardIcon,
    dlLink,
    brightSideBug
} = cardStyles
const {
    grifoHeadline,
    makeNavy,
    readingText,
} = shareStyles

const CardRow = ({items,attrClass}) => {
    const [height,updateHeight] = useState(0);
    const headers = items.map(()=> useRef(null))
    const checkHeight = () => {
        let h = 0;
        headers.forEach((e)=>{
            let nh = $(e.current).height()
            if( nh > h) {
                h = nh;
            }
        })
        if(h > 0) {
            updateHeight(h);
        }
    }
    useEffect(()=>{
        $(window).load(() =>{
            checkHeight();
        })
    },[])

        let cList = items.map(({atts,linkText,kicker,title,content,imgURL,linkURL},i)=>{
            let hasLink = (linkURL),
                isIcon = attTrue(atts, "icons");
            let interior = <Fragment>
                {(imgURL && !isIcon ) ? <div class={cardImg} style={{backgroundImage: `url(${imgURL})`}}>
        {(attTrue(atts,"brightside"))? <div class={brightSideBug}>{SVG("bscloud")}</div> : null}
                </div> : null}
                 {(imgURL && isIcon ) ? <div class={iconHolder}><img src={imgURL} class={cardIcon}/></div> : null}
                <div class={cardText}>
                    {(kicker) ? <div class={cardKicker}>{kicker}</div> : null}
                    {(title) ? <h2 style={{height: (height || "auto")}} ref={headers[i]} class={`${grifoHeadline} ${makeNavy}`}>{title}</h2> : null}
                    <div class={`${readingText} ${makeNavy}`}>{content.trim()}</div>
                </div>
                {(hasLink)? <CardLink text={linkText} /> : null}   
            </Fragment>
            
            return h((hasLink)? "a": "div", 
            {
                class: `${cardItem} ${attrClass} ${(hasLink)?wLink:null}`, 
                href:hasLink|| null
            }, 
            interior);
        })

    return <div class={cardRow}>
        {cList}
    </div>
}





function CardLink({ text}) {
    return <div class={cardLinkContainer}>
        <span  class={cardLinka}><span class={cardLinkspan}>{text || "learn more"}</span>
        {SVG("arrow",`${cardLinksvg} ${(text.trim().toLowerCase() == "download") ? dlLink : ""}`)}</span>
    </div>
}

function CardList({mod, attrClass}) {
    let list = $(bodyContent(mod.html)).find("ul:first"),
        cards = [];
    $(list).find("> li").each(function(i,e){
        let text = $(e).clone();
        $(text).find("a, h2, img, .ms-rteStyle-Accent1").remove();
        cards.push({
            kicker : $(e).find(".ms-rteStyle-Accent1:first").text() || null,
            imgURL : $(e).find("img:first").attr("src") || null,
            title : $(e).find("h2:first").text().trim() || null, 
            content: $(text).text().replace(/\u200B/g,'').trim() || "",
            linkText : $(e).find("a:first").text().trim() || "Read More",
            linkURL : $(e).find("a:first").attr("href") || null,
            atts: mod.attributes,
        });
  
    });

    let rowLength = (attTrue(mod.attributes, "oneLine")) ? 999 : 3,
        rowBlock = [],
        rows = [],
        iter = 1;
    if(attTrue(mod.attributes, "oneLine")) {
        rows.push[cards]; 
        
    } else {
        while (cards.length > 0)
            rows.push(cards.splice(0, rowLength))
    }
    cards.forEach(function(e,i){
        rowBlock.push(e);
        
        if(i === cards.length - 1) {
            rows.push(rowBlock);
            return; 
        }
        if(iter === rowLength) {
            rows.push(rowBlock);
            iter = 1;
            rowBlock.splice(0, rowBlock.length)
            return;
        }
        iter++;
    });
    
    let cardrows = rows.map(e => <CardRow attrClass={attrClass} items={e} />);

    
 
    
    return <div class={`${cardList} ${attrClass}`}>{cardrows}</div>
}




export default function({mod,clickScroll}) {
    let attrClass = mod.attributes.map(e => cardStyles[e]).join(" ")
    let overviewBtn = (isHome())? <a href="#overview" onClick={clickScroll}>Back to overview</a> : null;
    let sub = $(bodyContent(mod.html)).find("h3:first");
    return <div class={`${cardSection} ${attrClass}`}>
        <SectionHeader attributes={mod.attributes} link={overviewBtn} title={mod.header} subTitle={(sub.length)? $(sub).text() : null}/>
        
        <CardList mod={mod} attrClass={attrClass}/>
    </div>
}