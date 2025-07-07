Feature: User Authentication tests

Background:
  Given User navigates to the application
  And User click on the login link
Scenario:
  Given User enter the username as "soundar"
  And User enter the password as "Kiot1234"
  When User click on the login button
  Then login should be success

Scenario: Login should not be success
  Given User enter the username as "soundar"
  And User enter the password as ""
  When User click on the login button
  Then login should fail
