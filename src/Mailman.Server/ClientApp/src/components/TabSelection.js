import React, { Component } from 'react';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

import { Button, Grid } from '@material-ui/core';

import MergeTemplateInputForm from './MergeTemplate/MergeTemplateFormCard';
import { mergeTemplateInfoShape } from './MergeTemplate/MergeTemplatePropTypes';

export default class TabSelection extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedTab: this.props.currentMergeTemplate.sheetName,
            tabsList: []
        }

        this.updateMenuInput = this.updateMenuInput.bind(this);
        this.handleRouting = this.handleRouting.bind(this);
    }

    componentDidMount() {
        const config = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        fetch(`https://localhost:5001/api/Sheets/SheetNames/${this.props.spreadsheetId}`, config)
        .then(response => { // Use arrow functions so do not have to bind to "this" context
            return response.json();
        })
        .then(json => {
            this.setState({ tabsList: json });
        })
        .catch(error => {
            console.log("Error: Unable to get sheet tab data");
        })
    }

    updateMenuInput(newInput) {
        this.setState({ selectedTab: newInput });
    }

    handleRouting() {
        const oldSelection = this.props.currentMergeTemplate.sheetName;
        if (oldSelection !== this.state.selectedTab) {
            console.log("Different tab was selected");
            this.props.updateTabSelection(this.state.selectedTab);
        } else {
            console.log("Tab selection unchanged.");
        }
    }

    render() {
        return (
            <Grid
                container
                style={styles.container}
            >
                <MergeTemplateInputForm
                    title="Which tab are we sending from?"
                    mergeTemplateInfo={this.props.currentMergeTemplate}
                    menuInputTitle="Tab..."
                    menuInputSelected={this.state.selectedTab}
                    menuInputValues={this.state.tabsList}
                    menuInputCallback={this.updateMenuInput}
                    tip="This tab must contain all the information you may want to send in an email."
                />
                <Link to={`/mergeTemplate/title`}>
                    <Button
                        variant="contained"
                        style={styles.cancel_button}
                        onClick={() => this.handleRouting()}
                    >
                        Back
                    </Button>
                </Link>
                <Link to="/mergeTemplate/tabSelection">
                    <Button
                        color="primary"
                        variant="contained"
                        style={styles.next_button}
                        onClick={() => this.handleRouting()}
                        disabled={!this.state.selectedTab}
                    >
                        Next
                    </Button>
                </Link>
            </Grid>
        );
    }

}

const styles = {
    container: {
      paddingTop: 15,
      alignItems: "center",
    },
    cancel_button: {
      position: "absolute",
      bottom: 15,
      left: 15
    },
    next_button: {
      position: "absolute",
      bottom: 15,
      right: 15
    },
}

TabSelection.propTypes = {
    currentMergeTemplate: mergeTemplateInfoShape.isRequired,
    updateTabSelection: PropTypes.func.isRequired,
    spreadsheetId: PropTypes.string.isRequired,
}