import './AnswerToggle.css';

import React, { useState } from "react";

import AnswerToggleProps from "../types/answerToggleProps";
import { motion } from 'framer-motion';

export default function AnswerToggle({ optionGroup, onToggle, colors, horizontal, isLocked }: AnswerToggleProps) {

  const [overlayPosition, setOverlayPosition] = useState(optionGroup.selectedOption * 100 + '%');

  // Called when the user selects an option on the toggle component
  function handleToggle(selectedOption: string)
  {
    if (isLocked) return;
    onToggle(optionGroup, selectedOption);
    setOverlayPosition(optionGroup.options.findIndex(o => o.text === selectedOption) * 100 + '%');
  }

  // Builds the options in the toggle. This has been tested with options of 2 & 3, but could theoretically work with any size
  // ... if you wanted to completely disregard usability in favour of style points
  function buildOptions() {
    let optionNumber = -1;
    return optionGroup.options.map(option => {
      optionNumber++;
      return <div key={optionNumber} className={
        `option 
        ${optionNumber === 0 ? 'left' : optionNumber === optionGroup.options.length - 1 ? 'right' : 'center'}
        ${optionGroup.selectedOption === optionNumber ? 'selected' : ''}`}
        onClick={() => { handleToggle(option.text) }}>
        <h5 style={{ color: optionGroup.selectedOption === optionNumber ? colors.overlayFontColor : colors.regularFontColor }}>
          {option.text}
        </h5>
        {optionNumber === 0 && <motion.div
          animate={horizontal ? { x: overlayPosition } : { y: overlayPosition }}
          className={`overlay ${optionGroup.selectedOption === 0 ? 'left' : optionGroup.selectedOption === optionGroup.options.length - 1 ? 'right' : 'center'}`}
          style={{ backgroundColor: colors.overlayBackground }}>
        </motion.div>}
      </div>
    });
  }

  return (
    <div className={`answer-toggle ${horizontal ? 'horizontal' : 'vertical'}`}>
      {buildOptions()}
    </div>
  )
}