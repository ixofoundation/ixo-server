# tge-server

## Installation:
``` bash
npm install
webpack --config ./webpack/release.js
```

## File structure:
  - ``src/``
    - ``components/``: React components are placed in this directory. If a component will be reused somewhere else in the application, it should be placed under the ``components/shared`` directory, otherwise, it should be placed under a new directory with the name of the route path it will be rendered on (``src/components/route_path/ReactComponent``). Most of the files in this directory should not contain complicated logic (should be stateless).
    - ``containers/``: Contains the files which are at the top level of a specific route path (also known as '``controller views``'). This components can have state (stateful components) and should be smarter than their children and pass its state as props to them.
    - ``routes/``: Defines the routes for the application using ``react-router``.
    - ``utils.ts/``: Helper methods should be placed under this directory.
    - ``server/``: Contains files which have logic that is executed on the server side.
