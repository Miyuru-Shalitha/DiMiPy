import { db } from "../firebase";
import { USERS } from "../constants/dbConsts";

const THEORY = "Theory";
const REVISION = "Revision";

const KURUNEGALA = "Kurunegala";
const KANDY = "Kandy";
const ALL_ISLAND = "All Island";

function getUserClassroomData(userId) {
  return db
    .collection(USERS)
    .doc(userId)
    .get()
    .then((doc) => {
      const data = doc.data();
      const classCode = generateClassCode(
        data.selectedYear,
        data.selectedCategory,
        data.selectedGroup
      );

      return {
        year: data.selectedYear,
        category: data.selectedCategory,
        group: data.selectedGroup,
        classCode: classCode,
        authorized: data.authorized,
      };
    })
    .catch((err) => {
      alert(err.message);
    });
}

function generateClassCode(year, category, group) {
  let categoryCode;
  let groupCode;

  switch (category) {
    case THEORY:
      categoryCode = "T";
      break;

    case REVISION:
      categoryCode = "R";
      break;

    default:
      alert("Invalid Category!");
  }

  switch (group) {
    case KURUNEGALA:
      groupCode = "Ku";
      break;

    case KANDY:
      groupCode = "Ka";
      break;

    case ALL_ISLAND:
      groupCode = "AI";
      break;

    default:
      alert("Invalid Group!");
  }

  return `class${year}${categoryCode}${groupCode}`;
}

export { getUserClassroomData, generateClassCode };
