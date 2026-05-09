// let startTime;
// let endTime;

// $(document).ready(function () {
//   $("#check").on("click", function () {
//     startTime = $.now();
//     exam(3);
//   });
// });

// function exam(arg) {
//   let a = Math.floor(Math.random() * 100);
//   let b = Math.floor(Math.random() * 100);

//   let answer = a + b;

//   alertify.prompt(`Example №${4 - arg}:${a} + ${b}`, function (e, str) {
//     if (e) {
//       if (answer == parseInt(str)) {
//         alertify.success("Correct " + str);
//         arg--;
//       } else {
//         alertify.error("Incorrect " + str);
//       }

//       if (arg == 0) {
//         endTime = $.now();
//         alertify.alert(`You spent ${(endTime - startTime) / 1000}  seconds`);
//         return 0;
//       } else {
//         exam(arg);
//       }
//     } else {
//       return 0;
//     }
//   });
// }

// let startTime;
// let endTime;
// let Name;
// let playerTimes = [];

// $(document).ready(function () {
//   $("#check").on("click", function () {
//     startTime = $.now();
//     exam(3);
//   });
// });

// function exam(arg) {
//   let a = Math.floor(Math.random() * 100);
//   let b = Math.floor(Math.random() * 100);

//   let answer = a + b;

//   alertify.prompt(`Example №${4 - arg}:${a} + ${b}`, function (e, str) {
//     if (e) {
//       if (answer == parseInt(str)) {
//         alertify.success("Correct " + str);
//         arg--;
//       } else {
//         alertify.error("Incorrect " + str);
//       }

//       if (arg == 0) {
//         endTime = $.now();
//         Name = alertify.prompt("Введите ваше имя:", function (e, str) {
//           if (e) {
//             let name = str;
//           } else {
//           }
//         });
//         playerTimes.push((endTime - startTime) / 1000);
//         updatePlayerRating();
//         return 0;
//       } else {
//         exam(arg);
//       }
//     } else {
//       return 0;
//     }
//   });
// }

// function updatePlayerRating() {
//   let playerList = $("#player-list");
//   playerList.empty();
//   playerTimes.forEach(function (time, index) {
//     let playerItem = $("<li>", {
//       class: "place",
//       text: `Player ${index + 1}: ${time.toFixed(2)} seconds`,
//     });
//     playerList.append(playerItem);
//   });
// }

let startTime;
let endTime;
let playerName;
let playerData = [];

$(document).ready(function () {
  $("#check").on("click", function () {
    startTime = $.now();
    exam(3);
  });
});

function exam(arg) {
  let a = Math.floor(Math.random() * 100);
  let b = Math.floor(Math.random() * 100);

  let answer = a + b;

  alertify.prompt(`Example №${4 - arg}: ${a} + ${b}`, function (e, str) {
    if (e) {
      if (answer == parseInt(str)) {
        alertify.success("Correct " + str);
        arg--;
      } else {
        alertify.error("Incorrect " + str);
      }

      if (arg == 0) {
        endTime = $.now();
        alertify.prompt("Введите ваше имя:", function (e, str) {
          if (e) {
            playerName = str;
            let playerTime = (endTime - startTime) / 1000;
            playerData.push({ name: playerName, time: playerTime });
            updatePlayerRating();
          }
        });
        return 0;
      } else {
        exam(arg);
      }
    } else {
      return 0;
    }
  });
}

function updatePlayerRating() {
  let playerList = $("#player-list");
  playerList.empty();
  playerData.sort((a, b) => a.time - b.time);
  playerData.forEach(function (player, index) {
    let playerItem = $("<li>", {
      class: "place",
      text: `${player.name} - ${player.time.toFixed(2)} seconds`,
    });
    playerList.append(playerItem);
  });
}
