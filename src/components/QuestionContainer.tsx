import './QuestionContainer.css';

import { useEffect, useState } from "react";

import AnswerToggle from './AnswerToggle';
import BackgroundGradients from '../helper/backgroundGradients';
import Backgrounds from '../types/backgrounds';
import Gradient from '../types/gradient';
import OptionGroup from '../types/optionGroup';
import QuestionContainerProps from '../types/questionContainerProps';
import useMeasure from 'react-use-measure';

export default function QuestionContainer({ question, setQuestion }: QuestionContainerProps) {
  const [background, setBackground] = useState(BackgroundGradients().incorrect);
  const [gradientOverlay, setGradientOverlay] = useState(BackgroundGradients().none);
  const [correct, setCorrect] = useState(false);
  const [ref, bounds] = useMeasure();

  // Determines the background gradient based on the number of correct answers
  useEffect(() => {
    if (question.attempts === 0) return; // If the question hasn't been attempted, it defaults to the .incorrect background
    const backgroundGradients: Backgrounds = BackgroundGradients();
    switch (question.answersCorrect()) {
      case 0:
        TransitionGradient(backgroundGradients.incorrect);
        break;
      case question.optionGroups.length:
        TransitionGradient(backgroundGradients.correct);
        setCorrect(true);
        break;
      case 1:
        TransitionGradient(backgroundGradients.partial1);
        break;
      case 2:
        TransitionGradient(backgroundGradients.partial2);
        break;
      default:
        TransitionGradient(backgroundGradients.partial3);
        break;
    }
  }, [question])

  // Performs a 1 second animation to transition between background gradients
  function TransitionGradient(next: Gradient) {
    setBackground({ ...background, overlayBackground: next.overlayBackground, overlayFontColor: next.overlayFontColor, regularFontColor: next.regularFontColor });
    let framesElapsed: number = 0;
    let intervalFrame: ReturnType<typeof setInterval> = setInterval(() => {
      framesElapsed++;
      const newOverlay: Gradient = { ...next };
      newOverlay.from = newOverlay.from.substring(0, 7) + Math.round((255 * framesElapsed / 60)).toString(16);
      newOverlay.to = newOverlay.to.substring(0, 7) + Math.round((255 * framesElapsed / 60)).toString(16);
      setGradientOverlay(newOverlay);
      if (framesElapsed === 60) {
        setBackground(newOverlay);
        clearInterval(intervalFrame);
      } 
    }, 16.667); // 60fps
  }

  // Updates the selectedOption property in an optionGroup once it is toggled
  function ToggleOptionGroup(group: OptionGroup, selected: string) {
    setQuestion({
      ...question, attempts: question.attempts+1, optionPairs: question.optionGroups.map(g => {
        if (g === group) {
          g.selectedOption = g.options.findIndex(o => o.text === selected);
        }
        return g;
      })
    });
  }
  
  // Generates the initial AnswerToggle objects
  function BuildPairs() {
    let groupNo = 0;
    return (
      <section id='option-pairs' ref={ref}>
        {question.optionGroups.map(group => {
          return <AnswerToggle
            key={groupNo++}
            optionGroup={group}
            onToggle={(group: OptionGroup, selected: string) => { ToggleOptionGroup(group, selected) }}
            colors={background}
            horizontal={(group.options.length === 2 || bounds.width > 350) && bounds.width / group.options.length > Math.max(...group.options.map(o => { return o.text.length })) * 14}
            isLocked={correct}
          />
        })}
      </section>
    )
  }

  return (
    <div id='background' style = {{ backgroundImage: `linear-gradient(180deg, ${background.from} 0%, ${background.to} 100%`}}>
      <section id='question-container' style = {{ backgroundImage: `linear-gradient(180deg, ${gradientOverlay.from} 0%, ${gradientOverlay.to} 100%`}}>
        <h1 className='question-text'>{question.questionText}</h1>
        {BuildPairs()}
        <h2 className='answer-status'>The answer is {correct ? 'correct!' : 'incorrect'}</h2>
    </section>    
    </div>
    
  );
}