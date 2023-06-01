# DartS
The project dedicated to the development of fantasy/sci-fi platform for designers and other lovers of speculative genre. It's done by HSE students 

- now timeline service may be set up localy by using the command below from the project root
```
  docker build ./storyline --tag storyline
  run -p 8080:8080 storyline
```
## timeline component:
### for dev purposes
from timeline directory run:
```
./gradlew bootRun --args='--server.port=50505'
```


### Timeline+DbAgent manual testing

#### Get blockContents by id of the longread
```
curl -X GET http://127.0.0.1:50505/api/events/1 -H 'Content-Type: application/json'
```
* output:
  [{"chapter_id":1,"coordx":123,"coordy":123,"floating_text":"aaaasdasd","id":1,"img_link":"/staticFiles/images/font.jpg","longread_id":1,"text":"chapter 1 something","time":12},{"chapter_id":1,"coordx":null,"coordy":null,"floating_text":null,"id":2,"img_link":"/staticFiles/images/font.jpg","longread_id":1,"text":"2 something","time":null},{"chapter_id":1,"coordx":1,"coordy":1,"floating_text":"asadasd","id":3,"img_link":"/staticFiles/images/font.jpg","longread_id":1,"text":"3 something","time":11}]

#### Get a blockContent by id
* input:
```
curl -X GET http://127.0.0.1:50505/api/event/1 -H 'Content-Type: application/json'
```
* output:
{"chapter_id":1,"coordx":123,"coordy":123,"floating_text":"aaaasdasd","id":1,"img_link":"/staticFiles/images/font.jpg","longread_id":1,"text":"chapter 1 something","time":12}

#### Edit event by blockContent id with data
* input:
```
curl -v -X POST http://127.0.0.1:50505/api/event/edit/1 -H 'Content-Type: application/json' -d '{"coordx": 1, "coordy": 21, "time": 10, "floating_text": "Event description for reader"}'
```
* output:
  status 201 

#### Delete event by blockContent id 
* input:
```
curl -v -X DELETE http://127.0.0.1:50505/api/event/delete/1 -H 'Content-Type: application/json'
```
* output:
  status 204

