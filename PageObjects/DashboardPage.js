
class DashboardPage{

    constructor(page)
    {
        this.page = page;
        this.products = page.locator('.card-body');
        this.productsText = page.locator('.card-body b');
        this.cart = page.locator("[routerlink*='cart']");

    }

    async searchProductAddToCart(productName)
    {
        await this.productsText.first().waitFor();
       const titles = await this.productsText.allTextContents();
       console.log(titles);
       const count = await this.products.count();
       for(let i=0; i < count; i++)
        {
            if(await this.products.nth(i).locator('b').textContent() === productName)
                {
                    //add to cart
                    await this.products.nth(i).locator("text= Add To Cart").click();
                    break;
                }
       }
      // await this.page.pause();
    }

    async navigateToCart()
    {
        await this.cart.click();
        //await this.page.pause();
    }
}

module.exports = {DashboardPage};