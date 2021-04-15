@@include('../../node_modules/jquery-validation/dist/jquery.validate.min.js');

//SWIPER SLIDER
let { clientWidth } = document.body;
let swiperSlider;
const sliderInit = () =>{
    swiperSlider = new Swiper('.slider', {
        slidesPerView: 3,
        centeredSlides: true,
        slidesPerGroupSkip: true,
        autoplay: {
            delay: 7000,
            disableOnInteraction: false,
        },
        breakpoints: {
            320: {
                slidesPerView: 1,
                width: 320
            },
            769: {
                slidesPerView: 2,
            },
            992: {
                slidesPerView: 3,
            }
        }
    });
};

sliderInit();

const resizeHandlerSlider = () => {
    if (clientWidth !== document.body.clientWidth) {
        clientWidth = document.body.clientWidth;

        if (swiperSlider) {
            swiperSlider.destroy();
        }

        sliderInit();
    }
};
window.addEventListener('resize', resizeHandlerSlider);

//======================================================================================================================

//======================================================================================================================

//ICON FOR HEADER MENU
const iconMenu = document.querySelector('.menu__icon');

if (iconMenu) {
    const menuBody = document.querySelector('.top-header__row')
    iconMenu.addEventListener('click', function (e) {
        document.body.classList.toggle('_lock');
        iconMenu.classList.toggle('_active');
        menuBody.classList.toggle('_active');
    });
}


//=====================================================================================================================

//======================================================================================================================

// Прокрутка


const menuLinks = document.querySelectorAll('.menu__link[data-goto]')
if (menuLinks.length > 0) {
    menuLinks.forEach(menuLink => {
        menuLink.addEventListener('click', onMenuLinkClick);
    })
    function onMenuLinkClick(e) {
        const menuLink = e.target;
        if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
            const gotoBlock = document.querySelector(menuLink.dataset.goto);
            const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('.top-header').offsetHeight;

            window.scrollTo({
                top: gotoBlockValue,
                behavior: "smooth"
            });
            e.preventDefault();
        }
    }
}


//======================================================================================================================

//======================================================================================================================

// ACCORDION

const accordionItemHeaders = document.querySelectorAll(".accordion-services__label");

accordionItemHeaders.forEach(accordionItemHeader => {
    accordionItemHeader.addEventListener("click", event => {

        // Uncomment in case you only want to allow for the display of only one collapsed item at a time!

        // const currentlyActiveAccordionItemHeader = document.querySelector(".accordion-item-header.active");
        // if(currentlyActiveAccordionItemHeader && currentlyActiveAccordionItemHeader!==accordionItemHeader) {
        //   currentlyActiveAccordionItemHeader.classList.toggle("active");
        //   currentlyActiveAccordionItemHeader.nextElementSibling.style.maxHeight = 0;
        // }
        accordionItemHeader.classList.toggle("_active");
        accordionItemHeader.nextElementSibling.classList.toggle("_show");
    });
});


//======================================================================================================================

//======================================================================================================================

// VERTICAL CAROUSEL 


document.querySelector(".carousel").addEventListener("click", function (e) {
    var parent = document.querySelector(".carousel__wrapper"),
        first = parent.querySelector(".carousel__item"),
        last = parent.querySelector(".carousel__item:last-child");
    if (e.target.classList.contains("carousel__arrow-up")) {
        parent.insertBefore(first, last.nextElementSibling);
    }
    if (e.target.classList.contains("carousel__arrow-down")) {
        parent.insertBefore(last, first);
    }
});


//======================================================================================================================

//======================================================================================================================

//VALIDATE FORM
$(".form__contact").validate({
    rules: {
        email: {
            required: true,
            email: true
        },
        name: {
            required: true,
            minlength: 2 
        },
        phone: {
            required: true,
            number: true
        }
    },
    messages: {
        email: {
            required: 'Поле e-mail обязательно для заполнения'
        }, 
        name: {
            required: 'Поле Имя обязательно для заполнения',
            minlength: jQuery.validator.format('Минимум символов: {0} для заполнения')
        },
        phone: {
            required: 'Поле Телефон обязательно для заполнения',
            number: 'Пожалуйста введите номер'
        }
    },
    submitHandler: function() {
        alert('Форма отправлена!')
    }
});