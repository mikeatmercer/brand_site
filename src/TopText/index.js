import bodyContent from "../util/bodyContent.js";
import {attTrue} from "../util/attFinders.js"
import sharedStyles from "../sharedStyles.scss";
import {topText, textContainer,shortText} from "./styles.scss";

const {readingText} = sharedStyles;


export default function({mod}) {
    let body = bodyContent(mod.html),
        header = (!attTrue(mod.attributes, "noTitle")) ? <h2>{mod.header}</h2> : null;
    return <div class={topText}>
        {header}
        <div class={`${readingText} ${textContainer} ${($(body).text().length < 500) ? shortText : ""}`} dangerouslySetInnerHTML={{__html: $(body).html()}} />
    </div>
}