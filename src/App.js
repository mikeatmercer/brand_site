import $ from "jquery";
import {Component} from "preact";
import TopSection from "./homeSections/TopSection"
import Overview from "./homeSections/Overview";
import NavBar from "./navbar";
import CardSection from "./cardSections";
import HTMLclean from "./util/HTMLclean.js";
import style from "./style.scss";

export default class App extends Component {
    constructor(props) {
        super();

        let c = HTMLclean($("#contentBox").html())
        let mods = [];
        $("#contentBox #DeltaPlaceHolderMain table .s4-wpcell-plain").each(function(i,e){
            let title = $(e).find(".js-webpart-titleCell");
            mods.push({
                header: $(title).text(),
                type: ($(title).attr('title'))? $(title).attr('title').split("-")[1].trim() : null,
                html: HTMLclean($(e).html())
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
        if(this.state.sections.indexOf(section) < 0) {
            return false; 
        }
        

        let box = $("#s4-workspace"),
            toMove = this.scrollSections[section];
        $(box).animate({
            scrollTop: $(box).scrollTop() + ($(toMove).offset().top - $(box).offset().top - 35)
        })
     
    }
    clickScroll(e) {
        e.preventDefault();
        this.scroller(e.target.getAttribute("href").replace("#",""))
    }
    componentDidMount() {
        $("#contentRow").remove();
    }
    render(p,{content}) {
        let cardSections = ["behave"].map((e) => <div ref={con => this.scrollSections[e] = con} id={e}><CardSection clickScroll={this.clickScroll} mod={this.modFilter(e)}/></div>)
        return <div class={style.globalstrategyapp}>
            <NavBar clickScroll={this.clickScroll} mods={this.state.mods} />
            <div id="topsection" ref={con => this.scrollSections["topsection"] = con}>
                <TopSection clickScroll={this.clickScroll} mod={this.modFilter("topsection")} content={content} />
            </div>
            <div id="overview" ref={con => this.scrollSections["overview"] = con}>
                <Overview mod={this.modFilter("overview")} />
            </div>
            {cardSections}
            
            
            
        </div>
    }
} 
