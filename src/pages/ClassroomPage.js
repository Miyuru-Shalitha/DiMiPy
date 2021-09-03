import React from "react";
import { auth } from "../firebase";

function ClassroomPage() {
  return (
    <div>
      <button
        onClick={() => {
          auth.signOut();
        }}
      >
        Log Out
      </button>
    </div>
  );
}

export default ClassroomPage;
