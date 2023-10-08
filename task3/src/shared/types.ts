export interface SearchResults {
    alphaTwoCode: string,
    country: string,
    domains: string[],
    name: string,
    stateProvince: string | null,
    web_pages: string[]
}

export interface SavedInfo {
    alphaTwoCode: string,
    name: string,
}
