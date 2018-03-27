# b2b.recruitee.test

## Preparing the environment

1. Running the required services
```
docker run -p 9200:9200 -e http.host=0.0.0.0 -e transport.host=127.0.0.1 --name testElasticsearch -d docker.elastic.co/elasticsearch/elasticsearch:6.2.3
docker run -p 5672:5672 --name testRabbitMQ -d rabbitmq:3.7.4
```

2. Start the queue listener

```
node listener.js
```

3. Generate fake information

```
node flood.js
```

## Test requirements

1. Install Kibana and connect it to your elasticsearch;
2. All documents on Elasticsearch have just the field summary.elapsedTimeMinutes, now you need to add two more fields in all documents:

- The field summary.reservationTimeMinutes must contain 25% of the summary.elapsedTimeMinutes value for car2go and 20% for other providers;

- Update all documents, considering that in the real database it'll have at least 50 million documents. do it in the most performatic way - Save your solution somewhere in the project folder with a short explanation;

3. Create a js file to print the sum of travelledDistanceMeters for car2go in Berlin;
4. Create a chart using Kibana showing the total rides per provider in all cities - Save a screenshort in the project folder;
5. Do your best to reorganize the project folder and the js files;
6. Create a simple test to test for the function createDocument (listener.js);
7. Send back your github repository link;