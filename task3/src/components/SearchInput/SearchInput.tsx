import React, {memo, useEffect} from 'react';
import styles from './SearchInput.module.css';

interface Props {
    onSearch: (query: string) => void;
    onReset: () => void;
}

const SearchInput = memo((props: Props) => {
    const {onSearch, onReset} = props;
    const searchInputRef = React.useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        if (searchInputRef.current) {
            searchInputRef.current!.focus()
        }

        //@ts-ignore
        const searchParams = new URL(document.location).searchParams

        let searchQuery = searchParams.get('query');
        if (searchQuery !== null && searchQuery !== undefined) {
            searchInputRef.current!.value = searchQuery;
            onSearch(searchQuery);
        }
    }, [])

    const onHandleSearch = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (searchInputRef.current) {
            const value = searchInputRef.current!.value as string

            const urlParams = new URLSearchParams(window.location.search);
            urlParams.set('query', value);
            //@ts-ignore
            window.location.search = urlParams

            onSearch(value);
        }
    }

    const onHandleReset = () => {
        if (searchInputRef.current) {
            searchInputRef.current!.value = '';
            onReset();
            window.location.search = '';
        }
    }

    return (
        <form onSubmit={onHandleSearch} className={styles.searchContainer}>
            <input type="text"
                   placeholder="Search..."
                   className={styles.searchInput}
                   ref={searchInputRef}
            />
            <button type='submit' className={styles.actionBtn + ' ' + styles.searchButton}>
                Search
            </button>
            <button onClick={onHandleReset} type='button'
                    className={styles.actionBtn + ' ' + styles.clearButton}>
                Clear
            </button>
        </form>
    );
});

export default SearchInput;
