from bottle import Bottle, run, response, request
import json

app = Bottle()

@app.route('/trsrh', method='GET')
def testsend():
  response.content_type="application/json"
  response.set_header("Access-Control-Allow-Origin", "*")
  response.set_header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE")
  response.set_header("Access-Control-Allow-Headers", "Content-Type")
  return json.dumps({"a":75})

if __name__ == "__main__":
  run(app, host='localhost', port=8080)