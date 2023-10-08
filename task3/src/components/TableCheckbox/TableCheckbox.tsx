import React from 'react';
import {SavedInfoContext} from "../../App/App";

interface Props {
    isChecked: boolean;
    name: string;
    alphaTwoCode: string;
}

const TableCheckbox = (props: Props) => {
    const {isChecked, name, alphaTwoCode} = props;
    const {onSaveInList} = React.useContext(SavedInfoContext);


    return (
        <input type='checkbox' checked={isChecked} onChange={() => onSaveInList({name, alphaTwoCode})}/>
    );
};

export default TableCheckbox;
