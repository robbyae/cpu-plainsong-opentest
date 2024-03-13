// BUTTONS //
function showMode(item)
{
    document.getElementById("mode-dropdown").innerHTML = item.innerHTML;
    active_mode = item.innerHTML;
    mode_info(active_mode);
}

function showForm(item)
{
    document.getElementById("form-dropdown").innerHTML = item.innerHTML;
    active_form = item.innerHTML;
    form_info(active_form);
}

document.getElementById("perform-button").disabled = true;

document.getElementById("generate-button").addEventListener("click", () => {
    setTimeout(() => {
    document.getElementById("perform-button").disabled = false;
    },500);
    setTimeout(() => {
        read_svg_element();
    }, 1000);
});

// SPEECH BOX //
var txt;
var monks_closed = document.getElementById("monks-closed");
var monks_closed_noeyes = document.getElementById("monks-closed-noeyes");
var monks_open = document.getElementById("monks-open");
monks_closed.style.zIndex = "-1";

// TITLE INFO //
document.getElementById("title").addEventListener("click", () => {
    document.getElementById("speech-text").innerHTML="";
    type_iterator = 0;
    perform_clicked = 0;
    txt = 'Plainsong, name derived from the Latin "cantus planus", is a medieval style of music sung in Latin and used in liturgies of the Western Church.';
    if(isTyping == false)
    {
        typeWriter();
        if(monks_closed.style.zIndex == "-1")
        {
            speak();
        }
    }
});

// MODE INFO //
var active_mode;
document.getElementById("mode-dropdown").addEventListener("click", () => {
    document.getElementById("speech-text").innerHTML="";
    type_iterator = 0;
    perform_clicked = 0;
    txt = 'In plainsong, there are eight modes. Modes 1, 3, 5, and 7 are the "authentic" modes, and modes 2, 4, 6, and 8 are the "plagal" modes. Each authentic mode has a relative plagal and vice versa. Relative modes share the same Do and final. The placement of the dominant varies among modes.';
    if(isTyping == false)
    {
        typeWriter();
        if(monks_closed.style.zIndex == "-1")
        {
            speak();
        }
    }
});
function mode_info(active_mode)
{
    document.getElementById("speech-text").innerHTML="";
    type_iterator = 0;
    perform_clicked = 0;
    if(active_mode == "mode 1")
    {
        txt = 'Mode 1 is an authentic mode and relative of mode 2. Its tonic is Re, its dominant falls on the fifth degree, Sol, and its final is Re.';
    }
    else if(active_mode == "mode 2")
    {
        txt = 'Mode 2 is a plagal mode and relative of mode 1. Its tonic is La, its dominant falls on the sixth degree, Fa, and its final is Re.';
    }
    else if(active_mode == "mode 3")
    {
        txt = 'Mode 3 is an authentic mode and relative of mode 4. Its tonic is Mi, its dominant falls on the sixth degree, Do, and its final is Mi.';
    }
    else if(active_mode == "mode 4")
    {
        txt = "Mode 4 is a plagal mode and relative of mode 3. Its tonic is Ti, its dominant falls on the seventh degree, La, and its final is Mi.";
    }
    else if(active_mode == "mode 5")
    {
        txt = "Mode 5 is an authentic mode and relative of mode 6. Its tonic is Fa, its dominant falls on the fifth degree, Do, and its final is Fa.";
    }
    else if(active_mode == "mode 6")
    {
        txt = "Mode 6 is a plagal mode and relative of mode 5. Its tonic is Do, its dominant falls on the sixth degree, La, and its final is Fa.";
    }
    else if(active_mode == "mode 7")
    {
        txt = "Mode 7 is an authentic mode and relative of mode 8. Its tonic is Sol, its dominant falls on the fifth degree, Re, and its final is Sol.";
    }
    else if(active_mode == "mode 8")
    {
        txt = "Mode 8 is a plagal mode and relative of mode 7. Its tonic is Re, its dominant falls on the seventh degree, Do, and its final is Sol.";
    }
    if(isTyping == false)
    {
        typeWriter();
        if(monks_closed.style.zIndex == "-1")
        {
            speak();
        }
    }
    return txt;
}

