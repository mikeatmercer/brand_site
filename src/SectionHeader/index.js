import {muteImportant,readingText} from "../sharedStyles.scss";
import {sectionHeader,top,subTitleClass, shortClass, noTitle} from "./style.scss";

export default function({title, subTitle, link, short}) {



    return <div class={`${sectionHeader} ${(short) ? shortClass : ""} `}>
            <div class={`${top} ${(!title)? noTitle : ""}`}>
            {(title) ? <h2 class={`${muteImportant}`}>{title}</h2> : null}
            {link}
            </div>
            {(subTitle) ? <div class={`${readingText} ${subTitleClass}`}>{subTitle}</div> : null}
            
            
            
            </div>
            
   
}