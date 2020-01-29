import style from "./style.scss";
import isHome from "../util/isHome.js";
import {useState,useEffect} from "preact/hooks";
import ajaxCall from "../util/ajaxCall.js";
const {
    barContainer,
    barNav,

    hhome,
    lList
} = style

export default function(p) {
    const [sections, updateSections] = useState(JSON.parse(localStorage.getItem("subNav")) || []);

    let     href = (isHome()) ? "" : `${HOME_URL}`,
            scroller = (isHome()) ? p.clickScroll : null

    const navData = (d) => {
        if(!d.results.length) {
            return; 
        }
       

      let items = d.results.map(e => {
          return {
              title: e.Title,
              hash: e.Hash,
          }
      });
      updateSections(items)
      localStorage.setItem("subNav", JSON.stringify(items));
    }

    useEffect(() => {
        ajaxCall(`${SITE_DOMAIN}/_api/web/lists/GetByTitle('SubNav')/items?$orderby=Order0`,navData);
    }, []);

    let links = sections.map(e => <a href={`${href}#${e.hash}`} onClick={scroller}>{e.title}</a>);
    return <div class={barContainer}>
            <nav class={barNav}>
                <a class={hhome} href={`${HOME_URL}`}>Our Strategy</a>
                <div class={lList}>
                    {links}
                </div>
            </nav>
        </div>
}
