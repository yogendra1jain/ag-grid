import React, { useState } from 'react';
import { render } from 'react-dom';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import Sample from "./sample.json"



const colDefsMedalsIncluded = [
    { field: 'athlete' },
    { field: 'age' },
    { field: 'country' },
    { field: 'sport' },
    { field: 'year' },
    { field: 'date' },
    { field: 'gold' },
    { field: 'silver' },
    { field: 'bronze' },
    { field: 'total' }
];

const colDefsMedalsExcluded = [
    { field: 'athlete' },
    { field: 'age' },
    { field: 'country' },
    { field: 'sport' },
    { field: 'year' },
    { field: 'date' }
];

const GridExample = () => {
    debugger;
    const [rowData, setRowData] = useState([]);
    const [columns, setColumns] = useState(colDefsMedalsIncluded);

    const onGridReady = (params) => {
        const httpRequest = new XMLHttpRequest();
        httpRequest.open('GET', 'https://www.ag-grid.com/example-assets/olympic-winners.json');
        httpRequest.send();
        httpRequest.onreadystatechange = () => {
            if (httpRequest.readyState === 4 && httpRequest.status === 200) {
                setRowData(JSON.parse(httpRequest.responseText));
            }
        };
    };

    const onBtExcludeMedalColumns = () => {
        setColumns(colDefsMedalsExcluded);
    };

    const onBtIncludeMedalColumns = () => {
        setColumns(colDefsMedalsIncluded);
    };
    const columnMaker = (column) => {
        return <AgGridColumn field={column.Id} key={column.Id} />
    }
    const preOrderTraversal = (node) => {
        let arry = []
        for (let i = 0; i < node.length; i++) {
            if (node[i].Child) {
                let returnedArr = preOrderTraversal(node[i].Child);
                arry.push(<AgGridColumn floatingFilter={node[i].floatingFilter} filter={node[i].filter} headerName={node[i].Label}>{returnedArr}</AgGridColumn>)
            }
            else {
                arry.push(<AgGridColumn floatingFilter={node[i].floatingFilter} filter={node[i].filter} headerName={node[i].Label} field={node[i].Id} key={node[i].Id} />);
            }
        }
        return arry
    }
    const metaDataMapper = (columnMetaData) => {
        debugger;
        if (!columnMetaData.Child) {
            return <span>No Child found</span>
        }
        else {
            return preOrderTraversal(columnMetaData.Child, [])
        }
    }

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <div className="test-container">
                <div className="test-header">
                    <button onClick={onBtExcludeMedalColumns}>Exclude Medal Columns</button>
                    <button onClick={onBtIncludeMedalColumns}>Include Medal Columns</button>
                    <div
                        style={{
                            height: '100vh',
                            width: '100%'
                        }}
                        className="ag-theme-alpine test-grid">
                        <AgGridReact
                            rowData={rowData}
                            onGridReady={onGridReady}
                            defaultColDef={{
                                initialWidth: 100,
                                sortable: true,
                                resizable: true
                            }}>
                            {metaDataMapper(Sample)}
                        </AgGridReact>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default GridExample