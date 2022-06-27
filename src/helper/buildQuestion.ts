import Option from "../types/option";
import OptionGroup from "../types/optionGroup";
import Question from "../types/question";
import QuestionData from "../types/questionData";

// Takes raw QuestionData loaded in from JSON and converts it into a valid Question object
export default function BuildQuestion(questionData: QuestionData) : Question {
  const optionGroups: OptionGroup[] = [];

  const remainingCorrectAnswers = [...questionData.correctAnswers];
  const remainingIncorrectAnswers = [...questionData.incorrectAnswers];

  // optionGroup will be generated for each correct answer
  while (remainingCorrectAnswers.length > 0) {
    const correctAnswerIndex: number = Math.floor(Math.random() * remainingCorrectAnswers.length);
    const incorrectAnswerIndex: number = Math.floor(Math.random() * remainingIncorrectAnswers.length);

    const correctOption: Option = { text: remainingCorrectAnswers[correctAnswerIndex], isCorrect: true };
    const incorrectOption: Option = { text: remainingIncorrectAnswers[incorrectAnswerIndex], isCorrect: false };
    
    optionGroups.push({
      options: Math.floor(Math.random() * 2) === 0 ? [correctOption, incorrectOption] : [incorrectOption, correctOption],
      selectedOption: Math.floor(Math.random() * 2)
    })

    remainingCorrectAnswers.splice(correctAnswerIndex, 1);
    remainingIncorrectAnswers.splice(incorrectAnswerIndex, 1);

    // If there are more incorrectAnswers remaining than correctAnswers, add a second incorrect answer
    if (remainingIncorrectAnswers.length > remainingCorrectAnswers.length) {
      const extraIncorrectAnswerIndex: number = Math.floor(Math.random() * remainingIncorrectAnswers.length);
      const extraIncorrectOption: Option = { text: remainingIncorrectAnswers[extraIncorrectAnswerIndex], isCorrect: false };

      const indexToInsertAt: number = Math.floor(Math.random() * optionGroups.length + 1);
      optionGroups[optionGroups.length - 1].options.splice(indexToInsertAt, 0, extraIncorrectOption);
      optionGroups[optionGroups.length - 1].selectedOption = Math.floor(Math.random() * 3);
      remainingIncorrectAnswers.splice(extraIncorrectAnswerIndex, 1);
    }
  }
  // If all correct answers have been randomly selected, randomly make one incorrect
  if (optionGroups.filter(o => o.options[o.selectedOption].isCorrect).length === optionGroups.length) {
    const questionToChange: number = Math.floor(Math.random() * optionGroups.length);
    optionGroups[questionToChange].selectedOption = optionGroups[questionToChange].options.findIndex(o => { return !o.isCorrect });
  }

  const question: Question = {
    attempts: 0,
    questionText: questionData.questionText,
    optionGroups: optionGroups,
    answersCorrect: () => { return optionGroups.filter(group => group.options[group.selectedOption].isCorrect).length},
    answersIncorrect: () => { return optionGroups.filter(group => !group.options[group.selectedOption].isCorrect).length }
  };

  return question;
}