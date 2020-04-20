import $ from "jquery"; 

export default function(s) {
    if(!s) {
        return s; 
    }
 

    const dom = new DOMParser().parseFromString(s, 'text/html');
    
    let domBody = dom.querySelector("body");
    $(domBody).find("script").remove();
   
    domBody.querySelectorAll("*").forEach((e) => {
       let tag = e.tagName.toLowerCase(0);
      
        if(tag !== "img") {
            e.removeAttribute("src");
        }
     
  
        if(["tr","td","tbody","th","table"].indexOf(e.tagName.toLowerCase()) > -1) {
            e.removeAttribute("class");
        }
        if(tag === "script") {
            e.innerHTML = ""
        }
        
    })
    
   
    return dom.body.innerHTML

}