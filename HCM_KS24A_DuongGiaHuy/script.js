const eventLi=document.getElementById("event-section");
const eventArr=[];
let editIndex=-1;
function addEvent(event){
    event.preventDefault();
    let name=document.getElementById("eventName").value;
    let date=document.getElementById("eventDate").value;
    let place=document.getElementById("eventPlace").value;
    let holder=document.getElementById("eventHolder").value;
    if(name==""){
        let blank=document.createElement("p");
        blank.className="blank-input";
        blank.innerText="Không được để trống"
        document.getElementById("nameInput").appendChild(blank);
    }
    if(date==""){
        let blank=document.createElement("p");
        blank.className="blank-input";
        blank.innerText="Không được để trống"
        document.getElementById("dateInput").appendChild(blank);
    }
    if(place==""){
        let blank=document.createElement("p");
        blank.className="blank-input";
        blank.innerText="Không được để trống"
        document.getElementById("placeInput").appendChild(blank);
    }
    if(holder==""){
        let blank=document.createElement("p");
        blank.className="blank-input";
        blank.innerText="Không được để trống"
        document.getElementById("holderInput").appendChild(blank);
        return;
    }
    else{
    if(editIndex==-1){
        eventArr.push({name:name,date:date,place:place,holder:holder});
    }
    else{
        eventArr[editIndex]=({name:name,date:date,place:place,holder:holder});
        editIndex=-1;
        document.getElementById("addNew").innerText="THÊM";
    }
}
clearBoard();
renderEvent(event);
}
function renderEvent(event){
    event.preventDefault();
    eventLi.innerHTML="";
    eventArr.forEach((special,index)=>{
        const newSection=document.createElement("tr");
        newSection.innerHTML=`
        <td style="width:200px">${special.name}</td>
        <td style="width:100px">${special.date}</td>
        <td style="width:200px">${special.place}</td>
        <td style="width:150px">${special.holder}</td>
        <td style="width:100px">
            <button id="delete" onclick="deleteEvent(${index})">XÓA</button>
            <button id="edit" onclick="editEvent(${index})">SỬA</button>
        </td>`;
        eventLi.appendChild(newSection);
    })
}
function deleteEvent(index){
    const confirmDelete=confirm("Bạn có chắc muốn xóa sự kiện?");
    if(confirmDelete){
        eventArr.splice(index,1);
    }
    renderEvent(event);
}
function editEvent(index){
    const eventEdit=eventArr[index];
    document.getElementById("eventName").value=eventEdit.name;
    document.getElementById("eventDate").value=eventEdit.date;
    document.getElementById("eventPlace").value=eventEdit.place;
    document.getElementById("eventHolder").value=eventEdit.holder;
    editIndex=index;
    document.getElementById("addNew").innerText="CẬP NHẬT";
}
function searchEvent(){
    let searchName=document.getElementById("eventSearch").value;
    if(searchName==""){
    eventLi.innerHTML="";
    eventArr.forEach((special,index)=>{
        const newSection=document.createElement("tr");
        newSection.innerHTML=`
        <td style="width:200px">${special.name}</td>
        <td style="width:100px">${special.date}</td>
        <td style="width:200px">${special.place}</td>
        <td style="width:150px">${special.holder}</td>
        <td style="width:100px">
            <button id="delete" onclick="deleteEvent(${index})">XÓA</button>
            <button id="edit" onclick="editEvent(${index})">SỬA</button>
        </td>`;
        eventLi.appendChild(newSection);
    })
    }
    let searchLower=searchName.toLowerCase();
    eventLi.innerHTML="";
    eventArr.forEach((special,index)=>{
        specialLower=special.name.toLowerCase();
        if(specialLower.includes(searchLower)){
        const searchRow=document.createElement("tr");
        searchRow.innerHTML=`
        <td style="width:200px">${special.name}</td>
        <td style="width:100px">${special.date}</td>
        <td style="width:200px">${special.place}</td>
        <td style="width:150px">${special.holder}</td>
        <td style="width:100px">
            <button id="delete" onclick="deleteEvent(${index})">XÓA</button>
            <button id="edit" onclick="editEvent(${index})">SỬA</button>
        </td>`;
        eventLi.appendChild(searchRow);
        }
    })
}
function clearBoard(){
    document.getElementById("eventName").value="";
    document.getElementById("eventDate").value="";
    document.getElementById("eventPlace").value="";
    document.getElementById("eventHolder").value="";
}