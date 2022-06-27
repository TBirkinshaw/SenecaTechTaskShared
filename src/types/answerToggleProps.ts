import Gradient from "./gradient";
import OptionGroup from "./optionGroup";

export default interface AnswerToggleProps {
  optionGroup: OptionGroup,
  onToggle: CallableFunction,
  colors: Gradient,
  horizontal: boolean,
  isLocked: boolean,
}
