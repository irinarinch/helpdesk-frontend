import pencil from '../images/pencil.png';
import cross from '../images/cross.png';

export default class TicketView {
  create(ticket) {
    this.getElements();
    this.getClasses();
    this.putElements();
    this.useData(ticket);
    this.useImages();

    return this.ticketElement;
  }

  getElements() {
    this.ticketElement = document.createElement('div');
    this.checkbox = document.createElement('input');
    this.checkbox.setAttribute('type', 'checkbox');
    this.content = document.createElement('div');
    this.nameEl = document.createElement('span');
    this.creationTime = document.createElement('span');
    this.label = document.createElement('label');
    this.editBtn = document.createElement('div');
    this.deleteBtn = document.createElement('div');
  }

  getClasses() {
    this.ticketElement.classList.add('ticket');
    this.checkbox.classList.add('checkbox');
    this.label.classList.add('checkbox-other');
    this.content.classList.add('ticket-content');
    this.creationTime.classList.add('created');
    this.editBtn.classList.add('control', 'edit-btn');
    this.deleteBtn.classList.add('control', 'delete-btn');
  }

  putElements() {
    this.ticketElement.appendChild(this.label);
    this.ticketElement.appendChild(this.creationTime);
    this.ticketElement.appendChild(this.editBtn);
    this.ticketElement.appendChild(this.deleteBtn);
    this.label.appendChild(this.checkbox);
    this.label.appendChild(this.content);
    this.content.appendChild(this.nameEl);
  }

  useData(ticket) {
    this.nameEl.textContent = ticket.name;

    const date = new Date(ticket.created);
    this.creationTime.textContent = date.toLocaleString();
  }

  useImages() {
    const editImg = document.createElement('img');
    editImg.src = `${pencil}`;
    this.editBtn.appendChild(editImg);

    const removeImg = document.createElement('img');
    removeImg.src = `${cross}`;
    this.deleteBtn.appendChild(removeImg);
  }

  render(ticket) {
    const newEl = this.create(ticket);
    document.querySelector('.root').append(newEl);
    newEl.dataset.id = ticket.id;

    if (ticket.status === true) {
      this.checkbox.checked = true;
    } else {
      this.checkbox.checked = false;
    }
  }

  renderDescripton(element, data) {
    this.description = document.createElement('div');
    this.description.textContent = data;

    this.description.classList.add('description');

    const descriptionEl = element.querySelector('.description');

    if (!element.contains(descriptionEl) && data !== '') {
      element.append(this.description);
    } else if (element.contains(descriptionEl)) {
      descriptionEl.remove();
    }
  }
}
