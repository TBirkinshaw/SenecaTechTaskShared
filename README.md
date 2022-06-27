# Seneca Tech Task - Question Toggles

## Runnable Version

I have deployed a version of this component to GitHub pages at https://tbirkinshaw.github.io/SenecaPlayground/

## Core Requirements

1. TypeChecking - Using TypeScript
2. Responsive down to 320px - Should work in both horizontal & vertical. I've played about with the sizes of the toggles a bit in mobile as they were originally quite small & unintuitive on mobile - I hope this solution is ok!
3. Solution locks once correct
4. Toggles animate between the two states (used Framer Motion to achieve this)
5. Background colour changes in proportion to correctness. I'm not 100% happy with this as I settled on three preset gradients for 1/2/3 correct answers correct. I did experiment with a scaleable solution which would work with any number of answers (By using color interpolation between the incorrect & correct gradients), but it never looked anywhere near as good as the example video.
6. Component is re-usable and extendable. It works with questions which conform to the Question interface.

## Extensions

1. Order of question & answer positions is always randomised. I have taken a slight interpretation on this and jumbled up "all correct" and "all incorrect" answers, forming randomly-generated pairs. If you wanted the pairings to always be the same - eg/ "Cell Wall" + "Ribosomes" then this would be easy enough to change back. I've also ensured that when randomly selecting which answers are toggled by default, that the question never randomly solves itself - i.e: the user will always need to toggle at least one option to get a correct answer.
2. The solution supports answers with two & three toggle positions. To test this, I have added some logic to my question builder which adds a few three-toggle questions when provided with a question which contains more wrong answers than right answers. I also THINK that the solution I've arrived at could thereotically scale to 4+ toggle positions, if you felt the need.
3. I've provided a range of example questions - see below. You can change the question by refreshing the page.

## Questions

Questions are randomly selected from /assets/questions.json. Refresh the page to load a new question.

Please note - when refreshing the page, the background colour will always default to the "Incorrect state". This is a deliberate decision so that it doesn't start informing the user how hot/cold their answer is until they have begun interacting with the question. This is an assumption on my part and could be removed by getting rid of Line #21 in components/QuestionContainer.tsx

## Limitations

If you spot any issues/limitations I haven't mentioned then I do welcome & appreciate any feedback. It has been tested as working on desktop Chrome/Safari, and on iPhone.
