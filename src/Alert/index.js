import style from "./style.scss";
import SVG from "../util/SVG.js"

const {
    alertContainer,
    alertBar,
    imageIcon,
    noIcon,
    alertText,
    alertMask,
    closeButton,
    relative
} = style;

export default function({alert, onHero}){
   

    function closeClick(e) {
        e.preventDefault();
        localStorage.getItem("dismissed_alert_"+alert.ID);
        localStorage.setItem("dismissed_alert_"+alert.ID, "yes"); 
        $(global.alertCloser).trigger("alert_closed");
    }
   
    let iconURL = $(new DOMParser().parseFromString(alert.Icon, "text/html")).find("img").attr("src"),
        link = alert.Link,
        text = alert.Alert_x0020_Text

    
    return <div class={`${alertContainer} ${(!onHero)?relative:""}`}>
        <div class={`${alertBar} ${noIcon}`}>
                <div class={imageIcon} style={{backgroundImage: (iconURL) ? `url(${iconURL})` : ""}}>
                    {(!iconURL)? SVG("info") : ""}
                </div>  
                
            
            <div class={alertText}>
                <span>{text}</span> 
                {((link) ? SVG("arrow") : "")}
            </div>  
            {(link) ? <a class={alertMask} href={link}></a> : ""}
        <a class={closeButton} href="#" onClick={closeClick} >
            {SVG("x")}
        </a>
        </div>
        
        
    </div>
}