import {SearchResults} from "./types";
import {removeDuplicates} from "./helpers";

export const fetchSearchResults = async (query: string): Promise<SearchResults[]> => {
    const response = await fetch(`http://universities.hipolabs.com/search?country=${query}`);
    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return optimizeData(removeDuplicates(await response.json()));
}

const optimizeData = (data: unknown[]) => {
    const result: SearchResults[] = [];

    data.forEach(item => {
        const temp = {}
        temp['name'] = item.name;
        temp['alphaTwoCode'] = item.alpha_two_code;
        temp['country'] = item.country;
        temp['domains'] = item.domains;
        temp['stateProvince'] = item.stateProvince;
        temp['web_pages'] = item.web_pages;
        result.push(temp as SearchResults);
    })

    return result
}
