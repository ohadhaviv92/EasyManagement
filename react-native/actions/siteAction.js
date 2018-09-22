export const SetSites = (Sites) => (dispatch) => {

    dispatch({
        type: 'SET_SITES',
        payload: Sites
    });

}

export const addSites = (Sites) => (dispatch) => {

    dispatch({
        type: 'ADD_SITES',
        payload: Sites
    });

}
export const RemoveSite = (Site) => (dispatch) => {
    dispatch({
        type: 'REMOVE_SITES',
        payload: Site
    });

}

export const SetSiteStatus = (SiteID,Status) => (dispatch) => {

    dispatch({
        type: 'SET_STATUS',
        payload: {SiteID,Status}
    });
}


    export const RemoveUserFromSite = (siteId) => (dispatch) => {

        dispatch({
            type: 'REMOVE_SITES',
            payload: {siteId}
        });

}
