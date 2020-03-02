import bodyContent from "../util/bodyContent.js";
import {attTrue,varFind} from "../util/attFinders.js"
import sharedStyles from "../sharedStyles.scss";
import styles from "./styles.scss";
import UserList from "../UserList";

const {
    readingText,
    muteImportant
} = sharedStyles;

const {
    topText, 
    textContainer,
    shortText,
    kicker,
    leftCol,
    rightCol,
    wRight
} = styles 

function Header({text}) {
    
    return <h2 class={`${kicker} ${muteImportant}`}>{text}</h2> 
}

export default function({mod, allMods}) {
   
    let userList = allMods.filter(function(e){
       if(varFind(e.attributes, "type") !== "UserList" && varFind(e.attributes, "area") !== "Summary") {
            return false;
       }
       return e; 
       
    });
    let isRight = (userList.length > 0);
    

    let body = bodyContent(mod.html)
    
    return <div class={`${topText} ${(isRight) ? wRight : ""}`}>
        <div class={`${leftCol} ${textContainer} ${($(body).text().length < 500) ? shortText : ""}`}>
            {(!attTrue(mod.attributes, "noTitle")) ? <Header text={mod.header} /> : null}
            <div class={`${readingText} `} dangerouslySetInnerHTML={{__html: $(body).html().trim()}} />
        </div>
        {(isRight) ? <div class={rightCol}><Header text={userList[0].header} /><UserList html={userList[0].html} /></div> : null}
    </div>
}