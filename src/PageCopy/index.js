import bodyContent from "../util/bodyContent.js";
import {readingText, textFullWidth, headerPad} from "../sharedStyles.scss";

import SectionHeader from "../SectionHeader";
import {attTrue, varFind} from "../util/attFinders.js"

export default function({mod}) {
const isCentered = attTrue(mod.attributes, "copyCentered")
let regText = (!isCentered)? textFullWidth : null
let copyStyles = {padding: "0 20px 48px 20px"};
copyStyles.color = varFind(mod.attributes, "textColor")
if(isCentered) {
    copyStyles.padding = "0 0 48px 0";
    copyStyles.width = "826px";
    copyStyles.margin = "0 auto";
}
return <div  class={`${(attTrue(mod.attributes,"noTitle")) ? headerPad : ""}`}>
    <SectionHeader attributes={mod.attributes} title={mod.header} />
    <div style={copyStyles}>
    <div   class={`${readingText} ${regText}`}>
        <div dangerouslySetInnerHTML={{__html: $(bodyContent(mod.html)).html().trim()}}/>
        
    </div>
    </div>
</div>
  

}