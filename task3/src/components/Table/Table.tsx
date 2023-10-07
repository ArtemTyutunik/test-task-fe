import React from 'react';
import {SearchResults} from "../../shared/types";
import style from './Table.module.css';

interface Props {
    data: SearchResults[];
    isLoading: boolean;
    isError: boolean;
}

const Table = (props: Props) => {
    const {data, isLoading, isError} = props;

    if (isError) {
        return <div className={style.tableContainer}> <p> Something went wrong</p> </div>;
    }

    if (isLoading) {
        return <div className={style.tableContainer}> <p> Loading...</p> </div>;
    }

    if (data.length === 0) {
        return <div className={style.tableContainer}> <p> No results</p> </div>;
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
                                <td>{val.alpha_two_code}</td>
                                <td>{val.country}</td>
                                <td>{val.domains.join(', ')}</td>
                                <td>{val.stateProvince || '-'}</td>
                                <td>
                                        {val.web_pages.map(page => (
                                            <p>
                                                <a href={page} key={page}>{page}</a>
                                            </p>
                                        ))}
                                </td>
                            </tr>
                        )
                    })}
                </tbody>

            </table>
        </div>

    );
};

const names  = ['ID','Name',  'Alpha two code', 'Country', 'Domains', 'State province', 'Web pages'];

export default Table;
