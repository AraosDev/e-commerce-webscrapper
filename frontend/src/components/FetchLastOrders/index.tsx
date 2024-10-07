import React, { useState } from "react";
import LiveFeeds from "../../common/LiveFeeds"
import FormInput from "../../common/FormInput";
import { LABELS, SOCKET_EVENTS } from "../../common/constants";
import { Button } from "react-bootstrap";
import './index.css';
import scrapOrdersSocket from "../../common/socket";
import { LoginAckMsg, LoginRequest } from "../../types/common/socket";
import { OrderHistory, ProductDetails, Views } from "../../types/components/FetchLastOrders.d";
import DataTable from "../../common/DataTable";
import { ColumnConfig } from "../../types/common/DataTable.d";

function FetchLastOrders() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [liveFeed, setLiveFeed] = useState<string>('');
  const [view, setView] = useState<Views>(Views.INPUT_VIEW);
  const [orderHistoryData, setOrderHistoryData] = useState<ProductDetails[]>([]);

  const columnConfig: ColumnConfig[] = [
    { name: 'name', title: 'Product Name' },
    { name: 'price', title: 'Price' },
    { name: 'link', title: 'Link' }
  ];

  function setLiveUpdates(message: string) {
    setLiveFeed(message);
  }
  
  function orderHistoryHandler(orderHistory: OrderHistory) {
    setLiveFeed(JSON.stringify(orderHistory));
    setOrderHistoryData(
      orderHistory.data.map(({name, link, ...rest}) => ({
        key: name,
        name,
        link: link || 'Not Available',
        ...rest,
      }))
    );
    setView(Views.OUTPUT_VIEW);
    scrapOrdersSocket.disconnect();
  }

  function loginToDashBoardHandler (liveStream: LoginAckMsg) {
    setLiveFeed(liveStream.message);
    scrapOrdersSocket.emit(
      SOCKET_EVENTS.SCRAP_ORDER_HISTORY,
      {},
      orderHistoryHandler,
    );

    if (!scrapOrdersSocket.hasListeners(SOCKET_EVENTS.RECEIVE_UPDATES_FOR_SCRAPPING)) {
      scrapOrdersSocket.on(
        SOCKET_EVENTS.RECEIVE_UPDATES_FOR_SCRAPPING,
        setLiveUpdates,
      );
    }
  }

  function onSubmit() {
    const loginRequest: LoginRequest = {
      userName: email,
      password,
    }
    if (scrapOrdersSocket.disconnected) {
      scrapOrdersSocket.connect();
    }
    if (scrapOrdersSocket.connected) {
      scrapOrdersSocket.disconnect();
      scrapOrdersSocket.connect();
    }
    scrapOrdersSocket.emit(
      SOCKET_EVENTS.LOGIN_TO_DASHBOARD,
      loginRequest,
      loginToDashBoardHandler,
    );

    if (!scrapOrdersSocket.hasListeners(SOCKET_EVENTS.RECEIVE_UPDATES_FOR_LOGIN)) {
      scrapOrdersSocket.on(
        SOCKET_EVENTS.RECEIVE_UPDATES_FOR_LOGIN, 
        setLiveUpdates,
      );
    }
  }

  let content: React.ReactNode;
  if (view === Views.INPUT_VIEW) {
    content = (
      <>
        <h5>User Input</h5>
        <FormInput
          value={email}
          setValue={setEmail}
          placeholder={LABELS.EMAIL_PLACEHOLDER}
          formType="email"
          label={LABELS.EMAIL_LABEL}
        />
        <FormInput
          value={password}
          setValue={setPassword}
          placeholder={LABELS.PWD_PLACEHOLDER}
          formType="password"
          label={LABELS.PWD_LABEL}
        />
        <Button className="scrap-btn" onClick={onSubmit}>Scrap my orders</Button>
      </>
    )
  } else {
    content = (
      <>
        <DataTable
          data={orderHistoryData}
          columnConfig={columnConfig}
          downloadFileName="OrderHistory"
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

export default FetchLastOrders