import React from 'react';

const PDFLink = ({ url }) => {
    return (
        <a href={url} target="_blank" rel="noopener noreferrer">View PDF</a>
    );
};

export default PDFLink;
