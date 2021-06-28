import bodyContent from "../util/bodyContent.js";
import {readingText, textFullWidth, headerPad} from "../sharedStyles.scss";
import Btn from "../Btn";

import SectionHeader from "../SectionHeader";
import {attTrue, varFind} from "../util/attFinders.js"

export default function({mod,clickScroll}) {
const isCTA = attTrue(mod.attributes,"CTABTN")
const isCentered = attTrue(mod.attributes, "copyCentered")
let regText = (!isCentered && !isCTA)? textFullWidth : null
let copyStyles = {padding: "0 20px 48px 20px"};
copyStyles.color = varFind(mod.attributes, "textColor");
let theBtn 

if(isCentered) {
    copyStyles.padding = "0 0 48px 0";
    copyStyles.width = "826px";
    copyStyles.margin = "0 auto";
}
if(isCTA) {
    copyStyles = {
        width: "100%",
        padding: "0 20px 48px 20px",
        position: "relative",
        marginTop: (attTrue(mod.attributes,"underCards")) ? "-24px" : ''
    }
    var aHTML = $(bodyContent(mod.html)).find("a");
    
    theBtn = <Btn clickHandler={clickScroll} text={$(aHTML).text().trim()} href={$(aHTML).attr("href")} style="bigCTA" />
}
let inner = (!isCTA) ? <div dangerouslySetInnerHTML={{__html: $(bodyContent(mod.html)).html().trim()}}/> :
            theBtn;
return <div  class={`${(attTrue(mod.attributes,"noTitle") && !isCTA) ? headerPad : ""}`}>
    <SectionHeader attributes={mod.attributes} title={mod.header} />
    <div style={copyStyles}>
    <div   class={`${readingText} ${regText}`}>

        {inner} 

    </div>
    </div>
</div>
  

}