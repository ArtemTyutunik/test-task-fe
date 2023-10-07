import './App.module.css'
import SearchInput from "../components/SearchInput/SearchInput";
import styles from "./App.module.css"
import {SearchResults} from "../shared/types";
import {useCallback, useState} from "react";
import Table from "../components/Table/Table";
import {fetchSearchResults} from "../shared/api";

function App() {
    const [searchResults, setSearchResults] = useState<SearchResults[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)

    const onSearch = useCallback(async (query: string) => {
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
        }, 250)
    }, [])

    const onReset = useCallback(() => {
        setSearchResults([])
    }, [])

    return (
        <div className={styles.container}>
          <SearchInput onSearch={onSearch} onReset={onReset}/>
          <Table data={searchResults} isLoading={isLoading} isError={isError}/>
        </div>
    )
}

export default App
