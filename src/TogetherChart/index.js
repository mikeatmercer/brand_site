import SectionHeader from "../SectionHeader"
import isHome from "../util/isHome";
import bodyContent from "../util/bodyContent";
import styles from "./style.scss";


const {
    chartContainer,
    card,
    cardHeader
} = styles;

export default function({mod,clickScroll}) {

    function Card({content}) {
        let {
            title,
            id,
            items
        } = content
        let list = items.map(e => <li>{e}</li>);
        return <div class={`${card} ${styles[id]}`}>
           <div class={cardHeader} >{title}</div> 
           <ul>
            {list}
           </ul>
        </div>
    }


    const {
        attributes,
        header
    } = mod;
    let overviewBtn = (isHome() && !attTrue(attributes, "noAnchor"))? <a href="#topGraphic" onClick={clickScroll}>Back to top</a> : null;

    let con = bodyContent(mod.html);
    

    let sections = [];
  
    $(con).find("h1").each(function(i,e){
        

        let items = [];
       $(e).next("ul").find("li").each(function(i,e){
            items.push(
                $(e).text()
            )
        })
    
        sections.push({
            id: $(e).text().replace(/\W/ig, "").toLowerCase().trim(),
            title: $(e).text(),
            items: items
        })
    })
    let content = sections.map(function(e,i){
        return <Card content={e} /> 
    })
    content.splice(1,0, <div>image</div>)
 

    return <div>
        <SectionHeader attributes={attributes} link={overviewBtn} title={header} />
        <div class={chartContainer}>
            {
                content
            }
        </div>
    </div>
}