const base_url = "http://localhost:3000/monsters"; ///?_limit=20&_page=3
let page = 1; //
//When the page loads, show the first 50 monsters. Each monster's name, age, and
//description should be shown.
function getFiftyMonsters(page) {
    const monsterContainer = document.querySelector("#monster-container");
    monsterContainer.innerHTML = " ";// remove everything from the page
    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${page}`)
    .then(res => res.json())
    .then(monsterArray => monsterArray.forEach(monsterObj => renderMonsters(monsterObj)))
}

function renderMonsters(monsterObj) { //

    const monsterContainer = document.querySelector("#monster-container")

    let monsterName = document.createElement("h1");
    monsterName.innerText = monsterObj.name;

    let monsterAge = document.createElement("h3");
    monsterAge.innerText = `Age: ${monsterObj.age} `;

    let monsterBio = document.createElement("p");
    monsterBio.innerText = `Bio: ${monsterObj.description}`;

    monsterContainer.appendChild(monsterName);
    monsterContainer.appendChild(monsterAge);
    monsterContainer.appendChild(monsterBio);  
}
//you should have a form to create a new monster. You should have fields for name,
//age, and description, and a 'Create Monster Button'. When you click the button,
//the monster should be added to the list and saved in the API.
function creatForm() {
    const createMonsterContainer = document.querySelector("#create-monster");
    let form = document.createElement("form");

    let inputName = document.createElement("input");
    inputName.id = "name";
    inputName.type = "text";
    inputName.placeholder = "name ...";

    let inputAge = document.createElement("input");
    inputAge.id = "age"
    inputAge.type = "number";
    inputAge.placeholder = 'age ...'

    let inputBio = document.createElement("input")
    inputBio.id = "bio"
    inputBio.type = "text";
    inputBio.placeholder = "description ...";

    let buttonCreate = document.createElement("button")
    buttonCreate.innerText = "Create";
    buttonCreate.type = "submit";
    form.addEventListener("submit", handleSubmit)

    form.append(inputName, inputAge, inputBio, buttonCreate) 
    createMonsterContainer.appendChild(form)
    
}
//as button "Create" pressed, a new monster object is created and post to API
function  handleSubmit(event) {
    event.preventDefault();
    newMonsterObj = {
        name: event.target[0].value,
        age: event.target[1].value,
        description: event.target[2].value,
    }
    saveInAPI(newMonsterObj);
}
function saveInAPI(newMonsterObj) {
    console.log(JSON.stringify(newMonsterObj))
    fetch("http://localhost:3000/monsters", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            Accept: "application/json"
        },
        body: JSON.stringify(newMonsterObj)
    })
    .then(res => res.json())
    .then(data => console.log(data))
}
//At the end of the list of monsters, show a button. When clicked, the button
//should load the next 50 monsters and show them.
function handleButtonForward() {
    page ++;
    getFiftyMonsters(page);
}
function handleButtonBack() {
    if(page > 1) {// do if it's any page, but not the first page.
        page --;
        getFiftyMonsters(page);
    }
}
//Initialization 
function initialize() {

    getFiftyMonsters(page);
    creatForm();

    const buttonForward = document.querySelector("#forward");
    buttonForward.addEventListener("click", handleButtonForward);

    const buttonBack = document.querySelector("#back");
    buttonBack.addEventListener("click", handleButtonBack);
}

initialize();
