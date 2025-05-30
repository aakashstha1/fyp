import React, { useContext, useEffect, useRef, useState } from "react";

import { useAuth } from "@/contexts/AuthContext";
function QuestionsLayout() {
  const { currentUser } = useAuth;
  return (
    <>
      {/* <AddQuestionForm userId={currentUser} /> */}
    </>
  );
}
export default QuestionsLayout;
