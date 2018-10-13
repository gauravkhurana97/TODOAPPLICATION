

const getsavedNotes=function(){
    const todosJSON = localStorage.getItem('todos');

    if(todosJSON!==null){
        return JSON.parse(todosJSON); 
    }
    else{
        return [];
    }

}

const savedtodos=function(todos){
localStorage.setItem("todos",JSON.stringify(todos));
}


const render_todos=function(){

    const filter_todos=todos.filter(function(items){
        return items.text.toLowerCase().includes(filters.search_text.toLocaleLowerCase());
    })
    
    un_hide_todos=filter_todos.filter(function(items){
        if(filters.checked==true)
        {
            return !items.completed;
        }else{
            return true; 
        }
    })

    document.querySelector("#todo_list").innerHTML="";

    document.querySelector("#todo_list").appendChild(generate_summary_todo());


    un_hide_todos.forEach(function(items){
        document.querySelector("#todo_list").appendChild(generate_todos(items));
 })
}

const generate_summary_todo=function(){
para = document.createElement("p");
para.textContent=`You have ${incompletetodos(todos)} todos length`;
return para;
}

const toggletodos=function(id){
    const single_todo = todos.find(function(items){
        return   items.id === id;
    })
    if(single_todo!=undefined){
        single_todo.completed=!single_todo.completed;
    }
}

const removenotes=function(id){
    const indx = todos.findIndex(function(items){
        return items.id===id;
    })
    if(indx!=-1){
    todos.splice(indx,1);
    }
}

const generate_todos=function(items){
    const container=document.createElement("div");
    const checkbox = document.createElement("input");
    checkbox.setAttribute("type","checkbox");

    const  make_todo_para=document.createElement("span");
    const button=document.createElement("button");   
    checkbox.checked=items.completed;
    button.textContent="X";
    button.addEventListener("click",function()
    {
    removenotes(items.id);
    savedtodos(todos);
    render_todos(items);
    });

    checkbox.addEventListener("change",function(){
        toggletodos(items.id);
        savedtodos(todos);
        render_todos(items);
        })

    container.appendChild(checkbox)
    if(items.text.length==0){
        make_todo_para.textContent=Unnamed_todo;
       }
       else{
        make_todo_para.textContent=items.text;
       }
    container.appendChild(make_todo_para);
    container.appendChild(button)
    return container; 
}