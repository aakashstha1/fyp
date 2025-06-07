import React, { useContext, useEffect, useRef, useState } from "react";

import { useAuth } from "@/contexts/AuthContext";
import AddQuestionForm from "./AddQuestionForm";
function AddQuestionsLayout() {
  const { currentUser } = useAuth();
  return (
    <>
      <AddQuestionForm userId={currentUser} />
    </>
  );
}
export default AddQuestionsLayout;
