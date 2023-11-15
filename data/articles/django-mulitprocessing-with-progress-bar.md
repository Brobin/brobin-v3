---
title: "Django Mulitprocessing with Progress Bar"
date: "2018-12-10"
preview: "Instead of rolling my own progress bars on new batch management commands, I've been using tqdm lately. Here's a quick snippet for multiprocessing a batch of items in a queryset. You'll need tqdm to run this: pip install tqdm Note: Since the function that I'm calling is using django's ORM, I close all db connections."
tags: python, django
---

Instead of rolling my own progress bars on new batch management commands, I've been using `tqdm` lately. Here's a quick snippet for multiprocessing a batch of items in a queryset.

You'll need tqdm to run this: `pip install tqdm`

**Note:** Since the function that I'm calling is using django's ORM, I close all db connections. Things tend to go wrong when forked processes are all using the same connection.

```python
from django.db import connection
from django.core.management.base import BaseCommand

from multiprocessing import Pool
from tqdm import tqdm

from project.models import Item

def func(item):
    connection.close()
    # Do some process
    return True


class Command(BaseCommand):

    def add_arguments(self, parser):
        parser.add_argument(
            '--processes',
            dest='processes',
            default=2,
            type=int,
            help='Number of processes to use to make run command on queryset',
        )

    def handle(self, *args, **options):
        items = Item.objects.all()

        with tqdm(total=items.count()) as bar, Pool(processes=options['processes']) as pool:
            for _ in pool.imap_unordered(func, items):
                bar.update()
```
