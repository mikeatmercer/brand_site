import bodyContent from "../util/bodyContent.js";
import Profile from "./profile.js";
import {profileList} from "./styles.scss";

export default function({html}){
    let list = $(bodyContent(html)).find("ul:first").find("> li");
    if(!list.length) {
        return null; 
    }

    let items = [];
    $(list).each(function(i,e){
     items.push(<Profile email={$(e).text().trim()} />);
    });

    return <ul class={profileList}>
        {items}
    </ul>

}
