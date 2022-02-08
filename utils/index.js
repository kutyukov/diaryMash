exports.getDateString = (add_day) => {
	add_day = Number(add_day);
	if(!add_day) {
		add_day = 0;
	}

	const date = new Date();

	var day = date.getUTCDate() + add_day,
		month = date.getUTCMonth() + 1,
		year = date.getUTCFullYear()
	const dateString = `${year}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day}`
	return dateString;
}

