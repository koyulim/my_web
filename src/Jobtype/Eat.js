import axios from "axios";
import React, { useEffect, useState, Component } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

class Eat extends Component {

  constructor(props) {
    super(props);
    this.state = {
        crwal: []
    }
}
componentWillMount() {
    fetch('/api/crwal')
        .then(res => res.json())
        .then(data => this.setState({
            crwal: data
        }));
}
render() {
    const { crwal } = this.state;
    const postsList = crwal.map((post) => (
        <div key={post.id} id={post.id}>
            
            <h4>{post.text}</h4>
        </div>
    ));
   
    return (
        
        <div >
            <h2>확진자 현황</h2>
        <table>
            <tr>
                <td><h3>총 확진자 = </h3></td>
                <td>{postsList}</td>
            </tr>
        </table>
        </div>
    );
}
  
  
}
export default Eat;