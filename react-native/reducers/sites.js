export default (state = [], action) => {

    switch (action.type) {
        
        case 'SET_SITES':
 
            return (
               action.payload
            )
        case 'SET_STATUS':
            return ([...state].map((site) => {
                let tempSite = site;
                if(site.SiteId == action.payload.SiteID) 
                    tempSite.SiteStatus = action.payload.Status;
                return tempSite;
            }))
        case 'ADD_SITES':
            return ([...state].concat(action.payload))
        case "REMOVE_SITES":
    siteIndex = state.filter((item, index) => { return item.SiteId == action.payload.SiteId ? index : -1 })
    if (siteIndex == -1)
        return state;
    return state.splice(siteIndex, 1);
        default:
    return state;
}
}