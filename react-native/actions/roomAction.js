export const SetRooms = (Rooms) => (dispatch) => {
    dispatch({
        type: 'SET_ROOMS',
        payload: Rooms
    });
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