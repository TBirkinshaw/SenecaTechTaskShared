import Question from "./question"
import React from "react"

export default interface QuestionContainerProps {
  question: Question, 
  setQuestion: React.Dispatch<React.SetStateAction<any>>;
}