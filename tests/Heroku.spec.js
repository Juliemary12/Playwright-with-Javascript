

const {test, expect} = require('@playwright/test')
const excel = require('../utils/ExcelReader.spec');

test("Verify Url", async function({page}){
    //Navigation
    await page.goto("https://the-internet.herokuapp.com/");
    await page.waitForTimeout(5000);
    // Expect a heading is visible.
    await expect(page.getByRole('heading', {name : 'Welcome to the-internet'})).toBeVisible;
})

test("A/B Testing Link", async function({page}){
     //Navigation
    await page.goto("https://the-internet.herokuapp.com/");
    
    // Click the A/B Testing link.
    await page.getByRole('link', {name : 'A/B Testing'}).click();
    await page.waitForTimeout(5000)

    // Expect a heading is visible.
    await expect(page.getByRole('heading', {name : 'A/B Test '})).toBeVisible();

    // Expect a heading contains the text.
    await expect(page.getByRole('heading', {name : 'A/B Test '})).toHaveText('A/B Test Variation 1');
    //await expect(page.getByText('A/B Test Variation 1', { exact : true })).toBeVisible();
})

test("Add/Remove Elements", async function({page}){
    //Navigation
    await page.goto("https://the-internet.herokuapp.com/");
    await page.waitForTimeout(5000);

    // Click the Add/Remove Elements link.
    await page.getByRole('link', {name : 'Add/Remove Elements'}).click();
    await expect(page.getByRole('heading', {name : 'Add/Remove Elements'})).toBeVisible();
    await expect(page.getByRole('heading', {name : 'Add/Remove Elements'})).toHaveText('Add/Remove Elements');
    await page.waitForTimeout(5000);

    //click Add Element
    await page.getByRole('button', {name : /Add Element/i}).click();
    //Expect Delete button
    await expect(page.getByRole('button', {name : 'Delete'})).toBeVisible();
    await page.waitForTimeout(5000);

    //Click Delete Button
    await page.getByRole('button', {name : /Delete/i}).click();
    await page.waitForTimeout(5000);
    await expect(page.getByRole('button', {name : 'Add Element'})).toBeVisible();

})

test("Checkboxes", async function({page}){
    //Navigation
    await page.goto("https://the-internet.herokuapp.com/");
   
    //Click checkbox link
    await page.getByRole('link', {name : 'Checkboxes'}).click();
  
    //asserting the checkboxes in various ways
    await expect(page.getByRole('heading', {name :'Checkboxes'})).toBeVisible();
    await expect(page.getByRole('heading', {name :'Checkboxes'})).toHaveText('Checkboxes');
   // await page.waitForTimeout(5000);
    await expect(page.locator("//form[@id='checkboxes']")).toBeVisible();

    //using Xpath checking the checkbox 1
    const checkbox1 = page.locator("//form[@id='checkboxes']//input[1]")
    //check checkbox1
    await checkbox1.check();
   
    //expect checkbox1 is checked
    await expect(checkbox1).toBeChecked();
   
    //using Xpath checking the checkbox 2
    const checkbox2 = page.locator("//form[@id='checkboxes']//input[2]")
    await checkbox2.uncheck(); //uncheck since the checkbox is already checked
    await checkbox2.check();
    await expect(checkbox2).toBeChecked();

    /* ========= Another method ==========
    // Check the checkbox
  const checkboxes = page.getByRole('checkbox');

  await checkboxes.nth(0).check();

  await expect(checkboxes.nth(0)).toBeChecked();

  console.log(checkboxes.nth(0));

  await checkboxes.nth(1).check();

  await expect(checkboxes.nth(1)).toBeChecked();

  console.log(checkboxes.nth(1)); */

})

