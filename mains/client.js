const socket = io()
let name;
let textarea = document.querySelector('#sendm')
let messageArea = document.querySelector('.msgbox')
do {
    name = prompt('Please enter your name: ')
} while(!name)
if(name.length <= 5){
    do {
      name = prompt('Name Should Be Greater Than 5 letters ')
  } while(name.length <= 5)
    
}
if (name === "Pratham"){
  let passover;
  do {
     passover = prompt('Password Of Pratham');
  } while (!passover);
  
  if (passover === "png12abc"){
    name = "👑 Pratham(Owner)"
  }
  else{
    
       verify = alert("Your Are Not Pratham exit or you'll not get owner tag");
    
    
  }
}
socket.emit('user-joined', name)
socket.on('user-connected',(sname)=>{ 
   let gsm = {
     user: "M-Bot",
     message: `"<strong>${sname}</strong>" Joined`,
   }
   appendMessage(gsm, 'center');
   uyt = sname
})
socket.on('user-disconnected',(sname)=>{ 
   let gsm = {
     user: "M-Bot",
     message: `"<strong>${sname}</strong>" Left`,
   }
   appendMessage(gsm, 'center');
})
/*ocket.on('user-list', (usern)=>{
 /* users arr Object.values(users);

for(i=0;isusers arr.length;i++){
*/
/*  uyt = `${usern}`
  //Let prdocument.createElement('p');

//p.innerText users arr[i];

//users_list.appendChild(p);
})*/
textarea.addEventListener('keyup', (e) => {
    if(e.key === 'Enter') {
        sendMessage(e.target.value)
    }
   /* if(e.target.value == '/m'){
      alert('Nahi batauga')
    }*/
  tval = e.target.value
})


function sendMessage(message) {
    let msg = {
        user: name,
        message: message || tval,
    }
    if(msg.message === "/m"){
      alert(uyt)

      textarea.value = ""
      return;
    }
  
    // Append 
    appendMessage(msg, 'right')
    textarea.value = ''
    scrollToBottom()

    // Send to server 
    socket.emit('message', msg)

}

function appendMessage(msg, type) {
    let mainDiv = document.createElement('div')
    let className = type
    mainDiv.classList.add(className, 'message')
    
    let markup = `
        <div><strong>${msg.user}</strong>: ${msg.message}</div>
    `
    mainDiv.innerHTML = markup
    messageArea.appendChild(mainDiv)
    /*if(mainDiv.innerText === "/m"){
      alert('Hi')
    }*/
}

// Recieve messages 
socket.on('message', (msg) => {
    appendMessage(msg, 'left')
    scrollToBottom()
})

function scrollToBottom() {
    messageArea.scrollTop = messageArea.scrollHeight
}


