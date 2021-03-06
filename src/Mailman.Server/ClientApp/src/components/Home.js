import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Fab from '@material-ui/core/Fab';
import AddIcon from "@material-ui/icons/AddCircle";
import Grid from "@material-ui/core/Grid";
import Button from '@material-ui/core/Button';

import { Tooltip } from '@material-ui/core';

// import { actionCreators } from "../store/MergeTemplates";
import InfoCard from "./MergeTemplate/InfoCard";
import {
  fetchMergeTemplatesIfNeeded
} from '../actions/readMergeTemplates'
import { isAbsolute } from "path";
import { loadFromMergeTemplates } from "../actions/createMergeTemplate";

const queryString = require('query-string');


const styles = theme => ({
  
  largeButton: {
    width: 50,
    height: 50,
    
  },
  place: {
    position: 'absolute',
    bottom: -500,
  }
});
class Home extends Component {

  constructor(props){
    super(props)
    this.state = {
      mergeTemplates: []
    }

    

  }

  // 
  componentDidMount() {
    
    //const { dispatch } = this.props
    //console.log(this.props);
    const parsed = queryString.parse(this.props.location.search);
    let spreadsheetId = parsed.ssid; //parse query
   // console.log(spreadsheetId);
    const {dispatch} = this.props;
    //const {fetchMergeTemplatesIfNeeded} = this.props;
    //spreadsheetId = '1MiRwI8yIQSmnzBXjtFFSHqmU8t5TaOMqcnZG3aszn6o'
    if (spreadsheetId){
      console.log("Fetch merge templates if needed")
      dispatch(fetchMergeTemplatesIfNeeded(spreadsheetId));
      // fetchMergeTemplatesIfNeeded(spreadsheetId);
    }
    //'1GnoG6twy6OC9jQw7-KeZBR02znTW8VkR7Yp2Wf2JlrY'
    //console.log(test);
 
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
   console.log(this.props);
   console.log(typeof this.props.mergeTemplates);
   console.log('Piano');
   const { classes } = this.props;

    return (
      <div>
        
        <div>
          <Grid container spacing={16}>
            {this.props.mergeTemplates.map(mergeTemplate => (
              <Grid key={mergeTemplate.id} item xl={12}>
                <InfoCard
                  title={mergeTemplate.title}
                  to='{mergeTemplate.mergeData.data.to}'
                  id = {mergeTemplate.id}
                />
              </Grid>
            ))}
          </Grid>
         
        </div>
        <div>
        <Link to="/mergeTemplate/title" onClick={() => this.props.dispatch(loadFromMergeTemplates())}>
          <Tooltip title="New Merge Template" placement="top">
            <AddIcon className={classes.largeButton} style={{position: "absolute", bottom: 10, right: 10}} color="error" />
          </Tooltip>
        </Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    mergeTemplates: state.mergeTemplates.mergeTemplates
  };
};

const mapDispatchToProps = dispatch => {
  console.log("From map dispatch to props - Home");
  return {
    fetchMergeTemplatesIfNeeded: (spreadSheetId) =>
      // dispatch({
      //   type: 'FETCH_MERGE_TEMPLATES' //spreadsheet??
      // })
      dispatch(fetchMergeTemplatesIfNeeded(spreadSheetId))
  }

}
//iconStyle={{height: 48, width: 48}}
const exportWithStyles = withStyles(styles, { withTheme: true })(Home); //do you have to export with styles everywhere?

// export default connect(
//   mapStateToProps,
//   dispatch => bindActionCreators(actionCreators, dispatch) //should we be using bindActionCreators? check back //also should probably 
// )(exportWithStyles);


// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(exportWithStyles);

export default connect(mapStateToProps)(exportWithStyles);