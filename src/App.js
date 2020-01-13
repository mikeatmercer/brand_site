import $ from "jquery";
import {Component} from "preact";


export default class App extends Component {
    constructor(props) {
        super();
        this.state = {
            text: "teststd"
        }
        
    }
    componentDidMount() {
        const content = $("#contentBox").html();
        $("#contentRow").empty();
        setTimeout(function(){
            this.setState({text: "new text"})
        }.bind(this),2000)
    }
    render(p,{text}) {
        return <div>{text} </div>
    }
} 
