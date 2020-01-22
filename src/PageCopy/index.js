import bodyContent from "../util/bodyContent.js";
import {readingText, textFullWidth} from "../sharedStyles.scss";

export default function({mod}) {
    return <div style={{padding: "48px 20px"}} class={`${readingText} ${textFullWidth}`}>
        <div dangerouslySetInnerHTML={{__html: $(bodyContent(mod.html)).html()}}/>
        
    </div>
}