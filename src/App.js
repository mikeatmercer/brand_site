import $ from "jquery";
import {Component} from "preact";
import Overview from "./homeSections/Overview";
import NavBar from "./navbar";
import CardSection from "./cardSections";
import HTMLclean from "./util/HTMLclean.js";
import style from "./style.scss";
import Hero from "./Hero";

export default class App extends Component {
    constructor(props) {
        super();

        let c = HTMLclean($("#contentBox").html())
        let mods = [];
        $("#contentBox #DeltaPlaceHolderMain table .s4-wpcell-plain").each(function(i,e){
            let title = $(e).find(".js-webpart-titleCell"),
                data = $(title).attr("title").split("-")[1].split("_");
            mods.push({
                header: $(title).text(),
                type: (data[0])? data[0].trim() : null,
                html: HTMLclean($(e).html()),
                attributes: (data[1]) ? data[1].split("|").map(e => e.trim()) : [] 
            })
        });
      

        this.state = {
            mods: mods,
            sections : ["topsection","overview","behave"]
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
            toMove = (section === "top") ? this.scrollSections[0] : this.scrollSections[section];
        $(box).animate({
            scrollTop: $(box).scrollTop() + ($(toMove).offset().top - $(box).offset().top - 35)
        })
     
    }
    clickScroll(e) {
        e.preventDefault();
        this.scroller(e.target.getAttribute("href").replace("#",""))
    }
    componentDidMount() {
       // $("#contentRow").remove();
        var l = location.hash.replace("#","");
        if(this.state.sections.indexOf(l) > -1) {
            this.scroller(l)
        }
   
  
    }
    render(p,{content}) {
        let cardSections = ["behave"].map((e) => <div ref={con => this.scrollSections[e] = con} id={e}><CardSection clickScroll={this.clickScroll} mod={this.modFilter(e)}/></div>)
        return <div class={style.globalstrategyapp}>
            <NavBar clickScroll={this.clickScroll} mods={this.state.mods} />
            <div id="topsection" ref={con => this.scrollSections["topsection"] = con}>
                <Hero clickScroll={this.clickScroll} mod={this.modFilter("topsection")} />
            </div>
            <div id="overview" ref={con => this.scrollSections["overview"] = con}>
                <Overview clickScroll={this.clickScroll} mod={this.modFilter("overview")} />
            </div>
            {cardSections}
            
            
            
        </div>
    }
} 
