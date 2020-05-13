const axios = require('axios')

const personsBaseUrl = 'http://localhost:3001/persons';

exports.getAll = () => {
	const request = axios.get(personsBaseUrl);
	return request.then(response => response.data);
};

exports.create = newPerson => {
	const request = axios.post(personsBaseUrl, newPerson);
	return request.then(response => response.data);
};

exports.remove = id => {
	const request = axios.delete(`${personsBaseUrl}/${id}`);
	return request.then(response => response.status);
};

exports.update = newPerson => {
	const request = axios.put(`${personsBaseUrl}/${newPerson.id}`, newPerson);
	return request.then(response => response.data);
};