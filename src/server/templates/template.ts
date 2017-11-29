export var templateSchema = {
    "$schema"    : "http://json-schema.org/draft-04/schema#",
    "description": "",
    "type"       : "object",
    "properties" : {
        "signature": {
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
        "signature"
    ]
};

export function createTemplateJson(templateId, created, creator, indicator) {
    var template = {
        "templateId": templateId,
        "indicator" : indicator,
        "created"   : created,
        "creator"   : creator,

    };
    return template;
}


