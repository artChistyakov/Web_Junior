//стилі не забудь додати 

$(document).ready(function () {
	
	// 1. Ініціалізація головного контролера ScrollMagic.
	// Він буде керувати всіма сценами на цій сторінці.
	let controller = new ScrollMagic.Controller();

	// 2. ПЕРША СЦЕНА: Фіксація Хедера (Slide 18)
	let pinHeaderScene = new ScrollMagic.Scene({
		triggerElement: '.header', // Починаємо, коли бачимо хедер
		triggerHook: 0,            // Гачок на самому верху екрану (0)
		duration: '35%'            // Хедер буде "приклеєним" протягом 35% висоти екрану
	})
	// .setPin - головна функція. Вона "заморожує" елемент на місці.
	// pushFollowers: false означає, що наступні блоки будуть заїжджати ПОВЕРХ хедера,
	// а не штовхати його вниз (Slide 18).
	.setPin(".header", {pushFollowers: false})
	.addTo(controller); // Додаємо сцену в контролер

	// 3. ДРУГА СЦЕНА: Додаткова фіксація для ефекту (Slide 18)
	// Вона спрацьовує пізніше, коли перший проект (.project1) доходить до 30% висоти екрану.
	let pinHeaderScene2 = new ScrollMagic.Scene({
		triggerElement: '.project1',
		triggerHook: 0.3, 
	})
	.setPin(".header", {pushFollowers: false})
	.addTo(controller);

	// 4. ЦИКЛ ДЛЯ ПРОЕКТІВ (Slide 14): Ефект "Стеку" або "Карт"
	// Ми проходимо по кожному блоку з класом .project
	$('.project').each(function () {
		
		let secondPinScene = new ScrollMagic.Scene({
			triggerElement : this, // Тригер — сам цей блок
			triggerHook: 0,        // Фіксуємо, коли верх блоку торкається верху екрану
			duration: "200%"       // Блок буде триматися дуже довго (2 висоти екрану)
		})
		// Кожен блок фіксується, а оскільки pushFollowers: false, 
		// наступний блок буде насуватися на нього зверху.
		.setPin(this, {pushFollowers: false})
		// Для наочності під час розробки можна додати .addIndicators() сюди
		.addTo(controller);
	});
});