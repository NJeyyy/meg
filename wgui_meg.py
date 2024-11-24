from bottle import response, request, template, static_file
import bottle
from meg_f import mathprob #from the terminal-version
import json

itfp = bottle.Bottle()
class EnableCors(object):
  name = 'enable_cors'
  api = 2
  def apply(self, fn, context):
    def _enable_cors(*args, **kwargs):
      # set CORS headers
      response.headers['Access-Control-Allow-Origin'] = '*'
      response.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, OPTIONS, DELETE'
      response.headers['Access-Control-Allow-Headers'] = 'Origin, Accept, Content-Type, X-Requested-With, X-CSRF-Token'
      if bottle.request.method != 'OPTIONS':
        # actual request
        return fn(*args, **kwargs)
    return _enable_cors


@itfp.route('/<filepath:path>')
def serve_static(filepath):
    return static_file(filepath, root='./')
@itfp.route("/")
def loadp():
  return template("itf.html")

@itfp.route("/genpy")
def generate_ply():
  n1, n2, op, res=mathprob()
  response.content_type = "application/json"
  return json.dumps({"n1": n1, "n2": n2, "op": op, "res": res})
@itfp.post("/genps")
def getdata():
  a=request.json
  response.content_type = "application/json"
  print(a)
  return a

itfp.install(EnableCors())
if __name__ == "__main__":
  itfp.run(host='localhost', port = 8080)