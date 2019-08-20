import * as React from "react";

export class Authentication extends React.Component<{},{}> {

    private signOut = () : void => {
        var auth2 : any = gapi.auth2.getAuthInstance();
        console.log(auth2.currentUser.Ab.w3.U3);
        auth2.signOut().then(() => {
            console.log('User signed out');
        });
    }
    

    render() {
        return (
            <React.Fragment>
                <div className="g-signin2"></div>
                <button onClick={()=>this.signOut()}>Sign out</button>
            </React.Fragment>

        )
    }
}