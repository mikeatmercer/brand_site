import bodyContent from "../util/bodyContent.js"
import {readingText, headerLink,textFullWidth} from "../sharedStyles.scss";
import styles from "./styles.scss";
import {useEffect,useRef} from "preact/hooks";
import $ from "jquery";

const {
    aItem,
    textContent,
    aHeader,
    aHeaderText,
    isOpenClass,
    aHeaderContainer,
    localHeader
} = styles

export default function({mod,isOpen,updater,order}) {
    const textBox = useRef(null);
    useEffect(()=>{
        if(!isOpen) {
            $(textBox.current).slideUp();
        } else {
            $(textBox.current).slideDown(); 
        }
    
    },[isOpen])

    let openClass = (isOpen)? isOpenClass : ""
    return <div class={`${aItem} ${openClass}`}>
        <a href="#" class={`${aHeader} ${openClass}`} onClick={(e)=>{e.preventDefault(); updater(order, !isOpen)}}>
            <div class={aHeaderContainer}>
                <div class={aHeaderText}>{mod.header}</div>
                <span href="#" class={`${headerLink} ${localHeader}`} >{(isOpen) ? "Hide details" : "Show details"}</span>
            </div>
        </a>
        <div ref={textBox} class={`${readingText} ${textContent} ${textFullWidth}`} dangerouslySetInnerHTML={{__html: $(bodyContent(mod.html)).html().trim()}} />

    </div>
}


