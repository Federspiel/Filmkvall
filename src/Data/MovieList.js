import React from 'react'

class MovieList extends ObservableModel {
    constructor(){
        super();
        this._list = [];
    }


    getFullList() {
        return this._list;
    }
    addToList(Movie){
        this._list.push(Movie);
    }
    removeFromList(id){
        id = parseInt(id)
        let temp = this._list.findIndex(elem => elem.id === id );
        this._list.splice(temp,1);
    }
    getAvrageRating(movie){
       let avrage = (this._list.map(movie => movie.vote_average).reduce((a,b) => a + b))/this._list.length
        return avrage.toFixed(2);
    }
}