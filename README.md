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
    - ./ixo listProjects -d 5ZSjDeM5wiA8cJFREyk1Je -v
    - ./ixo createAddAgentToProjectRequest --dixProjectID ff717e6750457e6d878e83019addaa851c70fa9b1e3fbbe2f399d1fbf44d154a -d 5ZSjDeM5wiA8cJFREyk1Je -r O -v 
    - ./ixo addAgentToProject -d 5ZSjDeM5wiA8cJFREyk1Je.json -i 5ZSjDeM5wiA8cJFREyk1Je_owner.json -v
    - ./ixo createRevokeAgentFromProjectRequest --dixProjectID ff717e6750457e6d878e83019addaa851c70fa9b1e3fbbe2f399d1fbf44d154a -d E1yK2uf6fFWfEUN5UUmedD --roleID 32b4cad9d27b282e9de701d3ac39b5a893ad69fa44f9a0de1e16df375f35fb35 -v
    - ./ixo revokeAgentFromProject -d 5ZSjDeM5wiA8cJFREyk1Je.json -i ff717e6750457e6d878e83019addaa851c70fa9b1e3fbbe2f399d1fbf44d154a_32b4cad9d27b282e9de701d3ac39b5a893ad69fa44f9a0de1e16df375f35fb35.json -v
    - ./ixo createClaimSet --dixProjectID ff717e6750457e6d878e83019addaa851c70fa9b1e3fbbe2f399d1fbf44d154a -f claim1.json,claim2.json -o claimSet.json -v
    - ./ixo submitClaimSet -d 5ZSjDeM5wiA8cJFREyk1Je --dixProjectID ff717e6750457e6d878e83019addaa851c70fa9b1e3fbbe2f399d1fbf44d154a -i claimSet.json -v
    - ./ixo createEvaluation -d 5ZSjDeM5wiA8cJFREyk1Je.json --claimsetId fad1c64186ed67329fe10723f0018a912a6e2b26880b404c5c76bf65331a6f9a --result V --comment 'Testing evaluation' -v
    - ./ixo submitEvaluation -d 5ZSjDeM5wiA8cJFREyk1Je.json --input ff717e6750457e6d878e83019addaa851c70fa9b1e3fbbe2f399d1fbf44d154a_Impact_Claim_Set_signed.json -v