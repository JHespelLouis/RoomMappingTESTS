from kafka import KafkaProducer
import websockets
import asyncio

producer = KafkaProducer(bootstrap_servers='localhost:9092')
topic = 'test'


async def handler(websocket, path):
	try:
		while True:
			data = await websocket.recv()
			producer.send(topic, bytes(data, 'utf-8'))
			await websocket.send("Received")
	except Exception as e:
		print(e)

start_server = websockets.serve(handler, "0.0.0.0", 8000)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()
