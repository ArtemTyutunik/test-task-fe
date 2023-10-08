import {SavedInfo, SearchResults} from "../types";

export const removeDuplicates = (array: SearchResults[]): SearchResults[] => {
    const uniqueArray:SearchResults[] = [];

    array.forEach((item) => {
        const isDuplicate = uniqueArray.some((uniqueItem) => uniqueItem.name === item.name);

        if (!isDuplicate) {
            uniqueArray.push(item);
        }
    });

    return uniqueArray;
}


export const isInArray = (item: SearchResults | SavedInfo, array: SavedInfo[]): boolean => {
    return Boolean(array.find((savedInfo) => savedInfo.name === item.name
        && savedInfo.alphaTwoCode === item.alphaTwoCode));
}
