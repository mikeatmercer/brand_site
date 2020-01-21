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
            sections : JSON.parse(localStorage.getItem("subNav")) || [],
            lOffset: 0
        }
        this.scrollCheck = this.scrollCheck.bind(this);
        
    }
    scrollCheck() {

        if($(this.container).offset().top > $("#s4-workspace").offset().top) {  
            if(this.state.aboveFold) {
                this.setState({aboveFold: false})
            }
        } else {
            if(!this.state.aboveFold) {
                this.setState({aboveFold: true,lOffset :$(this.container).offset().left});
                this.setState()
            }
        }

    }
    componentDidMount() {
      
        this.setState({lOffset :$(this.container).offset().left})
        $("#s4-workspace").on("scroll",function(e){
            this.scrollCheck();
        }.bind(this));
        $(window).resize(function(){
            this.setState({lOffset : $(this.container).offset().left})
        }.bind(this))
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
   
        let isHome = (window.location.href.split("#")[0].toLowerCase() == HOME_URL.toLowerCase()),
            href = (isHome) ? "" : `${HOME_URL}`,
            scroller = (isHome) ? p.clickScroll : null,
            navClass = (s.aboveFold) ? `${barNav} ${above}` : barNav,
            fixedStyles = {
            top: (s.aboveFold) ?  $("#s4-workspace").offset().top : null,
            left: (s.aboveFold) ? s.lOffset : null,
            width: (s.aboveFold) ? $(this.container).width() : null
        }
  
        let links = s.sections.map(e => <a href={`${href}#${e.hash}`} onClick={scroller}>{e.title}</a>);
    
        return <div ref={con => this.container = con} class={barContainer}>
            <nav class={navClass} style={fixedStyles}>
                <a class={hhome} href={`${HOME_URL}`}>Our Strategy</a>
                <div class={lList}>
                    {links}
                </div>
            </nav>
        </div>
    }
}