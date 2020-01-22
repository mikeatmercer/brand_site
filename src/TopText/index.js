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
    let rightComp = null;
    if(isRight) {
        rightComp = <div class={rightCol}>
            <Header text={userList[0].header} />
            <UserList html={userList[0].html} />
        </div>
    }
    
    

    let body = bodyContent(mod.html),
        header = (!attTrue(mod.attributes, "noTitle")) ? <Header text={mod.header} /> : null;
    return <div class={`${topText} ${(isRight) ? wRight : ""}`}>
        <div class={`${leftCol} ${textContainer} ${($(body).text().length < 500) ? shortText : ""}`}>
            {header}
            <div class={`${readingText} `} dangerouslySetInnerHTML={{__html: $(body).html()}} />
        </div>
        {rightComp}
    </div>
}