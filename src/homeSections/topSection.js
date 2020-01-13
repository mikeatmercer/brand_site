import $ from "jquery";

export default function({content}) {
    console.log("mount");
    const parser = new DOMParser()
    var el = parser.parseFromString(content, 'text/html');
    console.log(el);
    let titles = el.querySelectorAll(".js-webpart-titleCell");
    let tEl = null,
        tText = "Welcome to Brigiiihter"; 
    $(titles).each(function(i,e){
        let tSplit = $(e).attr('title').split("-")
        if(tSplit.length > 1 && tSplit[1].trim() == "topsection") {
            tEl = e;
            tText = $(e).text();
            return false ; 
        }
    });
    let bodyC = parser.parseFromString($(tEl).closest(".s4-wpcell-plain").find(".ms-rtestate-field").html(), "text/html");
    console.log(bodyC);

    return <div class="tSec">
       <div class="kicker">{tText}</div> 
        <h1>{$(bodyC).find("h1").text()}</h1>
    </div>
}