// FORM INFO //
var active_form;
document.getElementById("form-dropdown").addEventListener("click", () => {
    document.getElementById("speech-text").innerHTML="";
    type_iterator = 0;
    perform_clicked = 0;
    txt = "Plainsong manifests in three forms: syllabic, neumatic, and melismatic. Select the form you want us to sing.";
    if(isTyping == false)
    {
        typeWriter();
        if(monks_closed.style.zIndex == "-1")
        {
            speak();
        }    
    }
});
function form_info(active_form)
{
    document.getElementById("speech-text").innerHTML="";
    type_iterator = 0;
    perform_clicked = 0;
    if(active_form == "syllabic")
    {
        txt = 'Syllabic';
    }
    else if(active_form == "neumatic")
    {
        txt = 'Neumatic';
    }
    else if(active_form == "melismatic")
    {
        txt = 'Melismatic';
    }
    if(isTyping == false)
    {
        typeWriter();
        if(monks_closed.style.zIndex == "-1")
        {
            speak();
        }
    }
    return txt;
}

// GENERATE MESSAGE //
document.getElementById("generate-button").addEventListener("click", () => {
    document.getElementById("speech-text").innerHTML="";
    type_iterator = 0;
    perform_clicked = 0;
    txt = "Click the chant elements you want to learn about.";
    if(isTyping == false)
    {
        typeWriter();
        if(monks_closed.style.zIndex == "-1")
        {
            speak();
        }    
    }
});

