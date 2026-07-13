$(document).ready(function () {

    // maquina de escrever
    const phrases = ["estudante", "desenvolvedor", "fullStack"];

    let i = 0,
        j = 0,
        currentPhrase = "",
        isDeleting = false;

    const typingSpeed = 150,
          pauseBetWeen = 2000;

    const typingElement = $("#typing");

    function type() {

        if (i >= phrases.length) i = 0;

        const fullPhrase = phrases[i];

        if (!isDeleting) {

            currentPhrase = fullPhrase.substring(0, j + 1);
            j++;

            typingElement.text(currentPhrase);

            if (currentPhrase === fullPhrase) {
                isDeleting = true;
                setTimeout(type, pauseBetWeen);
                return;
            }

        } else {

            currentPhrase = fullPhrase.substring(0, j - 1);
            j--;

            typingElement.text(currentPhrase);

            if (currentPhrase === "") {
                isDeleting = false;
                i++;
            }
        }

        setTimeout(type, typingSpeed);
    }

    type();

    $("#sidebarToggle").click(function () {
        $("#sidebar").toggleClass("active");
    });

    $(window).on("scroll", function () {

        let scrollPos = $(document).scrollTop();

        $(".nav-link").each(function () {

            let currlink = $(this);
            let ref = $(currlink.attr("href"));

            if (
                ref.length &&
                ref.position().top <= scrollPos + 100 &&
                ref.position().top + ref.height() > scrollPos
            ) {

                $(".nav-link").removeClass("active");
                currlink.addClass("active");
            }
        });
    });

    function reveal() {

        $(".fade-in").each(function () {

            let windowHeight = $(window).height();
            let elementTop = $(this).offset().top;
            let revealPoint = 100;

            if (elementTop < window.scrollY + windowHeight - revealPoint) {
                $(this).addClass("show");
            }
        });
    }

    $(window).on("scroll", reveal);

    reveal();

    $("a.nav-link").click(function (e) {

        e.preventDefault();

        let target = $(this.hash);

        $("html, body").animate({
            scrollTop: target.offset().top
        }, 600);
    });

    $(".filter-btn").click(function () {

        let filter = $(this).data("filter");

        $(".filter-btn").removeClass("active");
        $(this).addClass("active");

        $(".portfolio-item").each(function () {

            let category = $(this).data("category");

            if (filter === "all" || filter === category) {
                $(this).fadeIn();
            } else {
                $(this).fadeOut();
            }
        });
    });








    const form = $("#contactForm");
    const progress = $("#formProgress");

    const fields = {
        name: $("#name"),
        email: $("#email"),
        message: $("#message") 
    };

    //=========================
    // EMAIL VALIDATION
    //=========================
    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
    
    // ========================
    // FIELD VALIDATION
    // ========================
    function validateField(field) {

        const id = field.attr("id");
        const value = field.val().trim();

        field.removeClass("is-valid is-invalid");

        // NAME
        if (id === "name") {

            if (value.length >= 3) {
                field.addClass("is-valid");
                return true;
            }   else {
                field.addClass("is-invalid");
                return false;
            }
        }
    
        // EMAIL
        if (id === "email") {

            if (isValidEmail(value)) {
                field.addClass("is-valid");
                return true;
            } else {

               field.addClass("is-invalid");
               return false;

           }
        
        }
        
        // MESSAGE
        if (id === "message") {

            if (value.length >= 10 ) {
                field.addClass("is-valid");
                return true;
            }   else {
                field.addClass("is-invalid");
                return false;
            }          

        }
              
    }    

    // =========================
    // PROGRESS BAR
    // =========================
    function updateProgress() {

        let validCount = 0;

        // conta apenas campos válidos
        Object.values(fields).forEach(field => {

            if (field.hasClass("is-valid")) {
                validCount++;
            }

        });

        // total de campos
        const totalFields = Object.keys(fields).length;

        // porcentagem
        const percent = (validCount / totalFields) * 100;

        // largura da barra
        progress.css("width", percent + "%");

        // remove cores antigas
        progress.removeClass(
            "bg-danger bg-warning bg-success"
        );

        // adiciona cores
        if (percent === 0) {

            progress.css("width", "0%");

        } else if (percent <= 33) {

            progress.addClass("bg-danger");

        } else if (percent <= 66) {

            progress.addClass("bg-warning");

        } else {

            progress.addClass("bg-success");

        }

    }

    // =========================
    // REALTIME VALIDATION
    // =========================
    $("input, textarea").on("input", function () {

        validateField($(this));

        updateProgress();

    });

    // ========================
    // SUBMIT
    // ========================
    form.submit(function (e) {

        e.preventDefault();

        let formValid = true;

        Object.values(fields).forEach(field => {
            
            if (!validateField(field)) {
                formValid = false;
            }
        });

        if (!formValid) return;

        // loading
        $("#loader").removeClass("d-none");

        $(".btn-text").text("Enviando...");

        $("#submitBtn").prop("disabled", true);

        // fake send
        setTimeout(() => {

            $("#loader").addClass("d-none");

            $(".btn-text").text("Mensagem enviada!");

            $("#submitBtn")
             .removeClass("btn-primary")
             .addClass("btn-success");

        // ALERT
        $("#formAlert")
            .removeClass("d-none alert-danger")
            .addClass("alert-success show")
            .fadeIn();

        $("#alertMessage") 
            .text("Mensagem enviada com sucesso!");

        // AUTO HIDE
        setTimeout(() => {

            $("#formAlert").fadeOut(500, function () {

                $(this)
                    .removeClass("show")
                    .addClass("d-none")
                    .css("display", "");

            });
        
        }, 5000);
        
        // reset form
        form.trigger("reset");

        $(".form-control")
          .removeClass("is-valid is-invalid");
          
        progress.css("width", "0%");
        
        // reset button
        $("#submitBtn")
          .prop("disabled", false) 
          .removeClass("btn-success") 
          .addClass("btn-primary");

        $(".btn-text") 
          .text("Enviar mensagem");

      }, 2000);
    
            
        
    });


});