import { AgGridReact, AgGridColumn } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import React, { useState } from 'react';


const GridExample = () => {
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const [rowData, setRowData] = useState(null);

  const onGridReady = (params) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);

    const updateData = (data) => {
      setRowData(data);
    };

    fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .then((resp) => resp.json())
      .then((data) => updateData(data));
  };

  const onBtnExport = () => {
    gridApi.exportDataAsCsv();
  };

  const onBtnUpdate = () => {
    document.querySelector('#csvResult').value = gridApi.getDataAsCsv();
  };

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <div style={{ height: '100%', boxSizing: 'border-box' }}>
        <button onClick={() => onBtnExport()}>
          Download CSV export file
        </button>
        <div
          id="myGrid"
          style={{
            height: '100%',
            width: '100%',
          }}
          className="ag-theme-alpine"
        >
          <AgGridReact
            suppressExcelExport={true}
            defaultColDef={{
              width: 150,
              editable: true,
              filter: 'agTextColumnFilter',
              floatingFilter: true,
              resizable: true,
            }}
            defaultColGroupDef={{ marryChildren: true }}
            columnTypes={{
              numberColumn: {
                width: 130,
                filter: 'agNumberColumnFilter',
              },
              medalColumn: {
                width: 100,
                columnGroupShow: 'open',
                filter: false,
              },
              nonEditableColumn: { editable: false },
              dateColumn: {
                filter: 'agDateColumnFilter',
                filterParams: {
                  comparator: function (filterLocalDateAtMidnight, cellValue) {
                    var dateParts = cellValue.split('/');
                    var day = Number(dateParts[0]);
                    var month = Number(dateParts[1]) - 1;
                    var year = Number(dateParts[2]);
                    var cellDate = new Date(year, month, day);
                    if (cellDate < filterLocalDateAtMidnight) {
                      return -1;
                    } else if (cellDate > filterLocalDateAtMidnight) {
                      return 1;
                    } else {
                      return 0;
                    }
                  },
                },
              },
            }}
            rowData={rowData}
            onGridReady={onGridReady}
          >
            <AgGridColumn headerName="Meta Data" groupId="medalsGroup">
              <AgGridColumn headerName="Gold" field="gold" type="medalColumn" />
              <AgGridColumn
                headerName="Silver"
                field="silver"
                type="medalColumn"
              />
              <AgGridColumn
                headerName="Bronze"
                field="bronze"
                type="medalColumn"
              />
              <AgGridColumn
                headerName="Fund Name"
                field="total"
                type="medalColumn"
              />
              <AgGridColumn
                headerName="Fund Name"
                field="total"
                type="medalColumn"
                columnGroupShow="closed"
              />
            </AgGridColumn>
            <AgGridColumn headerName="IC Team" groupId="ICTeam">
              <AgGridColumn headerName="User Check" groupId="ICTeam">
                <AgGridColumn type="ICTeam" headerName="User" field="athlete" />
                <AgGridColumn type="ICTeam" headerName="CheckList Status" field="sport" />
              </AgGridColumn>
              <AgGridColumn headerName="Word Check Info" groupId="ICTeam">
                <AgGridColumn type="ICTeam" headerName="Athlete" field="athlete" />
                <AgGridColumn type="ICTeam" headerName="Sport" field="sport" />
              </AgGridColumn>
            </AgGridColumn>
            <AgGridColumn headerName="RTA Compliance Team" groupId="RTAComplianceTeam">
              <AgGridColumn columnGroupShow="closed" type="RTAComplianceTeam" headerName="Age" field="age" type="numberColumn" />
              <AgGridColumn type="RTAComplianceTeam" headerName="Year" field="year" type="numberColumn" />

              <AgGridColumn
                headerName="Date"
                field="date"
                type={['dateColumn', 'nonEditableColumn']}
                width={220}
              />
            </AgGridColumn>

          </AgGridReact>
        </div>
      </div>
    </div>
  );
};
export default GridExample