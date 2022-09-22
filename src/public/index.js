const socket = io();

let formProducts = document.getElementById("form-products");
let formChat = document.getElementById("form-msg")

const handleSubmit = (e, route, event) => {
  e.preventDefault();
  let formData = new FormData(e.target);
  let newData = {};
  formData.forEach((value, key) => (newData[key] = value));
  fetch(route, {
    method: "POST",
    body: JSON.stringify(newData),
    headers: {
      "Content-type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => socket.emit(event, data))
    .then(() => e.target.reset());
};

formProducts.addEventListener("submit", (e) => handleSubmit(e, "/productos", "addProduct"));
formChat.addEventListener("submit", (e)=> handleSubmit(e, "/msg", "addMsg"))

socket.on("historyProducts", (products) => {
  let innerProduct = `
    <tr>
      <th>nombre</th>
      <th>precio</th>
      <th>foto</th>
    </tr>
    `;
  //si products no esta vacio lo mapeamos sino se muestra un msj de que no hay productos
  if (products[0]) {
    products.map((product) => {
      innerProduct += `
        <tr>
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td><img src="${product.thumbnail}" alt="${product.name}"></td>
        </tr>
        `;
    });
    document.getElementById("table").innerHTML = innerProduct;
  } else {
    document.getElementById("table").innerHTML = `<h1>No hay productos añadidos</h1>`;
  }
});

socket.on("historyChat", (msg) => {
  let contentMsg = "";
  if (msg[0]) {
    msg.map((res) => {
      contentMsg += `
      <div class="msg">
        <p class="email">${res.email}</p>
        <p class="fyh">[ ${res.fyh} ]:</p>
        <p class="message"> ${res.msg}</p>
      </div>
      `;
    });
    document.getElementById("msg-history").innerHTML = contentMsg
  }
});