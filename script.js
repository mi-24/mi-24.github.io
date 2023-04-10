let addBtn = document.getElementById("add-btn");
let addTitle = document.getElementById("noteTitleInput");
let addTxt = document.getElementById("noteBodyInput");
let colourInput = document.getElementById("colour");
let textColourInput = document.getElementById("textColour");
let searchBar = document.getElementById("search");

setInterval(()=>{
    addTxt.style.backgroundColor = colourInput.value;
    addTitle.style.backgroundColor = colourInput.value;
    addTxt.style.color = textColourInput.value;
    addTitle.style.color = textColourInput.value;        
}, 100);

let star = document.getElementById('star');
var starCount = 0;
var starColour = '#ffffff';

star.addEventListener('click', function onClick() {
    if(starCount == 0){
        star.style.color = '#363568';        
        starColour = '#363568';
        starCount = 1;
    }else{
        star.style.color = '#ffffff';
        starColour = '#ffffff';
        starCount = 0;
    }
});

let mainStar = document.getElementById('mainStar');
var mainStarCount = 0;
var mainStarColour = '#ffffff';

mainStar.addEventListener('click', function onClick() {
    if(mainStarCount == 0){
        mainStar.style.color = '#363568';        
        mainStarColour = '#363568';
        mainStarCount = 1;
        
    let notes = localStorage.getItem("notes");
    let starredNotesCount = 0;
    if (notes == null){
        notesObj = [];
    }else{
        notesObj = JSON.parse(notes);
    }
    let html = "";
    let emptymessage = `<div class="empty">You have no starred notes.</div>`;
    
    notesObj.forEach(function(element, index){
        if(element.star == 1){
            ++starredNotesCount;
            let starColour2 = '#ffffff';
            if(element.star == 1){     
                starColour2 = '#363568';
            }else if(element.star == 0){
                starColour2 = '#ffffff';
            }
            html += `
            <div id="note" class="col-xs-6 col-sm-6 col-lg-4 note">
            <div class="nbox" id="bg${index}" style="background-color:${element.colour};">
                <button class='noteStyle smallStar' type="button" id="star${index}" name="star" style="color:${starColour2}" onclick="editNote(${index})"><i class="fa fa-star"></i></button>
                <h2 class="note-title" style="color:${element.textColour};">${element.title}</h2>
                <p class="note-text" style="color:${element.textColour};">${element.text}</p>
                <button id="edit${index}" class="note-btn edit-btn" data-bs-toggle="modal" data-bs-target="#editModal${index}" data-backdrop="static" data-keyboard="false"><i class="fa fa-pencil" aria-hidden="true"></i></button> 
                <button id="del${index}" onclick="deleteNote(this.id)" class="note-btn delete-btn"><i class="fa fa-trash" aria-hidden="true"></i></button>
                <p class="date" style="color:${element.textColour};">Last Updated: <br><span>${element.date}</span></p>
            </div> 
            </div>
            <!-- Modal -->
            <div class="modal fade" id="editModal${index}" tabindex="-1" role="dialog" aria-labelledby="updateModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h3 class="modal-title" class="editHeader">Edit Note</h3>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                            </button>
                        </div>
                        <div class="modal-body">
                            <form class="create-form" action="">
                            <br>
                            <input type="text" class="noteInput noteInputTitle" id="editTitle${index}" placeholder="Title" required maxlength="50" value="${element.title}" style="background-color:${element.colour};color:${element.textColour};">
                            <textarea class="noteInput" name="noteBody" id="editBody${index}" placeholder="Details (maximum 500 characters)" maxlength="500" rows="10" required style="background-color:${element.colour};color:${element.textColour};">${element.text}</textarea>
                            <br>
                            <div class="noteStyleContainer">
                                <input class="border-round colour noteStyle" type="color" id="colour${index}" name="favcolor" value="${element.colour}">                                                                                                              
                                <input class="border-round textColour noteStyle" type="color" id="textColour${index}" name="textColor" value="${element.textColour}"/>
                                <span  class="textColourLabel">T</span>      
                                
                            </div>                
                            <script>
                                    jQuery(document).ready(function($) {
                                    var max = 500;
                                    $('textarea.max').keypress(function(e) {
                                        // e.which < 0x20, then it's not a printable character
                                        // e.which === 0 - Not a character
                                        if (e.which < 0x20) {
                                            return;
                                        }
                                        if (this.value.length == max) {
                                            e.preventDefault();
                                        } else if (this.value.length > max) {
                                            // Maximum exceeded
                                            this.value = this.value.substring(0, max);
                                        }
                                    });
                                }); //end if ready
                                </script>
                                <button class="update-btn" type="button" onclick="editNote(${index})">Update</button><br>
                            </form>
                        </div>
                        
                    </div>
                </div>
            </div>
        `;
        }        
    });
    
    let noteElm = document.getElementById("notes");
    if (notesObj.length != 0){
        noteElm.innerHTML = html;
    }
    if (starredNotesCount == 0){
            noteElm.innerHTML = emptymessage;
    }   

    }else{
        mainStar.style.color = '#ffffff';
        mainStarColour = '#ffffff';
        mainStarCount = 0;
        showNotes()
    }
});

 
searchBar.addEventListener('keyup', async (event) => {
    mainStar.style.color = '#ffffff';
    mainStarCount = 0;
    let notes = localStorage.getItem("notes");
    let filterCount = 0;
    if (notes == null){
        notesObj = [];
    }else{
        notesObj = JSON.parse(notes);
    }
    let html = "";
    let emptymessage = `<div class="empty">No notes with "${searchBar.value}"</div>`;
    notesObj.forEach(function(element, index){
        if(element.title.toLowerCase().includes(searchBar.value.toLowerCase()) || element.text.toLowerCase().includes(searchBar.value.toLowerCase())){
            ++filterCount;
            let starColour2 = '#ffffff';
            if(element.star == 1){     
                starColour2 = '#363568';
            }else if(element.star == 0){
                starColour2 = '#ffffff';
            }
            html += `
            <div id="note" class="col-xs-6 col-sm-6 col-lg-4 note">
            <div class="nbox" id="bg${index}" style="background-color:${element.colour};">
            <button class='noteStyle smallStar' type="button" id="star${index}" name="star" style="color:${starColour2}" onclick="editNote(${index})"><i class="fa fa-star"></i></button>
                <h2 class="note-title" style="color:${element.textColour};">${element.title}</h2>
                <p class="note-text" style="color:${element.textColour};">${element.text}</p>
                <button id="edit${index}" class="note-btn edit-btn" data-bs-toggle="modal" data-bs-target="#editModal${index}" data-backdrop="static" data-keyboard="false"><i class="fa fa-pencil" aria-hidden="true"></i></button> 
                <button id="del${index}" onclick="deleteNote(this.id)" class="note-btn delete-btn"><i class="fa fa-trash" aria-hidden="true"></i></button>
                <p class="date" style="color:${element.textColour};">Last Updated: <br><span>${element.date}</span></p>
            </div> 
            </div>
            <!-- Modal -->
            <div class="modal fade" id="editModal${index}" tabindex="-1" role="dialog" aria-labelledby="updateModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h3 class="modal-title" class="editHeader">Edit Note</h3>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                            </button>
                        </div>
                        <div class="modal-body">
                            <form class="create-form" action="">
                            <br>
                            <input type="text" class="noteInput noteInputTitle" id="editTitle${index}" placeholder="Title" required maxlength="50" value="${element.title}" style="background-color:${element.colour};color:${element.textColour};">
                            <textarea class="noteInput" name="noteBody" id="editBody${index}" placeholder="Details (maximum 500 characters)" maxlength="500" rows="10" required style="background-color:${element.colour};color:${element.textColour};">${element.text}</textarea>
                            <br>
                            <div class="noteStyleContainer">
                                <input class="border-round colour noteStyle" type="color" id="colour${index}" name="favcolor" value="${element.colour}">                                                                                                              
                                <input class="border-round textColour noteStyle" type="color" id="textColour${index}" name="textColor" value="${element.textColour}"/>
                                <span  class="textColourLabel">T</span>
                            </div>                
                            <script>
                                    jQuery(document).ready(function($) {
                                    var max = 500;
                                    $('textarea.max').keypress(function(e) {
                                        // e.which < 0x20, then it's not a printable character
                                        // e.which === 0 - Not a character
                                        if (e.which < 0x20) {
                                            return;
                                        }
                                        if (this.value.length == max) {
                                            e.preventDefault();
                                        } else if (this.value.length > max) {
                                            // Maximum exceeded
                                            this.value = this.value.substring(0, max);
                                        }
                                    });
                                }); //end if ready
                                </script>
                                <button class="update-btn" type="button" onclick="editNote(${index})">Update</button><br>
                            </form>
                        </div>
                        
                    </div>
                </div>
            </div>
        `;
        }        
    });
    let noteElm = document.getElementById("notes");
    if (notesObj.length != 0 && filterCount != 0){
        noteElm.innerHTML = html;
    }
    if(searchBar.value != ""){
        if (filterCount == 0){
            noteElm.innerHTML = emptymessage;
            
        }
    }else{
        showNotes()
    }
    
    
})


