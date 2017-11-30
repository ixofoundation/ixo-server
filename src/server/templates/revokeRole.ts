export var revokedRoleSchema = {
    "$schema"    : "http://json-schema.org/draft-04/schema#",
    "description": "",
    "type"       : "object",
    "properties" : {
        "id"    : {
            "type"     : "string",
            "minLength": 1
        },
        "type"  : {
            "type" : "array",
            "items": {
                "required"  : [],
                "properties": {}
            }
        },
        "dixID" : {
            "type"     : "string",
            "minLength": 1
        },
        "issuer": {
            "type"     : "string",
            "minLength": 1
        },
        "issued": {
            "type"     : "string",
            "minLength": 1
        },
        "roleID": {
            "type"     : "string",
            "minLength": 1
        }
    },
    "required"   : [
        "type",
        "dixID",
        "roleID"
    ]
};

export function createRevokedRoleJson(dixID, roleID, id?, issuer?, issued?) {
    var roleJson = {
        "id"    : id,
        "type"  : ["Revoked Role"],
        "dixID" : dixID,
        "issuer": issuer,
        "issued": issued,
        "roleID": roleID
    };
    return roleJson;
}


