export enum TabKeys {
    FETCH_LAST_ORDERS = 'FETCH_LAST_ORDERS',
    SEARCH_PRODUCTS = 'SEARCH_PRODUCTS',
}

export interface TabProps {
    eventKey: TabKeys;
    tabtitle: string;
    children: React.ReactNode;
}

export interface TabSwitchProps {
    activeKey: TabKeys;
    onTabSwitch: (k: TabKeys) => void; 
    children: React.ReactNode;
}