import {Validator} from 'jsonschema';

export function isValidJson(schema, json): boolean {
    var validator = new Validator();
    return validator.validate(json, schema).valid;
}