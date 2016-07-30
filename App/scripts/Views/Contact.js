import React from 'react';
var FilteredList = require('../Components/FilteredList');
var {contact, data} = require('../config');

var Contact = React.createClass({

    render: function() {
        return (
            <div className="app-view container">
                <h2 className="header">{contact.header}</h2>
                <FilteredList list={contact.people} listItemsPerPage={3}/>
            </div>
        );
    }
});

module.exports = Contact;