// GLYPH INFO //
function read_svg_element()
{
    var mode_text = document.getElementsByClassName("annotation");
    var active_mode = mode_text[0].innerHTML.substring(7,8);
    for(let i=0; i<mode_text.length; i++)
    {
        mode_text[i].addEventListener("click", () => {
            document.getElementById("speech-text").innerHTML="";
            type_iterator = 0;
            perform_clicked = 0;
            txt = mode_info("mode " + active_mode);
            if(isTyping == false)
            {
                typeWriter();
                if(monks_closed.style.zIndex == "-1")
                {
                    speak();
                }
            }
        });
    }
    var doClef = document.getElementsByClassName("ChantNotationElement DoClef");
    for(let i=0; i<doClef.length; i++)
    {
        doClef[i].addEventListener("click", () => {
            document.getElementById("speech-text").innerHTML="";
            type_iterator = 0;
            perform_clicked = 0;
            txt = 'Do Clef: A clef that defines the placement of Do on the staff. The Do Clef may be placed on any of the top three staff lines.';//Guide to Neumes//
            if(isTyping == false)
            {
                typeWriter();
                if(monks_closed.style.zIndex == "-1")
                {
                    speak();
                }
            }
        });
    }
    var faClef = document.getElementsByClassName("ChantNotationElement FaClef");
    for(let i=0; i<faClef.length; i++)
    {
        faClef[i].addEventListener("click", () => {
            document.getElementById("speech-text").innerHTML="";
            type_iterator = 0;
            perform_clicked = 0;
            txt = 'Fa Clef: A clef that defines the placement of "Fa" on the staff. The Fa Clef may be placed on the second or third staff line.';//Guide to Neumes//
            if(isTyping == false)
            {
                typeWriter();
                if(monks_closed.style.zIndex == "-1")
                {
                    speak();
                }
            }
        });
    }
    var punctum = document.getElementsByClassName("ChantNotationElement Punctum");
    for(let i=0; i<punctum.length; i++)
    {
        punctum[i].addEventListener("click", () => {
            document.getElementById("speech-text").innerHTML="";
            txt = 'Punctum: A single note with a value of one beat.';//Guide to Neumes//
            let last_child = punctum[i].lastChild;
            if(last_child.attributes[0].nodeValue == "#Mora")
            {
                txt='Punctum Mora: A mora is a dot placed behind a note. The mora doubles the value of the note.';//Goodchild,24//
            }
            type_iterator = 0;
            perform_clicked = 0;
            if(isTyping == false)
            {
                typeWriter();
                if(monks_closed.style.zIndex == "-1")
                {
                    speak();
                }
            }
        });
    }
    var podatus = document.getElementsByClassName("ChantNotationElement Podatus");
    for(let i=0; i<podatus.length; i++)
    {
        podatus[i].addEventListener("click", () => {
            document.getElementById("speech-text").innerHTML="";
            type_iterator = 0;
            perform_clicked = 0;
            txt = "Podatus: A neume of two notes in which the first ascends to the second.";//Guide to Neumes//
            if(isTyping == false)
            {
                typeWriter();
                if(monks_closed.style.zIndex == "-1")
                {
                    speak();
                }
            }
        });
    }
    var clivis = document.getElementsByClassName("ChantNotationElement Clivis");
    for(let i=0; i<clivis.length; i++)
    {
        clivis[i].addEventListener("click", () => {
            document.getElementById("speech-text").innerHTML="";
            type_iterator = 0;
            perform_clicked = 0;
            txt = "Clivis: A neume of two notes in which the first descends to the second.";//Guide to Neumes//
            if(isTyping == false)
            {
                typeWriter();
                if(monks_closed.style.zIndex == "-1")
                {
                    speak();
                }
            }
        });
    }
    var porrectus = document.getElementsByClassName("ChantNotationElement Porrectus");
    for(let i=0; i<porrectus.length; i++)
    {
        porrectus[i].addEventListener("click", () => {
            document.getElementById("speech-text").innerHTML="";
            type_iterator = 0;
            perform_clicked = 0;
            txt = "Porrectus: A three-note neume that descends to the second note and ascends to the third. The arched line constitutes two notes.";//Guide to Neumes//
            if(isTyping == false)
            {
                typeWriter();
                if(monks_closed.style.zIndex == "-1")
                {
                    speak();
                }
            }
        });
    }
    var climacus = document.getElementsByClassName("ChantNotationElement Climacus");
    for(let i=0; i<climacus.length; i++)
    {
        climacus[i].addEventListener("click", () => {
            document.getElementById("speech-text").innerHTML="";
            type_iterator = 0;
            perform_clicked = 0;
            txt = "Climacus: A descending neume comprised of a virga and two or more rhombi. Each note has a value of one beat.";//Guide to Neumes//
            if(isTyping == false)
            {
                typeWriter();
                if(monks_closed.style.zIndex == "-1")
                {
                    speak();
                }
            }
        });
    }
    var torculus = document.getElementsByClassName("ChantNotationElement Torculus");
    for(let i=0; i<torculus.length; i++)
    {
        torculus[i].addEventListener("click", () => {
            document.getElementById("speech-text").innerHTML="";
            type_iterator = 0;
            perform_clicked = 0;
            txt = "Torculus: A neume of three notes. The first ascends to the second, which descends to the third.";//Guide to Neumes//
            if(isTyping == false)
            {
                typeWriter();
                if(monks_closed.style.zIndex == "-1")
                {
                    speak();
                }
            }
        });
    }
    var quarterBar = document.getElementsByClassName("ChantNotationElement QuarterBar");
    for(let i=0; i<quarterBar.length; i++)
    {
        quarterBar[i].addEventListener("click", () => {
            document.getElementById("speech-text").innerHTML="";
            type_iterator = 0;
            perform_clicked = 0;
            txt = "Quarter Bar: The Quarter Bar notates a brief rest.";//Goodchild,11//
            if(isTyping == false)
            {
                typeWriter();
                if(monks_closed.style.zIndex == "-1")
                {
                    speak();
                }
            }
        });
    }
    var doubleBar = document.getElementsByClassName("ChantNotationElement DoubleBar");
    for(let i=0; i<doubleBar.length; i++)
    {
        doubleBar[i].addEventListener("click", () => {
            document.getElementById("speech-text").innerHTML="";
            type_iterator = 0;
            perform_clicked = 0;
            txt = "Double Bar: The Double Bar notates the end of a section.";//Goodchild,11//
            if(isTyping == false)
            {
                typeWriter();
                if(monks_closed.style.zIndex == "-1")
                {
                    speak();
                }
            }
        });
    }
    var accidental = document.getElementsByClassName("ChantNotationElement Accidental");
    for(let i=0; i<accidental.length; i++)
    {
        accidental[i].addEventListener("click", () => {
            document.getElementById("speech-text").innerHTML="";
            type_iterator = 0;
            perform_clicked = 0;
            txt = 'Flat: The only accidental used in plainsong is the flat, which lowers the value of the affected note by one semitone. The flat is always placed on the seventh degree, "Ti".';//Goodchild,29//
            if(isTyping == false)
            {
                typeWriter();
                if(monks_closed.style.zIndex == "-1")
                {
                    speak();
                }
            }
        });
    }
    var scandicus = document.getElementsByClassName("ChantNotationElement Scandicus");
    for(let i=0; i<scandicus.length; i++)
    {
        scandicus[i].addEventListener("click", () => {
            document.getElementById("speech-text").innerHTML="";
            type_iterator = 0;
            perform_clicked = 0;
            txt = 'Scandicus: An ascending neume of three notes. The first rises to the second, which rises to the third.';
            if(isTyping == false)
            {
                typeWriter();
                if(monks_closed.style.zIndex == "-1")
                {
                    speak();
                }
            }
        });
    }
    var custos = document.getElementsByClassName("ChantNotationElement Custos");
    for(let i=0; i<custos.length; i++)
    {
        custos[i].addEventListener("click", () => {
            document.getElementById("speech-text").innerHTML="";
            type_iterator = 0;
            perform_clicked = 0;
            txt = 'Custos: A note fragment at the end of the staff, indicating the first note of the next line.';//Guide to Neumes//
            if(isTyping == false)
            {
                typeWriter();
                if(monks_closed.style.zIndex == "-1")
                {
                    speak();
                }
            }
        });
    }
}

