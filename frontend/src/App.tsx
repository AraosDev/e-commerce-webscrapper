import './App.css';
import Header from './components/Header/Header';
import { TabKeys } from './types/common/TabSwitch.d';
import { LABELS } from './common/constants';
import FetchLastOrders from './components/FetchLastOrders';
import SearchProducts from './components/SearchProducts';
import { useState } from 'react';
import { Tab, Tabs } from 'react-bootstrap';

function App() {
  const [tabKey, setTabKey] = useState<TabKeys>(TabKeys.FETCH_LAST_ORDERS);
  return (
    <>
      <Header />
      <Tabs
        activeKey={tabKey}
        onSelect={(k: unknown) => setTabKey(k as TabKeys)}
        className="mt-4 mx-3 wrapper"
        fill
      >
        <Tab
          eventKey={TabKeys.FETCH_LAST_ORDERS}
          title={LABELS.TAB_1_TITLE}
          className={`mx-3 px-3`}
        >
          <FetchLastOrders />
        </Tab>
        <Tab
          eventKey={TabKeys.SEARCH_PRODUCTS}
          title={LABELS.TAB_2_TITLE}
          className={`mx-3 px-3`}
        >
          <SearchProducts />
        </Tab>
      </Tabs>
    </>
  );
}

export default App;
