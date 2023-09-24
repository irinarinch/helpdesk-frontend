export default class TicketForm {
  constructor(form) {
    this.form = form;
    this.title = this.form.querySelector('.form-title');
    this.nameInput = this.form.querySelector('.form-name-input');
    this.description = this.form.querySelector('.form-description-input');
    this.modal = document.querySelector('.modal');
    this.modalToRemove = document.querySelector('.modal-to-remove');
  }

  create() {
    this.title.textContent = 'Добавить тикет';
    this.modal.classList.remove('hidden');
  }

  edit(ticket) {
    this.title.textContent = 'Изменить тикет';
    this.nameInput.value = ticket.name;
    this.description.value = ticket.description;
    this.id = ticket.id;

    this.modal.classList.remove('hidden');
  }

  delete(ticket) {
    this.id = ticket.id;
    this.modalToRemove.classList.remove('hidden');
  }

  close() {
    if (!this.modal.classList.contains('hidden')) {
      this.modal.classList.add('hidden');
      document.querySelector('.form').reset();
    } else {
      this.modalToRemove.classList.add('hidden');
    }
  }
}
