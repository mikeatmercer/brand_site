import $ from "jquery";
import {Component} from "preact";
import TopSection from "./homeSections/topSection.js"

export default class App extends Component {
    constructor(props) {
        super();
        this.state = {
            text: "teststd",
            content: $("#contentBox").html()
        }
        
    }
    componentDidMount() {
      
      //  $("#contentRow").empty();
        
    }
    render(p,{text,content}) {
        return <div id="global-strategy-app">
            <TopSection content={content} />
        </div>
    }
} 
