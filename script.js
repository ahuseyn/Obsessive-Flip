$(document).ready(function() {
  // *** PAGEPILING configuration ***///
  $("#pagepiling").pagepiling({
    verticalCentered: true,
    sectionsColor: ["#007a7a"],
    navigation: []
  });

  /** An empty service worker! */
  self.addEventListener('fetch', function(event) {
    /** An empty fetch handler! */
  });

  var i;
  var flip = 0,
    timeOut = 0,
    head = 0,
    tail = 0;

  var circle = $("#circle");
  var section = $(".section");

  $("#pagepiling")
    .one("vmousedown", function(e) {
      circle.show();

      circle.css("top", e.clientY - 40);
      circle.css("left", e.clientX - 48);

      timeOut = setInterval(function() {
        flip++;
        document.getElementById("c-text").innerHTML = flip;

        var scal = 1 + flip / 300;
        circle.css("transform", "scale(" + scal + ")");
      }, 15);
    })
    .one("vmouseup", function(e) {
      //*** RIPPLER ANIMATION **//

      if (circle.find(".ink").length == 0) {
        circle.append("<span class='ink'></span>");
      }

      var ink = circle.find(".ink");

      ink.addClass("animate");

      var count = flip;

      setTimeout(function() {
        $(".yes, .no").hide();
        $(".thinking, .t-text").fadeIn("fast");
        $("#flipcount").text(count);
      }, 800);

      clearInterval(timeOut);

      for (i = 1; i <= flip; i++) {
        var random = Math.floor(Math.random() * 2 + 1);

        if (random === 1) {
          head++;
        } else {
          tail++;
        }
      }

      var yes = head;
      var no = tail;

      setTimeout(function() {
        $(".t-text, #circle").fadeOut(1200);
        $("#d-count").text(count);

        if (yes > no) {
          section.append("<div class='yea'></div>");

          setTimeout(function() {
            $(".answeryes, .description, #reload").show();
            $("#times").text(yes);
          }, 2000);
        } else if (yes < no) {
          section.append("<div class='nou'></div>");

          setTimeout(function() {
            $(".answerno, .description, #reload").show();
            $("#times").text(no);
          }, 2000);
        } else {
          section.append("<div class='draw1'></div>");
          section.append("<div class='draw2'></div>");
          setTimeout(function() {
            $(".answer50, #reload").show();
            $("#times").text(no);
          }, 2000);
        }
      }, 4500);

      flip = 0;
      head = 0;
      tail = 0;
    });
});
