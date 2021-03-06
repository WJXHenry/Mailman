export const REQUEST_MERGE_TEMPLATES = "REQUEST_MERGE_TEMPLATES";
export const RECEIVE_MERGE_TEMPLATES = "RECEIVE_MERGE_TEMPLATES";
//delete
//start new

 //export const FETCH_MERGE_TEMPLATES_REQUEST   = 'FETCH_MERGE_TEMPLATES_REQUEST';
 //export const FETCH_MERGE_TEMPLATES_SUCCESS = 'FETCH_MERGE_TEMPLATES_SUCCESS';
 //export const FETCH_MERGE_TEMPLATES_FAILURE = 'FETCH_MERGE_TEMPLATES_FAILURE';




function shouldFetchMergeTemplates() {
    //TODO: make it so we don't issue a duplicate request 
    //if isLoading is true, return false
    //if we already have the data return false

    return true;
}

export function fetchMergeTemplatesIfNeeded(spreadsheetId) {
    return (dispatch, getState) => {
      if (shouldFetchMergeTemplates(spreadsheetId)) {
        return dispatch(fetchMergeTemplates(spreadsheetId))
      }
    }
}
  
export function fetchMergeTemplates(spreadsheetId) {
    const config = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
    };

    return dispatch => {
        dispatch(requestMergeTemplates(spreadsheetId));
        return fetch(`https://localhost:5001/api/MergeTemplates/${spreadsheetId}`, config)
        .then(response => {
            console.log(response);
            return response.json();
        })
        .then(json => {
            //debugger
            console.log('Made it to this part! ', json[0]);
            dispatch(receiveMergeTemplates(spreadsheetId, json));
            return json;
        })
    };
}

export function requestMergeTemplates(spreadsheetId) {
    return {
        type: REQUEST_MERGE_TEMPLATES,
        spreadsheetId
    }
}
  
export function receiveMergeTemplates(spreadsheetId, json) {
    return {
        type: RECEIVE_MERGE_TEMPLATES,
        payload: {
            mergeTemplates: json,
            spreadsheetId: spreadsheetId
        }
    }   
}

// save mergeTemplate?? -> config -> method POST

/*
export function addMergeTemplate(spreadsheetId, data) {

    const testData = {
        "id": "test_id_1",
        "spreadSheetId": "hello",
        "type": "Email",
        "createdBy": "string",
        "createdDateUtc": "2019-03-07T21:34:00.846Z",
        "version": "string",
        "title": "string",
        "sheetName": "string",
        "headerRowNumber": 1,
        "timestampColumn": {
            "name": "string",
            "shouldPrefixNameWithMergeTemplateTitle": true,
            "title": "string"
        },
        "conditional": "string",
        "repeater": "Off",
        "emailTemplate": {
            "to": "string",
            "cc": "string",
            "bcc": "string",
            "subject": "string",
            "body": "string"
        }
    }

    data = data || testData;

    const config = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: data
    };

    return dispatch => {
        dispatch(requestMergeTemplates(spreadsheetId));
        return fetch(`https://localhost:5001/api/MergeTemplates/${spreadsheetId}`, config)
        .then(response => {
            console.log(response);
            return response.json();
        })
        .then(json => {
            //debugger
            console.log('Made it to this part! ', json[0]);
            dispatch(receiveMergeTemplates(spreadsheetId, json));
            return json;
        })
    };
}

*/