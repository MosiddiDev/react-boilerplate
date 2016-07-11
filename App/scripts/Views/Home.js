import React from 'react';
var {home} = require('../config');

var Home = React.createClass({

    render: function() {
        return (
            <div className="app-view home container">
                <h2 className="header">{home.header}</h2>
                <div className="content">{home.content}</div>
            </div>
        );
    }
});

module.exports = Home;
