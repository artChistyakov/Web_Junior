// $(function () {
//   $(".test").knob({
//     min: 0, // мінімальне значення
//     max: 100, // максимальне значення
//     step: 2, // крок змінення
//     angleOffset: 0, // змiшення кута початKу, default-0
//     angleArc: 360, // змiнення кута всього поля, default = 360
//     readOnly: false, // змiнення елементу вимкнено, default = false
//     rotation: "clockwise", // направлення зростання (сlоckwise/anticlockwise 'thickness': 0.2, // товщина поля з даними, default = 0.3
//     lineCap: "round", // вигляД "waпки", default - butt
//     width: 300,
//     height: 300,
//     displayInput: true, // числове значення, default= true
//     displayPrevious: true, // попередне значення, default = false
//     bgcolor: "red",
//   });
// });

$(function () {
  $(".hour").knob({
    min: 0,
    max: 24,
    step: 1,
    bgColor: "grey",
    fgColor: "yellow",
    width: 300,
    height: 300,
    displayInput: false,
    thickness: 0.3,
  });
});

$(function () {
  $(".minute").knob({
    min: 0,
    max: 60,
    step: 1,
    bgColor: "grey",
    fgColor: "blue",
    width: 200,
    height: 200,
    displayInput: false,
    thickness: 0.45,
  });
});

$(function () {
  $(".seconds").knob({
    min: 0,
    max: 60,
    step: 1,
    bgColor: "grey",
    fgColor: "#1fff13",
    width: 100,
    height: 100,
    displayInput: false,
    thickness: 0.35,
  });
});

function clock() {
  var $s = $(".seconds"),
    $m = $(".minute"),
    $h = $(".hour"),
    d = new Date(),
    s = d.getSeconds(),
    m = d.getMinutes(),
    h = d.getHours();

  $s.val(s).trigger("change");
  $m.val(m).trigger("change");
  $h.val(h).trigger("change");

  setTimeout("clock()", 1000);
}

clock();
