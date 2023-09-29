import createRequest from './createRequest';

/**
 *  Класс для связи с сервером.
 *  Содержит методы для отправки запросов на сервер и получения ответов
 * */
export default class TicketService {
  constructor() {
    this.host = 'https://helpdesk-backend-ieyc.onrender.com';
  }

  list(callback) {
    this.request = createRequest({
      method: 'GET',
      url: `${this.host}/?method=allTickets`,
      data: null,
      callback,
    });
  }

  get(id, callback) {
    this.request = createRequest({
      method: 'GET',
      url: `${this.host}?method=ticketById&id=${id}`,
      data: null,
      callback,
    });
  }

  create(data, callback) {
    this.request = createRequest({
      method: 'POST',
      url: `${this.host}/?method=createTicket`,
      data,
      callback,
    });
  }

  update(id, data, callback) {
    this.request = createRequest({
      method: 'POST',
      url: `${this.host}/?method=updateById&id=${id}`,
      data,
      callback,
    });
  }

  delete(id, callback) {
    this.request = createRequest({
      method: 'GET',
      url: `${this.host}/?method=deleteById&id=${id}`,
      data: null,
      callback,
    });
  }
}
