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
    }, [])

    const onHandleSearch = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (searchInputRef.current) {
            onSearch(searchInputRef.current?.value as string);
        }
    }

    const onHandleReset = () => {
        if (searchInputRef.current) {
            searchInputRef.current!.value = '';
            onReset();
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
            <button onClick={onHandleReset}
                    className={styles.actionBtn + ' ' + styles.clearButton}>
                Clear
            </button>
        </form>
    );
});

export default SearchInput;
