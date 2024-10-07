export const PORT = process.env.PORT || 3001;

export const APP_URLS = {
    ECOMMERCE_PLAYGROUND: 'https://ecommerce-playground.lambdatest.io/index.php?route=account/login',
}

export const SOCKET_EVENTS = {
    LOGIN_TO_DASHBOARD: 'LOGIN_TO_DASHBOARD',
    SCRAP_ORDER_HISTORY: 'SCRAP_ORDER_HISTORY',
    RECEIVE_UPDATES_FOR_LOGIN: 'RECEIVE_UPDATES_FOR_LOGIN',
    RECEIVE_UPDATES_FOR_SCRAPPING: 'RECEIVE_UPDATES_FOR_SCRAPPING',
    CONNECTION: 'connection',
    DISCONNECT: 'disconnect'
};

export const SOCKET_MESSAGES = {
    BROWSER_OPENING: 'Opening up the browser in incognito mode...🌐',
    BROWSER_OPENED: 'Browser is all geared up ⚙️✅',
    NAVIGATING_TO_SITE: 'Navigating to the Ecommerce site...🏄‍♂️',
    NAVIGATED_TO_SITE: 'Navigated to the site🎉',
    EMAIL_TYPING: 'Typing your email...👩‍💻',
    PASSWORD_TYPING: 'Typing the password...🧑‍💻',
    NAVIGATED_ECOMMERCE_DASHBOARD: 'Navigated to Ecommerce dashboard!🎉',
    NAVIGATING_ORDER_HISTORY: 'Navigating to order history...🏄‍♂️',
    NAVIGATED_ORDER_HISTORY: 'Navigated to order history🚩',
    STARTING_SCRAPING_PROCESS: 'Starting the scrapping process...📝',
}

export const SCREENSHOT_FILE_NAMES = {
    DASHBOARD: 'Dashboard',
    DEBUG: () => `DEBUG-${Date.now()}`,
    ORDER_HISTORY: 'OrderHistory',
}

export const LOCATORS = {
    EMAIL_PLACEHOLDER: 'E-Mail Address',
    PASSWORD_PLACEHOLDER: 'Password',
    ENTER_KEY: 'Enter',
    PRODUCT_DETAILS_LINK_XPATH: (index: number) =>
        `xpath=//*[@id="content"]/div[1]/table/tbody/tr[${index+1}]/td[7]/a`,
    PRODUCT_DETAILS_IDENTIFIER: 'Product Name',
    NAME_XPATH: 'xpath=//*[@id="content"]/div[1]/table/tbody/tr/td[1]',
    PRICE_XPATH: '//*[@id="content"]/div[1]/table/tfoot/tr[5]/td[3]',
    BACK_BTN_XPATH: '//*[@id="content"]/div[2]/div/a' ,
    ORDER_HISTORY_IDENTIFIER: 'Logout',
    ORDERS_LIST_SELECTOR: '#content > div.table-responsive > table > tbody > tr',
    ORDER_HISTORY_BTN: 'View your order history',
    ORDER_HISTORY_TITLE: 'Order History',
    DASHBOARD_IDENTIFIER: 'Edit your account information',
}

export const ERROR_MSG = {
    UNKNOWN_ERROR_OCCURRED: 'UNKNOWN_ERROR_OCCURRED'
}

export const LOGS = {
    DASHBOARD_NAVIGATED: 'Navigated to dashboard✨',
    LISTENING_TO_PORT: 'Listening on Port: ' + PORT,
    CLOSE_CONNECTIONS: 'Closing the connections...🕛',
}

export const SOCKET_URLS = {
    ORDER_HISTORY_URL: 'api/scrapper/ecommerce/scrap/orderHistory',
}