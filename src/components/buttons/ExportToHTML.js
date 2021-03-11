import React from 'react';
import { Button } from 'react-bootstrap';
import { saveAs } from 'file-saver';
import { exportHtmlStyles } from '../../variables/exportHtmlStyles';

export const ExportToHTML = ({ notes, name }) => {
    const headTag = `
        <head>
            <link href="https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@400;700&display=swap" rel="stylesheet">
            <style>
                ${exportHtmlStyles}
            </style>
        </head>
    `;
    const bodyTag = `
        <body>
            <div class="container">
                ${notes}
            </div>
        </body>
    `

    // Export Handlers
    const exportToHtml = () => {
        const blob = new Blob([headTag, bodyTag], {type: 'text/html'});
        const formatedName = name.replace(' ', '_') + '.html';
        
        saveAs(blob, formatedName);
    }

    return (
        <Button onClick={exportToHtml} variant="link">
            Export in HTML
        </Button>
    );
}