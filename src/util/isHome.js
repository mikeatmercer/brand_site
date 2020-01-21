export default function() {
    return window.location.href.split("?")[0].split("#")[0].toLowerCase() == HOME_URL.toLowerCase();
}