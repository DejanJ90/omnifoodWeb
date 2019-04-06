'use strict'

/****** Global var ******/
var lastScrollPosition = 0;
var invokeCount = 0;

/****** End of global var ******/

/****** Creating sticky nav ******/
var createStickyNav = function (element) {
    var currentScrollPosition, sectionFeaturesOffset;

    currentScrollPosition = window.scrollY;
    sectionFeaturesOffset = sectionFeatures[0].offsetTop;

    if (currentScrollPosition > sectionFeaturesOffset) {
        element.className = "sticky";

    } else {
        element.classList.remove("sticky");

    }
};
/****** End of creating sticky nav ******/

/****** Mobile nab button ******/
var mobNavController = function (element, element2) {
    var displayValue, style, animation, index;

    index = 0;
    element.style.transition
    style = window.getComputedStyle(element);
    displayValue = style.getPropertyValue('display');


    if (displayValue === "none") {
        element.style.display = "inline";
        element2.firstChild.className = "ion-close-round"
        animation = setInterval(frame, 50);

    } else {
        element2.firstChild.className = "ion-navicon-round";
        index = element.children.length
        animation = setInterval(frame, 30);
    };


    function frame() {

        if (displayValue === "none") {
            if (index === element.children.length) {
                clearInterval(animation)
            } else {
                // element.children[index].style.transition = "all 0.2s"
                element.children[index].style.display = "block";
                index++
            };

        } else {
            if (index === 0) {
                clearInterval(animation);
                element.style.display = "none";
            } else {
                // element.children[index].style.transition = "all 0.2s"
                element.children[index - 1].style.display = "none";
                index--;
            };
        };

    };
};

/****** End of mobile nab button ******/

/****** Scrolling to selected section ******/
var scrollToSection = function (section) {
    var pos, topPos, animate;

    pos = window.scrollY;
    topPos = section[0].offsetTop;
    animate = setInterval(frame, 2);

    function frame() {
        if (pos > topPos) {
            pos -= 20;
            window.scrollTo(0, pos);

            if (pos < topPos) {
                clearInterval(animate);
                window.scrollTo(0, pos);
            };

        } else {
            pos += 20;
            window.scrollTo(0, pos);

            if (pos > topPos) {
                clearInterval(animate);
                window.scrollTo(0, pos);
            };
        }
    };
};

/****** End of creating scrolling to selected section ******/

/****** Fade in features details ******/
var fadeIn = function (element, position) {
    var animate, index, increase, offsetTop;

    index = element[0].style.opacity;
    increase = 0;
    offsetTop = position[0].offsetTop - (position[0].offsetHeight / 2);

    if (window.scrollY > offsetTop) {
        animate = setInterval(frame, 100);
    };

    function frame() {
        if (index === "1") {
            clearInterval(animate);
        } else {
            increase += 0.2;
            element[0].style.opacity = increase;
            index = element[0].style.opacity;
        };
    };

};

/****** End of fade in features details******/
var scrollIn = function (element) {
    element.style.top = 0;
};

/****** End of scroll in features details******/

/****** Pulse premium card in section plans ******/

var pulse = function (element, position) {
    var animate, index, style, transition;

    index = 0;
    style = window.getComputedStyle(element);
    transition = style.getPropertyValue('transform');
    frame();
    animate = setInterval(frame, 1001);

    function frame() {
        if (index >= 1) {
            element.style.transform = "scale(1)";
            clearInterval(animate);
        } else {
            element.style.transform = "scale(1.05)";
            index++;
        };
    };
};

/****** End of pulse premium card in section plans ******/

/****** Selectors ******/
var sectionPlans = document.getElementsByClassName("js--section-plans");
var sectionFeatures = document.getElementsByClassName("js--section-features");
var sectionSteps = document.getElementsByClassName("js--section-steps");
var sectionCities = document.getElementsByClassName("js--section-cities");
var featuresDetails = document.getElementsByClassName("js--features-details");
var citiesDetails = document.getElementsByClassName("js--cities-details");
var appScreenImg = document.querySelector(".js--app-screen");
var premiumBox = document.querySelector(".js--plan-box-premium");
var nav = document.querySelector("nav");
var mainNav = document.querySelector(".main-nav");
var btn = document.querySelectorAll(".js--btn");
var mobileNavBtn = document.querySelector(".mobile-nav-icon")

/****** End of selectors ******/

/****** Handlers of selectors ******/
btn.forEach(function (element) {

    element.addEventListener('click', function (e) {

        if (e.target.classList[2] === 'js--scroll-to-plans') {
            scrollToSection(sectionPlans);
        } else if (e.target.classList[2] === 'js--scroll-to-features') {
            scrollToSection(sectionFeatures);
        } else if (e.target.classList[0] === 'js--scroll-to-features') {
            scrollToSection(sectionFeatures);
        } else if (e.target.classList[0] === 'js--scroll-to-steps') {
            scrollToSection(sectionSteps);
            scrollIn(appScreenImg, sectionSteps);
        } else if (e.target.classList[0] === 'js--scroll-to-cities') {
            scrollToSection(sectionCities);
            scrollIn(appScreenImg, sectionSteps);
        } else if (e.target.classList[0] === 'js--scroll-to-plans') {
            scrollToSection(sectionPlans);
        } else if (e.target.parentElement.classList[0] === 'mobile-nav-icon') {
            mobNavController(mainNav, mobileNavBtn);
        };
    });
});

window.addEventListener("scroll", function () {
    createStickyNav(nav);

    if (window.scrollY > sectionFeatures[0].offsetTop) {
        if (invokeCount < 1) {
            fadeIn(featuresDetails, sectionFeatures);
            invokeCount++
        };
    };

    if (window.scrollY > sectionSteps[0].offsetTop - (sectionSteps[0].offsetHeight / 2)) {
        if (invokeCount < 2) {
            scrollIn(appScreenImg, sectionSteps);
            invokeCount++
        };
    };

    /* 100 is one scroll*/
    if (window.scrollY > sectionCities[0].offsetTop - 100) {
        if (invokeCount < 3) {
            fadeIn(citiesDetails, sectionCities);
            invokeCount++
        };
    };
    /* 100 is one scroll*/

    if (window.scrollY > sectionPlans[0].offsetTop - 100) {
        if (invokeCount < 4) {
            pulse(premiumBox, sectionPlans);
            invokeCount++
        };
    };
});

/****** End of handlers ******/