addBtn.addEventListener("click", (e) => {
    var date = new Date();
    let dateFormat = date.toDateString();
    if (addTitle.value == "" || addTxt.value == ""){
        return alert("Please fill in both title and details.");
    }else{
        let notes = localStorage.getItem("notes");
        if (notes == null){
            notesObj = [];
        }else{
            notesObj = JSON.parse(notes);
        }
        let myObj = {
            title: addTitle.value,
            text: addTxt.value,
            date: dateFormat,
            colour: colourInput.value,
            textColour: textColourInput.value,
            star: starCount
        }
        notesObj.unshift(myObj);
        localStorage.setItem("notes", JSON.stringify(notesObj));
        addTitle.value = "";
        addTxt.value = "";
        starCount = 0;
    }
    $('.modal').modal('hide');
    $('body').removeClass('modal-open');
    $('.modal-backdrop').remove();
    showNotes();
    
})

//show notes
function showNotes(){
    let notes = localStorage.getItem("notes");
    if (notes == null){
        notesObj = [];
    }else{
        notesObj = JSON.parse(notes);
    }

    let html = "";
    let emptymessage = `<div class="empty">No notes have been made</div>`;
    notesObj.forEach(function(element, index){
        let starColour2 = '#ffffff';
        if(element.star == 1){     
            starColour2 = '#363568';
        }else if(element.star == 0){
            starColour2 = '#ffffff';
        }
        html += `
        <div id="note" class="col-xs-6 col-sm-6 col-lg-4 note">
            <div class="nbox" id="bg${index}" style="background-color:${element.colour};">
                <button class='noteStyle smallStar' type="button" id="star${index}" name="star" style="color:${starColour2}" onclick="editNote(${index})"><i class="fa fa-star"></i></button>
                <h2 class="note-title" style="color:${element.textColour};">${element.title}</h2>
                <p class="note-text" style="color:${element.textColour};">${element.text}</p>
                <button id="edit${index}" class="note-btn edit-btn" data-bs-toggle="modal" data-bs-target="#editModal${index}" data-backdrop="static" data-keyboard="false"><i class="fa fa-pencil" aria-hidden="true"></i></button> 
                <button id="del${index}" onclick="deleteNote(this.id)" class="note-btn delete-btn"><i class="fa fa-trash" aria-hidden="true"></i></button>
                <p class="date" style="color:${element.textColour};">Last Updated: <br><span>${element.date}</span></p>
            </div> 
        </div>
        <!-- Modal -->
            <div class="modal fade" id="editModal${index}" tabindex="-1" role="dialog" aria-labelledby="updateModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h3 class="modal-title" class="editHeader">Edit Note</h3>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                            </button>
                        </div>
                        <div class="modal-body">
                            <form class="create-form" action="">
                                <br>
                                <input type="text" class="noteInput noteInputTitle" id="editTitle${index}" placeholder="Title" required maxlength="50" value="${element.title}" style="background-color:${element.colour};color:${element.textColour};">
                                <textarea class="noteInput" name="noteBody" id="editBody${index}" placeholder="Details (maximum 500 characters)" maxlength="500" rows="10" required style="background-color:${element.colour};color:${element.textColour};">${element.text}</textarea>
                                <br>
                                <div class="noteStyleContainer">
                                    <input class="border-round colour noteStyle" type="color" id="colour${index}" name="favcolor" value="${element.colour}">                                                                                                              
                                    <input class="border-round textColour noteStyle" type="color" id="textColour${index}" name="textColor" value="${element.textColour}"/>
                                    <span  class="textColourLabel">T</span>
                                </div>                       
                                <script>
                                    jQuery(document).ready(function($) {
                                    var max = 500;
                                    $('textarea.max').keypress(function(e) {
                                        // e.which < 0x20, then it's not a printable character
                                        // e.which === 0 - Not a character
                                        if (e.which < 0x20) {
                                            return;
                                        }
                                        if (this.value.length == max) {
                                            e.preventDefault();
                                        } else if (this.value.length > max) {
                                            // Maximum exceeded
                                            this.value = this.value.substring(0, max);
                                        }
                                    });
                                }); //end if ready
                                </script>
                                <button class="update-btn" type="button" onclick="editNote(${index})">Update</button><br>
                            </form>
                        </div>
                        
                    </div>
                </div>
            </div>
        `
        ;

        setInterval(()=>{
            let editTitleID = "editTitle" + index;
            let editTxtID = "editBody" + index;
            let editColourID = "colour" + index;
            let editTextColID = "textColour" + index;
        
            let updateTitle = document.getElementById(editTitleID);
            let updateTxt = document.getElementById(editTxtID);
            let updateColour = document.getElementById(editColourID);
            let updateTextCol = document.getElementById(editTextColID);
        
            updateTxt.style.backgroundColor = updateColour.value;
            updateTitle.style.backgroundColor = updateColour.value;
            updateTxt.style.color = updateTextCol.value;
            updateTitle.style.color = updateTextCol.value;              
        }, 100);
        
    });
    
    let noteElm = document.getElementById("notes");
    if (notesObj.length != 0){
        noteElm.innerHTML = html;
        document.getElementById("search").disabled = false;
    }else{
        noteElm.innerHTML = emptymessage;
        document.getElementById("search").disabled = true;
    }
    searchBar.value = "";
}

