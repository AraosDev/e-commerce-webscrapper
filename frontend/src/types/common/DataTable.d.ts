export interface ColumnConfig {
    name: string;
    title: string;
}

type Data = {
    [key: string]: string;
    key: string;
}

export interface DataTableProps {
    columnConfig: ColumnConfig[];
    data: Data[];
    downloadFileName: string;
}

