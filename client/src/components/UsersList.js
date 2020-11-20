import React from 'react'

export default class UsersList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data :  props.data,
            type : props.type

        
            } 
            
            this.getListData = this.getListData.bind(this);
            this.getKeys = this.getKeys.bind(this);
    }
    getKeys = function () {
        return Object.keys(this.props.data);
    }
    getListData = function () {
        var keys = this.getKeys();
        var items = this.state.data;
        return keys.map((userId, index) =>{
            return  <RenderListItem uID = {userId} userName = {items[userId]} key = {index}/> 
        })

    }
    
    render() {
        return (
            <div class="w3-container">
                <h1>{this.state.type}</h1>
                <table className="table table-hover">
                    <thead  className="thead-light"><tr>
                        <td>Name </td>
                        <td>ID </td>
                        </tr>
                        </thead>
                    <tbody>{this.getListData()}</tbody>
             
            </table>
            </div>

        );
    }

}

const RenderListItem = (props) => {
        var boxName = 'userRow'+props.uID;
    
        return <tr key={props.key} name = {boxName}>
            <td>{props.userName}</td>
            <td>{props.uID}</td>
            <td><button class="btn btn-primary">Change Role</button>
            <button class="btn btn-primary">Message</button>
            <button class="btn btn-primary">Remove</button>
            </td>
        </tr>

}