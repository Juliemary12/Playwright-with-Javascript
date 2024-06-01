
Feature: Ecommerce validations

    @Regression
    Scenario: Placing the order
        Given a login to Ecommerce application with "anshika@gmail.com" and "Iamking@000"
        When Add "ZARA COAT 3" to cart
        Then Verify "ZARA COAT 3" is displayed in the cart

    #  @Validation
    # Scenario Outline: Placing the order
    #     Given a login to Ecommerce2 application with "<username>" and "<password>"
    #     Then Verify error message is displayed

    # Examples:
    # | username          | password    |
    # | anshika@gmail.com | Iamking@111 |
    # | Rahu@yahoo.com    | IamRagul@1  |