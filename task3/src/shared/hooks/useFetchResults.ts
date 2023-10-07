import {fetchSearchResults} from "../api";
import {useState} from "react";
import {SearchResults} from "../types";

const  useFetchRequest = (query: string) => {
    const [searchResults, setSearchResults] = useState<SearchResults[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)


    return async () => {
        setTimeout(async () => {
            try {
                setIsLoading(true)
                const searchResults = await fetchSearchResults(query)
                setSearchResults(searchResults)
                setIsLoading(false)
            } catch (error) {
                setIsLoading(false)
                setIsError(true)
            }
        }, 200)

        return [searchResults, isLoading, isError]
    }

}

export default useFetchRequest;
