export const PORT = process.env.PORT || 3001;

export const APP_URLS = {
    ECOMMERCE_PLAYGROUND: 'https://ecommerce-playground.lambdatest.io/index.php?route=account/login',
    AMAZON: 'https://www.amazon.in',
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
    NAVIGATING_TO_AMZ_SITE: 'Navigating to the Amazon site...🏄‍♂️',
    NAVIGATED_TO_AMZ_SITE: 'Navigated to the Amazon site🎉',
    SEARCH_TXT_TYPING: 'Typing your product filter text...👩‍💻',
    NAVIGATING_TO_SEARCH_RESULTS: 'Navigating to Search Results...🏄‍♂️',
    NAVIGATED_TO_SEARCH_RESULTS: 'Navigated to Search Results...🏄‍♂️',
}

export const SCREENSHOT_FILE_NAMES = {
    DASHBOARD: 'Dashboard',
    DEBUG: () => `DEBUG-${Date.now()}`,
    ORDER_HISTORY: 'OrderHistory',
    AMZ_SEARCH_RESULT: 'AmazonSearchResult'
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
    SEARCH_AMZ_INPUT: 'Search Amazon.in',
    FIRST_SEARCH_RES: '.s-suggestion-container',
    SEARCH_RESULTS_IDENTIFIER: 'Results',
    PRODUCT_TITLE: '//*[@data-cy="title-recipe"]//h2//a//span',
    PRODUCT_LINK: '//*[@data-cy="title-recipe"]//h2//a',
    PRODUCT_PRICE: '//*[@data-cy="price-recipe"]',
}

export const ERROR_MSG = {
    UNKNOWN_ERROR_OCCURRED: 'UNKNOWN_ERROR_OCCURRED'
}

export const LOGS = {
    DASHBOARD_NAVIGATED: 'Navigated to dashboard✨',
    SEARCH_RESULTS_FETCHED: 'Search Results Fetched',
    LISTENING_TO_PORT: 'Listening on Port: ' + PORT,
    CLOSE_CONNECTIONS: 'Closing the connections...🕛',
}

export const SOCKET_URLS = {
    ORDER_HISTORY_URL: 'api/scrapper/ecommerce/scrap/orderHistory',
    SEARCH_PRODUCTS_URL: 'api/scrapper/amazon/scrap/products',
}