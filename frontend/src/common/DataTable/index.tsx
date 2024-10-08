import { DataTableProps } from "../../types/common/DataTable"
import './index.css';
import { BsDownload } from 'react-icons/bs';

function DataTable(props: DataTableProps) {
  const { columnConfig, data, downloadFileName } = props;

  function csvDownload() {
    let csv: string = `${columnConfig
        .map(({ title }) => title)
        .join(',')}\r\n`;
    const columnKeys = columnConfig.map(({ name }) => name);
    data.forEach(function(row) {
        csv += columnKeys.map((key) => row[key]).join(',');
        csv += "\r\n";
    });

    let hiddenElement = document.createElement('a'); 
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);  
    hiddenElement.target = '_blank';  

    hiddenElement.download = `${downloadFileName}.csv`;  
    hiddenElement.click();  
  } 
  return (
    <div className="d-flex flex-column" style={{height: 370, overflow: 'auto'}}>
        <div className="d-flex justify-content-end m-2">
            <BsDownload
                className="cursor-pointer"
                title="Download the data"
                onClick={csvDownload}
            />
        </div>
        <table>
            <tr>
                {
                    columnConfig.map(({name, title}) => (
                        <th key={name}>{title}</th>
                    ))
                }
            </tr>
            {
                data.map((dataObj) => (
                    <tr key={dataObj.key}>
                        {
                            columnConfig.map(({ name }) => (
                                <td key={name}>
                                    {
                                        name === 'link' && dataObj[name]?.startsWith('http') ? 
                                        <a href={dataObj[name]} target="_blank" rel="noreferrer">Product Link</a>
                                        : dataObj[name]
                                    }
                                </td>
                            ))
                        }
                    </tr>
                ))
            }
        </table>
    </div>
  )
}

export default DataTable