export const LABELS = {
    TAB_1_TITLE: 'Fetch my last orders',
    TAB_2_TITLE: 'Search Products from Amazon',
    EMAIL_PLACEHOLDER: 'Type your email here...',
    SEARCH_PLACEHOLDER: 'Type your search text here...',
    EMAIL_LABEL: 'Email',
    SEARCH_LABEL: 'Search Text',
    PWD_PLACEHOLDER: 'Type your password here...',
    PWD_LABEL: 'Password',
}

export const SOCKET_URLS = {
    ORDER_HISTORY_URL: 'http://localhost:3001/api/scrapper/ecommerce/scrap/orderHistory',
    SEARCH_PRODUCTS_URL: 'http://localhost:3001/api/scrapper/amazon/scrap/products',
}

export const SOCKET_EVENTS = {
    LOGIN_TO_DASHBOARD: 'LOGIN_TO_DASHBOARD',
    NAVIGATE_TO_SEARCH_PAGE: 'NAVIGATE_TO_SEARCH_PAGE',
    SCRAP_ORDER_HISTORY: 'SCRAP_ORDER_HISTORY',
    RECEIVE_UPDATES_FOR_LOGIN: 'RECEIVE_UPDATES_FOR_LOGIN',
    RECEIVE_UPDATES_FOR_SCRAPPING: 'RECEIVE_UPDATES_FOR_SCRAPPING',
    RECEIVE_UPDATES_FOR_SEARCH_PRODUCTS: 'RECEIVE_UPDATES_FOR_SEARCH_PRODUCTS',
    CONNECTION: 'connection',
    DISCONNECT: 'disconnect'
};