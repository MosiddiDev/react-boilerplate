import React from 'react';
var { ListGroup, ListGroupItem, FormControl, Pagination } = require('react-bootstrap');

var FilteredList = React.createClass({

    // React Object :: enables a little validation for the type of properties (props) that are passed into the component
    propTypes: {
        list: React.PropTypes.array, // array of objects to be listed
        listItemsPerPage: React.PropTypes.number // number of items to be listed per page
    },

    // React Lifecycle Function :: sets the default state values for component
    getInitialState: function(){
        return ({
            searchValue: "",
            activePage: 1,
            visibleList: []
        });
    },

    // React Lifecycle Function :: sets the default property (props) values for component
    getDefaultProps: function(){
        return ({
            list: [],
            listItemsPerPage: 5
        });
    },

    // React Lifecycle Function :: runs only once, after the component is mounted to the DOM
    componentDidMount: function(){
        this.pageSelect(1);
    },

    onSearchValueUpdate: function(e){
        this.state.searchValue = e.target.value;
        this.pageSelect(1);
    },

    // Sets visible list with a given page
    pageSelect: function(page, e){
        var filteredList = this.filteredList();
        var listItemsPerPage = this.props.listItemsPerPage;
        var firstVisbleListItem = (page - 1) * listItemsPerPage;
        var lastVisibleListItem = firstVisbleListItem + listItemsPerPage;

        this.setState({
            activePage: page,
            visibleList: filteredList.slice(firstVisbleListItem, lastVisibleListItem)
        });
    },

    // Returns the filtered list from searchString
    filteredList: function(){
        var searchString = this.state.searchValue.toUpperCase();
        var list = this.props.list;
        var filteredList = [];

        for(var i=0; i<list.length; i++){
            var listItem = list[i];

            // Search all properties for searchString text
            for(var prop in listItem){
                var propertyValue = listItem[prop].toString().toUpperCase();

                // true if the any property contains the value of the searchString
                if(propertyValue.indexOf(searchString) > -1){
                    // Add listItem to filteredList and break from inner loop
                    filteredList.push(listItem);
                    break;
                }
            }
        }

        return filteredList;
    },

    renderPaginationFooter: function(){
        var filteredList = this.filteredList();
        var totalNumberOfListItems = filteredList.length;
        var listItemsPerPage = this.props.listItemsPerPage;
        var numberOfVisibleListItems = this.state.visibleList.length;
        var numberOfPages = Math.ceil(totalNumberOfListItems / listItemsPerPage);
        var firstVisbleListItem = (this.state.activePage - 1) * listItemsPerPage + 1;
        var lastVisibleListItem = firstVisbleListItem + numberOfVisibleListItems - 1;
        var paginationStatus = `${firstVisbleListItem}-${lastVisibleListItem} of ${totalNumberOfListItems}`;

        return (
            <div>
                <div>{ paginationStatus }</div>
                <Pagination
                    prev
                    next
                    ellipsis
                    boundaryLinks
                    items={numberOfPages}
                    maxButtons={3}
                    activePage={this.state.activePage}
                    onSelect={this.pageSelect} />
            </div>
        );
    },

    // Properly formats all listItem properties in a listItem
    renderListItemProperties: function(listItem){
        var listItemProps = [];

        for(var prop in listItem){
            var propName = prop.toUpperCase();
            var propValue = listItem[prop];

            listItemProps.push(
                <div>
                    <b>{ propName }:  </b>
                    <span>{ propValue }</span>
                </div>
            );
        }

        return listItemProps;
    },

    renderListItem(listItem, index) {
        var numberInList = (this.state.activePage - 1) * this.props.listItemsPerPage + (index + 1);

        return (
            <ListGroupItem>
                <b>{ numberInList }</b>
                { this.renderListItemProperties(listItem) }
            </ListGroupItem>
        );
    },

    render: function() {
        return (
            <div>
                <FormControl type="text" placeholder="Enter Text" onChange={this.onSearchValueUpdate}/>
                <br/>
                <ListGroup className="filtered-list">
                    {
                        this.state.visibleList.map(this.renderListItem)
                    }
                </ListGroup>
                { this.renderPaginationFooter() }
            </div>
        );
    }

});

module.exports = FilteredList;
