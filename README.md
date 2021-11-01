# Junior Phase Final Project

## Unlisted Walkthrough Video
https://youtu.be/jWRqinDm_ts


use `npm run seed` to seed about 10-12 robots and projects
use `node seed101.js` if you want to see 100+ robots and projects

-Comleted all requirements! 
-Not all Tier 1 test specs may pass any more, but I have all features!

known issues:
-I re-used my RobotForm for all form views, including projects
    in the future I would rename it to be Form or FormView..etc
    
-Only for SingleRobot/Robot I map a redux state as storeRobot, to
differentiate between local robot state for AJAX.  I didn't have time
to refactor just yet.  This was because I was having issues in the learning
process going between stateless and stateful react-redux components,
but I figured it out for the Project side.
