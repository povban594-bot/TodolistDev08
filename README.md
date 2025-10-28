# Todo app (Simple Browser App)
todo app implemented with plain HTML, CSS and JavaScript and svae in localstorage
## Features
- Add a new task (press Enter or click the + button)
- Mark tasks completed with a checkbox
- Delete individual tasks
- Delete all tasks (with confirmation)
- Search tasks (live filter)
- coutn Task
- save and update localstorage
## update todo
  - make space  search with clear and add btn
  - update save localstorage
  - change color text of button delete
## File structure
src/
  index.html        -- app HTML
  css/
    style.css        -- app styles
  js/
    script.js          -- application logic
## Run locally
1) Use VS Code Live Server extension (recommended for quick dev)

2) Open `src/index.html` open with live sever
 ## Known issues / notes
- The app uses plain localStorage and is single-origin — tasks won't sync across devices or browsers.
- There are some opportunistic improvements possible:
  - Add edit-in-place for tasks
  - Add task timestamps and sorting
  - Improve accessibility (ARIA roles, focus management)
  - Add unit tests and a build toolchain if you grow the project
