import $ from "jquery"

export default (url, callback, method="GET") => {
    $.ajax({
        type: method,
        url: url,
        headers: { "Accept": "application/json;odata=verbose" },
        success: (data) => {
            callback(data.d);
            return 
          
     
        }
    });
}