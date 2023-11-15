---
title: "Django Queryset Annotations for Increased Performance"
date: "2017-06-05"
preview: "Django querysets are really powerful. They can often be used to reduce expensive object iterations down to the database level. Let's take the following models and figure out which product has the least in stock..."
tags: python, django
---

Django querysets are really powerful. They can often be used to reduce expensive object iterations down to the database level. Let's take the following models and figure out which product has the least in stock.

```python
from django.db import models

class Product(models.Model):
inventory = models.IntegerField()

class Package(models.Model):
items = models.ManyToMany(Product)

class Order(models.Model):
customer = models.ForeignKey(Customer)
package = models.ForeignKey(Package)
```

The naiive implementation may look something like this. The loops and temp variables probably remind you of something you wrote in CS 101.

```python
def least_stock():
  # Which product has the least in stock?
  least = None
  least_stock = 100000

  for product in Product.objects.all():
      ordered = sum([p.orders.count() for p in product.packages.all()])
      in_stock = product.inventory - ordered
      if in_stock < least_stock:
          least = product
          least_stock = in_stock
  return least
```

This method is extremely expensive. Notice how it first queries for all of the packages that contain that product. Then for each of those packages, it runs a count to get the number of orders. This is `n + 1` database queries, where `n` is the number of packages that a product is in. I would run some benchmarking on this, but it is obvious that the running time would be horrible.

We can definitely do better, using a powerful queryset function built into django: `annotate`. Annotating allows you to add fields to the query using various functions that translate down to SQL. Using queryset functions, the sum becomes a count, the loop becomes an annotation, and the comparison beecomes an order_by. All of which is done at that database level.

```python
from django.db.models import Count, F

def least_stock():
    # Which product has the least in stock?
    return Product.objects.annotate(
        ordered=Count('packages__orders')
    ).annotate(
        in_stock=F('inventory') - F('ordered')
    ).order_by('in_stock').first()
```

This implementation uses annotate twice to significantly reduce the number of queries on the database. In fact, this results in a single query!

The [Django Docs page on queries](https://docs.djangoproject.com/en/1.11/topics/db/queries/) has many more examples. Using annotations and aggregates can siginificantly improve the performance of your django site.
