build:
	docker build -t todo-app  .

up:
	docker-compose up --build

test:
	echo "This is a test"
