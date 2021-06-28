import styles from "./styles.scss";

const{
    btn
} = styles

export default function(p) {
    function clickHandler(e) {
        if(p.clickHandler) {
            p.clickHandler(e);
            return false;
        }
    }
    
    return <a target={(p.outbound)?"_blank": ""} class={`${btn} ${styles[p.style]}`} href={p.href} onClick={clickHandler}><span>{p.text}</span></a>
}