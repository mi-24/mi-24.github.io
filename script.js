let addBtn = document.getElementById("add-btn");
let addTitle = document.getElementById("noteTitleInput");
let addTxt = document.getElementById("noteBodyInput");
let colourInput = document.getElementById("colour");
let searchBar = document.getElementById("search");

searchBar.addEventListener('keyup', async (event) => { 
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
            html += `
            <div id="note" class="col-xs-6 col-sm-6 col-lg-4 note">
            <div class="nbox" id="bg${index}" style="background-color:${element.colour};">
                <h2 class="note-title">${element.title}</h2>
                <p class="note-text">${element.text}</p>
                <button id="${index}" class="note-btn edit-btn" data-toggle="modal" data-target="#editModal${index}" data-backdrop="static" data-keyboard="false"><i class="fa fa-pencil" aria-hidden="true"></i></button> 
                <button id="${index}" onclick="deleteNote(this.id)" class="note-btn delete-btn"><i class="fa fa-trash" aria-hidden="true"></i></button>
                <p class="date">Last Updated: <br><span>${element.date}</span></p>
            </div> 
        </div>
        <!-- Modal -->
            <div class="modal fade" id="editModal${index}" tabindex="-1" role="dialog" aria-labelledby="updateModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h3 class="modal-title" class="editHeader">Edit Note</h3>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <form class="create-form" action="">
                                <br>
                                <input type="text" id="editTitle${index}" placeholder="Title" required maxlength="50" value="${element.title}"><br><br><br>
                                <textarea name="noteBody" id="editBody${index}" placeholder="Details (maximum 500 characters)" maxlength="500" rows="6" required>${element.text}</textarea>
                                <br><br>
                                <input class="border-round colour" type="color" id="colour${index}" name="favcolor" value="${element.colour}">
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
                                <br><hr>
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
    if (filterCount == 0){
        noteElm.innerHTML = emptymessage;
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
            colour: colourInput.value
        }
        notesObj.unshift(myObj);
        localStorage.setItem("notes", JSON.stringify(notesObj));
        addTitle.value = "";
        addTxt.value = "";
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
        html += `
        <div id="note" class="col-xs-6 col-sm-6 col-lg-4 note">
            <div class="nbox" id="bg${index}" style="background-color:${element.colour};">
                <h2 class="note-title">${element.title}</h2>
                <p class="note-text">${element.text}</p>
                <button id="${index}" class="note-btn edit-btn" data-toggle="modal" data-target="#editModal${index}" data-backdrop="static" data-keyboard="false"><i class="fa fa-pencil" aria-hidden="true"></i></button> 
                <button id="${index}" onclick="deleteNote(this.id)" class="note-btn delete-btn"><i class="fa fa-trash" aria-hidden="true"></i></button>
                <p class="date">Last Updated: <br><span>${element.date}</span></p>
            </div> 
        </div>
        <!-- Modal -->
            <div class="modal fade" id="editModal${index}" tabindex="-1" role="dialog" aria-labelledby="updateModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h3 class="modal-title" class="editHeader">Edit Note</h3>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <form class="create-form" action="">
                                <br>
                                <input type="text" class="editTitle" id="editTitle${index}" placeholder="Title" required maxlength="50" value="${element.title}"><br><br><br>
                                <textarea name="noteBody" id="editBody${index}" placeholder="Details (maximum 500 characters)" maxlength="500" rows="6" required>${element.text}</textarea>
                                <br><br>
                                <input class="border-round colour" type="color" id="colour${index}" name="favcolor" value="${element.colour}">
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
                                <br><hr>
                                <button class="update-btn" type="button" onclick="editNote(${index})">Update</button><br>
                            </form>
                        </div>
                        
                    </div>
                </div>
            </div>
        `
        ;
        
    });
    
    let noteElm = document.getElementById("notes");
    if (notesObj.length != 0){
        noteElm.innerHTML = html;
    }else{
        noteElm.innerHTML = emptymessage;
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

    let updateTitle = document.getElementById(editTitleID);
    let updateTxt = document.getElementById(editTxtID);
    let updateColour = document.getElementById(editColourID);

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
            colour: updateColour.value
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