// TYPEWRITER EFFECT //
var type_iterator = 0;
var type_speed;
var isTyping = false;
function typeWriter()
{
    isTyping = true;
    done_talking = 0;
    document.getElementById("speech-text").style.display = "block";
    if(type_iterator < txt.length)
    {
        document.getElementById("speech-text").innerHTML += txt.charAt(type_iterator);
        if(txt.charAt(type_iterator) == "," || txt.charAt(type_iterator) == ":")
        {
            type_speed = 200;
            talk_speed = 200;
        }
        else if(txt.charAt(type_iterator) == ".")
        {
            type_speed = 250;
            talk_speed = 250;
        }
        else
        {
            type_speed = 25;
            talk_speed = 100;
        }
        type_iterator++;
        setTimeout(typeWriter, type_speed);
    }
    else
    {
        done_talking = 1;
        isTyping = false;
    }
};

// MONK TALK EFFECT //
var open_z = "2";
var closed_z = "1";
var talk_speed = 100;
var done_talking;
var perform_clicked = 0;
document.getElementById("perform-button").addEventListener("click", () => {
    perform_clicked = 1;
});
function change_monk_state()
{
    if(talk_speed != 500)
    {
        [open_z, closed_z] = [closed_z, open_z];
        document.getElementById("monks-open").style.zIndex = open_z;
        document.getElementById("monks-closed-noeyes").style.zIndex = closed_z;
    }
    else
    {
        document.getElementById("monks-closed-noeyes").style.zIndex = "3";
    }
}

function speak()
{
    if(perform_clicked == 1)
    {
        document.getElementById("monks-open").style.zIndex = "-2";
        document.getElementById("monks-closed-noeyes").style.zIndex = "0";
        document.getElementById("monks-closed-noeyes").style.zIndex = "-3";
        return;
    }
    if(done_talking == 1)
    {
        document.getElementById("monks-open").style.zIndex = "-2";
        document.getElementById("monks-closed-noeyes").style.zIndex = "0";
        setTimeout(() => {
            document.getElementById("monks-closed-noeyes").style.zIndex = "-3";
        }, 250);
        return;
    }
    change_monk_state();
    setTimeout(speak, talk_speed);
}