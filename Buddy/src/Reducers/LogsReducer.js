export default function reducer(state={
  logs: [
      {id: 1, name: 'Lemon Drop', brand: "Dawg Star", product: 1, date:'01-01-2018', duration: 1, ranking: 3, activity: 3, type: 'sativa', flavors: { spicy: true, sweet: false, sour: false, earthy: false }, quantity: 1},
      {id: 2,  name: 'GG #4', brand: "Dawg Star", product: 1, date:'01-01-2018', duration: 1, ranking: 3, activity: 3, type: 'sativa', flavors: { spicy: true, sweet: false, sour: false, earthy: false }, quantity: 1},
      {id: 3, name: 'LA Confidential', brand: "Dawg Star", product: 1, date:'01-02-2018', duration: 1, ranking: 3, activity: 3, type: 'sativa', flavors: { spicy: true, sweet: false, sour: false, earthy: false }, quantity: 1},
      {id: 4, name: 'Frosted Flakes', brand: "Dawg Star", product: 1, date:'01-03-2018', duration: 1, ranking: 3, activity: 3, type: 'sativa', flavors: { spicy: true, sweet: false, sour: false, earthy: false }, quantity: 1},
      // {id: 3, name: 'Blueberry', brand: "Dawg Star", product: 1, date:'01-03-2018'},
      // {id: 6, name: 'Island Breeze', brand: "Western Cultured", product: 1, date:'01-03-2018'},
      // {id: 7, name: 'Kraken Black Pepper', brand: "Western Cultured", product: 1, date:'01-04-2018'},
      // {id: 8, name: 'PermaFrost', brand: "Western Cultured", product: 1, date:'01-04-2018'},
    ],
  selectedLog: null,
}, action) {

  switch(action.type) {
    case "ADD_LOG": {
      console.log('add log reducer')
      const ids = state.logs.map((obj) => {
        return obj.id
      })
      const nextId = Math.max(...ids);
      const newLog = action.payload;
      newLog.id = nextId;
      return {
        ...state,
        logs: [...state.logs, newLog],
      };
    }
    case "DELETE_LOG": {
      console.log('delete log reducer')
      return {
        ...state,
        logs: state.logs.filter(log => log.id !== action.payload.id)
      };
    }
    case "UPDATE_LOG": {
      console.log('update')
      const newLogs = state.logs.filter(log => log.id !== action.payload.id)
      newLogs.push(action.payload)
      return {
        ...state,
        logs: newLogs,
      }
    }
    case "SELECT_LOG": {
      console.log('select log');
      return {
        ...state,
        selectedLog: action.payload,
      }
    }
    case "DESELECT_LOG": {
      console.log('deselect log');
      return {
        ...state,
        selectedLog: null,
      }
    }
    return state;
  }
  return state;
}
