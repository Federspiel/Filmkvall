import model from "../Data/apifetch";
import React from "react";
import { Component } from "react";
import { Link } from "react-router-dom";
import _ from 'lodash';
import "./SearchResult.css"


class SearchResult extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: "Loading",
            type: this.props.type
        };
    }

    componentDidUpdate(prevProps) {
        if(this.props.title !== prevProps.title || this.props.type !== prevProps.type) {
            this.getPicture();
        }
    }

    getPicture(){
        if(this.props.title !== ""){
            let debounceCall = _.debounce(() => {
                    model.getInfoByTitle(this.props.title,this.props.type).then(mov => {
                    this.setState(
                        {
                            status: "loaded",
                            movie: mov
                        }
                    )
                })
                    .catch(() => {
                        this.setState(
                            {status: "error"}
                        )
                    });
            },1000);
            debounceCall();
        }
        else {
            this.setState(
                {
                    status: "no search",
                }
            )
        }
    }

    hideResults(){
        document.getElementById("search-result-given").style.display = "none";
    }

    render() {
        let searchResults = null;
        switch (this.state.status) {
            case "loading":
                searchResults = <em>Loading...</em>;
                break;
            case "no search":
                searchResults = <div></div>;
                break;
            case "loaded":
                switch (this.props.type) {
                    case "movie":
                        searchResults = this.state.movie.results.slice(0,3).map(movie =>(
                            <Link className={"search-result-link"} to={"/Details/?movie&" + movie.id}>
                            <div className={"search-result"} onClick={() => this.hideResults()}>
                                <img src={"https://image.tmdb.org/t/p/w500" + movie.poster_path}/>
                                <div className={"search-title"}>
                                    <p>{movie.title}</p>
                                    <p>{movie.release_date}</p>
                                </div>
                            </div>
                            </Link>)
                        );
                    break;
                    case "tv":
                        searchResults = this.state.movie.results.slice(0,3).map(tv =>(
                            <Link to ={"/Details/?tv&" + tv.id} onClick={() => this.hideResults()}>
                            <div className={"search-result"}>
                                <img src={"https://image.tmdb.org/t/p/w500" + tv.poster_path}/>
                                <div className={"search-title"}>
                                    <p>{tv.name}</p>
                                    <p>{tv.first_air_date}</p>
                                </div>
                            </div>
                            </Link>)
                        );
                }

        }

        return(
            <div className={"search-result-body"}>
                {searchResults}
            </div>);
    }
}

export default SearchResult;
