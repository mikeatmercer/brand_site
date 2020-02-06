import bodyContent from "../util/bodyContent.js";
import {readingText, textFullWidth} from "../sharedStyles.scss";
import style from "./styles.scss"
import SectionHeader from "../SectionHeader";

export default function({mod}) {
return <div>
    <SectionHeader attributes={mod.attributes} title={mod.header} />
    <div style={{padding: "0 20px"}}  class={`${readingText} ${textFullWidth}`}>
        <div dangerouslySetInnerHTML={{__html: $(bodyContent(mod.html)).html().trim()}}/>
        
    </div>
</div>


}