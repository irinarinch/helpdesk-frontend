import TicketService from './TicketService';
import TicketView from './TicketView';
import TicketForm from './TicketForm';

/**
 *  Основной класс приложения
 * */
export default class HelpDesk {
  constructor(container) {
    this.container = container;
    this.form = document.querySelector('.form');
    this.createBtn = document.querySelector('.add-ticket-btn');

    this.ticketService = new TicketService();
    this.TicketView = new TicketView();
    this.ticketForm = new TicketForm(this.form);

    this.bind();
  }

  bind() {
    this.save = this.save.bind(this);
    this.cancel = this.cancel.bind(this);

    this.postForm = this.postForm.bind(this);

    this.markTicket = this.markTicket.bind(this);
    this.showDescription = this.showDescription.bind(this);

    this.openFormToEdit = this.openFormToEdit.bind(this);
    this.openModalToDelete = this.openModalToDelete.bind(this);

    this.deleteTicket = this.deleteTicket.bind(this);
  }

  init() {
    this.initPage();

    this.createBtn.addEventListener('click', () => this.ticketForm.create());

    this.form.addEventListener('submit', this.postForm);

    document.addEventListener('click', (e) => {
      this.cancel(e);
      this.markTicket(e);
      this.showDescription(e);
      this.openFormToEdit(e);
      this.openModalToDelete(e);
      this.deleteTicket(e);
    });
  }

  initPage() {
    this.ticketService.list((data) => {
      data.forEach((ticket) => {
        this.TicketView.render(ticket);
      });
    });
  }

  save() {
    document.querySelectorAll('.ticket').forEach((ticket) => {
      ticket.remove();
    });

    this.initPage();
    this.ticketForm.close();
  }

  cancel(e) {
    if (!e.target.closest('.cancel-btn')) return;
    this.ticketForm.close();
  }

  markTicket(e) {
    if (e.target.closest('.checkbox-other') && !e.target.closest('.checkbox')) {
      e.preventDefault();
    }

    if (!e.target.closest('.checkbox')) return;

    this.getTicket(e);

    this.ticketService.get(this.currentId, (data) => {
      if (e.target.closest('.checkbox').checked) {
        const newData = data;
        newData.status = true;
      } else {
        const newData = data;
        newData.status = false;
      }

      this.ticketService.update(this.currentId, data, this.save);
    });
  }

  showDescription(e) {
    if (e.target.closest('.control') || e.target.closest('.checkbox') || !e.target.closest('.ticket')) {
      return;
    }

    const target = this.getTicket(e);

    this.ticketService.get(this.currentId, (data) => {
      this.TicketView.renderDescripton(target, data.description);
    });
  }

  openFormToEdit(e) {
    if (!e.target.closest('.edit-btn')) return;

    this.getTicket(e);

    this.ticketService.get(this.currentId, (data) => {
      this.ticketForm.edit(data);
    });
  }

  postForm(e) {
    e.preventDefault();

    const data = {
      name: this.ticketForm.nameInput.value,
      description: this.ticketForm.description.value,
      status: false,
    };

    if (data.name === '') return;

    if (this.ticketForm.title.textContent === 'Добавить тикет') {
      this.ticketService.create(data, this.save);
    } else {
      this.ticketService.update(this.ticketForm.id, data, this.save);
    }
  }

  openModalToDelete(e) {
    if (!e.target.closest('.delete-btn')) return;
    this.getTicket(e);

    this.ticketService.get(this.currentId, (data) => {
      this.ticketForm.delete(data);
    });
  }

  deleteTicket(e) {
    if (!e.target.closest('.delete-ticket-btn')) return;

    const { id } = this.ticketForm;
    this.ticketService.delete(id, this.save);
  }

  getTicket(e) {
    const target = e.target.closest('.ticket');
    this.currentId = target.dataset.id;
    return target;
  }
}
