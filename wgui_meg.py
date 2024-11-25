from bottle import response, request, template, static_file
import bottle
from meg_f import mathprob #from the terminal-version
import json
import configparser
import os.path as osp
from datetime import datetime as dt
import re

setin=configparser.ConfigParser()
setin.read("meg_stg.ini")
isLocal = setin["DEFAULT"]["isLocal"]

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
    resp = static_file(filepath, root='./')
    #resp.set_header("Cache-Control", "public, max-age=604800")
    return resp
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
  gdata=request.json
  response.content_type = "application/json"
  pfile=osp.join(osp.dirname(__file__), "meg_score.json")
  if isLocal:
    try:
      with open(pfile) as f:
        trd = json.load(f)
    except (json.JSONDecodeError, FileNotFoundError):
      trd={}
  cdt=dt.now().strftime("%d/%m/%y")
  if cdt in trd and not (cdt+" (2)" in trd): # if this is the second attempt on the same day
    cdt+=" (2)"
    print("2")
  elif cdt+" (2)" in trd: #if more than 2 attempts
    b=[]
    for i in trd.items():
      a=re.search("\\(\\d+\\)$", i[0])
      if a:
        b.append(re.sub("[\\(\\)]", "", a.group()))
    cdt+=" ("+str(int(max(b))+1)+")"
    """
  trd.update({cdt : gdata})
  if isLocal:
    with open(pfile, 'w') as f:
      json.dump(trd, f, indent=2, separators=(",", ": "))
  """
  return {"status":"success", "response": gdata, "isLocal":isLocal}


itfp.install(EnableCors())
if __name__ == "__main__":
  itfp.run(host='localhost', port = 8080)