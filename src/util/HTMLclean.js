import $ from "jquery"; 

export default function(s) {
    if(!s) {
        return s; 
    }
    var allowed_tags = [ 'h3', 'h4', 'h5', 'h6', 'blockquote', 'p', 'a', 'ul','ol','nl', 'li', 'b', 'i', 'strong', 'em', 'strike', 'code', 'hr', 'div','table', 'thead', "nobr", 'caption', "span", 'tbody', 'tr', 'th', 'td', 'pre', 'iframe','img' ];

    const dom = new DOMParser().parseFromString(s, 'text/html');
    let domBody = dom.querySelector("body");
   
   
    domBody.querySelectorAll("*").forEach(function(e,i){
       
        e.removeAttribute("style");
        if(e.tagName.toLowerCase() !== "img") {
            e.removeAttribute("src");
        }
        if(allowed_tags.indexOf(e.tagName.toLowerCase()) === "script") {
            e.innerHTML = "";
        }
        
    })
    
   
    return dom.body.innerHTML

}