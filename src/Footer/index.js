import Btn from "../Btn";
import style from "./style.scss";

const {
    btnContainer
} = style

export default function(p) {
    let home = (window.location.href.split("#")[0].toLowerCase() != HOME_URL.toLowerCase()) ? <Btn text={"Our strategy home"} href={HOME_URL} style={"primary"} /> : null; 
    return <div class={btnContainer}>
        <Btn href={"#top"} text={"Back to top"} clickHandler={p.clickScroll} style={"reverse"}/>
        {home}
    </div>
}