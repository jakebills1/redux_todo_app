export const loadState = () => {
  // function to retrieve a key called 'state' from local storage. if anything should go wrong, it will return undefined, and reducers will return default state as written in functions
  try {
    const serializedState = localStorage.getItem("state");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const saveState = state => {
  // will try to serialize state as json then put in local storage
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("state", serializedState);
  } catch (error) {
    console.log(error);
  }
};
