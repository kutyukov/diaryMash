require('dotenv').config()

const { Diary } = require('diary-mash')

const diary = new Diary({
	auth_token: process.env.auth_token,
	user_agent: process.env.user_agent
})


/*
	Получение Профиля
*/
async function profile() {
	const response = await diary.getProfile();
	console.log(response)
}

/*
	Получение Расписания
*/
async function shedule() {
	const response = await diary.getShedule()
	console.log(response)
}

/*
	Получение Урока (по ID)
*/
async function lesson(id) {
	const response = await diary.getLesson(id);
	console.log(response)
}

/*
	Получение всех сервисов МЭШ
*/
async function service() {
	const response = await diary.getService()
	console.log(response)
}





/*
	Получение расписания
	Получение уроков
*/

async function Shedule_and_Lesson() {
	var shedule = await diary.getShedule();

	await shedule.activities.map(async (activitie) => {
		if(
			activitie.type === 'LESSON' 
			&& 
			activitie.info !== null
		) {
			const lesson = await diary.getLesson(activitie.lesson.schedule_item_id);
			console.log(lesson)
			
		}
	})
}
