import createRequest from './createRequest';

/**
 *  Класс для связи с сервером.
 *  Содержит методы для отправки запросов на сервер и получения ответов
 * */
export default class TicketService {
  list(callback) {
    this.request = createRequest({
      method: 'GET',
      url: 'http://localhost:7070/?method=allTickets',
      data: null,
      callback,
    });
  }

  get(id, callback) {
    this.request = createRequest({
      method: 'GET',
      url: `http://localhost:7070/?method=ticketById&id=${id}`,
      data: null,
      callback,
    });
  }

  create(data, callback) {
    this.request = createRequest({
      method: 'POST',
      url: 'http://localhost:7070/?method=createTicket',
      data,
      callback,
    });
  }

  update(id, data, callback) {
    this.request = createRequest({
      method: 'POST',
      url: `http://localhost:7070/?method=updateById&id=${id}`,
      data,
      callback,
    });
  }

  delete(id, callback) {
    this.request = createRequest({
      method: 'GET',
      url: `http://localhost:7070/?method=deleteById&id=${id}`,
      data: null,
      callback,
    });
  }
}
