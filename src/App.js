import $ from "jquery";
import {Component} from "preact";
import TopSection from "./homeSections/topSection.js"
import NavBar from "./navbar";
import HTMLclean from "./util/HTMLclean.js";
import style from "./style.css";

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
            mods: mods
        }
        this.modFilter = this.modFilter.bind(this);
        
    }
   
    modFilter(type) {
   
        return this.state.mods.filter(e => e.type == type)[0];
        
    }
    render(p,{content}) {
      
        return <div class={style.globalstrategyapp}>
            <NavBar />
            <TopSection mod={this.modFilter("topsection")} content={content} />
        </div>
    }
} 
