export var templateSchema = {
    "$schema"    : "http://json-schema.org/draft-04/schema#",
    "description": "",
    "type"       : "object",
    "properties" : {
        "templateId": {
            "type"     : "string",
            "minLength": 1
        },
        "indicator" : {
            "type"     : "string",
            "minLength": 1
        },
        "created"   : {
            "type"     : "string",
            "minLength": 1
        },
        "creator"   : {
            "type"     : "string",
            "minLength": 1
        },
        "data"      : {
            "type"      : "object",
            "properties": {},
            "required"  : []
        }
    },
    "required"   : [
        "templateId",
        "indicator",
        "created",
        "creator",
        "data"
    ]
};

export function createTemplateJson(templateId, created, creator, indicator, data) {
    var template = {
        "templateId": templateId,
        "indicator" : indicator,
        "created"   : created,
        "creator"   : creator,
        "data"      : data

    };
    return template;
}


