import {Component} from "preact";
import style from "./styles.scss";



export default class Profile extends Component {
    constructor(props) {
        super(); 
        this.state = {
            imgURL: "",
        
            name: "",
            title: "",
            url: ""
        }
        this.getFullProps = this.getFullProps.bind(this)
    }
    getFullProps(login) {
        $.ajax({
            url: "http://sites.mercer.com/_api/SP.UserProfiles.PeopleManager/GetPropertiesFor(accountName=@v)?@v=%27"+ encodeURIComponent(login) +"%27",
            type: "GET",
            headers: { "Accept": "application/json;odata=verbose" },
            success: (data) => {
                let user = data.d;
         
               let jobTitle = user.UserProfileProperties.results.filter(e => e.Key == "SPS-JobTitle");
  
              this.setState({
                  url: "http://mysites.mercer.com/Person.aspx?accountname="+user.AccountName,
                  imgURL : (!user.PictureUrl) ? "" : user.PictureUrl.replace(":80",""),
                  title: (jobTitle.length) ? jobTitle[0].Value : ""
              })
              
            }
          })
        
    }
    componentDidMount() {
        if(!this.props.email) {
            return false; 
        }
    
        let parser = $("<div />")

       
        $.ajax({
            type: 'GET',
            url: `http://sites.mercer.com/_api/Web/SiteUsers?$filter=Email%20eq%20%27${encodeURI(this.props.email)}%27`,
            headers: {
              "accept": "application/json;odata=verbose",
            },
            success: (data) => {
               console.log(data);
               if(data.d.results.length < 1) {
                   return;
               }
               let user = data.d.results[0],
                    nameA = user.Title.split(",");
                this.setState({name:`${nameA[1]} ${nameA[0]}`})
               this.getFullProps(user.LoginName.split("|")[1]);
            }
        });
        
    }

    render({email},{imgURL,name,title,url}) {
        const {
            profileItem,
            profileImage,
            profileText,
            profileName,
            profileTitle,
            wImg   
        } = style
        let nameSplit = name.split(" ").filter(e => e.length > 0);
        return <li class={profileItem}>
            <a href={url || null} style={{backgroundImage: (imgURL)? `url(${imgURL})` : null}} class={`${profileImage} ${(imgURL)? wImg : ""}`} data-init={`${(nameSplit.length > 1) ? nameSplit[0].charAt(0)+nameSplit[1].charAt(0) : ""}`}>
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
}

//http://sites.mercer.com/sites/MercerStrategy/_api/Web/SiteUsers?$filter=Email%20eq%20%27mike.moore1@mercer.com%27

//`${SITE_DOMAIN}/_api/Web/SiteUsers?$filter=Email eq '${this.props.email}'`