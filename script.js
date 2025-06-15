// Declare Variables
const guestForm = document.getElementById('guest-form');
const guestList = document.getElementById('guest-list');
const guestName = document.getElementById('guest-name');
const guestCount = document.getElementById('guest-count');
const guestCategory = document.getElementById('guest-category');

let guests = [];
// Function to add a guest

function addGuest(event) {
    event.preventDefault();

    if (guests.length >= 10) {
        alert('Guest list is full.');
        return;
    }

    const name = guestName.value.trim();
    if (name.length == 0) return;

    const category = guestCategory.value.trim();
    const timestamp = new Date().toLocaleString();

    const guest = {
      id: Date.now(), 
      name,
      category,
      timestamp,
      attending: false
    };
    
    guests.push(guest);
    renderGuests();

    guestName.value = '';
    guestCategory.value = '';
}

function deleteGuest(id) {
  guests = guests.filter((guest) => guest.id !== id);
  renderGuests();
}

function toggleRSVP(id) {
  const guest = guests.find((guest) => guest.id === id);
  if (guest) {
    guest.attending = !guest.attending;
    renderGuests();
  }
}

function editGuest(id) {
  const guest = guests.find((guest) => guest.id === id);
  if (guest) {
    const newName = prompt("Enter new name", guest.name);
    if (newName && newName.trim()) {
      guest.name = newName.trim();
      renderGuests();
    }
  }
}

function renderGuests() {
  guestList.innerHTML = '';
  
  guests.forEach((guest) => {
    // create elements
    const li = document.createElement('li');
    li.classList.toggle('attending', guest.attending);

    const strong = document.createElement('strong');
    strong.textContent = guest.name;

    const category = document.createElement('span');
    category.textContent = guest.category ? ` [${guest.category}]` : '';
    category.classList.add('category');

    const timestamp = document.createElement('span');
    timestamp.textContent = `Added: ${guest.timestamp}`;
    timestamp.classList.add('time');    

    // create action buttons
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Remove';
    deleteBtn.addEventListener('click', () => deleteGuest(guest.id));

    const toggleBtn = document.createElement('button');
    toggleBtn.textContent = 'Toggle Attending';
    toggleBtn.addEventListener('click', () => toggleRSVP(guest.id));

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.addEventListener('click', () => editGuest(guest.id));

    // assemble
    li.appendChild(strong);
    li.appendChild(category);
    li.appendChild(document.createElement('br'));
    li.appendChild(timestamp);
    li.appendChild(document.createElement('br'));
    li.appendChild(deleteBtn);
    li.appendChild(toggleBtn);
    li.appendChild(editBtn);

    guestList.appendChild(li);
  });

  guestCount.textContent = `${guests.length}/10`;
}

guestForm.addEventListener('submit', addGuest);