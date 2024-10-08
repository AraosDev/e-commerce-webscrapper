import { useState } from "react";
import { ProductData, ProductDetails, Views } from "../../types/components/FetchLastOrders.d";
import { searchProductsSocket } from "../../common/socket";
import { LABELS, SOCKET_EVENTS } from "../../common/constants";
import FormInput from "../../common/FormInput";
import { Button } from "react-bootstrap";
import LiveFeeds from "../../common/LiveFeeds";
import DataTable from "../../common/DataTable";
import { ColumnConfig } from "../../types/common/DataTable.d";

function SearchProducts() {
  const [searchText, setSearchText] = useState('');
  const [liveFeed, setLiveFeed] = useState<string>('');
  const [ProductData, setProductData] = useState<ProductDetails[]>([]);
  const [view, setView] = useState<Views>(Views.INPUT_VIEW);

  const columnConfig: ColumnConfig[] = [
    { name: 'name', title: 'Product Name' },
    { name: 'price', title: 'Price' },
    { name: 'link', title: 'Link' }
  ];

  function setLiveUpdates(message: string) {
    setLiveFeed(message);
  }

  function searchProductHandler(productData: ProductData) {
    setLiveFeed(JSON.stringify(productData));
    setProductData(
      productData.data.map(({name, link, ...rest}) => ({
        key: name,
        name,
        link: link || 'Not Available',
        ...rest,
      }))
    );
    setView(Views.OUTPUT_VIEW);
    searchProductsSocket.disconnect();
  }

  function onSubmit() {
    if (searchProductsSocket.disconnected) {
      searchProductsSocket.connect();
    }
    if (searchProductsSocket.connected) {
      searchProductsSocket.disconnect();
      searchProductsSocket.connect();
    }

    searchProductsSocket.emit(
      SOCKET_EVENTS.NAVIGATE_TO_SEARCH_PAGE,
      searchText,
      searchProductHandler,
    );

    if (!searchProductsSocket.hasListeners(SOCKET_EVENTS.RECEIVE_UPDATES_FOR_SEARCH_PRODUCTS)) {
      searchProductsSocket.on(
        SOCKET_EVENTS.RECEIVE_UPDATES_FOR_SEARCH_PRODUCTS,
        setLiveUpdates,
      );
    }
  }

  let content: React.ReactNode;
  if (view === Views.INPUT_VIEW) {
    content = (
      <>
        <h5>Type your search text</h5>
        <FormInput
          value={searchText}
          formType="text"
          setValue={setSearchText}
          placeholder={LABELS.EMAIL_PLACEHOLDER}
          label={LABELS.EMAIL_LABEL}
        />
        <Button className="scrap-btn" onClick={onSubmit}>Search Product Results</Button>
      </>
    )
  } else {
    content = (
      <>
        <DataTable
          data={ProductData}
          columnConfig={columnConfig}
          downloadFileName="searchResults"
        />
        <Button className="scrap-btn mt-2" onClick={() => setView(Views.INPUT_VIEW)}>Back</Button>
      </>
    );
  }
  return (
    <div className="d-flex justify-content-evenly align-items-center">
      <div style={{flex: 1}} className="d-flex flex-column align-items-center justify-content-center">
        {content}
      </div>
      <div className="m-4 d-flex align-items-center justify-content-center" style={{flex: 1}}>
        <LiveFeeds feed={liveFeed} />
      </div>
    </div>
  )
}

export default SearchProducts