export const close = () => { 
	mongoose.disconnect()
	.then(() => {
	  console.log('Соединение закрыто успешно');
	})
	.catch((err) => {
	  console.error('Ошибка при разрыве соединения:', err);
	});
}
export const open = () => {
	mongoose.connect(process.env.MONGO_URI)
	.then(() => {
	  console.log('Подключено');
	})
	.catch((err) => {
	  console.error('Ошибка при подключении соединения:', err);
	});
}