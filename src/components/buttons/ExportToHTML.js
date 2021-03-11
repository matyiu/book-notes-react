import React from 'react';
import { Button } from 'react-bootstrap';
import { saveAs } from 'file-saver';

export const ExportToHTML = ({ notes, name }) => {
    // Export Handlers
    const exportToHtml = () => {
        const blob = new Blob([notes], {type: 'text/html'});
        const formatedName = name.replace(' ', '_') + '.html';
        
        saveAs(blob, formatedName);
    }

    return (
        <Button onClick={exportToHtml} variant="link">
            Export in HTML
        </Button>
    );
}