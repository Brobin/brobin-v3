---
title: Mutiprocessing in Python Django Management Commands
date: "2017-05-19"
preview: A problem that many applications (hopefully) eventually run into is scalability. In a project I'm working on, we have a django management command that makes a time consuming API call to update a model. Let's take a look at the original code...
tags: python, django
---

A problem that many applications (hopefully) eventually run into is scalability. In a project I'm working on, we have a django management command that makes a time consuming API call to update a model. Let's take a look at the original code:

```python
class Command(BaseCommand):
    help = 'Create Shipping labels for upcoming shipments'

    def handle(self, *args, **options):
        start = datetime.date.today()
        end = start + datetime.timedelta(14)

        for shipment in Shipment.objects.filter(shipping_date__range=[start, end]):
            create_shipping_label(shipment)
```

At first, this seems like an innocent little script. It does exactly what it is supposed to do. For every shipment that is upcoming, let's create the shipping label.

Notice anything wrong with it though? What if we now have 20,000 shipments? Even if the API call takes only 1 second, that's still about 6 hours of processing time, for one seemingly innocent command.

Enter multiprocessing. As you may know, computers these days have anywhere from 2 to 16 cores in the CPU. When this script above is running, it's really only using one! By using the stdlib package for multiprocessing, we can run this script up to 16x faster. (8x faster on my i7, 4x faster on many common CPUs).

Here's the updated command to take advantage of multiprocessing:

from multiprocessing import cpu_count, Pool

```python
class Command(BaseCommand):
    help = 'Create Shipping labels for upcoming shipments'

    def handle(self, *args, **options):
        start = datetime.date.today()
        end = start + datetime.timedelta(14)

        shipments = Shipment.objects.filter(shipping_date__range=[start, end]):

        pool = Pool(processes=cpu_count())
        pool.map(create_shipping_label, shipments)
```

Those two lines of code create a thread pool of as many CPUs as possible, and simply map the iterator onto the function. Now that script can run 4 or more of those API calls at the same time, reducing the running time of the script significantly
