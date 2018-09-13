import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/AddCircle';


import { actionCreators } from '../store/MergeTemplates';

class Home extends Component {
  componentWillMount() {
    // This method runs when the component is first added to the page
    //const sheetId = ""; // TODO: get sheetId 
   //this.props.requestMergeTemplates(sheetId);
  }

  componentWillReceiveProps(nextProps) {
    // This method runs when incoming props (e.g., route params) change
    //const sheetId = ""; // TODO: get sheetId 
    //this.props.requestMergeTemplates(sheetId);
  }

  render() {
    return (
      <div>
        <p>Placeholder for mergeTemplates</p>
        <div>
          <IconButton color="inherit">
            <Link to="/addMergeTemplate">
              <AddIcon />
            </Link>
          </IconButton>
        </div>
      </div>
    );
  }
}



export default connect(
  state => state.mergeTemplates,
  dispatch => bindActionCreators(actionCreators, dispatch)
)(Home);
