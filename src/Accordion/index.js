import SectionHeader from "../SectionHeader"
import {varFind, attTrue} from "../util/attFinders.js"
import Section from "./sections.js"
import {accordion, noTitle} from "./styles.scss"
import {useState, useEffect} from "preact/hooks";


export default function({mod,allMods}) {
    const sections = allMods.filter(e => varFind(e.attributes, "AccordionSection") && varFind(e.attributes, "section") == mod.type)

    const [openMods, updateOpenMods] = useState(sections.map(e => false));

    function btnClick(e) {
        e.preventDefault();
        let openUp = openMods.indexOf(false) > -1;
        updateOpenMods(openMods.map(e => openUp) )  ;
        $(global.accordionListener).trigger(`expand_${mod.type}`, [!openUp,true]);
    }
    useEffect(() => {
        $(global.accordionListener).on("state_change_"+mod.type, (e,order,state) => {
            let newArray = openMods.slice(0);
            newArray[order] = state;
     
            updateOpenMods(newArray);
        }) 
    })

    let titleFalse = (attTrue(mod.attributes, "noTitle") === true);

    return <div class={`${accordion} ${(titleFalse) ? noTitle : ""}`}>
    <SectionHeader attributes={mod.attributes} title={mod.header} short={titleFalse} link={<a onClick={btnClick}href="#">{(openMods.indexOf(false) > -1) ? "Expand all" : "Hide all"}</a>} />
    
    {sections.map((e,i) => <Section order={i} section={mod.type} mod={e} />)}
 
</div>
}

/*
export default class Accordion extends Component {
    constructor(p) {
        const sections = p.allMods.filter(e => varFind(e.attributes, "AccordionSection") && varFind(e.attributes, "section") == p.mod.type)
        super();
        this.state = {
            sections : sections,
            openMods: sections.map(e => false)
        }
        this.btnClick = this.btnClick.bind(this);
    }
    btnClick(e) {
        e.preventDefault();
        let openUp = this.state.openMods.indexOf(false) > -1;  
        this.setState({openMods: this.state.openMods.map(e => openUp)});
        $(global.accordionListener).trigger(`expand_${this.props.mod.type}`, [!openUp,true]);
    }
    componentDidMount() {
        $(global.accordionListener).on("state_change_"+this.props.mod.type, (e,order,state) => {
            let newArray = this.state.openMods.slice(0);
            newArray[order] = state;
     
            this.setState({openMods: newArray});
        }) 
    }
    render({mod},{sections,openMods}) {
        let titleFalse = (attTrue(mod.attributes, "noTitle") === true);

   

    return <div class={`${accordion} ${(titleFalse) ? noTitle : ""}`}>
        <SectionHeader attributes={mod.attributes} title={mod.header} short={titleFalse} link={<a onClick={this.btnClick}href="#">{(openMods.indexOf(false) > -1) ? "Expand all" : "Hide all"}</a>} />
        
        {sections.map((e,i) => <Section order={i} section={mod.type} mod={e} />)}
     
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