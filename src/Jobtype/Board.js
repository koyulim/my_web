
import { param } from "jquery";
import React, { Component } from "react";
class Board extends Component {
   
    render(){
        const params = window.location.search;
        const paramsId = params.split("=")[1]; // table name : Eat
        const paramsId1 = params.split("=")[3]; // key : key

        console.log("test table : " + paramsId);
        console.log("test id : " + paramsId1);


        return(
            <>
            안녕하세요
            </>
            
        )
    }
}
export default Board;
