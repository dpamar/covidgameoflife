# Covid-19 Game Of Live
Covid-19 version of Game Of Life - A tribute to John Conway

On April 11th, 2020, John Horton Conway passed away due to complications of COVID-19.

John Conway was especially known as the inventor of Conway's Game of Life, a cellular automaton in 1970.

## Original game
Game of life is a zero-player game, where cells on a board can be either populated or unpopulated. At each step, a cell will either
* become alive if it has exactly 3 living neighbours 
* stay alive if it has exactly 2 living neighbours 
* die or stay unpopulated in all other cases

Despite these very simple rules, it is a Turing-complete system (and an Universal Turing Machine has been created based on these rules)

[The implementation of the original game is available here](https://dpamar.github.io/covidgameoflife/index-original.html)

Check how special patterns like spaceships or canons can be implemented :)

## Covid19 version
In this modified version, rules are :
* we consider 2 kinds of neighbours
  * immediate neighbours (original ones, up to 8 cells)
  * far neighbours (immediates' + the outer square, up to 24 cells)
* if a cell has more that one immediate neighbour, it dies due to an increased risk of infection
* if it has 2 living neighbours, including far ones (due to social distancing), it stays alive
* if it has 3 to 5 living neighbours, it becomes alive.

In this modified version, existing patterns aren't working anymore : a new world to explore !

[Modified game is available here](https://dpamar.github.io/covidgameoflife/index.html)
