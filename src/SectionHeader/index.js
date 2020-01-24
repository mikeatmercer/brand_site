import {muteImportant,readingText} from "../sharedStyles.scss";
import {sectionHeader,top,subTitleClass, shortClass, noTitle} from "./style.scss";
import {attTrue} from "../util/attFinders.js"

export default function({title, subTitle, link, short, attributes}) {

    let withoutTitle = (attTrue(attributes,"noTitle"));

    return <div class={`${sectionHeader} ${(short) ? shortClass : ""} `}>
            <div class={`${top} ${(withoutTitle || !title)? noTitle : ""}`}>
            {(withoutTitle|| !title) ? null : <h2 class={`${muteImportant}`}>{title}</h2> }
            {link}
            </div>
            {(subTitle) ? <div class={`${readingText} ${subTitleClass}`}>{subTitle}</div> : null}
            
            
            
            </div>
            
   
}