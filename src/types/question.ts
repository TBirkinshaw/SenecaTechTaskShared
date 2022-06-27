import OptionGroup from "./optionGroup";

export default interface Question {
  attempts: number;
  questionText: string;
  optionGroups: OptionGroup[];
  answersCorrect: CallableFunction;
  answersIncorrect: CallableFunction;
}