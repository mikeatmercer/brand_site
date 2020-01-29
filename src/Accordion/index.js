import SectionHeader from "../SectionHeader"
import {varFind, attTrue} from "../util/attFinders.js"
import Section from "./sections.js"
import {accordion, noTitle} from "./styles.scss"
import {useState} from "preact/hooks";


export default function({mod,allMods}) {
    const sections = allMods.filter(e => varFind(e.attributes, "AccordionSection") && varFind(e.attributes, "section") == mod.type)

    const [openMods, updateOpenMods] = useState(sections.map(e => false));
    function updateOpenState(index,newState) {
        let newMods = openMods.slice(0);
        newMods[index] = newState
        updateOpenMods(newMods);
    }
    
    function btnClick(e) {
        e.preventDefault();
        let openUp = openMods.indexOf(false) > -1;
        updateOpenMods(openMods.map(e => openUp) )  ;

    }
  

    let titleFalse = (attTrue(mod.attributes, "noTitle") === true);

    return <div class={`${accordion} ${(titleFalse) ? noTitle : ""}`}>
    <SectionHeader attributes={mod.attributes} title={mod.header} short={titleFalse} link={<a onClick={btnClick} href="#">{(openMods.indexOf(false) > -1) ? "Expand all" : "Hide all"}</a>} />
    
    {sections.map((e,i) => <Section updater={updateOpenState} isOpen={openMods[i]} order={i} section={mod.type} mod={e} />)}
 
</div>
}
