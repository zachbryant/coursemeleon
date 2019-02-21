from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait
import selenium.webdriver.common.keys
import selenium.webdriver.common.by
import selenium.common.exceptions
from selenium import webdriver
import threading
import traceback
import certifi
import urllib3
import urllib
import json
import time
import os


class SeleniumWrapper:
    def __init__(self, firefox_capabilities):
        self.firefox_capabilities = firefox_capabilities
        self.web = self.start()

    def wait_for_internet_connection(self):
        message = False
        while True:
            try:
                urllib3.PoolManager(
                    cert_reqs='CERT_REQUIRED',
                    ca_certs=certifi.where()).request('GET',
                                                      "https://google.com")
                # print('Good connection.')
                return True
            except Exception:
                if not message:
                    print(
                        'No connection! Please connect to the internet to continue.'
                    )
                    message = True
                    time.sleep(1)

    def wait_for_name(self, name):
        present = EC.presence_of_element_located(
            (selenium.webdriver.common.by.By.NAME, name))
        WebDriverWait(self.web, 30).until(present)

    def wait_for_id(self, id):
        present = EC.presence_of_element_located(
            (selenium.webdriver.common.by.By.ID, id))
        WebDriverWait(self.web, 30).until(present)

    def wait_for_xpath(self, xpath):
        present = EC.presence_of_element_located(
            (selenium.webdriver.common.by.By.XPATH, xpath))
        WebDriverWait(self.web, 30).until(present)

    def wait_for_csssel(self, css):
        present = EC.presence_of_element_located(
            (selenium.webdriver.common.by.By.CSS_SELECTOR, css))
        WebDriverWait(self.web, 30).until(present)

    def close(self):
        try:
            self.web.quit()
        except Exception:
            pass

    def start(self):
        web = webdriver.Firefox(capabilities=self.firefox_capabilities)
        web.implicitly_wait(10)
        return web

    def restart(self):
        self.close()
        return self.start()

    def get(self, url):
        self.wait_for_internet_connection()
        try:
            self.web.get(url)
        except selenium.common.exceptions.TimeoutException:
            self.wait_for_internet_connection()
            self.web.get(url)