test("Disappearing Elements", async function({page}){
    //Navigation
    await page.goto("https://the-internet.herokuapp.com/"); 

    //Click Disappearing Elements from the list
    const homePageList = page.getByRole('listitem');
    await homePageList.getByText("Disappearing Elements").click();

    // Expect a Url "to contain" a substring.
    await expect(page).toHaveURL(/disappearing_elements/);
    //await expect(page.getByRole('heading', {name : "Disappearing Elements"})).toBeVisible();

    //const item= page.getByRole('listitem').hasText(['Home', 'About', 'Contact Us', 'Portfolio', 'Gallery']);

    const home = page.getByRole('listitem').filter({ hasText: "Home"});
    const about = page.getByRole('listitem').filter({ hasText: "About"});
    const contactUs = page.getByRole('listitem').filter({ hasText: "Contact Us"});
    const portfolio = page.getByRole('listitem').filter({ hasText: "Portfolio"});
    const gallery = page.getByRole('listitem').filter({ hasText: "Gallery"});

    if ((home.isDisabled) && (home.isVisible)){
        await home.click();
        await page.waitForTimeout(5000);
    // Expect a heading is visible.
    await expect(page.getByRole('heading', {name : 'Welcome to the-internet'})).toBeVisible;
    await page.goto("https://the-internet.herokuapp.com/disappearing_elements");
    await page.waitForTimeout(5000);
    } 

    if ((about.isDisabled) && (about.isVisible)){
        await about.click();
        await page.waitForTimeout(5000);
             // Expect a Url "to contain" a substring.
             await expect(page).toHaveURL(/about/);
             await page.goto("https://the-internet.herokuapp.com/disappearing_elements");
             await page.waitForTimeout(5000);
    }
    if ((contactUs.isDisabled) && (contactUs.isVisible)){
        await contactUs.click();
       // await page.waitForTimeout(50000);
             // Expect a Url "to contain" a substring.
            await expect(page).toHaveURL(/contact-us/);
            await page.goto("https://the-internet.herokuapp.com/disappearing_elements");
           // await page.waitForTimeout(5000);
    }
    if ((portfolio.isDisabled) && (portfolio.isVisible)){
        await portfolio.click();
        //await page.waitForTimeout(5000);
            // Expect a Url "to contain" a substring.
            await expect(page).toHaveURL(/portfolio/);
            await page.goto("https://the-internet.herokuapp.com/disappearing_elements");
           // await page.waitForTimeout(5000);
    }
    if ((gallery.isDisabled) && (gallery.isVisible)){
        await gallery.click();
       // await page.waitForTimeout(5000);
                // Expect a Url "to contain" a substring.
                await expect(page).toHaveURL(/gallery/);
                await page.goto("https://the-internet.herokuapp.com/disappearing_elements");
              //  await page.waitForTimeout(5000);
    }
    else {
        console.log("Element is not found");
    }


   /* const disappearingList = page.locator("//ul/li");
    console.log(disappearingList);

    let item = "Contact Us";
    public void clickSortIcon(String optionname) {
		String item = optionname.trim().toLowerCase();
		switch (item) {
		case 'Home':
			
            // Expect a heading is visible.
             await expect(page.getByRole('heading', {name : 'Welcome to the-internet'})).toBeVisible;
			break;

		case "About":
			await about.click();
             // Expect a Url "to contain" a substring.
             await expect(page).toHaveURL(/about/);
			break;

		case "Contact Us":
			await contactUs.click();
             // Expect a Url "to contain" a substring.
            await expect(page).toHaveURL(/contact-us/);
			break;

		case "Portfolio":
			await portfolio.click();
            // Expect a Url "to contain" a substring.
            await expect(page).toHaveURL(/portfolio/);
			break;
        
            case "Gallery":
                await gallery.click();
                // Expect a Url "to contain" a substring.
                await expect(page).toHaveURL(/gallery/);
                break;

		default:
			System.out.println("Please pass item name properly");
			break;
		}
    }*/
})

test("Drag and Drop", async function({page}){
    //Navigation
    await page.goto("https://the-internet.herokuapp.com/"); 
    // const homePageList = page.getByRole('listitem');
    // await homePageList.getByText("Drag and Drop").click();

    //Click Drag and Drop link
    await page.getByRole('link', {name : 'Drag and Drop'}).click();
    await page.waitForTimeout(5000);

    // Expect a Url "to contain" a substring.
    await expect(page).toHaveURL(/drag_and_drop/);
    await page.waitForTimeout(5000);

    //drag&drop operation with locator.dragTo()
    await page.locator('#column-a').dragTo(page.locator('#column-b'));
    await page.waitForTimeout(5000);
    await expect(page.locator('#column-a')).toHaveText("B");
})

