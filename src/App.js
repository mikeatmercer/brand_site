import $ from "jquery";
import {Component} from "preact";
import Overview from "./homeSections/Overview";
import NavBar from "./navbar";
import CardSection from "./cardSections";
import HTMLclean from "./util/HTMLclean.js";
import style from "./style.scss";
import Hero from "./Hero";
import TopText from "./TopText";
import Accordion from "./Accordion";
import PageCopy from "./PageCopy";
import Footer from "./Footer"; 
import {varFind,attTrue} from "./util/attFinders.js";
import {greyBG} from "./sharedStyles.scss";
import Alert from "./Alert";
import ajaxCall from "./util/ajaxCall.js";

export default class App extends Component {
    constructor(props) {
        super();
        
        let c = HTMLclean($("#contentBox").html())
        let mods = [];
        $("#contentBox #DeltaPlaceHolderMain table .s4-wpcell-plain").each(function(i,e){
            
            let title = $(e).find(".js-webpart-titleCell"),
                data = $(title).attr("title").split("-")[1].split("_");
            let item = {
                header: $(title).text(),
                type: (data[0])? data[0].trim() : null,
                html: HTMLclean($(e).html()),
                attributes: (data[1]) ? data[1].split("|").map(e => e.trim()) : [] 
            }
          
            mods.push(item);
        });
      

        this.state = {
            mods: mods,
            alert: null
            
        }
        this.scrollSections = [];
        this.modFilter = this.modFilter.bind(this);
        this.scroller = this.scroller.bind(this);
        this.clickScroll = this.clickScroll.bind(this)
    }
   
    modFilter(type) {
   
        return this.state.mods.filter(e => e.type == type)[0];
        
    }
    scroller(section) {
        
        let box = $("#s4-workspace"),
            toMove = (section === "top") ? this.scrollSections["navBar"] : this.scrollSections[section];
        $(box).animate({
            scrollTop: $(box).scrollTop() + ($(toMove).offset().top - $(box).offset().top )
        })
     
    }
    clickScroll(e) {
        e.preventDefault();
        this.scroller(e.target.getAttribute("href").replace("#",""))
    }
    componentDidMount() {
        if(PRODUCTION_BUILD) {
            $("#contentRow").remove();
        }
        $("#contentRow").remove();
        
        var l = location.hash.replace("#","");
        if(Object.keys(this.scrollSections).indexOf(l) > -1) {
            this.scroller(l)
        }    
        const alertData = (d) => {
            if(!d.results.length) {
                return ; 
            }
            let item = d.results[0];
            if(localStorage.getItem("dismissed_alert_"+item.ID) === "yes") {
                return ; 
            }
       
            this.setState({
                alert: item
            })
            $(global.alertCloser).on("alert_closed",() => {
                this.setState({alert: null});
            })
        }
        if(ALERT_LIST) {
            ajaxCall(`${SITE_DOMAIN}/_api/web/lists/GetByTitle('${ALERT_LIST}')/items?$orderby=Created desc&$filter=((Expiration_x0020_Date ge datetime'${new Date().toISOString()}') and (Hidden ne 1))`, alertData);
            
        }
  
    }
    render(p,{mods, alert}) {
        const realSections = ["Hero", "Overview", "Cards" , "SummaryText", "AccordionHeader", "PageCopy"];
      
        let liveSections = mods.filter(e => realSections.indexOf(varFind(e.attributes, "type")) > -1 );
    
        let cardSections = liveSections.map(function(e,i){
            let type = varFind(e.attributes, "type");
            if(realSections.indexOf(type) < 0) {
                return; 
            }
            let chi = null;
         
            switch(type) {
                case "Hero":
                    chi =  <Hero mod={e}  alert={(alert && i === 0)? alert : null} clickScroll={this.clickScroll} />
                    break;
                case "Overview":
                    chi = <Overview mod={e} order={i} clickScroll={this.clickScroll} />
                    break; 
                case "Cards":
                    chi = <CardSection mod={e} order={i} clickScroll={this.clickScroll} />
                    break;
                case "SummaryText":
                    chi = <TopText mod={e} allMods={mods} order={i} clickScroll={this.clickScroll} />
                    break;
                case "AccordionHeader":
                    chi = <Accordion mod={e} order={i} allMods={mods} clickScroll={this.clickScroll} /> 
                    break;
                case "PageCopy" : 
                    chi = <PageCopy mod={e} />
            }
            if(!chi) {
                return;
            }

            return <div class={(attTrue(e.attributes, "greyBG") ? greyBG : null)} id={e.type} ref={con => this.scrollSections[e.type] = con}>{chi}</div>

        }.bind(this));

        
        
        return <div class={style.globalstrategyapp}>
            
            <div id={"navBar"} ref={con => this.scrollSections["navBar"] = con}><NavBar clickScroll={this.clickScroll} mods={this.state.mods} /></div>
            {(alert)? <Alert alert={alert} onHero={(varFind(liveSections[0].attributes, "type") == "Hero")}/>: null}
            {cardSections}   
            <Footer clickScroll={this.clickScroll} />
        </div>
    }
} 
