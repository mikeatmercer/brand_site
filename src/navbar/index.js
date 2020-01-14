import $ from "jquery";
import {Component} from "preact";
import style from "./style.scss";

const {
    barContainer,
    barNav,
    above
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
            if($(this.container).offset().top > $("#s4-workspace").offset().top) {
                this.setState({aboveFold: false})
            } else {
                this.setState({aboveFold: true});
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
    
        return <div ref={con => this.container = con} class={barContainer}>
            <nav class={navClass} style={fixedStyles}>
                <a href="home">Home</a>
            </nav>
        </div>
    }
}