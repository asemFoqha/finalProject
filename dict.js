$(document).ready(() => {
  $("form").submit((e) => {
    e.preventDefault();
    $(".loader").css("display", "inline");
    $.ajax({
      url: `http://localhost:3000/api/test?word=${$("#word").val()}`,
      type: "GET",
      success: success,
      error: error,
      complete: always,
    });
  });
});

const success = (data) => {
  if (!data.length) {
    return $("#meaning-list").html("Not Found");
  }

  const li = data.map(
    (item) => `<li>(${item.wordtype}) :: ${item.definition}</li>`
  );
  $("#meaning-list").html(li);
  $(".count").html(
    `${data.length} definition for the word "${$("#word").val()}"`
  );
  $(".count").css("display", "block");
};

const error = () => {
  $("#meaning-list").html("Not Found");
};

const always = () => {
  $(".loader").css("display", "none");
};
