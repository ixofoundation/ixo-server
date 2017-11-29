import {Validator} from 'jsonschema';
import {AGENT_ROLE} from "../db/models";

export function isValidJson(schema, json): boolean {
    var validator = new Validator();
    return validator.validate(json, schema).valid;
}

export function resolveAgentRole(agentCode): string {
    switch (agentCode) {
        case 'E':
            return AGENT_ROLE.E.valueOf();
        case 'F':
            return AGENT_ROLE.F.valueOf();
        case 'O':
            return AGENT_ROLE.O.valueOf();
        case 'S':
            return AGENT_ROLE.S.valueOf();
    }
}