// PYSCRIPT GLOBAL VARIABLES //
function createObject(object, variableName)
{
    globalThis[variableName] = object
}

// PYSCRIPT LOADED //
function loaded()
{
    document.getElementById("loading").style.display = "none";
    document.getElementById("svg-wrapper").style.display = "block";
}

 // RENDER GABC, START TONE //
document.getElementById("generate-button").addEventListener("click", () => {
    setTimeout(() => {
    gabc = pyodideGlobals.get('song_gabc')

    var ctxt = new exsurge.ChantContext();
    ctxt.lyricTextFont = "'Alagard', serif";
    ctxt.annotationTextSize *= 1.5;
    ctxt.annotationTextFont = ctxt.lyricTextFont;
    ctxt.annotationTextColor = '#d00';

    var score;
    var chantContainer = document.getElementById('song-svg');

    var updateChant = function() {
      if (score) {
        exsurge.Gabc.updateMappingsFromSource(ctxt, score.mappings, gabc);
        score.updateNotations(ctxt);
      } else {
        mappings = exsurge.Gabc.createMappingsFromSource(ctxt, gabc);
        score = new exsurge.ChantScore(ctxt, mappings, true);
        score.annotation = new exsurge.Annotation(ctxt, document.getElementById("mode-dropdown").innerHTML.slice(-1));
      }
      layoutChant();
    }
    var layoutChant = function() {
      // perform layout on the chant
      score.performLayoutAsync(ctxt, function() {
        score.layoutChantLines(ctxt, chantContainer.clientWidth, function() {
          // render the score to svg code
          chantContainer.innerHTML = score.createSvg(ctxt);
        });
      });
    }
    updateChant();
    document.getElementById("svg-wrapper").style.cursor = "url(../assets/cursors/cursor-finger.png), auto";
    }, 500);

    if(Tone.context.state != "running")
    {
        Tone.start();
    }
    });

// PERFORM GABC //
var perform_button = document.getElementById("perform-button");
var monks_closed = document.getElementById("monks-closed");
var monks_closed_noeyes = document.getElementById("monks-closed-noeyes");
var monks_open = document.getElementById("monks-open");

perform_button.addEventListener("click", initialize_performance);

var rest_iterator = 0;
var perform_btn_clicks = 0;
var voice;
var reverb;
var interval;

function initialize_performance()
{
    song_tone = pyodideGlobals.get('song_tone');
    song = song_tone.split(" ");

    perform_btn_clicks += 1;

    if(perform_btn_clicks % 2 != 0)
    {
        voice = new Tone.Synth({
        }).toDestination();
        reverb = new Tone.Reverb({
            decay: 8,
        }).toDestination();
        voice.connect(reverb);
    }

    if(perform_button.innerHTML == "perform")
    {
        perform(voice);
        perform_button.innerHTML = "stop";
    }
    else if(perform_button.innerHTML == "stop")
    {
        perform_button.disabled = true;
        voice.dispose();
        reverb.dispose();
        clearInterval(interval);
        sing_z = "-2";
        rest_z = "-1";
        perform_button.innerHTML = "perform";
        monks_open.style.zIndex = "-2";
        monks_closed_noeyes.style.zIndex = "-1";
        setTimeout(() => {
            monks_closed.style.zIndex = "-1";
            monks_open.style.zIndex = "-2";
            monks_closed_noeyes.style.zIndex = "-3";
            perform_button.disabled = false;
        }, 250);
    }
}

function perform(voice)
{
    rest_iterator = 0;
    var value;
    var prev_value = "0";
    var time_total = 0;
    var rest_time = [];

    monks_closed.style.zIndex = "-3";

    Tone.Transport.bpm.value = 100;

    for(let i=0; i<song.length; i++)
    {
        if(song[i]!="|")
        {
            if(song[i].includes("."))
            {
                Tone.Transport.scheduleOnce((time) => {
                    value = "2n";
                    time_total += Tone.Time(prev_value).toSeconds();
                    voice.triggerAttackRelease(song[i].substr(0,2), value, time + time_total);
                    prev_value = "2n";
                }), "id";
            }
            else
            {
                Tone.Transport.scheduleOnce((time) => {
                    value = "4n";
                    time_total += Tone.Time(prev_value).toSeconds();
                    voice.triggerAttackRelease(song[i], value, time + time_total);
                    prev_value = "4n";
                }), "id";
            }
        }
        else
        {
            Tone.Transport.scheduleOnce((time) => {
                value = "4n";
                time_total += Tone.Time(prev_value).toSeconds();
                rest_time.push(Math.round((time + time_total) * 100) / 100);
                voice.triggerAttackRelease("0", value, time + time_total);
                prev_value = "4n";
            }), "id";
        }
    }
    Tone.Transport.start();
    monk_sing_state();
    interval = setInterval(() => {
        if((Math.round(Tone.now() * 100)/100) <= rest_time[rest_iterator] + 0.06 && Math.round(Tone.now() * 100)/100 >= rest_time[rest_iterator] - 0.06)
        {
            monk_sing_state(true);
            if(rest_iterator != rest_time.length)
            {
                setTimeout(() => {
                    monk_sing_state(false);
                }, Tone.Time("500").toSeconds());
            }
            else
            {
                perform_button.disabled = true;
                monks_open.style.zIndex = "-2";
                monks_closed_noeyes.style.zIndex = "-1";
                setTimeout(() => {
                    perform_button.innerHTML = "perform";
                    perform_button.disabled = false;
                    monks_closed_noeyes.style.zIndex = "-3";
                    monks_closed.style.zIndex = "-1";
                }, 1500);
            }
        }
    }, 100);
}

var sing_z = "-2";
var rest_z = "-1";
function monk_sing_state(bool)
{
    if(bool == true)
    {
        rest_iterator++;
    }

    [sing_z, rest_z] = [rest_z, sing_z];
    monks_open.style.zIndex = sing_z;
    monks_closed_noeyes.style.zIndex = rest_z;
}