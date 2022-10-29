
const FormToCreate = document.getElementById("create-table");
const AddBtn = document.getElementById('add-line');
const DellBtn = document.getElementById('dell-line');
let Table;
i = 1;

FormToCreate.addEventListener('click', function(e){
    if(Table){
        alert("Таблица уже создана");
        return;
    }

    let table = document.createElement('table');
    table.id = "table";

    let baseline = document.createElement('tr');
    baseline.append(createTd('id'));
    baseline.append(createTd('Text'));
    table.append(baseline);

    document.body.append(table);

    AddBtn.removeAttribute('disabled');
    DellBtn.removeAttribute('disabled');
    DellBtn.previousElementSibling.removeAttribute('disabled');
    Table = table;
});

AddBtn.addEventListener('click', function(e){
    createLine();
});

DellBtn.addEventListener('click', function(e){
    const inputForm = this.previousElementSibling;
    deleteLine(inputForm.value);
    inputForm.value = '';
});

function deleteLine(ID){
    const line = getLineById(ID);
    if (!line){
        return;
    }
    Table.removeChild(line);
}

function getLineById(ID){
    for(const line of document.querySelectorAll('tr')){
        if (line.querySelector('td').innerText === ID){
            return line;
        }
    }
    return false;
}

function createLine(){
    let line = document.createElement('tr'); 
    line.append(createTd(i++));
    line.append(createTd('some text'));
    Table.append(line);
}

function createTd(text){
    let td = document.createElement('td');
    td.innerText = text;
    return td;
}

document.onkeydown = function(e){
    switch (e.key){
        case "ArrowLeft":
            leftFocus();
            break;
        case "ArrowRight":
            rightFocus();
            break;
    }
};

function rightFocus(){
    var curElement = document.activeElement;
    if (curElement == DellBtn || curElement == document.body){
        FormToCreate.focus();
        return;
    }
    curElement.nextElementSibling.focus();
}

function leftFocus(){
    var curElement = document.activeElement;
    if (curElement == FormToCreate || curElement == document.body) {
        DellBtn.focus();
        return;
    }
    curElement.previousElementSibling.focus();
}