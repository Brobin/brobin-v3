---
title: 7 Ways to Speed Up Your Django Test Suite
date: "2016-08-13"
preview: As your Django app grows larger, your test suite starts piling up. In a project I was working on we had a test suite of 375 tests. Today I'll explain how I reduced the run time of that suite from 350+ seconds to 20 seconds. 1. Mock, mock, mock!
tags: python, django
---

As your Django app grows larger, your test suite starts piling up. In a project I was working on we had a test suite of 375 tests. Today I'll explain how I reduced the run time of that suite from 350+ seconds to 20 seconds.

### 1. Mock, mock, mock!

A HUGE bottleneck of our tests was in the billing logic. We had many tests that were actually hitting billing APIs (on test accounts of course, but still really bad). By mocking those calls you can significantly reduce the testing time. Take this test that mocks if a customer has a card on file. By mocking that `can_charge` call and setting the return value, we avoid an API call and can still test that our code works as expected.

```python
import mock
from django.test import Client

@mock.patch('billing.utils.can_charge')
def test_cant_charge_redirect(can_charge):
    can_charge.return_value =False
    response = Client().get('/checkout/')
    self.assertRedirects(response, '/checkout/add-card/')

@mock.patch('billing.utils.can_charge')
def test_can_charge_ok(can_charge):
    can_charge.return_value = True
    response = Client().get('/checkout/')
    self.assertEqual(response.status_code, 200)

```

You can also mock simple model unit tests. Instead of hitting the database by creating models, use Mock objects to simulate your model

```python
import mock
from models import User

def test_full_name():
    user = mock.Mock(spec=User)
    user.first, user.last = 'Test', 'Test'
    self.assertEqual(user.full_name, 'Test Test')
```

### 2. Remove unnecesary Apps

In my project, we had over 30 apps installed. By overriding settings for tests, I could remove unneeded apps like `django_debug_toolbar`, `django_extensions`, etc.

### 3. Turn debug off

You might be surprised, but setting `DEBUG = False` while running tests reduces the amount of debugging overhead that django takes and will improve your the speed of your test suite.

### 4. Remove unneeded middleware

We can assume that all of Django's middelware works correctly, so while testing, remove it to avoid all that overhead when making requests with the test client. Our final testing middleware settings looked like this.

```python
MIDDLEWARE_CLASSES = [
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
]
```

### 5. Only use one password hasher

This will save time when creating users or logging in with your test client. Md5 is the simplest password hasher, and since you don't need to worry about hashing strength during tests, you can get rid of all of the others.

```python
PASSWORD_HASHERS = [
    'django.contrib.auth.hashers.MD5PasswordHasher',
]
```

### 6. Disable logging

There's no need to add file I/O overhead to your testing suite, so disable it!

```python
import logging
logging.disable(logging.CRITICAL)
```

### 7. Use sqlite

Unless you are testing database specific things, just use sqlite for testing. It is the fastest DB for small amounts of data.

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': 'test_database',
    }
}
```

## Putting it all together

All of this can be wrapped up nicely in `manage.py`! I also added another block looking for `--time` in the arguments. This bit of code overwrites the `setUp` and `tearDown` methods of django's `TestCase` to print out the total time taken to run a test (if it's over 0.5s). Using this code I uncovered multiple tests that took more than 10 seconds!

```python
#!/usr/bin/env python
import os
import sys

if __name__ == "__main__":
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "marketplace.settings")

    from django.core.management import execute_from_command_line
    from django.conf import settings

    if 'test' in sys.argv:
        import logging
        logging.disable(logging.CRITICAL)
        settings.DEBUG = False
        settings.TEMPLATE_DEBUG = False
        settings.PASSWORD_HASHERS = [
            'django.contrib.auth.hashers.MD5PasswordHasher',
        ]
        settings.DATABASES = {
            'default': {
                'ENGINE': 'django.db.backends.sqlite3',
                'NAME': 'test_database',
            }
        }
        settings.MIDDLEWARE_CLASSES = [
            'django.contrib.sessions.middleware.SessionMiddleware',
            'django.middleware.csrf.CsrfViewMiddleware',
            'django.contrib.auth.middleware.AuthenticationMiddleware',
            'django.contrib.messages.middleware.MessageMiddleware',
        ]

    if 'test' in sys.argv and '--time' in sys.argv:
        sys.argv.remove('--time')
        from django import test
        import time

        def setUp(self):
            self.startTime = time.time()

        def tearDown(self):
            total = time.time() - self.startTime
            if total > 0.5:
                print("nt033[91m%.3fst%s033[0m" % (
                    total, self._testMethodName)

        test.TestCase.setUp = setUp
        test.TestCase.tearDown = tearDown

    execute_from_command_line(sys.argv)
```

I hope some of these tips help you to speed up your test suite. Happy coding!
