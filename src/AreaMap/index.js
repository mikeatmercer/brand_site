import styles from "./am_styles.scss";

const {
    mapContainer,
    mapOuter,
    clickArea,
    instructionText,
    mapInner
} = styles

export default function({mod,clickScroll}) {
    var html = mod.html;
   
    let img = $(html).find("img");
    if(!img.length) {
        return ; 
    }
    img = img[0];
    let areas = []; 
    $(html).find("area").each(function(i,e){
        areas.push(e);
    })
    let h2 = $(html).find(".ms-rtestate-field h2"),
        instr = (h2) ? <div class={instructionText}>{$(h2).text()}</div> : null;
    function clickHandler(i) {
        
        if($(i.target).attr("target")!== "_blank") {
            clickScroll(i)
            return false
        }
    }
    areas = areas.map(function(e){
        let outbound = ($(e).attr("target") === "_blank");
        let coor = $(e).attr("coords").split(",");
        coor = coor.map(e => parseInt(e))
   
        let styles = {
            left: coor[0],
            top: coor[1],
            width: coor[2] - coor[0],
            height: coor[3] - coor[1]
        }
        
        return <a target={(outbound)?"_blank":""} href={$(e).attr("href")} onClick={clickHandler} style={styles} class={clickArea}></a>
    })

    return <div class={mapOuter}>
        <div class={mapContainer}>
            {instr}
            <div class={mapInner}><img src={$(img).attr("src")} />{areas}</div>
            
        </div>
    </div>
}