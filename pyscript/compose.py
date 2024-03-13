from collections import Counter
import nltk
from nltk.util import ngrams
import numpy as np
import random
from js import loaded
from js import createObject
from js import document
from pyodide.ffi import create_proxy

bigrams_1 = [
  'd f g f e d h g e g f e d h j k h g h g h g f e d f g d e d c e f e d a c d f g e c f e d e c d f h g h f g f e d g f g h g f g f e d h j k h g h j g f e d c f e g h f g f e d e d f e c d f c d h ixi h g f g h g f g d g h g f e f g f e d c d e c d f e f g e g f e c d f h g h j i g f g h g f g f d f e d e d f g f e f g h f e d d h g f f g h g ixi h h j k j h g h ixi j ixi g f d f g f e f d d h g h ixi g h j k j k h j g h ixi j ixi h j k m k j k h j g f h g h d f g h ixi g f g h f e d f g h j g f g h j g f g h k j k g h ixi j k j i h ixi j i h i g f h d f g f e d f g f e f d h g f g h j g f g h k j k g h ixi j k j ixi h ixi j h i g f h g ixi h f g f e d e f d h ixi j h i g f h g ixi h k j k g h j k j ixi h g h g h f h ixi j ixi h g h g h d f g f e d e f d h g f h ixi j h g ixi h k j k ixi h g h j k m l k j k h ixi g f e f d f g d f e d c f g h j h i g f g h f e c f g c d f g f e d']
bigrams_2 = [
  'f i h g h i h g f g h g f e f g h g f i h g h i h g f g h g f e g f g f g f e f e f g h g f g h i h g h f g f e f g h g f g f e e f f e g h g f i h g h i h g f g h g f e f g g f h h g e f i h g h i h g f g h g f e g e g h g f i h g i g f g h g f e g h g f g e f e g h g f e f e g h g f g e f e g h g f e g e f e g h g f i h g h i h f g h g f e g h g f i h g h i h f g h g f e g h g f e f e g h g f e f e g h g f g e f g e f e g i j i g i e f g h g f e g h f e f']
bigrams_3 = [
  'e f e d g h j j k i h j i g h j i h g h g h i g e h d e g e g h g h i g h g f e d e']
bigrams_4 = [
  'g f e f g h g f e g h i g f g h f e h f e f g f e f g f e f h g h i g f g e f g f e g e g i h g i f e f g f g f e f h g h i h i j i h g f j k j i j i h i h g h i g f e i h g f g e f g h f e f g f e i h g j h i h g h i g f e i g f e f g e f g f h f e f e f g f e f e f h g h i h g e f h g h i h i j i g f j i j k j h i h g h i h g f e f g f h f e f g h i j i g f g e f g f h f e i h g f j i h i h g e f h g h i g f e i h i j h i g f g f e f g e g i h i h i j i g f j k j i h i j i g h i g f g f e i h i j i g f j j i j k j i h i h i j h g f g f g e g i j i h i j i g e f h g h f e g i j h i g']
bigrams_5 = [
  'h f e d e f e d e f h i h k j h i h k j i h i j i h f d e f d e f h i h f d gxg f e e f e c d d f gxg h i g h f d gxg f e d k j k i j k h k h i f gxg h h f d gxg f e d k j k i j k h k j k i j k h k h i f gxg h f d g f e d f gxg h i g k i g h i h f f d e f e d f e d d f h k i j i h k j i j k i h f d gxg e f e d d f f e d e f h i j i i h h k j i h f gxg e e d f h i h f d e f e e d k i j h i j j i j k i h k j h i j i h h f d gxg e f e d d e f d e f gxg e f d f h h i h k j h f d f h f d e d d']
bigrams_6 = [
  'f g f g h f g f d c d f g f g h g ixi h g h f g f h j g j h g h f g f g h f g f g h g ixi h g h f g f g h f g f e d c f g h j h f g f h j ixi h j ixih g f g h f c f g h j h f g f h j h g j j k ixi j i h j ixi h g h f e d c f g h j h f g f h j g j k ixi j i h f h j k j k h ixi g f g h f e d c f g h j h f g f']
bigrams_7 = [
  'e f e d e e f g h g c d e i j g h i i e f g h g f e h f e f c d e i h f h i g h f d f e i j i h f h i e f g h f e h i j k l j i h g f g e i h g e h i l k h j k i e f h g f e h i j i g h f e d e f e d e f h i j i h i h k j h i e h g h i j i h g f e h i j i h g f e h i k j k i h i j k i h i h g f e h i l k l h i l k h k l j i g h f e i h i kj k l k i h i e i h k j i h i j k l k j i h i h g h f e h i j k l k j i j h i l m l i j k l k j i h k j h i j h g f e h i l k l i k j h i j i g h e d f h f e g h i j h i e f g h g e f e h i j l k j l k j i h g f g h i f e f d f e f g h f e']
