import {Validator} from 'jsonschema';
import {AGENT_ROLE, EVALUATION_RESULTS, PROJECT_STATUS} from "../db/models";

export function isValidJson(schema, json): boolean {
    var validator = new Validator();
    return validator.validate(json, schema).valid;
}

export function resolveAgentRole(roleCode): string {
    switch (roleCode) {
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

export function resolveProjectStatus(statusCode): string {
    switch (statusCode) {
        case 'PENDING':
            return PROJECT_STATUS.PENDING.valueOf();
        case 'IN_PROGRESS':
            return PROJECT_STATUS.IN_PROGRESS.valueOf();
        case 'FINISHED':
            return PROJECT_STATUS.FINISHED.valueOf();
    }
}

export function resolveEvaluationResults(resultCode): string {
    switch (resultCode) {
        case 'V':
            return EVALUATION_RESULTS.V.valueOf();
        case 'F':
            return EVALUATION_RESULTS.F.valueOf();
        case 'U':
            return EVALUATION_RESULTS.U.valueOf();
    }
}