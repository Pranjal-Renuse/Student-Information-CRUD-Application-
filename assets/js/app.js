var cl = console.log;

const createStudent = document.getElementById('createStudent')
const fname = document.getElementById('fname')
const lname = document.getElementById('lname')
const email = document.getElementById('email')
const contact = document.getElementById('contact')
const stdInfoHolder = document.getElementById('stdInfoHolder')
const submit = document.getElementById('submit')
const update = document.getElementById('update')
update.style.display = 'none'

let stdInfoArray = [];

function getStdData(){
    if(localStorage.getItem("setStdInfo")){
        return JSON.parse(localStorage.getItem("setStdInfo"))
    }
}

if(localStorage.getItem('setStdInfo')){
    stdInfoArray = getStdData()
    templating(stdInfoArray)
}

function uuid() {
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
}

function createStdHandler (eve){
    // cl('Hello Js')
    eve.preventDefault()
    let stdObj = {
        firstName : fname.value,
        lastName : lname.value,
        emailId : email.value,
        contactNo : contact.value,
        id : uuid()
    }
    // cl(stdObj)
    stdInfoArray.push(stdObj);
    // cl(stdInfoArray)
    
    localStorage.setItem('setStdInfo', JSON.stringify(stdInfoArray))
    stdInfoArray = getStdData()
    this.reset()
    templating(stdInfoArray)
}


function onEditHandler(eve){
    update.style.display = 'inline-block'
    submit.style.display = 'none'
    let getId =  eve.getAttribute('data-id')
    localStorage.setItem('setId', getId)
    cl(getId)
    let getLocalStdData = getStdData()
    cl(getLocalStdData)
    getClickObj = getLocalStdData.filter(ele =>{
        return ele.id === getId;
    })
    cl(getClickObj)
    fname.value = getClickObj[0].firstName
    lname.value = getClickObj[0].lastName
    email.value = getClickObj[0].emailId
    contact.value = getClickObj[0].contactNo
}

function onUpdateHandler(){
    let getId = localStorage.getItem('setId')
    let getLocalStdData = getStdData()
    getLocalStdData.forEach(obj =>{
        if(obj.id === getId){
            obj.firstName = fname.value
            obj.lastName = lname.value
            obj.emailId = email.value
            obj.contactNo = contact.value
        }
    })
    localStorage.setItem('setStdInfo', JSON.stringify(getLocalStdData))
    templating(getLocalStdData)
}


function onDeleteHandler(eve){
    let getId =  eve.getAttribute('data-id')
    
    let stdInfoArray = getStdData()
    stdInfoArray = stdInfoArray.filter(std => {
        return std.id != getId;
    })
    cl(stdInfoArray)
    localStorage.setItem('setStdInfo', JSON.stringify(stdInfoArray))
    templating(stdInfoArray);
    window.location.reload()
}

function templating(arr){
    let result = '';
    arr.forEach((std, i) => {
    result += `<tr>
                <td>${i + 1}</td>
                <td>${std.firstName}</td>
                <td>${std.lastName}</td>
                <td>${std.emailId}</td>
                <td>${std.contactNo}</td>
                <td><input type="button" onclick = "onEditHandler(this)" value="Edit" class="btn btn-primary text-white" data-id=${std.id}></td>
                <td><input type="button" onclick = "onDeleteHandler(this)" value="Delete" class="btn btn-danger text-white" data-id=${std.id}></td>
            </tr>`
        })
        // cl(result)
    stdInfoHolder.innerHTML = result;
}

createStudent.addEventListener('submit', createStdHandler)
update.addEventListener('click', onUpdateHandler)