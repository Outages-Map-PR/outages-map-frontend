import unittest
import time

from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.common.alert import Alert


class AuthenticationTests(unittest.TestCase):

    def setUp(self):
        self.browser = webdriver.Chrome()
        self.addCleanup(self.browser.quit)

    def test_login(self):
        self.browser.get('http://localhost:3000/login')
        time.sleep(2)
        email_input = self.browser.find_element(By.ID, "email")
        email_input.send_keys("test2@gmail.com")
        time.sleep(2)
        password_input = self.browser.find_element(By.ID, "password")
        password_input.send_keys("this_is_a_test")
        time.sleep(2)
        password_input.send_keys(Keys.ENTER)
        time.sleep(1)

        message_expected = "Log-in successful"
        messaged_received = self.browser.switch_to.alert.text
        Alert(self.browser).accept()
        time.sleep(3)
        self.assertEqual(messaged_received, message_expected, "User did not log in")

    def test_login_wrongpassword(self):
        self.browser.get('http://localhost:3000/login')
        time.sleep(2)
        email_input = self.browser.find_element(By.ID, "email")
        email_input.send_keys("test2@gmail.com")
        time.sleep(2)
        password_input = self.browser.find_element(By.ID, "password")
        password_input.send_keys("this_is_a_tes")
        time.sleep(2)
        password_input.send_keys(Keys.ENTER)
        time.sleep(1)

        message_expected = "Please try again"
        message_received = self.browser.switch_to.alert.text
        Alert(self.browser).accept()
        time.sleep(3)
        self.assertEqual(message_received, message_expected, "User was able to login with wrong password")

    def test_login_wrongemail(self):
        self.browser.get('http://localhost:3000/login')
        time.sleep(2)
        email_input = self.browser.find_element(By.ID, "email")
        email_input.send_keys("test2")
        time.sleep(2)
        password_input = self.browser.find_element(By.ID, "password")
        password_input.send_keys("this_is_a_test")
        time.sleep(2)
        password_input.send_keys(Keys.ENTER)
        time.sleep(1)

        message_expected = "Please try again"
        message_received = self.browser.switch_to.alert.text
        Alert(self.browser).accept()
        time.sleep(3)
        self.assertEqual(message_received, message_expected, "User was able to login with wrong password")


if __name__ == '__main__':
    unittest.main(verbosity=2)
