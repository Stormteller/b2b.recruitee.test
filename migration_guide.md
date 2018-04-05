# How to migrate

We need to create new index with new field created.
It is possible to do it with `_reindex`ing old index to new and `_update_by_query` new index.
But this way won't be really fast for huge indexes. So the solution can be write to the new index through Logstash.
You can find logstash config in `logstash.config` in the root of the project.
Logstash will copy whole index to the new one and add `summary.reservationTimeMinutes` according to the rule.
It will be faster than approach with in-place updating. Also Logstash do the update by batches which size is configurable.

And to change one index to another for our application we can just update index name which we use in the app or we can use `alias`es.
We should create alias for old index (mytest) and use it in our application.
Then we can easily change to make alias point to new updated index.

We can you it like this:
```
POST /_aliases
{
    "actions" : [
        { "remove" : { "index" : "mytest", "alias" : "car_index" } },
        { "add" : { "index" : "updated_mytest", "alias" : "car_index" } }
    ]
}
```
