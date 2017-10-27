export interface IMetaTags {
    description?: string
    robots?: string
}

export function getMetaTags(url: string) : IMetaTags {

    return {
        description: "TGE Server Website."
    }

}
