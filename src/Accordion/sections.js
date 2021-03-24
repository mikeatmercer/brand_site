import bodyContent from "../util/bodyContent.js"
import {readingText, headerLink,textFullWidth} from "../sharedStyles.scss";
import styles from "./styles.scss";
import {useEffect,useRef} from "preact/hooks";
import $ from "jquery";
import { varFind } from "../util/attFinders.js";

const {
    aItem,
    textContent,
    aHeader,
    aHeaderText,
    isOpenClass,
    aHeaderContainer,
    localHeader,
    aHeaderPill,
    aHeaderPillContainer,
    aHeaderExpand
} = styles


export default function({refIndex, mod,isOpen,updater,order,attributes,titleWidth}) {
    let pillClass = varFind(attributes, "pill");
    const textBox = useRef(null);
    const headers = []; 
    
    useEffect(()=>{
        if(!isOpen) {
            $(textBox.current).slideUp();
        } else {
            $(textBox.current).slideDown(); 
        }
    
    },[isOpen]);
    let pill =(pillClass)? <div class={aHeaderPillContainer}><div class={`${aHeaderPill} ${styles[`aHeaderPill--${pillClass}`]}`}>{pillClass}</div></div>: null;
    let accordionContent =  $(bodyContent(mod.html)).html().trim()
    let hLink = (varFind(attributes, "headLink") && varFind(attributes, "headURL"))? 
        <a class={` ${headerLink}`} target="_blank" onClick={(e) => {e.stopPropagation();}} href={varFind(attributes, "headURL")}>{varFind(attributes,"headLink")}</a> : null; 
   

    let openClass = (isOpen)? isOpenClass : ""
    return <div class={`${aItem} ${openClass}`}>
        <div href="#" class={`${aHeader} ${openClass}`} onClick={(e)=>{e.preventDefault(); updater(order, !isOpen)}}>
            <div class={aHeaderContainer}>
                <div class={aHeaderText} ref={refIndex} style={{width: titleWidth}}>{mod.header}</div>
                {pill}
                {hLink}
                <span href="#" class={`${aHeaderExpand} ${headerLink} ${localHeader}`} >{(isOpen) ? "Hide details" : "Show details"}</span>
            </div>
        </div>
        <div ref={textBox} class={`${readingText} ${textContent} ${textFullWidth}`} dangerouslySetInnerHTML={{__html:accordionContent}} />

    </div>
}


