const layoutRef = document.getElementById('layout');
const connectedViewRef = document.getElementById('connected-view');
const disconnectedViewRef = document.getElementById('disconnected-view');
const desktopRef = document.getElementById('desktop');
const connectButtonRef = document.getElementById('connect-btn');
const disconnectButtonRef = document.getElementById('disconnect-btn');

const stream = io();
stream.on('connect', createStream);
connectButtonRef.addEventListener('click', connect);
disconnectButtonRef.addEventListener('click', disconnect);

function createStream() {
  navigator.geolocation.getCurrentPosition(({ coords }) => {
    const { latitude: lat, longitude: lon } = coords;
    const { id } = stream;
    setTimeout(() => {

      fetch('http://localhost:4200/create-stream?' + new URLSearchParams({ lat, lon, id }))
        .then(({ status }) => {
          switch (status) {
            case 201:
              connectButtonRef.removeAttribute('disabled');
              break;
            case 404:
              alert('Sorry, no vendor found nearby you');
              break;
            case 500:
              alert('Something went wrong, try again later');
              break;
          }
        })
    }, 10000)
  })
}

function connect() {
  openConnectedView();
  stream.on('server-message', message => {
    desktopRef.textContent = message;
  })
}

function disconnect() {
  openDisconnectedView();
  stream.off('server-message');
  desktopRef.textContent = '...';
}

function openConnectedView() {
  disconnectedViewRef.hidden = true;
  connectedViewRef.hidden = false;
}

function openDisconnectedView() {
  disconnectedViewRef.hidden = false;
  connectedViewRef.hidden = true;
}