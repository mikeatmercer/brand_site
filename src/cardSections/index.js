import $ from "jquery";
import cardStyles from "./cardStyles.scss";
import shareStyles from "../sharedStyles.scss";
const {
    cardSection,
    cGrey,
    sectionHeader,
    backButton,
    cardList,
    cardItem,
    cardKicker
} = cardStyles
const {
    muteImportant,
    grifoHeadline,
    makeNavy
} = shareStyles

function CardList({mod}) {
    let dom = new DOMParser().parseFromString(mod.html, "text/html"),
        list = $(dom).find(".ms-rtestate-field ul:first"),
        cards = [];
    $(list).find("> li").each(function(i,e){
        cards.push({
            kicker : $(e).find(".ms-rteStyle-Accent1:first").text() || null,
            imgURL : $(e).find("img:first").attr("src") || null,
            title : $(e).find("h2:first").text() || null, 
            content: $(e).find("p:first").text() || null,
            linkText : $(e).find("a:first").text() || "Read More",
            linkURL : $(e).find("a:first").attr("href") || null
        });

    });
 
    let CList = cards.map(e => {
       
        return <li class={`${cardItem} ${cardStyles[mod.type]}`}>
            <div class={cardKicker}>{e.kicker}</div>
            <h2 class={`${grifoHeadline} ${makeNavy}`}>{e.title}</h2>
            <p>{e.content}</p>
        </li>
    })
    return <ul class={cardList}>{CList}</ul>
}




export default function({mod,clickScroll}) {
    let gStyle = (mod.type == "behave" || mod.type == "enable") ? cGrey : null;
    return <div class={`${cardSection} ${gStyle}`}>
        <div class={sectionHeader}>
            <h2 class={muteImportant}>{mod.header}</h2>
            <a class={backButton} href="#overview" onClick={clickScroll}>Back to overview</a>
        </div>
        <CardList mod={mod}/>
    </div>
}