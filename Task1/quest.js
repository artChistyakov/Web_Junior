// Масив, у якому зберігаються правильні відповіді до всіх ребусів за порядком
let answer = [
	"яблоко", "груша", "город", "школа", "сайт", "браузер", 
	"плагин", "цвет", "стиль", "язык", "узор", "сорока"
];

// Масив, куди ми будемо записувати номери ребусів, які користувач уже розв'язав (щоб не повторювати їх)
let was = [];

// Змінна для відстеження кількості правильних відповідей (потрібно 5 для перемоги)
let progress = 0;

// Генерація випадкового цілого числа від 1 до 12 для вибору першого ребуса
let num = Math.floor(1 + Math.random() * 12);


// ПОЧАТОК НОВОГО КОДУ 1/4 (JS СТРУКТУРИ ДЛЯ ДРУГОГО КВЕСТУ)

let timeStorage = localStorage;
let timeSound;

// ТУТ БУВ БАГ: Відсутність глобальної змінної для збереження ідентифікатора інтервалу.
// Через це було неможливо зупинити фонову роботу таймера після проходження квесту.
// ВИПРАВЛЕННЯ: Додано глобальну змінну timerInterval для керування роботою setInterval.
let timerInterval; 

if (timeStorage.getItem("time") != null) {
	timeSound = parseInt(timeStorage.getItem("time"));
} else {
	timeSound = 300;
	timeStorage.setItem("time", timeSound);
}

let answerSound = [
	["гаррі поттер", "гарри поттер","harry potter"],
	["губка боб","sponge bob", "spongebob", "губка боб квадратные штаны", "губка боб квадратні штани"],
	["пірати", "пірати карибского моря", "капитан джек горобець", "пираты","пираты карибского моря", "капитан джек воробей", "pirates of the caribbean"],
	["сімпсони", "симпсоны","simpsons", "the simpsons"],
	["зоряні війни", "звездные войны","star wars", "имперский марш", "імперский марш"],
	["lion king","the lion king", "король лев", "симба", "сімба"],
	["frozen","холодное сердце", "холодне серце", "эльза", "ельза"],
	["shrek","шрек"],
	["shrek","шрек"],
	["rocky","рокки", "роккі"],
	["индиана джонс","indiana jones"],
	["один вдома", "один дома","home alone"],
	["термінатор", "терминатор","terminator"],
	["назад у майбутнє", "назад в будущее", "back to the future", "марти макфлай"],
	["мисливці за привидами", "охотники за привидениями","ghost busters"]
];

let wasSound = [];
let progressSound = 0;
let numSound = Math.floor(1 + Math.random() * 15);


// КІНЕЦЬ НОВОГО КОДУ 1/4 (JS СТРУКТУРИ ДЛЯ ДРУГОГО КВЕСТУ)

