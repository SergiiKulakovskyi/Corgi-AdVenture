# Corgi AdVentures

### GAME LINK: [sergiikulakovskyi.github.io/Corgi-AdVenture](https://sergiikulakovskyi.github.io/Corgi-AdVenture/)
- npm install
- npm start
- [localhost:3000](http://localhost:3000/)

## Problems and solutions
- Used Redux for managing the bunch of actions and events produced by user and game. This design solution will help to scale the game with new features easily.
- At first, I planned to use Material UI as a components library for the view. But finally decided to try PIXI.js:
    - Stable Material UI version **with managers** (small icon near the business title);
    - and PIXI.js – haven't finished design polishing because of the lack of time.
- To make the look of the game funnier added the dog character which I animated in Spine.

## Extra features
- Visual polish: Beautiful design and/or graphics.
    - Animated progress bar
    - Animated character
    - GUI

## Fixed issues from the original game [example](http://en.gameslol.net/data/adcapitalist/index.html)
- When you switch to another browser tab and return back after some time, total profit isn't updated respectively. Only refreshing the page helps.
- Hiring the manger doesn't start business work. You have additionally to press on the progress bar.

## Todos
- Adding game features:
    - Upgrades
    - Bonuses
    - Achievements
- Extra functionality like:
    - Add day/night, weeks features and related events/activities
    - Mini games which could increases/decrease profit
- Preloading
- Optimizing graphics
- Sound FX

## Credits
- Sergii Kulakovskyi – Development, Animation 
- Anna Kulakovskaja – Character Design [Website](https://www.annakulakovskaja.com/) [Behance](https://www.behance.net/kulakovskaja)
- Neddy the Corgi – Muse