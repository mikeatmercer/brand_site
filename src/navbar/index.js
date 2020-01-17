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
            aboveFold : false,
            sections : JSON.parse(localStorage.getItem("subNav")) || []
        }
        
    }
    componentDidMount() {
        $("#s4-workspace").on("scroll",function(e){
            if($(this.container).offset().top > $("#s4-workspace").offset().top) {  
                if(this.state.aboveFold) {
                    this.setState({aboveFold: false})
                }
            } else {
                if(!this.state.aboveFold) {
                    this.setState({aboveFold: true});
                }
            }
        }.bind(this));
        $.ajax({
            type: 'GET',
            url: `${SITE_DOMAIN}/_api/web/lists/GetByTitle('SubNav')/items`,
            headers: {
              "accept": "application/json;odata=verbose",
            },
            success: (data) => {
                if(!data.d.results.length) {
                    return; 
                }
              let items = data.d.results.map(e => {
                  return {
                      title: e.Title,
                      hash: e.Hash,
                  }
              });
              this.setState({sections: items});
              localStorage.setItem("subNav", JSON.stringify(items));
            }
        });
    }
    render(p,s) {
      
        let navClass = (s.aboveFold) ? `${barNav} ${above}` : barNav;
        let fixedStyles = {
            top: (s.aboveFold) ?  $("#s4-workspace").offset().top : null,
            left: (s.aboveFold) ? $(this.container).offset().left : null,
            width: (s.aboveFold) ? $(this.container).width() : null
        }
        let links = s.sections.map(e => <a href={`#${e.hash}`} onClick={p.clickScroll}>{e.title}</a>);
    
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