from selenium_wrapper import SeleniumWrapper
from sty import fg, bg, ef, rs, Rule
import selenium.webdriver
from glob import glob
import traceback
import json
import sys


def _assert(condition, error_msg):
    assert condition, error_msg


def get_test_target():
    if len(available_tests) == 1:
        print("Running %s" % available_tests[0])
        return available_tests[0]
    test_target = input("Which test to run? ")
    if not test_target.endswith(".test"):
        test_target += ".test"
    while not test_target in available_tests:
        test_target = get_test_target()
    return test_target


def print_available_tests():
    global available_tests
    available_tests = glob("*.test", recursive=False)
    print(ef.bold + fg.green + "Available Tests: " + fg.rs + rs.bold_dim)
    for i in range(len(available_tests)):
        test_name = available_tests[i].replace(".test", "")
        print("%-10s" % test_name)
        if i % 3 == 0:
            print()


def read_options(test_target):
    with open(test_target, "r") as test_file:
        return json.loads(test_file.read())


def url_equals(target):
    cur_url = sw.web.current_url.strip('/')
    _assert(
        target.strip('/') == cur_url, "URL not equal to target: " + cur_url)


def get(url):
    sw.get(url)


def click_css(selector):
    sw.wait_for_csssel(selector)
    sw.web.find_element_by_css_selector(selector).click()


def get_source(action, value):
    return "%s('%s')" % (action, value)


def attr_equals(value):
    values = value.split("::", 2)
    selector = values[0]
    attr = values[1]
    target = values[2]
    sw.wait_for_csssel(selector)
    elem = sw.web.find_element_by_css_selector(selector).get_attribute(attr)
    _assert(target == elem, "%s =/= %s" % (target, elem))


def attr_contains(value):
    values = value.split("::", 2)
    selector = values[0]
    attr = values[1]
    target = values[2]
    sw.wait_for_csssel(selector)
    elem = sw.web.find_element_by_css_selector(selector).get_attribute(attr)
    _assert(target in elem, "'%s' not contained in '%s'" % (target, elem))


def text_equals(value):
    values = value.split("::", 1)
    selector = values[0]
    innerHtml = values[1]
    sw.wait_for_csssel(selector)
    elem = sw.web.find_element_by_css_selector(selector).get_attribute(
        'innerHTML')
    _assert(innerHtml == elem, "%s =/= %s" % (innerHtml, elem))


def simulate(action, value):
    source = get_source(action, value)
    print(fg.yellow + ef.bold + "Simulating: " + rs.bold_dim + fg.rs + source)
    eval(source)


def main():
    print_available_tests()
    test_target = get_test_target()
    options = read_options(test_target)

    global sw, failed_count, test_count
    firefox_capabilities = selenium.webdriver.DesiredCapabilities.FIREFOX
    firefox_capabilities['marionette'] = True
    sw = SeleniumWrapper(firefox_capabilities)
    for case in options["cases"]:
        for action in case:
            action = next(iter(action.items()))
            method = ""
            value = ""
            try:
                method = action[0]
                value = action[1]
                simulate(method, value)
            except Exception as e:
                print(
                    traceback.format_exception(
                        None,  # <- type(e) by docs, but ignored 
                        e,
                        e.__traceback__),
                    file=sys.stderr,
                    flush=True)
                print(fg.red + ef.bold + "Test case failed: " + rs.bold_dim +
                      fg.rs + get_source(method, value))
                exit(1)
        print(fg.green + ef.bold + "Success" + rs.bold_dim + fg.rs)

    sw.close()


if __name__ == "__main__":
    main()
