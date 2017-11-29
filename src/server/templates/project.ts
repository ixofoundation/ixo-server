export var projectSchema = {
    "$schema"    : "http://json-schema.org/draft-04/schema#",
    "description": "",
    "type"       : "object",
    "properties" : {
        "ownerDid"   : {
            "type"     : "string",
            "minLength": 1
        },
        "createdOn"  : {
            "type"     : "string",
            "minLength": 1
        },
        "description": {
            "type": "string"
        },
        "uri"        : {
            "type": "string"
        },
        "startDate"  : {
            "type"     : "string",
            "minLength": 1
        },
        "endDate"    : {
            "type"     : "string",
            "minLength": 1
        },
        "indicator"  : {
            "type"     : "string",
            "minLength": 1
        },
        "templateId" : {
            "type"     : "string",
            "minLength": 1
        },
        "number"     : {
            "type": "number"
        },
        "tolerance"  : {
            "type": "number"
        },
        "usdValue"   : {
            "type": "number"
        },
        "country"    : {
            "type"     : "string",
            "minLength": 1
        },
        "status"     : {
            "type"     : "string",
            "minLength": 1
        }
    },
    "required"   : [
        "ownerDid",
        "createdOn",
        "description",
        "uri",
        "startDate",
        "endDate",
        "indicator",
        "templateId",
        "number",
        "tolerance",
        "usdValue",
        "country",
        "status"
    ]
};

export function createProjectJson(did, createdOnDate, description, uri, startDate, endDate, templateId, number, tolerance, value, country, status) {
    var project = {
        "ownerDid"   : did,
        "createdOn"  : createdOnDate,
        "description": description,
        "uri"        : uri,
        "startDate"  : startDate,
        "endDate"    : endDate,
        "indicator"  : "P43527",
        "templateId" : templateId,
        "number"     : number,
        "tolerance"  : tolerance,
        "usdValue"   : value,
        "country"    : country,
        "status"     : status
    };
    return project;
}


