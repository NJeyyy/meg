"""
Basic math problems.
As alternative since I cant use tt rockstars DANGIT.
for framework: Bottle. (can't use Kivy because termux don't support GUI, so we'll use webpage.)

But first, gonna work with the algorithm first.
Basic arithmetics.
branch of mathematics / puzzle i wanted to add:
> Extreme addition
> Cryptarithm
> Limit
> Integral
> Statistic
> Series of numbers
> KPK & FPB

Below is the settings.
"""
#difficulty not exist yet.
maxnum=30 #insert in integer/float value
enable_timer=True # enable/disable stopwatch
#~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#preparing
import math
import random
import re
from termcolor import cprint, colored
import time
from datetime import datetime as dt
import os.path as osp
import json
from tabulate import tabulate
import signal as sg
import sys
import string



pl=True #to start the looping of the game until it stopped
tq=0 #number of question solved
tf=0 #number of failed attempts
strd=osp.join(osp.dirname(__file__), "meg_score.json") #path to the saved score
try:
  with open(strd) as f:
    trd = json.load(f)
except (json.JSONDecodeError, FileNotFoundError):
  trd={}
# Register the handler with the SIGINT (Signal Interrupt or when CTRL+C is pressed) signal
def handle_exit(signum, frame):
  cprint("Alright!..\nStopping the program...", "red")
  sys.exit()
sg.signal(sg.SIGINT, handle_exit)

#the mathematics branches
opran = {
  '+': lambda a, b: a + b, 
  '-': lambda a, b: a - b,
  '*': lambda a, b: a * b, 
  '/': lambda a, b: a / b,
}



def mathprob(m=0): #core code for the game
  n = [random.randint(1,maxnum) for x in range(2)]
  if(m==0):
    ot=random.choice(list(opran.keys()))
    return n[0], n[1], ot, round(opran[ot](n[0], n[1]), 2)
    

#action
if(len(trd)==0):
  cprint(" you don't have any saved history to show. ", "magenta", "on_white")
else: #show leaderboard (if the data exist)
  besc=[]
  for i in trd:
    t=trd[i].copy()
    t["datetime"]=i
    besc.append(t)
  hdr=["\033[38;5;214mRank\033[0m", colored("Time", "yellow"), colored("Time Record","light_red"), colored("TSolved", "light_green"), colored("Score", "light_magenta")]
  besc = sorted(besc,
    key=lambda x: (-x["score"], -x["total_solved"], dt.strptime(x["time_record"], "%H:%M:%S.%f")))
  if(len(besc)<5):
    for i in range(5-len(besc)):
      besc.append({"time_record":".", "datetime":".", "total_solved":".", "score":"."})
  b_esc=[]
  for i, v in enumerate(besc):
    b_esc.append([i+1, v["datetime"], v["time_record"], v["total_solved"], v["score"]])
  cprint("Your TOP 5 Score", "light_blue", "on_white")
  print(tabulate(b_esc[0:5], headers=hdr,tablefmt="grid", colalign=("center", "center", "center", "center","center")), "\n")

#waits for the user to start the game
input("Press [ENTER] to start..!  "+colored("or Press [CTRL]+C to exit.", "dark_grey"))
print(".\n.\n.\n") #just a divider
if(enable_timer):
  tmr = time.time() #start a timer
  cdt=dt.now()
nitr=1 #question index
while(pl):
  n1, n2, op, res=mathprob() #generate problems
  print(f"{nitr}.]  {n1} {op} {n2} = ?")
  while(True): #loop until answer is correct
    try:
      usr=re.sub("\\s", "", input("Your answer: "))
      if(len(usr)==0): #quit/stop immediately if empty
        pl=False
      elif(float(usr)!=res):
        tf+=1 #increment of the failed attempt
        continue
      elif(float(usr)==res): tq+=1 #question is solved
      break
    except ValueError:
      cprint("Number Only.", "light_red")
  nitr+=1

if(enable_timer): #stopwatch
  et = time.time() - tmr
  hr,mins,secs=0,0,0
  if(et//3600!=0): #if it contains at least an hour
    hr=int(et//3600)
    mins=int((et%3600)//60)
    secs=(et%3600)%60
  elif(et//60!=0): #if it contains at least a minute
    mins=int(et//60)
    secs=et%60
  else: secs=et
  secs=round(secs,3)
if(tq==0): #if no question is solved
  scr="N/A"
  cprint("Score is invalid because you didn't finish solving any question.", "light_red")
else: scr=round((tq-tf)/tq*100,1)
#result of the session
cprint(f"""Oh!.. Okay.
Here's your score: {scr}
You failed: {tf} time(s)
You solved: {tq} problem(s)""", "cyan")
if(enable_timer):
  cprint(f"You did it in {hr:02}:{mins:02}:{secs:02} !", "cyan")
elif(scr>95):
  cprint("Ayy that's such score! You should challenge yourself and do it with a timer >:D")
if(tq!=0):
  usr=input("want to save your score? [Y?]\n*Skipping or anything outside the option will cancel this action.\n>").lower()
  if(usr=="y"):
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
    trd.update({cdt: {
        "time_record": f"{hr:02}:{mins:02}:{secs:02}",
        "total_solved": tq,
        "score": scr
      }})
    with open(strd, "w+") as f:
      json.dump(trd, f, indent=2, separators=(",",": "))
    print("Saved!")