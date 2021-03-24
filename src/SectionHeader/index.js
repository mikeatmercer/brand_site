import {muteImportant,readingText} from "../sharedStyles.scss";
import styles from "./style.scss";
import {attTrue, varFind} from "../util/attFinders.js"
import SVG from "../util/SVG"

const {sectionHeader,top,subTitleClass, shortClass, noTitle, brightSide,bsIcon,blueBG,longText} = styles; 

export default function({title, subTitle, link, short, attributes}) {

    let withoutTitle = (attTrue(attributes,"noTitle"));
    let bsClass = (attTrue(attributes,"brightside"))? brightSide : "";
    let customMargin = (varFind(attributes, "hMargin"));
    
    let sLongClass = (subTitle && subTitle.length > 210) ? longText: ""
    if(withoutTitle && !link) {
        return false; 
    }
  

    return <div class={`${sectionHeader} ${(customMargin)? styles[`hMargin${customMargin}`]  : "" } ${(short) ? shortClass : ""} ${bsClass} ${(attTrue(attributes,"blueBG")? blueBG: "")} ${(attTrue(attributes,"copyCentered")? styles["copyCentered"]: "")}`}>
            {(attTrue(attributes,"brightside"))? <div class={bsIcon}>{SVG("bscloud")}</div>: null}
            <div class={`${top} ${(withoutTitle || !title)? noTitle : ""} ${bsClass}`}>
            {(withoutTitle|| !title) ? null : <h2 class={`${muteImportant}`}>{title}</h2> }
            {link}
            </div>
            {(subTitle) ? <div class={`${readingText} ${subTitleClass} ${bsClass} ${sLongClass}`} dangerouslySetInnerHTML={{__html: subTitle}}/> : null}
            
            
            
            </div>
            
   
}