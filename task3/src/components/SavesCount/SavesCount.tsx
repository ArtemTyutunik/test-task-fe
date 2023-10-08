import React from 'react';

interface Props {
    count: number;
}

const SavesCount = ({count}: Props) => {
    return (
        <div>
            <p>Your saves: <span>{count}</span></p>

        </div>
    );
};

export default SavesCount;
