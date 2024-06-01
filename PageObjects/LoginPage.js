
class LoginPage{

    constructor(page)
    {

        this.page = page;
        this.userName = page.locator('#userEmail');
        this.passWord = page.locator('#userPassword');
        this.signInBtn = page.locator('#login');
    }

    async goTo()
    {
        await this.page.goto("https://rahulshettyacademy.com/client");
        await this.page.waitForLoadState('networkidle');
    }

    async validLogin(username, password)
    {
        await this.userName.fill(username);
        await this.passWord.fill(password);
        await this.signInBtn.click();
        // Waits for 'load' state by default
        await this.page.waitForLoadState('networkidle');
    }

}

module.exports = {LoginPage};


