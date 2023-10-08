import React, {memo, useCallback, useContext} from 'react';
import {SearchResults} from "../../shared/types";
import style from './Table.module.css';
import TableCheckbox from "../TableCheckbox/TableCheckbox";
import {SavedInfoContext} from "../../App/App";

interface Props {
    data: SearchResults[];
    isLoading: boolean;
    isError: boolean;
}

const Table = memo((props: Props) => {
    const {data, isLoading, isError} = props;
    const {savedInfo} = useContext(SavedInfoContext);

    if (isError) {
        return <div className={style.tableContainer}> <p> Something went wrong</p> </div>;
    }

    if (isLoading) {
        return <div className={style.tableContainer}> <p> Loading...</p> </div>;
    }

    if (data.length === 0) {
        return <div className={style.tableContainer}> <p> No results</p> </div>;
    }

    const isChecked = (value: SearchResults) => {
        return savedInfo.some(savedInfo => savedInfo.alphaTwoCode === value.alphaTwoCode
            && savedInfo.name === value.name);
    }


    return (
        <div className={style.tableContainer}>
            <table>
                <thead>
                    <tr>
                        {names.map((name) => <th key={name}>{name}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {data.map((val, index) => {
                        const highlightRow = index % 2 != 0 ? style.highlightRow : '';
                        return (
                            <tr key={val.name} className={highlightRow}>
                                <td>{index + 1}</td>
                                <td>{val.name}</td>
                                <td>{val.alphaTwoCode}</td>
                                <td>{val.country}</td>
                                <td>{val.domains.join(', ')}</td>
                                <td>{val.stateProvince || '-'}</td>
                                <td>
                                        {val.web_pages.map(page => (
                                            <p key={page}>
                                                <a href={page} >{page}</a>
                                            </p>
                                        ))}
                                </td>
                                <td>
                                    <TableCheckbox isChecked={isChecked(val)}
                                                   name={val.name}
                                                   alphaTwoCode={val.alphaTwoCode}/>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>

    );
});

const names  = ['ID','Name',  'Alpha two code', 'Country', 'Domains', 'State province', 'Web pages', 'Save in my list'];

export default Table;
