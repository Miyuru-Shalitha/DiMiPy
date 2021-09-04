import {
  CLASS2021TKu,
  CLASS2022TKu,
  CLASS2023TKu,
  CLASS2021RKu,
  CLASS2021TKa,
  CLASS2022TKa,
  CLASS2023TKa,
  CLASS2021RKa,
  CLASS2021TAI,
  CLASS2022TAI,
  CLASS2023TAI,
  CLASS2021RAI,
  CLASSES,
} from "../constants/dbConsts";
import { db } from "../firebase";

/////////////////////Get classroom data./////////////////////
function getClassroomData(classId) {
  db.collection(CLASSES)
    .doc(classId)
    .get()
    .then((doc) => {
      console.log(doc.data());
    })
    .catch((err) => {
      alert(err.message);
    });
}

/////////////////////Kurunegala./////////////////////

///////////////Theory///////////////
function getClass2021TKu() {
  getClassroomData(CLASS2021TKu);
}

function getClass2022TKu() {
  getClassroomData(CLASS2022TKu);
}

function getClass2023TKu() {
  getClassroomData(CLASS2023TKu);
}
////////////////////////////////////

///////////////Revision/////////////
function getClass2021RKu() {
  getClassroomData(CLASS2021RKu);
}
////////////////////////////////////
//-------------------------------------------------//
/////////////////////Kandy./////////////////////

///////////////Theory///////////////
function getClass2021TKa() {
  getClassroomData(CLASS2021TKa);
}

function getClass2022TKa() {
  getClassroomData(CLASS2022TKa);
}

function getClass2023TKa() {
  getClassroomData(CLASS2023TKa);
}
////////////////////////////////////

///////////////Revision/////////////
function getClass2021RKa() {
  getClassroomData(CLASS2021RKa);
}
////////////////////////////////////

////////////////////////////////////////////////
//-------------------------------------------------//
/////////////////////All Island./////////////////////

///////////////Theory///////////////
function getClass2021TAI() {
  getClassroomData(CLASS2021TAI);
}

function getClass2022TAI() {
  getClassroomData(CLASS2022TAI);
}

function getClass2023TAI() {
  getClassroomData(CLASS2023TAI);
}
////////////////////////////////////

///////////////Revision/////////////
function getClass2021RAI() {
  getClassroomData(CLASS2021RAI);
}
////////////////////////////////////

////////////////////////////////////////////////

/////////////////////////////////////////////////////////////

export {
  getClass2021TKu,
  getClass2022TKu,
  getClass2023TKu,
  getClass2021RKu,
  getClass2021TKa,
  getClass2022TKa,
  getClass2023TKa,
  getClass2021RKa,
};
