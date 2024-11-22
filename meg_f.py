import random
import configparser

setin=configparser.ConfigParser()
setin.read("meg_stg.ini")
maxnum=setin["DEFAULT"]["maxnum"]

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