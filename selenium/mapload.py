import unittest

from selenium import webdriver
from selenium.webdriver.support.ui import Select
import time


class AuthenticationTests(unittest.TestCase):

    def setUp(self):
        self.browser = webdriver.Chrome()
        self.addCleanup(self.browser.quit)

    def test_maploads(self):
        self.browser.get("http://localhost:3000/")
        time.sleep(2)
        self.browser.switch_to.frame("map")


if __name__ == '__main__':
    unittest.main(verbosity=2)