let todos=getsavedNotes();

const filters = {
    search_text:"",
    checked:false
}


let incompletetodos=function(todos){
    notes = todos.filter(function(items){
        return !items.completed;
    })
    return notes.length;
}





document.querySelector("#remove_dono_todo").addEventListener("change",function(e)
{
    console.log(e.target.checked);
    filters.checked=e.target.checked;
    render_todos(todos,filters);
})

render_todos(todos,filters)
 

document.querySelector("#filtering").addEventListener("input",function(e){
    
    filters.search_text=e.target.value;
    render_todos(todos,filters);

})

document.querySelector("#add_todo").addEventListener("submit",function(e){
    e.preventDefault();
    todos.push(
        {
            id:uuidv4(),
            text:e.target.elements.text.value,
            completed:false
        }
    )
    savedtodos(todos);
    render_todos(todos,filters);
   
    e.target.elements.text.value=""
})


