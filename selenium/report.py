import unittest
import time

from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.common.alert import Alert
from selenium.webdriver.support.select import Select


class ReportTest(unittest.TestCase):
    def setUp(self):
        self.browser = webdriver.Chrome()
        self.addCleanup(self.browser.quit)

    def test_report_signedout(self):
        self.browser.get('http://localhost:3000/report')
        time.sleep(2)
        title = self.browser.find_element(By.ID, "report").text
        self.assertEqual(title, "Please log in to make a report", "User can make a report without being signed in")

    def test_report_signedin(self):
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
        Alert(self.browser).accept()

        self.browser.get('http://localhost:3000/report')
        time.sleep(2)
        report_address = self.browser.find_element(By.ID, "address")
        report_address.send_keys("Arecibo, PR")
        time.sleep(2)
        report_type = Select(self.browser.find_element(By.ID, "type"))
        report_type.select_by_value("water")
        time.sleep(2)
        report_company = self.browser.find_element(By.ID, "company")
        report_company.send_keys("AAA")
        time.sleep(2)


if __name__ == '__main__':
    unittest.main(verbosity=2)
