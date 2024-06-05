import React from 'react';

const PDFLink = ({ url }) => {
    return (
        <a href={url} target="_blank" rel="noopener noreferrer">Dowload CV</a>
    );
};

export default PDFLink;
