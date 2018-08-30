export default (state = [] , action) => {
  
    switch (action.type) {

        case 'ADD_SITES':
            return([...state].concat(action.payload))
        case "REMOVE_SITES":
            siteIndex = state.filter((item, index)=> {return item.SiteId == action.payload.SiteId ? index : -1})
            if(siteIndex == -1)
                return state;
            return state.splice(siteIndex, 1);
        default:
            return state;
    }
}