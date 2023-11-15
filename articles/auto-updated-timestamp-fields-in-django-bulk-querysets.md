---
title: "Auto-updated timestamp fields in Django bulk querysets"
date: "2020-02-26"
preview: "In Django, fields with auto_now=True are not always updated correctly. A common practice to work around this is to override the save() method on the model, or to use a pre-save hook. However, this doesn't work when calling Model.objects.update() since save() is not called on all instances in the queryset."
tags: python, django
---

In Django, fields with `auto_now=True` are not always updated correctly. A common practice to work around this is to override the `save()` method on the model, or to use a pre-save hook. However, this doesn't work when calling `Model.objects.update()` since `save()` is not called on all instances in the queryset.

A common way to fix this would be to alter the table, for example, in MySQL it may look like this:

```sql
ALTER TABLE app_model
MODIFY updated_at
DEFAULT CURRENT_TIMESTAMP
ON UPDATED CURRENT_TIMESTAMP
```

But, this doesn't translate well into a migration and doesn't work with sqlite3 and other db backends.

I have found a simple way to fix this which will work with any database backend, so you don't need to write migrations or alter your database tables. We can do this with a simple queryset method override. All we are doing here is adding the current timestamp to the update kwargs, so all instances in the queryset will get that update!

```python
from django.db.models import query, manager
from django.utils import timezone

class BaseQuerySet(query.QuerySet):

    def update(self, **kwargs):
        kwargs['updated_at'] = timezone.now()
        super().update(**kwargs)

class Manager(manager.BaseManager.from_queryset(BaseQuerySet)):
    pass
```

Then to use this, just add it to your model like so.

```python
from django.db import models
from .manager import Manager

class BaseModel(models.Model):
    objects = Manager()
    updated_at = models.DateTimeField()
```

Hope this helps, and thanks for reading!
