import random
import configparser
import os.path

setin=configparser.ConfigParser()
print(setin.read(os.path.join(os.path.dirname(__file__), "meg_stg.ini")))
maxnum=int(setin["DEFAULT"]["maxnum"])

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