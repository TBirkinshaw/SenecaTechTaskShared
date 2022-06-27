import React, { useState } from 'react';

import BuildQuestion from './helper/buildQuestion';
import Question from './types/question';
import QuestionContainer from './components/QuestionContainer';
import QuestionData from './types/questionData';
import questionFile from './assets/questions.json'

// Loads a random question from the questions.json file
function LoadQuestion(): Question { 
  const questionData: QuestionData = questionFile.questions[Math.floor(Math.random() * questionFile.questions.length)];

  return BuildQuestion(questionData);
}

function App() {
  const [question, setQuestion] = useState(LoadQuestion());

  return (
    <div className="App">
      <QuestionContainer
        question={question}
        setQuestion={setQuestion}
      />     
    </div>
  );
}

export default App;
