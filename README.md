# ixo-server

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

## CLI Testing

    - ./ixo createDID -v  
    - ./ixo createAgent -d 5ZSjDeM5wiA8cJFREyk1Je -n Bob -c ZA -p  -v3V8apJ1LjKLZF4R2L6RQmqaRGCsA9vsu99yQ9eQfqVST
    - ./ixo getAgent -d 5ZSjDeM5wiA8cJFREyk1Je -v
    - ./ixo listAgents -c ZA -v
    - ./ixo signDoc -a 5ZSjDeM5wiA8cJFREyk1Je.json -i signDocTest.json -o signedDoc.json -v
    - ./ixo registerTemplate -d 5ZSjDeM5wiA8cJFREyk1Je -i signedDoc.json -v 
    - ./ixo createProject -d 5ZSjDeM5wiA8cJFREyk1Je --description 'Test Project' -s '2017-11-11' -e '2019-03-03' -t fad1c64186ed67329fe10723f0018a912a6e2b26880b404c5c76bf65331a6f9a --number '1000' --value '2000000' -c RW -l www.ixo.foundation -o newProject.json --tolerance 0.1 -v
    - ./ixo submitProject -d 5ZSjDeM5wiA8cJFREyk1Je.json -i newProject.json -o projectSubmit.json -v