//delete note
function deleteNote(index){
    let confirmDelete = confirm("Are you sure you want to delete your note?");

    if (confirmDelete == true){
        let notes = localStorage.getItem("notes");
        if (notes == null){
            notesObj == [];
        }else{
            notesObj = JSON.parse(notes);
        }

        notesObj.splice(index, 1);
        localStorage.setItem("notes", JSON.stringify(notesObj));
        showNotes();
    }
}

function editNote(index2){
    let notes = localStorage.getItem("notes");
    let editTitleID = "editTitle" + index2;
    let editTxtID = "editBody" + index2;
    let editColourID = "colour" + index2;
    let editTextColID = "textColour" + index2;
    let editStarID = "star" + index2;
    
    let updateTitle = document.getElementById(editTitleID);
    let updateTxt = document.getElementById(editTxtID);
    let updateColour = document.getElementById(editColourID);
    let updateTextCol = document.getElementById(editTextColID);
    let updateStar = document.getElementById(editStarID);
    let updateStarCount;

    if (updateStar.style.color == "rgb(255, 255, 255)"){
        updateStar.style.color = '#363568';
        updateStarCount = 1;
    }else{
        updateStar.style.color = "rgb(255, 255, 255)";        
        updateStarCount = 0;
    }

    var date = new Date();
    let dateFormat = date.toDateString();

    console.log(updateTitle.value)
    console.log(updateTxt.value)

    if (updateTitle.value == "" || updateTxt.value == ""){
        return alert("Please fill in both title and details.");
    }else{
        let notes = localStorage.getItem("notes");
        if (notes == null){
            notesObj = [];
        }else{
            notesObj = JSON.parse(notes);
        }
        let myObj = {
            title: updateTitle.value,
            text: updateTxt.value,
            date: dateFormat,
            colour: updateColour.value,
            textColour: updateTextCol.value,
            star: updateStarCount
        }
        notesObj.splice(index2,1);
        localStorage.setItem("notes", JSON.stringify(notesObj));
        notesObj.unshift(myObj);
        localStorage.setItem("notes", JSON.stringify(notesObj));
        updateTitle.value = "";
        updateTxt.value = "";
        

    }
    $('.modal').modal('hide');
    $('body').removeClass('modal-open');
    $('.modal-backdrop').remove();
    showNotes();
}

showNotes();

//change colour realtime with colour picker
setInterval(()=>{
    /*
    addTxt.style.backgroundColor = colourInput.value;
    addTitle.style.backgroundColor = colourInput.value;
    addTxt.style.color = textColourInput.value;
    addTitle.style.color = textColourInput.value;*/

    let notes = localStorage.getItem("notes");
    let editTitleID = "editTitle" + index2;
    let editTxtID = "editBody" + index2;
    let editColourID = "colour" + index2;
    let editTextColID = "textColour" + index2;

    let updateTitle = document.getElementById(editTitleID);
    let updateTxt = document.getElementById(editTxtID);
    let updateColour = document.getElementById(editColourID);
    let updateTextCol = document.getElementById(editTextColID);

    updateTxt.style.backgroundColor = updateColour.value;
    updateTitle.style.backgroundColor = updateTextCol.value;
    updateTxt.style.color = updateColour.value;
    updateTitle.style.color = updateTextCol.value;
        
    

}, 100);