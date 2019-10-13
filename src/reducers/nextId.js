//actions
import uuidv4 from "uuid/v4";
export const getNextID = () => ({
  type: "NEW_ID"
});
const nextId = (state = uuidv4(), action) => {
  switch (action.type) {
    case "NEW_ID":
      return uuidv4();
    default:
      return state;
  }
};
export default nextId;