test("Dropdown", async function({page}){
    //Navigation
    await page.goto("https://the-internet.herokuapp.com/"); 
    // const homePageList = page.getByRole('listitem');
    // await homePageList.getByText("Dropdown").click();

    //Click Dropdown link
    await page.getByRole('link', {name : 'Dropdown'}).click();
    await page.waitForTimeout(5000);

    // Expect a Url "to contain" a substring.
    await expect(page).toHaveURL(/dropdown/);
    await page.waitForTimeout(5000);

    //select option from dropdown using label ie text
    await page.locator('#dropdown').selectOption({label: "Option 1"});
    await page.waitForTimeout(5000);
    
    //select option from dropdown using value
    await page.locator('#dropdown').selectOption({value: "2"});
    await page.waitForTimeout(5000);

    //select option from dropdown using index
    await page.locator('#dropdown').selectOption({index: 1});
    await page.waitForTimeout(5000);

    //getting all the text from the dropdown and asserting the same 
    const value = await page.locator('#dropdown').textContent();
    console.log("All dropdown values " +value);
    await expect(value.includes("julie")).toBeTruthy(); //this fails bcoz julie is not in the dropdown   
})

test(`@Web Form Authentication`, async function({page}){
    // Navigation
    await page.goto("https://the-internet.herokuapp.com/"); 

    //Click Form Authentication link
    await page.getByRole('link', {name: 'Form Authentication'}).click();
    await page.waitForTimeout(5000);
    await expect(page).toHaveURL(/login/);

    //Sending uername and password using getbylabel
    const username = page.getByLabel('Username');
    await username.fill("tomsmith");
    await page.waitForTimeout(5000);
  
    const password = page.getByLabel('Password');
    await password.fill("SuperSecretPassword!");
    await page.waitForTimeout(5000);
  
    await page.getByRole('button', {name: ' Login'}).click();
    await page.waitForTimeout(5000);
    //await expect(page.getByRole('heading', {name: 'secure area', level: 2 })).toBeVisible();
    //await page.waitForTimeout(5000);

    if((username === 'tomsmith') && (password === 'SuperSecretPassword!')){
        await expect(page.getByRole('heading', {name: 'secure area', level: 2 })).toBeVisible();
    } else if((username !== 'tomsmith') && (password === 'SuperSecretPassword!')){
        await expect(page.getByText("        Your username is invalid!        ")).toBeVisible();
    }else if((username === 'tomsmith') && (password !== 'SuperSecretPassword!')){
        await expect(page.getByText("        Your password is invalid!        ")).toBeVisible();
    }

    await page.getByRole('link', {name: ' Logout'}).click();
    await expect(page.getByText("    You logged out of the secure area!    ")).toBeVisible();

    //Sending uername and password using CSS
    /* await page.locator('#username').fill("tomsmith");
       await page.locator('#password').fill("SuperSecretPassword!");
       await page.locator('i.fa.fa-2x.fa-sign-in').click(); */
})

test("Key Presses", async function({page}){
    // Navigation
    await page.goto("https://the-internet.herokuapp.com/"); 

    //Click Key presses link
    await page.getByRole('link', {name: 'Key Presses'}).click();
    await page.waitForTimeout(5000);
    await expect(page).toHaveURL(/key_presses/);

    await page.locator("input#target").focus();
    await page.keyboard.press('Shift+A');
    
    await page.waitForTimeout(5000);

    await page.locator("input#target").fill('Julie Felix', { delay: 100 });
    
    //to press Ctrl+A, ctrl+c, and press Backspace, then ctrl+v
    await page.keyboard.press('Control+a');
    await page.waitForTimeout(5000);
    await page.keyboard.press('Control+c');
    await page.waitForTimeout(5000);
    await page.keyboard.press('Backspace');
    await page.waitForTimeout(5000);
   // await page.keyboard.press("Control+v");

    //to press Enter
    // await page.keyboard.press('Enter');
   // await page.waitForTimeout(5000);

    await page.locator("input#target").focus();
    await page.keyboard.type('Julie Mary!',{ delay: 100 } );
    await page.keyboard.press("ArrowLeft");
    
    await page.keyboard.down("Shift");
   
    for(let i=0; i<5; i++){
        await page.keyboard.press("ArrowLeft"); 
        
    }
    await page.keyboard.up("Shift");
    await page.keyboard.press("Backspace");


})

