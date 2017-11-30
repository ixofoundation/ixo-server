export var claimSetSchema = {
    "$schema": "http://json-schema.org/draft-04/schema#",
    "description": "",
    "type": "object",
    "properties": {
        "id": {
            "type": "string",
            "minLength": 1
        },
        "type": {
            "type": "array",
            "items": {
                "required": [],
                "properties": {}
            }
        },
        "dixID": {
            "type": "string",
            "minLength": 1
        },
        "claims": {
            "type": "array",
            "items": {
                "required": [],
                "properties": {}
            }
        }
    },
    "required": [
        "type",
        "dixID",
        "claims"
    ]
};

export function createClaimSetJson(dixID, claimSet, id?) {
    var claimSetJson = {
        "id" : id,
        "type" : [ "Impact Claim Set"],
        "dixID": dixID,
        "claims": claimSet

    };
    return claimSetJson;
}


