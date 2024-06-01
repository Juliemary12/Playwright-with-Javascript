
const playwright = require('@playwright/test');
const { POManager } = require('../../PageObjects/POManager');
const {Before, After, BeforeStep, AfterStep, Status, context} = require('@cucumber/cucumber');
const path = require('path');
let browser;


Before(async function () {

    browser = await playwright.chromium.launch({headless: false});
    const context = await browser.newContext();
    this.page = await context.newPage();

    this.poManager = new POManager(this.page);
  });

  BeforeStep( function () {
    
  });
  
  AfterStep(async function ({result}) {
    
    if(result.status === Status.FAILED){
       await this.page.screenshot({ path : 'screenshot.png'});
    }
  });

  After(async function () {
   
    await browser.close();
    console.log("I am last to execute");
  });