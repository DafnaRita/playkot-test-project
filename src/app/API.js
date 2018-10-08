const axios = require('axios');

const token = '18476dc1c4fb11f4eebd2c4aaacdb3c14b3cd1e945dd8bc8456b73c8d4ef33cf';

class API {
  constructor({ url }) {
    this.url = url;
    this.endpoints = {};
  }

  createEntity(entity) {
    this.endpoints[entity.name] = this.createBasicEndpoints(entity);
  }

  createBasicEndpoints({ name }) {
    const endpoint = {};

    const resourceURL = `${this.url}/${name}`;

    endpoint.getByOffset = ({ offset }) => {
      return axios.get(`${resourceURL}/?token=${token}&offset=${offset}`);
    };

    return endpoint;
  }
}

export default API;
