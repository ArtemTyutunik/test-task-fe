import React, {memo, useEffect} from 'react';
import styles from './SearchInput.module.css';

interface Props {
    onSearch: (query: string) => void;
    onReset: () => void;
}

const SearchInput = memo((props: Props) => {
    const {onSearch, onReset} = props;
    const searchInputRef = React.useRef<HTMLInputElement | null>(null);

    const onHandleSearch = () => {
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

    useEffect(() => {
        if (searchInputRef.current) {
            searchInputRef.current!.focus()
        }
    }, [])

    return (
        <div className={styles.searchContainer}>
            <input type="text" placeholder="Search..."  className={styles.searchInput} ref={searchInputRef}/>
            <button className={styles.actionBtn + ' ' + styles.searchButton}
                    onClick={onHandleSearch}
            >
                Search
            </button>
            <button onClick={onHandleReset}
                className={styles.actionBtn + ' ' + styles.clearButton}>
                Clear
            </button>
        </div>
    );
});

export default SearchInput;
