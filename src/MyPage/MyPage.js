import React, { Component } from "react";
import "./MyPage.css"

import ListContainer from "../ListContainer/ListContainer";


class MyPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
			user: this.props.userModel.getUser(),
			userID: this.props.userModel.getUserID()
		};
		//console.log(this.props.userModel.getUserID());

	

	
    }

    componentDidMount() {
        this.props.userModel.addObserver(this);
    }

    componentWillUnmount() {
        this.props.userModel.removeObserver(this);
    }

    update(){
        this.setState({
            user: this.props.userModel.getUser()
        })
    }

    render() {
        let user = null;
        let profileImg = null;


         switch(this.state.user){
             case null:
                user = <p>Please login</p>;
                break;
             case undefined:
                 user = <p>Loading</p>;
                 break;
             default:
                if (this.state.user.photoURL === null) {
                profileImg = "../Logo_Filmkvall.png"
                    user = <div className={"profilePic"}>
                        <img src={profileImg}/>
                        <p>{this.state.user.email}</p>
                    </div>
                }
                else{
                profileImg = this.state.user.photoURL
                 user = <div className={"profilePic"}>
                <img src={profileImg}/>
                <p>{this.state.user.email}</p>
            </div>}
                break;
        }

        return(
            <div>
				{user}
				<ListContainer userID={this.props.userModel.getUserID()} />
            </div>
        );
    }
}

export default MyPage;