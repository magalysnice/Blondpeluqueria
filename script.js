const BUSINESS = {
  name: "BLOND PELUQUERÍA",
  city: "Cali, Valle del Cauca, Colombia",
  whatsapp: "573164607570", // Cambia aquí si el WhatsApp es diferente al teléfono publicado
  phone: "316 4607570",
  email: "",
  instagram: "https://www.instagram.com/blondpeluqueria/",
  facebook: "https://www.facebook.com/Blondgroup/",
  tiktok: "https://www.tiktok.com/@blondpeluqueria",
  maps: "https://www.google.com/maps/search/?api=1&query=Cl.+9+%2344-56+Loc+2B,+Nueva+Tequendama,+Cali,+Valle+del+Cauca"
};
const categories = {
"COLOR & TRANSFORMACIÓN":["Tintura de cabello","Técnica balayage","Iluminación del cabello","Cabello estilo ombré","Permanente"],
"CORTE & ESTILISMO":["Peluquería","Cortes de cabello","Cortes para niños","Secado de cabello","Peinados","Recogidos","Cabello con rizos","Alisado","Afeitado","Champú y acondicionador"],
"TRATAMIENTOS CAPILARES":["Renacimiento capilar","Tratamientos para el cabello","Tratamientos con queratina"],
"TRENZAS & EXTENSIONES":["Trenzas","Trenzas cuadradas","Extensiones de cabello"],
"BELLEZA & CUIDADO":["Tratamientos faciales","Depilación con cera","Servicios de maquillaje"],
"BLOND BRIDES":["Peinados de novia","Servicios para novias","Recogidos","Servicios de maquillaje"]
};
const cats=document.querySelector("#serviceCategories"), select=document.querySelector("#service");
Object.entries(categories).forEach(([cat,items])=>{
 const box=document.createElement("article"); box.className="service-cat reveal"; box.innerHTML=`<h3>${cat}</h3>`;
 items.forEach(item=>{const row=document.createElement("div");row.className="service-item";row.innerHTML=`<span>${item}<small> · Consultar precio</small></span><button data-service="${item}">Reservar</button>`;box.appendChild(row);const opt=document.createElement("option");opt.value=item;opt.textContent=item;select.appendChild(opt)});
 cats.appendChild(box);
});
document.querySelectorAll("[data-service]").forEach(b=>b.addEventListener("click",()=>{select.value=b.dataset.service;document.querySelector("#reservar").scrollIntoView({behavior:"smooth"})}));
const header=document.querySelector("#header");addEventListener("scroll",()=>header.classList.toggle("scrolled",scrollY>40));
document.querySelector("#menuBtn").onclick=()=>document.querySelector("#nav").classList.toggle("open");
document.querySelectorAll("#nav a").forEach(a=>a.onclick=()=>document.querySelector("#nav").classList.remove("open"));
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add("visible")}),{threshold:.1});document.querySelectorAll(".reveal").forEach(el=>io.observe(el));
const today=new Date(); today.setMinutes(today.getMinutes()-today.getTimezoneOffset()); document.querySelector("#date").min=today.toISOString().split("T")[0];
function whatsappUrl(text="Hola BLOND PELUQUERÍA 👋 Me gustaría solicitar información."){return BUSINESS.whatsapp?`https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(text)}`:"#reservar"}
["mapsLink","mapCardLink","footerMaps","mobileMaps"].forEach(id=>document.getElementById(id).href=BUSINESS.maps);
["contactWhats","whatsappFloat","mobileWhats"].forEach(id=>document.getElementById(id).href=whatsappUrl());
document.querySelector("#bookingForm").addEventListener("submit",e=>{
 e.preventDefault();
 const name=document.querySelector("#name").value, service=select.value,date=document.querySelector("#date").value,time=document.querySelector("#time").value,msg=document.querySelector("#message").value;
 const text=`Hola BLOND PELUQUERÍA 👋 Me gustaría solicitar una cita.\n\nServicio: ${service}\nFecha: ${date}\nHora: ${time}\nNombre: ${name}${msg?`\nMensaje: ${msg}`:""}\n\n¿Tienen disponibilidad? Gracias.`;
 if(!BUSINESS.whatsapp){alert("La web está lista. Solo falta agregar el número de WhatsApp en BUSINESS.whatsapp dentro de script.js.");return}
 window.open(whatsappUrl(text),"_blank");
});
// Carrusel de opiniones de Google
(() => {
 const track=document.getElementById("reviewsTrack"), prev=document.getElementById("prevReview"), next=document.getElementById("nextReview"), counter=document.getElementById("reviewCounter");
 if(!track||!prev||!next) return;
 const cards=[...track.querySelectorAll(".google-review")];
 let index=0;
 function go(i){index=(i+cards.length)%cards.length;cards[index].scrollIntoView({behavior:"smooth",block:"nearest",inline:"start"});counter.textContent=`${index+1} / ${cards.length}`;}
 prev.addEventListener("click",()=>go(index-1)); next.addEventListener("click",()=>go(index+1));
})();
