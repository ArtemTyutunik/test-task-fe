import {SearchResults} from "./types";
import {removeDuplicates} from "./helpers";

export const fetchSearchResults = async (query: string): Promise<SearchResults[]> => {
    const response = await fetch(`http://universities.hipolabs.com/search?country=${query}`);
    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return optimizeData(removeDuplicates(await response.json()));
}

const optimizeData = (data:  any[]) => {
    const result: SearchResults[] = [];

    data.forEach(item => {
        const temp = {...item, alphaTwoCode: item.alpha_two_code};
        delete temp.alpha_two_code;

        result.push(temp as SearchResults);
    })

    return result
}
