// require('dotenv').config();

const axios = require('axios');
const utils = require('./utils/index.js')


class DiaryMos {
	constructor(options) {
		this.web = {
			host: 'https://dnevnik.mos.ru',
			api: 'https://dnevnik.mos.ru/mobile/api'
		}

		this.header = {
			'auth-token': options.auth_token || "",
			'user-agent': options.user_agent || ""
		}
	}


	async sendRequest(url, params) {
		if(!url) url = this.host; if(!params) params = {};
		try {
			var response = await axios.get(url, {
				headers: this.header,
				params: params
			})

			return response.data;
		} catch(e) {
			console.error(this.sendRequest.name, e)
		}
		// return response.data;
	}

	async getProfile() {
		var data = await this.sendRequest(`${this.web.api}/profile`)

		return data.profile;
	}

	async getShedule() {
		const profile = await this.getProfile();
		const data = await this.sendRequest(`${this.web.api}/schedule?student_id=${profile.id}&date=${utils.getDateString()}`)

		return data;
	}

	async getLesson(id) {
		if(!id) return console.error(this.getLesson.name, ": none param 'id'");

		const profile = await this.getProfile();
		const data = await this.sendRequest(`${this.web.api}/lesson_schedule_items/${+id}?student_id=${profile.id}&type=OO`)

		return data;
	}

	async getNotifications() {
		const profile = await this.getProfile();
		const data = await this.sendRequest(`${this.web.api}/notifications/search?student_id=${profile.id}`)

		return data;
	}

	async getService() {
		const data = await this.sendRequest(`https://school.mos.ru/v1/user/fullinfo/143944`);
		return data;
	}

}


exports.Diary = DiaryMos;