test(`@Web Hover`, async function({page}){
    // Navigation
    await page.goto("https://the-internet.herokuapp.com/"); 

    //Click Key presses link
    await page.getByRole('link', {name: 'Hovers'}).click();
    await page.waitForTimeout(5000);
    await expect(page).toHaveURL(/hovers/);

    //Using first() to hover on first image, last() for last, for second img we can use nth(1)
    await (page.getByAltText('User Avatar').first()).hover()
    await page.waitForTimeout(5000);
    const image = page.locator("//div[@class='figcaption']/a")
    await image.nth(0).click();
    await page.waitForTimeout(2000);

    //Assertion
    await expect(page.getByRole('heading', {name: 'Not Found'})).toBeVisible();
})

test("Handling Frames", async function({page}){
    // Navigation
    await page.goto("https://docs.oracle.com/javase/8/docs/api/"); 

    const frameLeftTop = await page.frameLocator("//frame[@name='packageListFrame']");

    await frameLeftTop.locator("//a[text()='java.awt']").click();
    await page.pause();

    const frameRight = await page.frameLocator("//frame[@name='classFrame']");

    await frameRight.locator("//a[text()='java.awt']").click();
    await page.pause();

})

test("Handling Nested Frames", async function({page}){
    // Navigation
    await page.goto("https://the-internet.herokuapp.com/"); 

    //Click Key presses link
    await page.getByRole('link', {name: 'Nested Frames'}).click();
    await page.waitForTimeout(5000);
    await expect(page).toHaveURL(/nested_frames/);

    const topFrame = await page.frameLocator('[name="frame-top"]');
    const topLeftFrame = await topFrame.frameLocator('[name="frame-left"]');
    const leftText = await topLeftFrame.locator('body').textContent();
    console.log(leftText);

})

//getting error
test("Handling Nested Frames-Error", async function({page}){
    // Navigation
    await page.goto("https://docs.oracle.com/javase/8/docs/api/"); 

   const Mainframe = await page.frameLocator("//frameset[@title='Documentation frame']");
   await page.waitForTimeout(2000);
   const RightFrame = await Mainframe.frameLocator("//frame[@name='classFrame']");
   await page.waitForTimeout(2000);
   const LeftFrame = await page.frameLocator("//frameset[@title='Left frames']");
   await page.waitForTimeout(2000);
   const Topframe_Left = await LeftFrame.frameLocator("//frame[@name='packageListFrame']");
   
   await (Topframe_Left.locator("//a[text()='java.awt']")).click();
   
    await page.pause();

   const Bottomframe_Left = await LeftFrame.frameLocator("//frame[@name='packageFrame']");

})

test("Handle Alert Message", async function({page}){
    //navigation
    await page.goto("https://the-internet.herokuapp.com/javascript_alerts");
    page.on("dialog", async (d) =>{
        expect(d.type()).toContain("alert");
        expect(d.message()).toContain("I am a JS Alert");
        await d.accept();
    })
    await page.getByRole('button', {name: "Click for JS Alert"}).click();

})

test("Handle Confirm Box", async function({page}){
    //navigation
    await page.goto("https://the-internet.herokuapp.com/javascript_alerts");

    page.on("dialog", async (dialogWindow)=> {
        expect(dialogWindow.type()).toContain("confirm");
        expect(dialogWindow.message()).toContain("I am a JS Confirm");
        //await dialogWindow.accept();
        await dialogWindow.dismiss();
    })

    await page.getByRole('button', {name: "Click for JS Confirm"}).click();
   
})

test("Handle Prompt Box", async function({page}){
    //navigation
    await page.goto("https://the-internet.herokuapp.com/javascript_alerts");

    page.on("dialog", async (dialogWindow)=> {
        expect(dialogWindow.type()).toContain("prompt");
        expect(dialogWindow.message()).toContain("I am a JS prompt");
        await dialogWindow.accept("JS");
       // await dialogWindow.dismiss();
    })

    await page.getByRole('button', {name: "Click for JS Prompt"}).click();
    await page.waitForTimeout(5000);
})

test(`@Web Client App login`, async ({ page }) => {
    //js file- Login js, DashboardPage
    const email = "anshika@gmail.com";
    const productName = 'zara coat 3';
    const products = page.locator(".card-body");
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill(email);
    await page.locator("#userPassword").type("Iamking@000");
    await page.locator("[value='Login']").click();
    await page.waitForLoadState('networkidle');
    await page.locator(".card-body b").first().waitFor();
    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles); 
  
 })

 


test.only("trying excel", async () => {

    let data = await excel.getData(1);
    console.log(data)
})