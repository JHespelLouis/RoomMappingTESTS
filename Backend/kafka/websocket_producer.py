from kafka import KafkaProducer
import websockets
import asyncio

"""
A simple producer for interfacing the lidar with the kafka data pipeline.
In the kafka context a producer is a listener which produces the messages for a topic. The data can come from any source
but in this case the producer is being integrated with a websocket server to which the lidar software will connect to 
stream it's measurements.
"""

producer = KafkaProducer(bootstrap_servers='localhost:9092')  # this code will run on a vps with a kafka broker
topic = 'test'												  # listening on the port 9092


# handler for connections, on receiving a message it converts it to bytes and transmits it through the producer to
# the broker.
async def handler(websocket, path):
	try:
		while True:
			data = await websocket.recv()
			producer.send(topic, bytes(data, 'utf-8'))
			await websocket.send("Received")
	except Exception as e:
		print(e)


# start and run the websocket server using the defined handler for any connections
start_server = websockets.serve(handler, "0.0.0.0", 8000)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()
