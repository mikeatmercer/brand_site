import $ from "jquery";
import {Component} from "preact";
import style from "./style.scss";
import isHome from "../util/isHome.js";

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
            sections : JSON.parse(localStorage.getItem("subNav")) || []
        }
       
        
    }
    
    componentDidMount() {

        $.ajax({
            type: 'GET',
            url: `${SITE_DOMAIN}/_api/web/lists/GetByTitle('SubNav')/items?$orderby=Order0`,
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
   
        
        let    href = (isHome()) ? "" : `${HOME_URL}`,
            scroller = (isHome()) ? p.clickScroll : null
           
  
        let links = s.sections.map(e => <a href={`${href}#${e.hash}`} onClick={scroller}>{e.title}</a>);
    
        return <div ref={con => this.container = con} class={barContainer}>
            <nav class={barNav}>
                <a class={hhome} href={`${HOME_URL}`}>Our Strategy</a>
                <div class={lList}>
                    {links}
                </div>
            </nav>
        </div>
    }
}