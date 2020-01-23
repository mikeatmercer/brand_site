import SectionHeader from "../SectionHeader"
import {varFind, attTrue} from "../util/attFinders.js"
import Section from "./sections.js"
import {accordion, noTitle} from "./styles.scss"
import {Component} from "preact";

export default class Accordion extends Component {
    constructor() {
        super();
        this.state = {
            btnText: "Expand all",
            open: false
        }
        this.btnClick = this.btnClick.bind(this);
    }
    btnClick(e) {
        e.preventDefault();
        console.log(this.state.open);
        $(global.accordionListener).trigger(`expand_${this.props.mod.type}`, [this.state.open]);
            this.setState({
                btnText: (this.state.open) ? "Expand all": "Hide all" ,
                open: (!this.state.open)
            })
            
        
    }

    render({mod, allMods},{btnText}) {
        let titleFalse = (attTrue(mod.attributes, "noTitle") === true);
    

    let sections = allMods.map(e => {
        if(varFind(e.attributes, "type")!= "AccordionSection" || varFind(e.attributes, "section") != mod.type) {
            return; 
        }
 
        return <Section section={mod.type} mod={e} />
    })
    return <div class={`${accordion} ${(titleFalse) ? noTitle : ""}`}>
        <SectionHeader title={(titleFalse)? null : mod.header} short={titleFalse} link={<a onClick={this.btnClick}href="#">{btnText}</a>} />
        
        {sections}
     
    </div>
    }
}
/*

export default function({mod, allMods}) {
    let btnText = "Expand all";
    function expander(e) {
        e.preventDefault();
        console.log(`expand_${mod.type}`);
        $(global.accordionListener).trigger(`expand_${mod.type}`);
        btnText = "Close all"
    }
    let titleFalse = (attTrue(mod.attributes, "noTitle") === true);
    

    let sections = allMods.map(e => {
        if(varFind(e.attributes, "type")!= "AccordionSection" || varFind(e.attributes, "section") != mod.type) {
            return; 
        }
 
        return <Section section={mod.type} mod={e} />
    })
    return <div class={`${accordion} ${(titleFalse) ? noTitle : ""}`}>
        <SectionHeader title={(titleFalse)? null : mod.header} short={titleFalse} link={<a onClick={expander}href="#">{btnText}</a>} />
        
        {sections}
     
    </div>
}
*/