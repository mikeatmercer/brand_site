
const attTrue = (list = [], att = null) => {
    
    if(list.indexOf(att) > -1) {
        return true;
    } else {
        return false ;
    }
}

const varFind = (list = [], variable = null) => {
    let attMatch = list.filter(e => e.indexOf(variable) > -1);
    if(!attMatch.length) {
        return false;
    }
    return attMatch[0].replace(variable,"");
}


export {attTrue, varFind}