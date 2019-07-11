import os
import json
import random

while True:
  temperature = random.random() * 200
  humidity = random.random() * 100

  values = {
      "temperature": f'{temperature:1.2f}',
      "humidity": f'{humidity:1.2f}'
  }

  url = "https://tehumi-socket-io.herokuapp.com"
  contentType = "Content-Type: application/json"
  body = json.dumps(values)

  command = "curl -d " + "'" + body + "'" + " -H " + "'" + contentType + "' -X POST " + url

  print(command)

  os.system(command)
