import $ from "jquery";
//import {Component} from "preact";
import Overview from "./homeSections/Overview";
import NavBar from "./navbar";
import CardSection from "./cardSections";
import HTMLclean from "./util/HTMLclean.js";
import style from "./style.scss";
import Hero from "./Hero";
import TopText from "./TopText";
import Accordion from "./Accordion";
import PageCopy from "./PageCopy";
import Footer from "./Footer"; 
import {varFind,attTrue} from "./util/attFinders.js";
import {greyBG, blueBG} from "./sharedStyles.scss";
import Alert from "./Alert";
import ajaxCall from "./util/ajaxCall.js";
import {useState,useEffect, useRef} from "preact/hooks";
import isHome from "./util/isHome.js"
import AreaMap from "./AreaMap";


function parseMods() {
    let mods = [];
    $("#contentBox #DeltaPlaceHolderMain table .s4-wpcell-plain").each(function(i,e){

        if($(e).find(".ms-hide").length) {
            return ;
        }
        let d = new Date()
        let title = $(e).find(".js-webpart-titleCell")
        let mTitle = $(title).text().trim()
        
        let attrdata = ($(title).attr("title") || "null-null").replace(mTitle, d.getTime())
        let data = attrdata.split("-")[1].split("_");
        let item = {
            header: mTitle,
            type: data[0].trim(),
            html: HTMLclean($(e).html()),
            attributes: (data[1]) ? data[1].split("|").map(e => e.trim()) : [] 
        }
       
      
        mods.push(item);
    });
  
    
    return mods; 
}

export default function () {
    const [mods] = useState(parseMods());

    const [alert, updateAlert] = useState(null);
    const realSections = ["Hero", "Overview", "Cards" , "SummaryText", "AccordionHeader", "PageCopy","AreaMap","Callout"];
    let liveSections = mods.filter(e => realSections.indexOf(varFind(e.attributes, "type")) > -1 );
    let scrollSections = {navBar: useRef(null) };
    
    liveSections.forEach((e)=> {
        scrollSections[e.type] = useRef(null)
    });
    console.log(liveSections);
    
    const scroller = (section) => {
      
        let box = $("#s4-workspace"),
        toMove = (section === "top") ? scrollSections["navBar"].current : scrollSections[section].current;
        $(box).animate({
            scrollTop: $(box).scrollTop() + ($(toMove).offset().top - $(box).offset().top )
        })
    }
    const clickScroll = (e) => {
        
        e.preventDefault();
        let theTarget = e.currentTarget || e.target;
        scroller(theTarget.getAttribute("href").replace("#",""))
    }
    useEffect(()=>{
        if(PRODUCTION_BUILD) {
            $("#contentRow").remove();
        }
        $(window).load(function(){
            $(window).trigger('resize');
        })
        //$("#contentRow").remove();
        
        var l = location.hash.replace("#","");
        if(Object.keys(scrollSections).indexOf(l) > -1) {
            scroller(l)
        }    
        const alertData = (d) => {
            if(!d.results.length) {
                return ; 
            }
            let item = d.results[0];
            if(localStorage.getItem("dismissed_alert_"+item.ID) === "yes") {
                return ; 
            }
            updateAlert(item)
            
            $(global.alertCloser).on("alert_closed",() => {
                updateAlert(null);
            })
        }
        if(ALERT_LIST) {
            ajaxCall(`${SITE_DOMAIN}/_api/web/lists/GetByTitle('${ALERT_LIST}')/items?$orderby=Created desc&$filter=((Expiration_x0020_Date ge datetime'${new Date().toISOString()}') and (Hidden ne 1))`, alertData);
            
        }
    },[])
   
    let cardSections = liveSections.map((e,i) =>{
        let type = varFind(e.attributes, "type");
        if(realSections.indexOf(type) < 0) {
            return; 
        }
        let chi = null;
        let props = {
            mod: e,
            alert: alert,
            order: i,
            allMods : mods,
            clickScroll: clickScroll
        }
        
        switch(type) {
            case "Hero":
                chi =  <Hero {...props} />
                break;
            case "Overview":
                chi = <Overview {...props}  />
                break; 
            case "Cards":
                chi = <CardSection {...props}  />
                break;
            case "SummaryText":
                chi = <TopText {...props}  />
                break;
            case "AccordionHeader":
                chi = <Accordion {...props} /> 
                break;
            case "PageCopy" : 
                chi = <PageCopy {...props} />
                break;
            case "AreaMap" : 
                chi = <AreaMap {...props} />
                break;
            
        }
        if(!chi) {
            return;
        }

        return <div  class={`  ${style.sectionContainer} ${(isHome())? style.homeBreaks: ""} ${(attTrue(e.attributes, "greyBG") ? greyBG : null)}  ${(attTrue(e.attributes, "blueBG") ? blueBG : null)}`} id={e.type} ref={scrollSections[e.type]}>{chi}</div>

    });
    
    return <div class={style.globalstrategyapp}>
            
            <div id={"navBar"} ref={scrollSections["navBar"]}><NavBar clickScroll={clickScroll} mods={mods} /></div>
            {(alert)? <Alert alert={alert} onHero={(varFind(liveSections[0].attributes, "type") == "Hero")}/>: null}
            {cardSections}   
            <Footer clickScroll={clickScroll} />
    </div>
}
