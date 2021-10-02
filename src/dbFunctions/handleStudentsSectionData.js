import { db } from "../firebase";

function handleStudentsSectionData(selectedClassCode, setStudents) {
    db.collection("usersPublicData")
        .get()
        .then((data) => {
            const studentList = data.docs.map((student) => {
                if (student.data().classCode === selectedClassCode) {
                    return {
                        studentId: student.id,
                        studentData: student.data(),
                    };
                }
                return null;
            });

            // Filter valid values.
            setStudents(studentList.filter((student) => student !== null));
        })
        .catch((err) => {
            alert(err.message);
        });
}

export { handleStudentsSectionData };
