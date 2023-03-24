import "../css/main.css";
//para el menu hamburgueza
const bMore = document.querySelector("#bMore");
const links = document.querySelector("#links");

const Cusar = document.querySelector("#usar");
const contactame = document.querySelector("#contact");

const Usarweb = document.querySelector("#usar-web");
const Contactweb = document.querySelector("#contact-web");


bMore.addEventListener("click", (e) =>{
    links.classList.toggle("collapsed");
});

Cusar.addEventListener("click", (e) =>{
    return comoseUsar();
});

contactame.addEventListener("click", (e) =>{
    return contacto();
});

Usarweb.addEventListener("click", (e) =>{
    return comoseUsar();
});

Contactweb.addEventListener("click", (e) =>{
    return contacto();
});

function comoseUsar(){
    Swal.fire({
        title: '<h5 class="tale">¿Como se usa la agenda?</5>',
        icon: 'info',
        html:
        '<p class="contenidoAlert">La agenda funciona como un contador de días, almacenando los datos en memeria local, es decir que se eliminaran los datos hasta que borres la cache de tu navegador o elimando lo agendado con el boton de eliminar</p>' +
        '<p class="contenidoAlert">Si descargas la aplicación para dispositivos mobiles, de la misma manera la aplicación utilizara memoria de tu celular y asi mismo se borrara lo agendado con el boton de eliminar o ya sea borrando los datos de la aplicación</p>',
        //showCloseButton: true,
        focusConfirm: false,
        footer: '<span class="spAlert">¡Información Importante!',
        //background: '#7760FF',
        //width: '90%',
        allowOutsideClick: false,
        allowEscapeKey: true,
        customClass: {
            popup: 'tamAlerta'
        }
      })
}


function contacto(){
    Swal.fire({
        title: '<h6 class="tale">¡Hola!, ¿Crees que puedo mejorar algo?</h6 >',
        html:
            '<p class="contenidoAlert">Tu comentario me seria de mucha ayuda para mejorar esta agenda</p><br><br>'+
            '↓Contactame↓<br>',
        showCancelButton: true,
        showDenyButton: true,
        confirmButtonColor: '#5B94D5',
        cancelButtonColor: '#A0A0A0',
        confirmButtonText: 'Twitter',
        denyButtonText: `Instagram`,
        padding: '1em',
        color: '#816add',
        background: '#fff url(/images/trees.png)',
        backdrop: `
          rgba(0,0,123,0.4)
          url("/images/nyan-cat.gif")
          left top
          no-repeat
        `,
        customClass: {
            popup: 'tamAlerta'
        }
      }).then((result) => {
        if (result.isConfirmed) {
          location.href = "https://twitter.com/BernardKanas";
        } else if (result.isDenied) {
          location.href = "https://www.instagram.com/bernard_k89/";
        }
      })
}

//Inicio del codigo para la agenda

let events = [];
let arr = []; //para cargar informacion

const eventName = document.querySelector("#eventName");
const eventDate = document.querySelector("#eventDate");
const buttonAdd = document.querySelector("#bAdd");
const eventsContainer = document.querySelector("#eventsContainer");

const json = load();

try{
    arr = JSON.parse(json);
} catch(error){
    arr = [];
}
events = arr ? [...arr] : []; 

renderEvents();

document.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault();
    addEvent();
});

buttonAdd.querySelector("form").addEventListener("click", (e) => {
    e.preventDefault();
    addEvent();
});

function addEvent(){
    if(eventName.value == "" || eventDate.value == ""){
        return;
    }

    if(dateDiff(eventDate.value) < 0){
        return Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No puedes Agendar actividades en fechas que ya pasaron!',
            footer: '<p>¡Intenta con una nueva Fecha!</p>',
            background: '#E5E7E9',
            
            customClass: {
                popup: 'tam'
            }
          });
    }

    const newEvent = {
        id: (Math.random() * 100).toString(36).slice(3),
        name: eventName.value,
        date: eventDate.value,
    };

    events.unshift(newEvent);

    save(JSON.stringify(events));

    eventName.value = "";

    renderEvents();
}

function dateDiff(d){
    const targetDate = new Date(d);
    const today = new Date();
    const difference = targetDate.getTime() - today.getTime();
    const days = Math.ceil(difference / (1000 * 3600 * 24));
    return days;
}

function renderEvents(){
    const eventsHTML = events.map((event) => {
        return `
            <div class="event">
                <div class="days">
                    <span class="days-number">${dateDiff(event.date)}</span>
                    <span class="days-text">dias</span>
                </div>

                <div class="event-name">${event.name}</div>
                <div class="event-date">${event.date}</div>
                <div class="actions">
                    <button class="bDelete" data-id="${
                        event.id
                    }">Eliminar</button>
                </div>
            </div>
        `;
    });
    eventsContainer.innerHTML = eventsHTML.join("");
    document.querySelectorAll(".bDelete").forEach(button => {
        button.addEventListener("click", (e) => {
            const id = button.getAttribute("data-id");
            events = events.filter((event) => event.id != id);

            save(JSON.stringify(events));
            renderEvents();
        });
    });
}

function save(data){
    localStorage.setItem("items", data);
}

function load(){
    return localStorage.getItem("items");
}