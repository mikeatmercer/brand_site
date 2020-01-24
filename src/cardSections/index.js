import $ from "jquery";
import cardStyles from "./cardStyles.scss";
import shareStyles from "../sharedStyles.scss";
import bodyContent from "../util/bodyContent.js";
import {Component} from "preact";
import {attTrue} from "../util/attFinders.js"
import isHome from "../util/isHome.js";
import SectionHeader from "../SectionHeader";
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
    linkOverlay,
    iconHolder, 
    cardIcon,
    dlLink,
} = cardStyles
const {
    muteImportant,
    grifoHeadline,
    makeNavy,
    readingText,
    headerLink
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
       // this.checkHeight(); 
        $(window).load(function(){
            this.checkHeight();
        }.bind(this))
    }

    render(p,{hHeight}) {
        let headerH = hHeight || "auto";
        let CList = p.items.map((e,i) => {
        
            let header  = (e.title) ? <h2 style={{height: headerH}} ref={h => this.headers[i] = h} class={`${grifoHeadline} ${makeNavy}`}>{e.title}</h2> : null;
            let img = (e.imgURL && !attTrue(e.atts, "icons") ) ? <div class={cardImg} style={{backgroundImage: `url(${e.imgURL})`}}></div> : null;
            let link = (e.linkURL) ? <CardLink text={e.linkText} url={e.linkURL} /> : null
            let wLinkClass = (e.linkURL) ? wLink : null
            let linkCover = (e.linkURL) ? <a  href={e.linkURL} class={linkOverlay} /> : null;
            let icon = (e.imgURL && attTrue(e.atts, "icons") ) ? <div class={iconHolder}><img src={e.imgURL} class={cardIcon}/></div> : null; 
            let kicker = (e.kicker) ? <div class={cardKicker}>{e.kicker}</div> : null;
             return <div class={`${cardItem} ${p.attrClass} ${wLinkClass}`}>
                 {img}
                 {icon}
                 <div class={cardText}>
                     {kicker}
                     {header}
                     <div class={readingText}>{e.content}</div>
                     
                 </div>
                 {link}
                {linkCover}
             </div>
         })

        return <div class={cardRow}>{CList}</div>
    }
}


function CardLink({url, text}) {
    return <div class={cardLinkContainer}>
        <a href={url} class={cardLinka}><span class={cardLinkspan}>{text || "learn more"}</span>
<svg class={`${cardLinksvg} ${(text.trim().toLowerCase() == "download") ? dlLink : ""}`} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/></svg></a>
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
            title : $(e).find("h2:first").text() || null, 
            content: $(text).text() || null,
            linkText : $(e).find("a:first").text() || "Read More",
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