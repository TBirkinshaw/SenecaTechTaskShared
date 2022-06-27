import Backgrounds from "../types/backgrounds";
import Gradient from "../types/gradient";

// Contains the background gradients used for the QuestionContainer
export default function BackgroundGradients(): Backgrounds {
  const overlayBackground: string = '#FFFFFF99';

  const correct: Gradient = {
    from: '#76e0c2',
    to: '#58cbda',
    overlayBackground: overlayBackground,
    overlayFontColor: '#4CAD94',
    regularFontColor: '#FFFFFF'
  };

  const incorrect: Gradient = {
    from: '#f6b96a',
    to: '#ee682b',
    overlayBackground: overlayBackground,
    overlayFontColor: '#9F938B',
    regularFontColor: '#FFFFFF'
  };

  const partial1: Gradient = {
    from: '#f1b598',
    to: '#e97963',
    overlayBackground: overlayBackground,
    overlayFontColor: '#E47958',
    regularFontColor: '#FFFFFF'
  }

  const partial2: Gradient = {
    from: '#eddf11',
    to: '#e5d710',
    overlayBackground: overlayBackground,
    overlayFontColor: '#B69135',
    regularFontColor: '#FFFFFF'
  };

  const partial3: Gradient = {
    from: '#8db497F2',
    to: '#7daa89E5',
    overlayBackground: overlayBackground,
    overlayFontColor: '#7AA887',
    regularFontColor: '#FFFFFF'
  }
  
  const none: Gradient = {
    from: '#FFFFFF00',
    to: '#FFFFFF00',
    overlayBackground: overlayBackground,
    overlayFontColor: '#E47958',
    regularFontColor: '#FFFFFF'
  };
  
  return {
      correct, partial1, partial2, partial3, incorrect, none
  }
}