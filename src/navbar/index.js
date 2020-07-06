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
    const [homeTitle, updateHomeTitle] = useState(localStorage.getItem("homeTitle"));

    let     href = (isHome()) ? "" : `${HOME_URL}`,
            scroller = (isHome()) ? p.clickScroll : null

    const navData = (d) => {
        console.log(d)
        if(!d.results.length) {
            return; 
        }
       
    let ht = d.results.filter(e => e.HomeLink === true)[0].Title
    updateHomeTitle(ht);
    localStorage.setItem("homeTitle",ht);
      let items = d.results.filter(e => e.HomeLink !== true).map(e => {
         
          return {
              title: e.Title,
              hash: e.Hash,
              outbound: e.Outbound
          }
      });
      updateSections(items)
      localStorage.setItem("subNav", JSON.stringify(items));
    }

    useEffect(() => {
        ajaxCall(`${SITE_DOMAIN}/_api/web/lists/GetByTitle('SubNav')/items?$orderby=Order0`,navData);
    }, []);

    let links = sections.map(e => {
        if(e === null) {
            return ; 
        }
        let url = (e.outbound) ? e.hash : `${href}#${e.hash}` 
        return <a href={url} onClick={(!e.outbound)? scroller: null} target={(e.outbound)?"_blank":""}>{e.title}</a>
        
    })
    return <div class={barContainer}>
            <nav class={barNav}>
                <a class={hhome} href={`${HOME_URL}`}>{homeTitle}</a>
                <div class={lList}>
                    {links}
                </div>
            </nav>
        </div>
}
