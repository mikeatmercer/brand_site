import {muteImportant,readingText} from "../sharedStyles.scss";
import {sectionHeader,top,subTitle} from "./style.scss";

export default function({title, subTitle, link}) {



    return <div class={sectionHeader}>
            <div class={top}>
            <h2 class={`${muteImportant}`}>{title}</h2>
            {link}
            </div>
            {(subTitle) ? <div class={`${readingText} ${subTitle}`}>{subTitle}</div> : null}
            
            
            
            </div>
            
   
}