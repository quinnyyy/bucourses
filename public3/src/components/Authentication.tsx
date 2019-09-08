import * as React from "react";

const GOOGLE_BUTTON_ID = "google-sign-in-button";

export class Authentication extends React.Component<{},{didLogin: boolean}> {
    constructor(props: {}) {
        super(props);
        this.state = {didLogin: false};
    }
    // private signOut = () : void => {
    //     var auth2 : any = gapi.auth2.getAuthInstance();
    //     console.log(auth2.currentUser.Ab.w3.U3);
    //     auth2.signOut().then(() => {
    //         console.log('User signed out');
    //     });
    // }
    

    // render() {
    //     return (
    //         <React.Fragment>
    //             <div className="g-signin2"></div>
    //             <button onClick={()=>this.signOut()}>Sign out</button>
    //         </React.Fragment>

    //     )
    // }
    
    onSuccess = (googleUser: any) => {
        const profile = googleUser.getBasicProfile();
        this.setState({ didLogin: true });
        console.log("Name: " + profile.getName());
      }

    componentDidMount() {
        console.log("Name: ");
        gapi.load('auth2', () => {
            gapi.auth2.init({
                client_id: "27000856552-tk70ev4o6nk5pln2ei93ni92semnndjk.apps.googleusercontent.com"
            }).then(() => {
                gapi.signin2.render(GOOGLE_BUTTON_ID, 
                    {
                        'width': 200,
                        'height': 50,
                        'longtitle': false,
                        'onsuccess': this.onSuccess
                    });
            })
        })
      }
      
      render() {
        return (
        <div>
          <div id={GOOGLE_BUTTON_ID}/>
          <p>{ this.state.didLogin === true ? 'hello' : 'bye' }</p>
        </div>
        );
      }
}