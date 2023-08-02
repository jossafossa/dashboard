import { watch, reactive } from 'vue';
import stateValue from './state/state.js';

let state = reactive(stateValue);

// Function to initialize state with the value from localStorage
const initStateFromLocalStorage = () => {
  const localStorageData = localStorage.getItem('state');
  if (localStorageData) {
    Object.assign(state, JSON.parse(localStorageData));
  }
};

// Initialize state from localStorage when the page is loaded
initStateFromLocalStorage();

// Watch for changes in the state and update localStorage accordingly
watch(state, (newState) => {
  localStorage.setItem('state', JSON.stringify(newState));
});

export default state;
