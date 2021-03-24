
export default (svg, classString="") => {
    let inside = null;
    let  height = 24;
    let width = 24;  
    switch(svg) {
        case "arrow":
            inside = <g><path d="M0 0h24v24H0z" fill="none"/><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/></g>
            break
        case "info":
            inside = <g><path d="M0 0h24v24H0z" fill="none"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></g>
            break;
        case "x" : 
            inside = <g><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/><path d="M0 0h24v24H0z" fill="none"/></g>
            break;
        case "bscloud" :
            inside = <g><path d="M58.9097 32.4062H55.109C54.0639 32.4062 53.2087 31.5484 53.2087 30.5C53.2087 29.4516 54.0639 28.5938 55.109 28.5938H58.9097C59.9548 28.5938 60.81 29.4516 60.81 30.5C60.81 31.5484 59.9548 32.4062 58.9097 32.4062ZM5.70093 32.4062H1.90031C0.85514 32.4062 0 31.5484 0 30.5C0 29.4516 0.85514 28.5938 1.90031 28.5938H5.70093C6.74611 28.5938 7.60125 29.4516 7.60125 30.5C7.60125 31.5484 6.74611 32.4062 5.70093 32.4062ZM12.9221 14.8688C12.428 14.8688 11.953 14.6781 11.5729 14.3159L8.91246 11.6472C8.17134 10.9038 8.17134 9.70281 8.91246 8.95937C9.65358 8.21594 10.8508 8.21594 11.5919 8.95937L14.2523 11.6281C14.9935 12.3716 14.9935 13.5725 14.2523 14.3159C13.8913 14.6781 13.4162 14.8688 12.9221 14.8688ZM47.8879 14.8688C47.3938 14.8688 46.9187 14.6781 46.5386 14.3159C45.7975 13.5725 45.7975 12.3716 46.5386 11.6281L49.1991 8.95937C49.9402 8.21594 51.1374 8.21594 51.8785 8.95937C52.6196 9.70281 52.6196 10.9038 51.8785 11.6472L49.2181 14.3159C48.857 14.6781 48.3819 14.8688 47.8879 14.8688ZM30.405 7.625C29.3598 7.625 28.5047 6.76719 28.5047 5.71875V1.90625C28.5047 0.857812 29.3598 0 30.405 0C31.4502 0 32.3053 0.857812 32.3053 1.90625V5.71875C32.3053 6.76719 31.4502 7.625 30.405 7.625Z" />
            <path d="M48.648 36.2188H48.572C49.1231 34.3697 49.4081 32.4634 49.4081 30.5C49.4081 19.9966 40.8757 11.4375 30.405 11.4375C19.9343 11.4375 11.4019 19.9966 11.4019 30.5C11.4019 32.4634 11.6869 34.3697 12.238 36.2188C5.4919 36.2759 0 41.8231 0 48.6094C0 55.4338 5.54891 61 12.352 61H48.648C55.4511 61 61 55.4338 61 48.6094C61 41.785 55.4511 36.2188 48.648 36.2188ZM30.405 15.25C38.7854 15.25 45.6075 22.0934 45.6075 30.5C45.6075 32.635 45.1894 34.7128 44.3723 36.6572C44.2963 36.8287 44.2202 37.0003 44.1442 37.1719C43.9922 37.21 43.8592 37.2672 43.7072 37.3434C41.0087 31.9106 35.4598 28.4031 29.2648 28.4031C23.9629 28.4031 19.0411 31.0719 15.9816 35.4181C15.4495 33.8359 15.2025 32.1966 15.2025 30.5C15.2025 22.0934 22.0246 15.25 30.405 15.25ZM48.648 57.1875H12.352C7.63925 57.1875 3.80062 53.3369 3.80062 48.6094C3.80062 43.8819 7.63925 40.0312 12.352 40.0312C13.5682 40.0312 14.5564 40.2219 15.2975 40.5841C15.7536 40.8319 16.2857 40.8509 16.7798 40.6794C17.2738 40.5078 17.6539 40.1647 17.8819 39.6881C19.9723 35.1512 24.438 32.2156 29.2648 32.2156C34.5857 32.2156 39.2794 35.5897 40.9517 40.6412C41.1417 41.1941 41.5788 41.6325 42.1299 41.8422C42.7 42.0328 43.3081 41.9566 43.8022 41.6134C45.3414 40.6031 47.0517 40.0312 48.648 40.0312C53.3607 40.0312 57.1994 43.8819 57.1994 48.6094C57.1994 53.3369 53.3607 57.1875 48.648 57.1875Z" /></g>;
            width = 61; 
            height = 61; 
            break;
    }
    return (inside)? <svg class={classString} xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox={`0 0 ${width} ${height}`}>{inside}</svg> : null;
         
}