bigrams_8 = [
  'e f h f h e f d e c h i h g f h f h g e d f g h e c d e g h i h i j i g i e f g f e f f d f e e f e e f h g g f h f g e f e h i f e f g f e f e h i f e f h e f e d e e f d e f h f g f e f e f g h h g f g h g h g f i h g h i g h e f e h i j i h f f e f h e f e d f g f d e f h f g h e f e e']

openers = []
openers_1 = ['f','h','g','e','h','h','d','h','h','c','h','h','j','h','j','f','d','k','h','g','h','j','f','k']
openers_2 = ['f','e','h','f','f','e','f','e','e','f','g','e','f','g','f','g','f','g','f','g','g','f','f','f','g']
openers_3 = ['e','j','g','h','e','h']
openers_4 = ['g','e','h','e','h','e','g','e','e','f','i','g','e','i','j','g','i','e','e','e','e','f','g','e','g','e','i','f','e','i','g','e','f','g','e','f','i','g','g','i','e']
openers_5 = ['d','h','f','h','k','h','k','k','h','h','d','k','k','h','d','h','f','d','k','f','k','f','k','k','d','k']
openers_6 = ['f','f','f','j','h','j','g']
openers_7 = ['e','h','l','g','i','f','k']
openers_8 = ['e','e','e','e','e','h','h','f','f','e','h','f','e','i','g','i']

closers = []
closers_1 = [104,100,102,99,107] #(c4): h,d,f,c,k,
closers_2 = [102,101,104] #(f3): f,e,h
closers_3 = [106,103,101,100] #(c4): j,g,e,d
closers_4 = [101,102,103,104,105] #(c3): e,f,g,h,i
closers_5 = [104,102,100] #(c3): h,f,d
closers_6 = [102,106] #(c4): f,j
closers_7 = [105,101,106,102] #(c3): i,e,j,f
closers_8 = [99,102,101,103,100] #(c3): c,f,e,g,d

finals = []
finals_1 = [100,107] #c,k
finals_2 = [100,107] #c,k
finals_3 = [101] #e,l
finals_4 = [101] #e,l
finals_5 = [102] #f
finals_6 = [102] #f
finals_7 = [103] #g
finals_8 = [103] #g
# c: 99
# d: 100
# e: 101
# f: 102
# g: 103
# h: 104
# i: 105
# j: 106
# k: 107
# l: 108

mode = ""
mode_int = 0
clef = ""

form = ""

song_gabc = ""
song_tone = ""
notes = []

def predict_next_state(note:str, data:list=None):
  """Predict next note based on current state."""
  # create list of bigrams which starts with current note
  bigrams_with_current_note = [bigram for bigram in data if bigram.split(' ')[0]==note]
  # count appearance of each bigram
  count_appearance = dict(Counter(bigrams_with_current_note))
  # convert apperance into probabilities
  for ngram in count_appearance.keys():
    count_appearance[ngram] = count_appearance[ngram]/len(bigrams_with_current_note)
  # create list of possible options for the next note
  options = [key.split(' ')[1] for key in count_appearance.keys()]
  # create list of probability distribution
  probabilities = list(count_appearance.values())
  # return random prediction
  return np.random.choice(options, p=probabilities)
    
def generate_sequence(active_mode:int=None, data:list=None, openers:list=None, closers:list=None, finals:list=None, sectionelles:int=None, neume_chance:int=None, final_sec:bool=False):
  global song_gabc
  global song_tone
  global notes
  global form

  neume_or_podatus = ""
  two_or_three_neume = ""
  neume_number = ""
  note_num = ""

  for n in range(sectionelles):
    secelle_length = random.randint(3,10)

    first = random.choice(openers)

    # write sectionelle
    notes.append(first)
    song_gabc += "(" + first + ")"

    for x in range(secelle_length):
    # determine if next is neume/podatus
      if random.randint(0,100) < neume_chance:
        neume_or_podatus = random.randint(0,10)
        curr_note = notes[len(notes)-1]
        next_note = predict_next_state(notes[len(notes)-1], data)
        if next_note != "ixi" and next_note != "gxg":
          note_num = ord(next_note)
        else:
          note_num = ord(next_note[-1])
      # is podatus
        if neume_or_podatus < 3 and note_num > 100 and form != "syllabic":
          song_gabc += "(" + next_note
          song_gabc += chr(note_num - 1).upper() + chr(note_num - 2).upper()
          song_gabc += ")"
          notes.append(next_note)
          notes.append(chr(note_num - 1))
          notes.append(chr(note_num - 2))
      # is neume
        else:
          curr_note = notes[len(notes)-1]
          two_or_three_neume = random.randint(0,10)
          if two_or_three_neume < 4 and form != "syllabic":
            neume_number = 3
          else:
            neume_number = 2
          song_gabc += "("
          for x in range(neume_number):
            next_note = predict_next_state(notes[len(notes)-1], data)
            if curr_note == next_note:
              next_note = predict_next_state(curr_note, data)
            notes.append(next_note)
            song_gabc += next_note
          song_gabc += ")"
      # default
      next_note = predict_next_state(notes[len(notes)-1], data)
      notes.append(next_note)
      song_gabc += "(" + next_note + ")"
      curr_note = next_note
    # write closing note
    if(curr_note == "ixi"):
      curr_note = "i"
    elif(curr_note == "gxg"):
      curr_note = "g"
    last = chr(min(closers, key=lambda x:abs(x-ord(curr_note))))
    if(final_sec == True and n == sectionelles-1):
      last = chr(min(finals, key=lambda x:abs(x-ord(curr_note))))
      fifty_fifty = random.randint(0,1)
      if(active_mode == 1 and curr_note == "h" and fifty_fifty == 0):
        last = "d"
    notes.append(last + ".")
    song_gabc += "(" + last + "." + ")"
    # write breath mark/bar
    notes.append("|")
    if n != sectionelles-1:
      song_gabc += "(,)"

