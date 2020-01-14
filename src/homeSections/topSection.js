import $ from "jquery";


export default function({mod}) {
   if(!mod) {
       return false; 
   }
    const parser = new DOMParser()
   
    var newC = parser.parseFromString(mod.html, "text/html");
    
    let bodyC = $(newC).find(".ms-rtestate-field");
    let text = $(bodyC).clone();
    $(text).find('h1').remove();
  
    return <div class="tSec">
       <div class="kicker">{mod.header}</div> 
        <h1>{$(newC).find(".ms-rtestate-field h1").text()}</h1>
        <div class="content" dangerouslySetInnerHTML={{__html: $(text).html()}}  />
    </div>
}