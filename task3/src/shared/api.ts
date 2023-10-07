import {SearchResults} from "./types";

export const fetchSearchResults = async (query: string): Promise<SearchResults[]> => {
    const response = await fetch(`http://universities.hipolabs.com/search?country=${query}`);
    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return optimizeData(await response.json());
}

const optimizeData = (data: SearchResults[]) => {
    const result: SearchResults[] = [];

    data.forEach(item => {
        const temp = {}
        temp['name'] = item.name;
        temp['alpha_two_code'] = item.alpha_two_code;
        temp['country'] = item.country;
        temp['domains'] = item.domains;
        temp['stateProvince'] = item.stateProvince;
        temp['web_pages'] = item.web_pages;
        result.push(temp as SearchResults);
    })

    return result
}
