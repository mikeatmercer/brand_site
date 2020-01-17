

export default function(html) {
  return  $(new DOMParser().parseFromString(html, "text/html")).find(".ms-rtestate-field")
}