$(document).ready(function () {
	// Ініціалізація плагіна jQuery Knob для створення кругового індикатора прогресу
	$(".progress").knob({
		'min': 0, 
		'max': 5, // Максимальне значення — 5 вгаданих слів
		'angleOffset': -60, // Поворот кола для красивого вигляду
		'angleArc': 120, // Кут дуги індикатора
		'readOnly': true, // Користувач не може крутити його мишкою
		'width' : '100%',
		'thickness': 0.2,
		'lineCap': 'round',
		'displayInput' : false, // Не показувати цифри всередині кола
		'bgColor' : '#cde8ea',
		'fgColor' : '#991525' // Колір лінії прогресу
	});
	
	// При завантаженні ховаємо блок з правилами гри
	$("#rules").slideUp();

	// Додаємо можливість розгортати/згортати правила при кліку на кнопку
	$(".slideRules").click(function () {
		$("#rules").slideToggle();
	});

	// Викликаємо функцію для відображення першої картинки ребуса
	startRebus(num);

	// Обробник натискання на кнопку "Перевірити"
	$("#btnTask1").click(function() {
		// Отримуємо значення з інпуту, переводимо в нижній регістр і порівнюємо з правильною відповіддю з масиву
		// Використовуємо num-1, бо індекси в масиві починаються з 0, а наші картинки з 1
		if ($("#inputTask1").val().toLowerCase() == `${answer[num-1]}` ) {
			
			alertify.success("Right answer!"); // Показуємо успішне повідомлення плагіном Alertify
			$("#inputTask1").val(""); // Очищуємо поле вводу для наступного слова
			progress++; // Збільшуємо лічильник успіхів
			
			// Оновлюємо значення в круговому індикаторі та примусово викликаємо подію change для перемальовування
			$(".progress").val(progress).trigger('change');
			
			was.push(num); // Додаємо номер поточного ребуса в масив "використаних"

			// Перевіряємо, чи гра триває (менше 5 перемог)
			if (progress < 5) {
				// Цикл do-while: генеруємо новий номер ребуса, поки не знайдемо той, якого ще НЕ було в масиві 'was'
				do {
					num = Math.floor(1 + Math.random() * 12);
				} while (was.includes(num));
				
				startRebus(num); // Показуємо новий знайдений ребус
			} else {


				// ПОЧАТОК НОВОГО КОДУ 2/4 (ПЕРЕХІД ДО ДРУГОГО КВЕСТУ)


				// Ховаємо секцію першого квесту
				$("#task1Section").css({
					'display' : 'none'
				});
				// Змінюємо фон сторінки під колір другого квесту
				$("body").css({
					'background': '#e9e6f0'
				});
				// Відображаємо секцію другого квесту
				$("#task2Section").css({
					'display' : 'block'
				});
				// КІНЕЦЬ НОВОГО КОДУ 2/4 (ПЕРЕХІД ДО ДРУГОГО КВЕСТУ)
			}
		} else {
			// Якщо відповідь неправильна — показуємо помилку через Alertify
			alertify.error("Wrong answer. Try again!");
		}
	});

	// ПОЧАТОК НОВОГО КОДУ 3/4 (ІНІЦІАЛІЗАЦІЯ ТА ПОДІЇ ДЛЯ ДРУГОГО КВЕСТУ)
	// Ініціалізація індикаторів для Music Quiz
	$(".progressSound").knob({
		'min': 0, 
		'max': 10,
		'angleOffset': -60,
		'angleArc': 120,
		'readOnly': true,
		'width' : '100%',
		'thickness': 0.2,
		'lineCap': 'round',
		'displayInput' : false,
		'bgColor' : '#cecae3',
		'fgColor' : '#3b1b5b'
	});

	$(".time").knob({
		'min': 0, 
		'max': 300,
		'angleOffset': 0,
		'angleArc': 360,
		'readOnly': true,
		'width' : '100%',
		'thickness': 0.2,
		'lineCap': 'butt',
		'displayInput' : false,
		'bgColor' : '#cecae3',
		'fgColor' : '#3b1b5b'
	});

	// Клік на правила другого квесту
	$(".slideRulesSound").click(function () {
		$("#rulesSound").slideToggle();
	});

	// Старт другого квесту
	$("#startSound").click(function () {
		$("#startSound").css('display', 'none');
		$(".sound, .taskProgressSound, .timeProgress").css('display', 'block');
		$(".answerSound").css('display', 'flex');
		
		// На випадок тривалого проходження першої частини, перезаписуємо час для другого квесту на 300 секунд
		timeSound = 300;
		localStorage.setItem("time", timeSound);
		
		startSound(numSound);
		startTimeSound();
	});

	// Обробник відповідей другого квесту
	$("#btnTask2").click(function() {
		if (answerSound[numSound-1].indexOf($("#inputTask2").val().toLowerCase()) != -1) {
			alertify.success("Right answer!");
			$("#inputTask2").val("");
			progressSound++;
			$(".progressSound").val(progressSound).trigger('change');
			wasSound.push(numSound);

			if (progressSound < 10) {
				do {
					numSound = Math.floor(1 + Math.random() * 15);
				} while (wasSound.includes(numSound));
				
				startSound(numSound);
			} else {
				// Квест завершено, ховаємо елементи гри та показуємо перехід до Task 3
                
				// ТУТ БУВ БАГ: Таймер продовжував працювати у фоні навіть після успішного завершення Music Quiz.
				// Якщо користувач не натискав кнопку переходу миттєво, таймер усе одно доходив до 0 і перезавантажував сторінку.
				// ВИПРАВЛЕННЯ: Додано примусове очищення інтервалу за допомогою clearInterval(timerInterval).
				clearInterval(timerInterval); 
                
				$(".sound, #btnTask2, #inputTask2, .timeProgress, .taskProgressSound").css({
					'display' : 'none'
				});
				$("#nextTask").css({
					'display' : 'flex',
					'background' : '#3b1b5b' // Змінюємо колір кнопки під колір другого квесту
				});
				localStorage.removeItem("time");
			}
		} else {
			alertify.error("Wrong answer. Try again!");
		}
	});
	// КІНЕЦЬ НОВОГО КОДУ 3/4 (ІНІЦІАЛІЗАЦІЯ ТА ПОДІЇ ДЛЯ ДРУГОГО КВЕСТУ)
});

// Допоміжна функція: змінює атрибут src у картинки, щоб показати ребус під потрібним номером
function startRebus (arg) {
	$("#picture").attr("src", `rebuses/${arg}.jpg`);
}


// ПОЧАТОК НОВОГО КОДУ 4/4 (ФУНКЦІЇ ДЛЯ ДРУГОГО КВЕСТУ)
function startSound (arg) {
	$("#melody").attr("src", `sound/${arg}.mp3`);
}

function startTimeSound () {
	// ТУТ БУВ БАГ: Створення інтервалу без збереження його посилання.
	// Через це інтервал неможливо було зупинити з інших частин програми.
	// ВИПРАВЛЕННЯ: Результат setInterval збережено у раніше створену змінну timerInterval.
	timerInterval = setInterval(function () {
		timeSound = parseInt(localStorage.getItem("time")) - 1;
		$(".time").val(timeSound).trigger('change');
		if (timeSound <= 0) {
			// ТУТ БУВ БАГ: Відсутність зупинки інтервалу у разі вичерпання ліміту часу.
			// Таймер продовжував рахувати час у мінусові значення.
			// ВИПРАВЛЕННЯ: Додано clearInterval(timerInterval) перед перезавантаженням.
			clearInterval(timerInterval); 
            
			alertify.error("Time is out!");
			// У разі закінчення часу перезавантажуємо поточну сторінку, щоб користувач міг почати квест знову
			setTimeout(() => window.location.reload(), 2000);
			localStorage.removeItem("time");
		} else if (timeSound > 0) {
			localStorage.setItem("time", timeSound);
		}
	}, 1000);
}
// КІНЕЦЬ НОВОГО КОДУ 4/4 (ФУНКЦІЇ ДЛЯ ДРУГОГО КВЕСТУ)