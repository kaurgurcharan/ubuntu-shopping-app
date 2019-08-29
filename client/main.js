import './main.html';

import {Meteor} from 'meteor/meteor';
import React from 'react';
import ReactDOM from 'react-dom'; 
import {Tracker} from 'meteor/tracker';

import {Items} from './../imports/api/items';


const renderItems = (itemsList) => {
    return itemsList.map((item) => {
     return ( 
        <p key={item._id}>
            {item.item_name}
            <button onClick= {() => Items.remove({_id: item._id})}>X</button>
        </p>
        );
    });
};

//prevent a full page refresh... event handler
const handleSubmit = (e) => {
    let itemName = e.target.itemName.value;
    e.preventDefault();
    if(itemName) {
        e.target.itemName.value = '';
        Items.insert({
            item_name: itemName
        });
    }
};
Meteor.startup(() => {
    Tracker.autorun(() => {
        let items = Items.find().fetch();
        let title = 'Shopping List App';
        let jsx = (
            <div>
                <h1>{title}</h1>
                <p> Hello World </p>
                {renderItems(items)}
                <form onSubmit={handleSubmit}>
                    <input type ="text" name="itemName" placeholder="Item Name" />
                    <button>Add Item</button>
                </form>
            </div>
        );
        ReactDOM.render(jsx, document.getElementById('app'));
    });
  
});






