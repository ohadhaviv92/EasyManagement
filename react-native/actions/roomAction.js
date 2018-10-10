export const SetRooms = (Rooms) => (dispatch) => {
    dispatch({
        type: 'SET_ROOMS',
        payload: Rooms
    });
}


export const SetCurRoom = (RoomId) => (dispatch) => {
    dispatch({
        type: 'SET_CUR_ROOM',
        payload: RoomId
    })
}

export const AddRooms = (Rooms) => (dispatch) => {
    dispatch({
        type: 'ADD_ROOMS',
        payload: Rooms
    });
}

export const RemoveRoom = (Room) => (dispatch) => {
    dispatch({
        type: 'REMOVE_ROOM',
        payload: Room
    });
}


export const SetRoomsType = (Rooms) => (dispatch) => {
    dispatch({
        type: 'SET_ROOMS_TYPE',
        payload: Rooms
    });
}
