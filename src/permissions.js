import {action, role} from "./constants"

const mappings = new Map ();
mappings.set (action.getLessons, [role.cadet, role.admin]);
mappings.set (action.addLesson, [role.admin]);
mappings.set (action.removeLesson, [role.admin]);
mappings.set (action.updateLesson, [role.admin]);


function hasPermission(role, action) {
 

  if (mappings.has(action)) {
    return mappings.get(action).includes(role);
  }

  return false;
}

export default hasPermission;
export { action, role };