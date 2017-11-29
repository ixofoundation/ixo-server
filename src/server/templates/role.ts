export var roleSchema = {
    "$schema"    : "http://json-schema.org/draft-04/schema#",
    "description": "",
    "type"       : "object",
    "properties" : {
        "type" : {
            "type" : "array",
            "items": {
                "required"  : [],
                "properties": {}
            }
        },
        "dixID": {
            "type"     : "string",
            "minLength": 1
        },
        "role" : {
            "type"      : "object",
            "properties": {
                "type": {
                    "type"     : "string",
                    "minLength": 1
                },
                "did" : {
                    "type"     : "string",
                    "minLength": 1
                }
            },
            "required"  : [
                "type",
                "did"
            ]
        }
    },
    "required"   : [
        "type",
        "dixID",
        "role"
    ]
};

export function createRoleJson(role, dixID, did) {
    var roleJson = {
        "type" : ["Role"],
        "dixID": dixID,
        "role" : {
            "type": role,
            "did" : did
        }
    };
    return roleJson;
}


