import $ from "jquery";
import cardStyles from "./cardStyles.scss";
import shareStyles from "../sharedStyles.scss";
import bodyContent from "../util/bodyContent.js";
import {Component, Fragment} from "preact";
import {attTrue} from "../util/attFinders.js"
import isHome from "../util/isHome.js";
import SectionHeader from "../SectionHeader";
import SVG from "../util/SVG.js";
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
} = cardStyles
const {
    grifoHeadline,
    makeNavy,
    readingText,
} = shareStyles

class CardRow extends Component {
    constructor(props) {
        super();

        this.state = {
            hHeight : 0
        }
        this.checkHeight = this.checkHeight.bind(this);
        this.headers = [];
    }
    checkHeight() {
        let h = 0
        this.headers.forEach(function(e){
            let nh = $(e).height()
            if( nh > h) {
                h = nh;
            }
        });
        if(h > 0) {
            this.setState({hHeight: h});
        }
    }
    componentDidMount() {
    
        $(window).load(function(){
            this.checkHeight();
        }.bind(this))
    }

    render(p,{hHeight}) {
        let headerH = hHeight || "auto",
            CList = p.items.map((e,i) => {
            let hasLink = (e.linkURL),
                isIcon = attTrue(e.atts, "icons"),
                interior = <Fragment>
                {(e.imgURL && !isIcon ) ? <div class={cardImg} style={{backgroundImage: `url(${e.imgURL})`}}></div> : null}
                 {(e.imgURL && isIcon ) ? <div class={iconHolder}><img src={e.imgURL} class={cardIcon}/></div> : null}
                 <div class={cardText}>
                     {(e.kicker) ? <div class={cardKicker}>{e.kicker}</div> : null}
                     {(e.title) ? <h2 style={{height: headerH}} ref={h => this.headers[i] = h} class={`${grifoHeadline} ${makeNavy}`}>{e.title}</h2> : null}
                     <div class={`${readingText} ${makeNavy}`}>{e.content.trim()}</div>
                     
                 </div>
                 {(hasLink)? <CardLink text={e.linkText} /> : null}   
            </Fragment>

             return h((hasLink)? "a": "div", 
                        {
                            class: `${cardItem} ${p.attrClass} ${(hasLink)?wLink:null}`, 
                            href:hasLink|| null
                        }, 
                        interior);
         })

        return <div class={cardRow}>{CList}</div>
    }
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
            content: $(text).text().replace(/\u200B/g,'').trim() || null,
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