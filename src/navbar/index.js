import $ from "jquery";
import {Component} from "preact";
import style from "./style.scss";

const {
    barContainer,
    barNav,
    above,
    hhome,
    lList
} = style

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            aboveFold : false
        }
        
    }
    componentDidMount() {
        $("#s4-workspace").on("scroll",function(e){
            if($(this.container).offset().top >= $("#s4-workspace").offset().top) {  
                if(this.state.aboveFold) {
                    this.setState({aboveFold: false})
                }
            } else {
                if(!this.state.aboveFold) {
                    this.setState({aboveFold: true});
                }
            }
        }.bind(this));
    }
    render(p,s) {
      
        let navClass = (s.aboveFold) ? `${barNav} ${above}` : barNav;
        let fixedStyles = {
            top: (s.aboveFold) ?  $("#s4-workspace").offset().top : null,
            left: (s.aboveFold) ? $(this.container).offset().left : null,
            width: (s.aboveFold) ? $(this.container).width() : null
        }
        let links = p.mods.map(function(e){
            if(e.type == "overview") {
                return false; 
            }
            let title = (e.type == "topsection") ? "Home" : e.header
            return <a href={`#${e.type}`} onClick={p.clickScroll}>{title}</a>
        });
    
        return <div ref={con => this.container = con} class={barContainer}>
            <nav class={navClass} style={fixedStyles}>
                <a class={hhome} href="home">Our Strategy</a>
                <div class={lList}>
                    {links}
                </div>
            </nav>
        </div>
    }
}