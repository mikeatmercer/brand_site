import Btn from "../Btn";
import style from "./style.scss";
import isHome from "../util/isHome.js";

const {
    btnContainer
} = style

export default function(p) {
   
    return <div class={btnContainer}>
        <Btn href={"#top"} text={"Back to top"} clickHandler={p.clickScroll} style={"reverse"}/>
        {(!isHome()) ? <Btn text={"Our strategy home"} href={HOME_URL} style={"primary"} /> : null}
    </div>
}