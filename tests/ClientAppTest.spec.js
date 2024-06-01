
const {test, expect} = require('@playwright/test');
const {POManager} = require('../PageObjects/POManager');
//Json-> string -> Js Object
const dataset = JSON.parse(JSON.stringify(require('../utils/ClientAppTestData.json')));

//pass test data as fixtures by extend test annotation behaviour.
//const {customtest} = require('../utils/test-base');

for(const data of dataset)
{
test(`@Web Client App Login for ${data.productName}`, async function({page}){

    const poManager = new POManager(page);
    const loginPage = poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(data.username, data.password);

    await expect(page.getByRole('button', {name: ' HOME '})).toBeVisible;

    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.searchProductAddToCart(data.productName);
    await dashboardPage.navigateToCart();
    await expect(page.getByRole('button', {name: 'Checkout'})).toHaveText("Checkout");

    const cartPage = poManager.getCartPage();
    await cartPage.VerifyProductIsDisplayed(data.productName);
    await cartPage.Checkout();

})
}

//pass test data as fixtures by extend test annotation behaviour.
/*customtest.only("Client App Login", async function({page, testDataForOrder}){

    const poManager = new POManager(page);
    

    const loginPage = poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(testDataForOrder.username, testDataForOrder.password);

    await expect(page.getByRole('button', {name: ' HOME '})).toBeVisible;

    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.searchProductAddToCart(testDataForOrder.productName);
    await dashboardPage.navigateToCart();
    await expect(page.getByRole('button', {name: 'Checkout'})).toHaveText("Checkout");

    const cartPage = poManager.getCartPage();
    await cartPage.VerifyProductIsDisplayed(testDataForOrder.productName);
    await cartPage.Checkout();

})*/