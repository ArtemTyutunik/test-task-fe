import React, {useEffect} from 'react'
import './App.module.css'
import SearchInput from "../components/SearchInput/SearchInput";
import styles from "./App.module.css"
import {SavedInfo, SearchResults} from "../shared/types";
import {useCallback, useState} from "react";
import Table from "../components/Table/Table";
import {fetchSearchResults} from "../shared/api";
import SavesCount from "../components/SavesCount/SavesCount";
import {isInArray} from "../shared/helpers";

const getInitialSavedInfo = (): SavedInfo[] => {
    return JSON.parse(localStorage.getItem('savedInfo') || '[]');
}

interface ContextProps {
    savedInfo: SavedInfo[]
    onSaveInList: (savedInfo: SavedInfo) => void
}

export const SavedInfoContext = React.createContext<ContextProps | null>(null);

function App() {
    const [searchResults, setSearchResults] = useState<SearchResults[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)

    const [savedInfo, setSavedInfo] = useState<SavedInfo[]>(getInitialSavedInfo())
    const [currentSavesCount, setCurrentSaveCount] = useState(0)

    useEffect(() => {
        //@ts-ignore
        const count = searchResults.reduce((acc, currentValue) => {
           return isInArray(currentValue, savedInfo) ? acc + 1 : acc
        }, 0)

        setCurrentSaveCount(count)
    }, [savedInfo, searchResults])

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

    const onSaveInList = useCallback((savedInfo: SavedInfo) => {
        const onToggleValue = (prevState: SavedInfo[]) => {
            if (!isInArray(savedInfo, prevState)) {
                const newSavedInfo = prevState.concat(savedInfo)
                localStorage.setItem('savedInfo', JSON.stringify(newSavedInfo))

                return newSavedInfo
            } else {
                const newSavedInfo = prevState.filter(info => {
                    return savedInfo.alphaTwoCode !== info.alphaTwoCode
                    || savedInfo.name !== info.name
                })

                localStorage.setItem('savedInfo', JSON.stringify(newSavedInfo))
                return newSavedInfo;
            }
        }

        setSavedInfo(onToggleValue)

    }, [])

    const onReset = useCallback(() => {
        setSearchResults([])
    }, [])

    return (
        <div className={styles.container}>
            <SavesCount count={currentSavesCount}/>
          <SearchInput onSearch={onSearch} onReset={onReset}/>
            <SavedInfoContext.Provider value={{savedInfo, onSaveInList}}>
                <Table data={searchResults} isLoading={isLoading} isError={isError}/>
            </SavedInfoContext.Provider>
        </div>
    )
}

export default App
