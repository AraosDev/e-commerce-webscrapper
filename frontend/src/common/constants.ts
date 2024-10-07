export const LABELS = {
    TAB_1_TITLE: 'Fetch my last orders',
    TAB_2_TITLE: 'Search Products from Amazon',
    EMAIL_PLACEHOLDER: 'Type your email here...',
    EMAIL_LABEL: 'Email',
    PWD_PLACEHOLDER: 'Type your password here...',
    PWD_LABEL: 'Password',
}

export const SOCKET_URLS = {
    ORDER_HISTORY_URL: 'http://localhost:3001/api/scrapper/ecommerce/scrap/orderHistory',
}

export const SOCKET_EVENTS = {
    LOGIN_TO_DASHBOARD: 'LOGIN_TO_DASHBOARD',
    SCRAP_ORDER_HISTORY: 'SCRAP_ORDER_HISTORY',
    RECEIVE_UPDATES_FOR_LOGIN: 'RECEIVE_UPDATES_FOR_LOGIN',
    RECEIVE_UPDATES_FOR_SCRAPPING: 'RECEIVE_UPDATES_FOR_SCRAPPING',
    CONNECTION: 'connection',
    DISCONNECT: 'disconnect'
};