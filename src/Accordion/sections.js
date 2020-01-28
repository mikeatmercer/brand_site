import {Component} from "preact"
import bodyContent from "../util/bodyContent.js"
import {readingText, headerLink,textFullWidth} from "../sharedStyles.scss";
import styles from "./styles.scss";

const {
    aItem,
    textContent,
    aHeader,
    aHeaderText,
    isOpen,
    aHeaderContainer,
    localHeader
} = styles




export default class Section extends Component {
    constructor() {
        super();
        this.state = {
            open: false
        }

        this.textBox;
        this.slideBox = this.slideBox.bind(this)
        this.clickSlider = this.clickSlider.bind(this);
    }
    clickSlider(e) {
        e.preventDefault();
        if(this.state.open) {
            this.slideBox(false) 
        } else {
            this.slideBox(true);
        }
    }
    slideBox(newState,noTrigger) {
        if(this.state.open === newState) {
            return false; 
        }
        if(newState) {
            $(this.textBox).slideDown();
            this.setState({open: true})
        } else {
            $(this.textBox).slideUp();
            this.setState({open: false});
        }
        if(!noTrigger) {
         
            $(global.accordionListener).trigger("state_change_"+this.props.section, [this.props.order, newState]);
        }
        
        
    }
    componentDidMount() {
        $(global.accordionListener).on(`expand_${this.props.section}`, (e,state,noTrigger) => {
            
            this.slideBox(!state,noTrigger);
        } )
    }

    render({mod},{open}) {
        let openClass = (open)? isOpen : ""

        return <div class={`${aItem} ${openClass}`}>
        <a href="#" class={`${aHeader} ${openClass}`} onClick={this.clickSlider}>
          
            <div class={aHeaderContainer}>
                <div class={aHeaderText}>{mod.header}</div>
                <span href="#" class={`${headerLink} ${localHeader}`} >{(open) ? "Hide details" : "Show details"}</span>
            </div>
        </a>
        <div ref={h => this.textBox = h} class={`${readingText} ${textContent} ${textFullWidth}`} dangerouslySetInnerHTML={{__html: $(bodyContent(mod.html)).html().trim()}} />
    </div>
    }
} 


