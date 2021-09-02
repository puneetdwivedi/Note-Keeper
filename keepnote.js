// local storage
let notes_data = [];
localStorage.setItem("local_notes", notes_data);

function saveonlocal() {
    let notes_data = [];
    let notes_elemnts = document.querySelector(".maincontainer");
    let notes = notes_elemnts.querySelectorAll("p");
    for (let i = 0; i < notes.length; i++) {
        notes_data.push((notes[i].innerHTML));
    }
    // console.log(notes_data);
    localStorage.setItem("local_notes", notes_data);
}

// on clicking save button
function addEventListeneronsavebutton() {

    let notes = document.getElementsByClassName("note");
    for (let i = 0; i < notes.length; i++) {
        notes[i].querySelector("button").addEventListener("click", () => {
            let notecontent = notes[i].querySelector("p");
            let writingarea = notes[i].querySelector("textarea");
            notecontent.innerHTML = writingarea.value;
            notes[i].querySelector("textarea").style.zIndex = "-1";
            notes[i].querySelector("button").style.zIndex = "-2";
            saveonlocal();
        });
    }
}

var maincontainer = document.getElementsByClassName("maincontainer")[0];
// add note function
let addnote = (text = "") => {
    //taking title name
    let notename = "Note-";
    var notes = document.getElementsByClassName("note");
    let note = document.createElement("div");
    let notehtml = `<div class="note" id="note${notes.length}">
                        <div class="notehead">
                            <span>${notename+notes.length}</span>
                            <div>
                                <span class="edit"><i class="fa fa-pencil" aria-hidden="true"></i></span>
                                <span class="delet"><i class="fa fa-trash-o" aria-hidden="true"></i></span>
                            </div>
                        </div>
                        <div class="notecontent">
                            <p></p>
                            <textarea class="writingarea"></textarea>
                            <button>Save</button>
                            
                        </div>
                    </div>`;
    note.innerHTML = notehtml;
    maincontainer.appendChild(note);
    //  saving data
    let notecontent = note.querySelector("p");
    let writingarea = note.querySelector("textarea");
    writingarea.value = text;
    notecontent.innerHTML = text;
    addEventListeneronsavebutton();

    // edit note
    note.querySelector(".edit").addEventListener("click", () => {
        let writingarea = note.querySelector("textarea");
        writingarea.value = note.querySelector("p").innerHTML;
        note.querySelector("textarea").style.zIndex = "1";
        note.querySelector("button").style.zIndex = "2";
    });

    // deleting the note
    const delet = note.querySelector(".delet");
    delet.addEventListener("click", () => {
        note.remove();
        saveonlocal();
    });

    //on page refreshing
    if (window.performance) {
        if (performance.navigation.type == 1) {
          if(note.querySelector("p").innerHTML!=""){
            note.querySelector("textarea").style.zIndex = "-1";
            note.querySelector("button").style.zIndex = "-2";
          }
        }
      }
}

// getting and displaying data from local storage
let notes_data = ((localStorage.getItem("local_notes"))).split(",");
// console.log(notes_data);
if (notes_data && !(notes_data.length==1 && notes_data[0]=="")) {
    notes_data.forEach((note) => addnote(note));
}

// on clicking addnote
document.getElementById("addnote").addEventListener("click", () => addnote(""));


