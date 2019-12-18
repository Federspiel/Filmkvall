import React, {Component} from "react";
import {Link} from "react-router-dom";
import model from "../Data/apifetch";
import Cinematography from "./Cinematography/Cinematography";

class PeopleDetails extends Component {

    constructor(props) {
        super(props);
        let searchId = window.location.href;
        let urlSplit = searchId.split("?");
        this.state= {
            status: "Loading",
            id: urlSplit[1]
        }

    }
    componentDidMount() {
        this.getPerson()
    }


    componentDidUpdate() {
        if (window.location.href !== this.state.url) {
            let searchId = window.location.href;
            let urlSplit = searchId.split("?");

            this.setState({
                url: searchId,
                status: "Loading",
                id: urlSplit[1]
            },()=>{
                this.getPerson()
            });
        }
    }

    getPerson(){
        model.getActorById(this.state.id).then(obj =>{
            this.setState(
                {
                    status: "Loaded",
                    actor: obj
                }
            )
        })
            .catch(() => {
                this.setState(
                    {status:"error"}
                )}
            )
    }

//todo inforamtion to add: cast, title,poster,synopsis,release_date,rating,similar_movies,original_lang,Budget,runtime,tagline
    render(){
        let movie = null;
        switch (this.state.status) {
            case("Loading"):
                movie = <em>Loading...</em>;
                break;
            case("Loaded"):
                movie = <div>
                    <img src={"https://image.tmdb.org/t/p/w500" + this.state.actor.profile_path}/>
                    <p> {this.state.actor.name}</p>
                    <p> {this.state.actor.place_of_birth} </p>
                    <p> {this.state.actor.known_for_department} </p>
                    <p> {this.state.actor.birthday}</p>
                    <p> {this.state.actor.biography}</p>
                </div>
                break;
        }
                return(
                    <div>
                        {movie}
                        <Cinematography id = {this.state.id}/>
                    </div>
                )
    }
}

export default PeopleDetails;