def generate_song(click):
  global song_gabc
  global song_tone
  global notes
  global clef
  global do
  global form
  global final

  song_gabc = ""
  song_tone = ""
  notes = []
  bigrams_in_use = []

  mode = document.getElementById("mode-dropdown").innerHTML
  form = document.getElementById("form-dropdown").innerHTML

  if mode == "mode 1":
    clef = "(c4)"
    mode_int = 1
    openers = openers_1
    closers = closers_1
    finals = finals_1
    bigrams_in_use = bigrams_1
  elif mode == "mode 2":
    clef = "(f3)"
    mode_int = 2
    openers = openers_2
    closers = closers_2
    finals = finals_2
    bigrams_in_use = bigrams_2
  elif mode == "mode 3":
    clef = "(c4)"
    mode_int = 3
    openers = openers_3
    closers = closers_3
    finals = finals_3
    bigrams_in_use = bigrams_3
  elif mode == "mode 4":
    clef = "(c3)"
    mode_int = 4
    openers = openers_4
    closers = closers_4
    finals = finals_4
    bigrams_in_use = bigrams_4
  elif mode == "mode 5":
    clef = "(c3)"
    mode_int = 5
    openers = openers_5
    closers = closers_5
    finals = finals_5
    bigrams_in_use = bigrams_5
  elif mode == "mode 6":
    clef = "(c4)"
    mode_int = 6
    openers = openers_6
    closers = closers_6
    finals = finals_6
    bigrams_in_use = bigrams_6
  elif mode == "mode 7":
    clef = "(c3)"
    mode_int = 7
    openers = openers_7
    closers = closers_7
    finals = finals_7
    bigrams_in_use = bigrams_7
  elif mode == "mode 8":
    clef = "(c3)"
    mode_int = 8
    openers = openers_8
    closers = closers_8
    finals = finals_8
    bigrams_in_use = bigrams_8

  song_gabc += clef

  sections = 0
  sectionelles = 0
  secelle_length = 0
  neume_chance = 0

  if(form == "syllabic"):
    sections = 4
    neume_chance = random.randint(1,10)
  elif(form == "neumatic"):
    sections = 4
    neume_chance = random.randint(40,60)
  elif(form == "melismatic"):
    sections = 3
    neume_chance = random.randint(85,99)

  # first_last = [re, mi, fa, sol]
  # list of first and last notes per sectionelle
  # first_last = [dominant, tonic, dominant, dominant, dominant, tonic, mediant, tonic]

  # generate list of bigrams
  data_split = bigrams_in_use[0].split(' ')
  bigrams_list = [' '.join(e) for e in ngrams(data_split, 2)]

  # generate each section
  for n in range(sections):
    print("range(sections): ", range(sections))
    print("sections: ", sections)
    if(n == sections-1):
      final_sec = True
      print("LAST == TRUE")
    else:
      final_sec = False
    sectionelles = random.randint(1,2)
    secelle_length = random.randint(4,10)
    # parameters: data, openers, closers, finals, sectionelles, neume_chance, final_sec
    generate_sequence(mode_int, bigrams_list, openers, closers, finals, sectionelles, neume_chance, final_sec)
    song_gabc += "(::)"

  # print(song_gabc)

  # print(notes)

  # write Tone string
  if mode == "mode 1":
    for n in range(len(notes)):
      if notes[n][0] == "c" or notes[n][0] == "d" or notes[n][0] == "e" or notes[n][0] == "f" or notes[n][0] == "g":
        song_tone += notes[n][0].upper() + "3"
      elif notes[n][0] == "a" or notes[n][0] == "b":
        song_tone += notes[n][0].upper() + "2"
      elif notes[n][0] == "h":
        song_tone += "A3"
      elif notes[n][0] == "i":
        song_tone += "B3"
      elif notes[n][:2] == "ixi":
        song_tone+= "Bb3"
      elif notes[n][0] == "j":
        song_tone += "C4"
      elif notes[n][0] == "k":
        song_tone += "D4"
      elif notes[n][0] == "l":
        song_tone += "E4"
      elif notes[n][0] == "m":
        song_tone += "F4"
      elif notes[n][0] == "|":
        song_tone += "|"
      if "." in notes[n]:
        song_tone += "."
      if n != len(notes)-1:
        song_tone += " "

  # print(song_tone)

createObject(create_proxy(globals()), "pyodideGlobals")

loaded()