
window.onload = function(){
    actualizarListado();
}

function add(){

    let tarea=document.querySelector('.tarea');
    let item = JSON.stringify({tarea: tarea.value, status:false });
    localStorage.setItem('tarea'+localStorage.length, item);
    actualizarListado();
    tarea.value='';
}

function actualizarListado(){

    let listTareas= document.querySelector('.result_container');
    listTareas.innerHTML='';
    for(let i=0; i<localStorage.length; i++) {
        let key = localStorage.key(i);

        let tareaContainer=document.createElement('div');
        tareaContainer.classList.add('tarea_container');
        tareaContainer.addEventListener('click', function() {changeStatus(key,i)});
        let item_tarea=document.createElement('span');
        item_tarea.classList.add('tarea');
        let data=JSON.parse(localStorage.getItem(key));
        item_tarea.textContent=data.status ? data.tarea+' Estado: '+'done' : data.tarea+' Estado: '+'to do';
        tareaContainer.appendChild(item_tarea);
        listTareas.appendChild(tareaContainer);
        let btn_remove=document.createElement('button');
        btn_remove.textContent='X';
        btn_remove.classList.add('btn_remove');
        btn_remove.addEventListener('click', function() {removeTarea(key)});
        tareaContainer.appendChild(btn_remove);
    }
    console.log(localStorage);
}


function removeTarea(tarea_key){
    localStorage.removeItem(tarea_key);
    actualizarListado();
}


function changeStatus(tarea_key){
    let data=JSON.parse(localStorage.getItem(tarea_key));
    localStorage.removeItem(tarea_key);
    let item = JSON.stringify({tarea: data.tarea, status:!data.status });
    localStorage.setItem('tarea'+localStorage.length, item);
    actualizarListado();
}