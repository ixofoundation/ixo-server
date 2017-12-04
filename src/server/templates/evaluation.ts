export var evaluation = {
    "$schema"    : "http://json-schema.org/draft-04/schema#",
    "description": "",
    "type"       : "object",
    "properties" : {
        "id"                 : {
            "type"     : "string",
            "minLength": 1
        },
        "type"               : {
            "type"     : "string",
            "minLength": 1
        },
        "issuer"             : {
            "type"     : "string",
            "minLength": 1
        },
        "issued"             : {
            "type"     : "string",
            "minLength": 1
        },
        "claimSetID"         : {
            "type"     : "string",
            "minLength": 1
        },
        "evaluationProcedure": {
            "type"     : "string",
            "minLength": 1
        },
        "result"             : {
            "type"     : "string",
            "minLength": 1
        },
        "comment"            : {
            "type"     : "string",
            "minLength": 1
        },
        "signature"          : {
            "type"      : "object",
            "properties": {
                "type"          : {
                    "type"     : "string",
                    "minLength": 1
                },
                "created"       : {
                    "type"     : "string",
                    "minLength": 1
                },
                "creator"       : {
                    "type"     : "string",
                    "minLength": 1
                },
                "signatureValue": {
                    "type"     : "string",
                    "minLength": 1
                }
            },
            "required"  : [
                "type",
                "created",
                "creator",
                "signatureValue"
            ]
        }
    },
    "required"   : [
        "type",
        "issuer",
        "issued",
        "claimSetID",
        "evaluationProcedure",
        "result",
        "comment",
    ]
};

export function createEvaluationJson(claimSetID, result, issuer, issued, comment, id?) {
    var evaluationJson = {
            "id"                 : id,
            "type"               : "Evaluation Claim",
            "issuer"             : issuer,
            "issued"             : issued,
            "claimSetID"         : claimSetID,
            "evaluationProcedure": "Evaluation procedure performed",
            "result" : result,
            "comment": comment
        }
    ;
    return evaluationJson;
}


