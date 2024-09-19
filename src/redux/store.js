import { createStore } from 'redux';
import rootReducer from './reducers';  // Убедитесь, что здесь импортируется функция

const store = createStore(rootReducer);

export default store;
