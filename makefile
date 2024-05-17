build:
	docker-compose build

start:
	docker-compose up

stop: 
	docker-compose down

restart:
	make stop start