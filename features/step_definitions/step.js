const {Given, When, Then} = require('@cucumber/cucumber');
//const  { chromium }  = require('playwright');
const { POManager } = require('../../PageObjects/POManager');
const { expect } = require('@playwright/test');

//import { createBdd } from 'playwright-bdd';

//const { Given, When, Then } = createBdd();

const playwright = require('@playwright/test');

Given('a login to Ecommerce application with {string} and {string}',{timeout:100*1000}, async function (username, password) {
    
    const loginPage = this.poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(username, password);


  });

  When('Add {string} to cart', {timeout:100*1000}, async function (productName) {

    const dashboardPage = this.poManager.getDashboardPage();
    await dashboardPage.searchProductAddToCart(productName);
    await dashboardPage.navigateToCart();
  });

  Then('Verify {string} is displayed in the cart', {timeout:100*1000}, async function (productName) {
   
    const cartPage = this.poManager.getCartPage();
    await cartPage.VerifyProductIsDisplayed(productName);
    await cartPage.Checkout();
  });

  Given('a login to Ecommerce2 application with {string} and {string}', {timeout:100*1000}, async function (username, password) {
   
    const userName = this.page .locator('#username');
    const signIn = this.page .locator("#signInBtn");
   // const cardTitles =  this.page .locator(".card-body a");
    await this.page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await this.page.title());
    //css 
   await userName.fill(username);
   await this.page .locator("[type='password']").fill(password);
   await signIn.click();   

  });

  Then('Verify error message is displayed', async function () {
    console.log(await this.page .locator("[style*='block']").textContent());
    await expect(this.page .locator("[style*='block']")).toContainText('Incorrect');

  });