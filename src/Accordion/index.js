import SectionHeader from "../SectionHeader"
import {varFind} from "../util/attFinders.js"
import Section from "./sections.js"
import {accordion} from "./styles.scss"


export default function({mod, allMods}) {
    function expander(e) {
        e.preventDefault();
        console.log(`expand_${mod.type}`);
        $(global.accordionListener).trigger(`expand_${mod.type}`);
    }
   
    let sections = allMods.map(e => {
        if(varFind(e.attributes, "type")!= "AccordionSection" || varFind(e.attributes, "section") != mod.type) {
            return; 
        }
 
        return <Section section={mod.type} mod={e} />
    })
    return <div class={accordion}>
        <SectionHeader title={mod.header} link={<a onClick={expander}href="#">Expand all</a>} />
        
        {sections}
     
    </div>
}