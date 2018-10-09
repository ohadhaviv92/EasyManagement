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
        return state.filter(item => item.SiteId != action.payload.siteId);

        default:
        return state;
}
}