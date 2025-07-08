Feature: User Authentication tests

Background:
    Given User navigates to the application
    And User click on the login link

Scenario: Add to the cart should be success
    Given User enter the username as "<username>"
    And User enter the password as "<password>"
    When User click on the login button
    Then User search the book "<book>"
    And User add the book to cart
    And User can view the book carted 

Examples:
| username   | password     | book          |
| soundar | Kiot1234   | roomies       |
| arun123 | Kiot1234   | Rot & Ruin    |

# @fail
# Scenario: Add to cart should be failed
#     Then User search the book "Thealchemist"
#     And User add the book to cart
#     And User can view the book carted