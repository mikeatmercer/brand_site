import style from "./styles.scss";
import {useState,useEffect} from "preact/hooks";
import ajaxCall from "../util/ajaxCall.js"

const {
    profileItem,
    profileImage,
    profileText,
    profileName,
    profileTitle,
    wImg   
} = style

export default function(p) {
   
    const [profile,updateProfile] = useState({});
    
    const profileData = (d) => {
        if(d.length < 1) {
            return;
        }
        
        let jobTitle = d.UserProfileProperties.results.filter(e => e.Key == "SPS-JobTitle");
        let newData = {
         name: d.DisplayName.split(",").reverse().map(e => e.trim()).join(" "),
         url : "http://mysites.mercer.com/Person.aspx?accountname="+d.AccountName,
         imgURL :(d.PictureUrl|| "").replace(":80",""),
         title : jobTitle[0].Value || ""     
         }
        updateProfile(newData);
    }
    useEffect(() => {
    
       let account = p.email.split("=")
       if(account.length < 2) {
           return 
       }
      
       ajaxCall(`${SITE_HOST}/_api/SP.UserProfiles.PeopleManager/GetPropertiesFor(accountName=@v)?@v=%27${account[1].replace(/[^\w\s\-%]/gi, '')}%27`,profileData)

    },[])

    const {
        imgURL,
        url,
        name,
        title
    } = profile
    let nameSplit = (name) ? name.split(" ").filter(e => e.length > 0).map(e=>e.charAt(0)).join("") : "";
  
    return <li class={profileItem}>
         <a 
         href={url || null} 
         style={{backgroundImage: (profile.imgURL)? `url(${profile.imgURL})` : null}} 
         class={`${profileImage} ${(imgURL)? wImg : ""}`} 
         data-init={`${(nameSplit.length > 1) ? nameSplit : ""}`}>
            <img src={imgURL} />
        </a>
        <div class={profileText}>
                <a href={url || null} class={profileName}>{name || " "}</a>
                <div class={profileTitle}>
                    {title || " "}
                </div>
        </div>
    </li>
}


