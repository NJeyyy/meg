from bottle import response, request, template, static_file
import bottle
from meg_f import mathprob #from the terminal-version
import json
import configparser
import os
from datetime import datetime as dt
import re
import psutil # to terminate termux/terminal and the running code
import sys # to terminate script&server

os.chdir(os.path.abspath(os.path.dirname(__file__))) #set the working directory, so the script can be run anywhere
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
    resp.set_header("Cache-Control", "public, max-age=604800")
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
  if(gdata["mode"] == "exit-game"):
    print("Exiting.. 👋")
    for i in psutil.pids():
      if(psutil.Process(i).name() == "com.termux"):
        psutil.Process(i).terminate() #only in termux<3
    sys.stderr.close()
    return
  elif (gdata["mode"] == "save-score"):
    response.content_type = "application/json"
    pfile="meg_score.json"
    if isLocal:
      try:
        with open(pfile) as f:
          trd = json.load(f)
      except (json.JSONDecodeError, FileNotFoundError):
        trd={}
    cdt=dt.now().strftime("%d/%m/%y")
    if cdt in trd and not (cdt+" (2)" in trd): # if this is the second attempt on the same day
      cdt+=" (2)"
    elif cdt+" (2)" in trd: #if more than 2 attempts
      b=[]
      for i in trd.items():
        a=re.search("\\(\\d+\\)$", i[0])
        if a:
          b.append(re.sub("[\\(\\)]", "", a.group()))
      cdt+=" ("+str(int(max(b))+1)+")"
    del gdata["mode"]
    trd.update({cdt : gdata})
    if isLocal:
      with open(pfile, 'w') as f:
        json.dump(trd, f, indent=2, separators=(",", ": "))
      print("changes has been saved!")
    return {"status":"success", "response": gdata, "isLocal":isLocal, "processed_data":trd}
  elif (gdata["mode"]=="get-score"):
    try:
      with open("meg_score.json", "r") as f:
        f = json.load(f)
        sendresp = f if not len(f)==0 else None
    except FileNotFoundError: return {"status": "ERROR", "response":"The file meg_score.json does not exist."}
    if not sendresp: return {"status": "ERROR", "response":"unable to load data from the file."}
    cleanresp = []
    for i in sendresp:
      t=sendresp[i].copy()
      t["datetime"]=i
      cleanresp.append(t)
    cleanresp = sorted(cleanresp,
      key=lambda x: (-x["score"], -x["total_solved"], dt.strptime(x["time_record"], "%H:%M:%S.%f")))
    sortedresp=[]
    for i, v in enumerate(cleanresp):
      if (re.search(r"\(\d+\)$", v["datetime"])):
        splitdate=re.split(" ", v["datetime"])
        keepdate = splitdate[0]
        splitdate[0]=dt.strptime(splitdate[0], "%d/%m/%y").strftime("%d %B %Y")
        datekey_day=dt.strptime(keepdate, "%d/%m/%y").strftime("%A")
        datekey = " ".join(splitdate)
      else:
        datekey_day=datekey_day=dt.strptime(v["datetime"], "%d/%m/%y").strftime("%A")
        datekey=dt.strptime(v["datetime"], "%d/%m/%y").strftime("%d %B %Y")
      sortedresp.append({"date": datekey, 
                        "time_record":v["time_record"], "total_solved":v["total_solved"],
                        "score":v["score"], "date_day":datekey_day})
    return {"status":"success", "raw-response":sendresp, "sorted-response":sortedresp}
  else: return {"status":"ERROR", "response": "mode is unavailable", "giveback-response": gdata,}


itfp.install(EnableCors())
if __name__ == "__main__":
  itfp.run(host='localhost', port = 8080)