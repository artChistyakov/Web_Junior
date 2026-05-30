// $(document).ready(function () {
	
// 	//ScrollMagic controller init
// 	let controller = new ScrollMagic.Controller();


// 	let first_scene = new ScrollMagic.Scene({
// 		triggerElement : ".project1"
// 	})
// 	.setClassToggle(".project1", 'fade-in')
// 	.addTo(controller);

// 	let second_scene = new ScrollMagic.Scene({
// 		triggerElement : ".project2"
// 	})
// 	.setClassToggle(".project2", 'fade-in')
// 	.addTo(controller);

// 	let third_scene = new ScrollMagic.Scene({
// 		triggerElement : ".project3"
// 	})
// 	.setClassToggle(".project3", 'fade-in')
// 	.addTo(controller);

// 	let fourth_scene = new ScrollMagic.Scene({
// 		triggerElement : ".project4"
// 	})
// 	.setClassToggle(".project4", 'fade-in')
// 	.addTo(controller);
// });
$(document).ready(function () {
    
    // 1. Ініціалізація Контролера. 
    // Це "мозок" ScrollMagic, який стежить за положенням коліщатка миші.
    let controller = new ScrollMagic.Controller();

    // 2. Оптимізація: проходимо по кожному елементу з класом .project
    // Це дозволяє не писати окремий код для кожної сцени (Slide 14)
    $('.project').each(function () {
        
        // Створюємо нову сцену для поточного елемента (this)
        let scene = new ScrollMagic.Scene({
            // triggerElement - це об'єкт, який активує анімацію, коли доходить до "гачка"
            triggerElement: this, 
            
            // triggerHook - визначає, де на екрані знаходиться лінія активації (Slide 16)
            // 0 - верх екрану, 0.5 - центр, 1 - низ.
            // Ставимо 0.8, щоб анімація починалася, коли блок ледь з'явився знизу.
            triggerHook: 0.8, 
            
            // duration - тривалість сцени в пікселях (Slide 15).
            // Якщо додати її, то коли ми проскролимо блок, анімація "відкотиться" назад.
            // Для простої появи (fade-in) її зазвичай не ставлять, але тут додамо для наочності.
            duration: "50%" 
        })
        // Вказуємо, який клас додавати/видаляти (Slide 11)
        .setClassToggle(this, 'fade-in') 
        
        // ДОДАЄМО ІНДИКАТОРИ (Slide 12-13)
        // Це спеціальний плагін для розробника, щоб бачити лінії активації.
        .addIndicators({
            name: "Блок проекту", // Назва, яка буде відображатися біля ліній
            colorStart: "green",  // Колір лінії початку
            colorEnd: "red",      // Колір лінії кінця (з'являється, якщо є duration)
            colorTrigger: "black" // Колір лінії "гачка" на екрані
        })
        
        // Обов'язково додаємо сцену до контролера, інакше вона не спрацює
        .addTo(controller);
    });
});