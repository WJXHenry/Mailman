export const LOAD_FROM_MERGE_TEMPLATES = "LOAD_FROM_MERGE_TEMPLATES";
export const UPDATE_TITLE_PAGE = "UPDATE_TITLE_PAGE";
export const UPDATE_TAB_SELECTION = "UPDATE_TAB_SELECTION";
export const UPDATE_HEADER_TITLES = "UPDATE_HEADER_TITLES";
export const UPDATE_SENDING_TO = "UPDATE_SENDING_TO";
export const UPDATE_SUBJECT = "UPDATE_SUBJECT"
export const UPDATE_EMAIL_BODY = "UPDATE_EMAIL_BODY";
export const UPDATE_SEND_TIME = "UPDATE_SEND_TIME";
export const UPDATE_CONDITIONAL = "UPDATE_CONDITIONAL";
export const UPDATE_VERSION_NUMBER = "UPDATE_VERSION_NUMBER";

export function loadFromMergeTemplates(mergeTemplate) {
  return ({
    type: LOAD_FROM_MERGE_TEMPLATES,
    mergeTemplate
  })
}

export function updateTitlePage(title, timestamp) {
  return ({
    type: UPDATE_TITLE_PAGE,
    payload: {
      title: title,
      timestamp: timestamp
    }
  });
}

export function updateTabSelection(tab) {
  return ({
    type: UPDATE_TAB_SELECTION,
    payload: {
      tab: tab
    }
  })
}

export function updateHeaderSelection(header) {
  return({
    type: UPDATE_HEADER_TITLES,
    payload: {
      header: header
    }
  })
}

export function updateVersionNumber() {
  return({
    type: UPDATE_VERSION_NUMBER
  })
}