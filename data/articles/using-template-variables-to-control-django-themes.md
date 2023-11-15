---
title: Using Template Variables to control Django Themes
date: "2017-02-13"
preview: A problem I recently ran into was allowing for multiple themes to be used on the same project. I decided to set a django setting called BRAND in order to control the theme through separate css files. For this example, we will assume that your static directory has sub-directories for each brand...
tags: python, django
---

A problem I recently ran into was allowing for multiple themes to be used on the same project. I decided to set a django setting called `BRAND` in order to control the theme through separate css files.

For this example, we will assume that your static directory has sub-directories for each brand, with a file `site.css` in each.

Now, in order to inject our brand setting into the context, we need to add a context processor. Create a file called `context.py` in your project.

```python
from django.conf import settings

def brand_details(request):
    return {'BRAND': settings.BRAND}
```

This simple function injects the `BRAND` setting into the template context. Next we need to add the context processor to our template settings.

```python
BRAND = 'brand1'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': ['your-template-dir'],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                ...
                'project.context.brand_details',
            ],
        },
    },
]
```

Lastly, we need to use the injected variable to pull out the correct theme. In the head of your base.html file, we will use the variable to get the correct brand css file.

```html
{% load staticfiles %} {% with 'css/'|add:BRAND|add:'/site.scss' as brand_style
%}
<link rel="stylesheet" type="text/x-scss" href="{% static brand_style %}" />
{% endwith %}
```

There you have it! Django themes with a simple site setting. If you wanted to take this a step further, you could use the variable to pull in base templates. Also, that context processor function could run a query to get the theme, allowing you to edit the theme from the admin instead of the settings.py.
