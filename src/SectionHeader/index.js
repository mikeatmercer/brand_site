import {muteImportant,readingText} from "../sharedStyles.scss";
import {sectionHeader,top,subTitleClass, shortClass, noTitle, brightSide,bsIcon} from "./style.scss";
import {attTrue} from "../util/attFinders.js"
import SVG from "../util/SVG"

export default function({title, subTitle, link, short, attributes}) {

    let withoutTitle = (attTrue(attributes,"noTitle"));
    let bsClass = (attTrue(attributes,"brightside"))? brightSide : "";

    if(withoutTitle && !link) {
        return false; 
    }

    return <div class={`${sectionHeader} ${(short) ? shortClass : ""} ${bsClass}`}>
            {(attTrue(attributes,"brightside"))? <div class={bsIcon}>{SVG("bscloud")}</div>: null}
            <div class={`${top} ${(withoutTitle || !title)? noTitle : ""} ${bsClass}`}>
            {(withoutTitle|| !title) ? null : <h2 class={`${muteImportant}`}>{title}</h2> }
            {link}
            </div>
            {(subTitle) ? <div class={`${readingText} ${subTitleClass} ${bsClass}`}>{subTitle}</div> : null}
            
            
            
            </div>
            
   
}