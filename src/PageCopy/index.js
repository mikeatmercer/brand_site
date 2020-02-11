import bodyContent from "../util/bodyContent.js";
import {readingText, textFullWidth, headerPad} from "../sharedStyles.scss";
import style from "./styles.scss"
import SectionHeader from "../SectionHeader";
import {attTrue} from "../util/attFinders.js"

export default function({mod}) {

return <div  class={`${(attTrue(mod.attributes,"noTitle")) ? headerPad : ""}`}>
    <SectionHeader attributes={mod.attributes} title={mod.header} />
    <div style={{padding: "0 20px 48px 20px"}}>
    <div   class={`${readingText} ${textFullWidth}`}>
        <div dangerouslySetInnerHTML={{__html: $(bodyContent(mod.html)).html().trim()}}/>
        
    </div>
    </div>
</div>
  

}