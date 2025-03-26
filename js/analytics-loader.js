
const trackingId = window.location.hostname === "tarode.in" ? "G-3CE3RD3JHC" : "G-E7691057RF";

window.dataLayer = window.dataLayer || [];
function gtag() {
  window.dataLayer.push(arguments);
}

const gtagScript = document.createElement("script");
gtagScript.async = true;
gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${trackingId}`;
document.head.appendChild(gtagScript);

gtagScript.onload = function () {
  gtag("js", new Date());
  gtag("config", trackingId);
};

function trackButtonClick(buttonName, category) {
  gtag("event", "button_click", {
    event_category: category,
    event_label: buttonName,
  });
}


document.addEventListener("click", function(event) {
  let element = event.target;

  if (element.tagName !== "A" && element.tagName !== "BUTTON") {
    element = element.closest("a, button");
  }

  if (element) {
    console.log("Element clicked:", element);

    const elementData = {
      tagName: element.tagName,
      text: element.textContent.trim(),
      id: element.id || null,
      class: element.className || null,
      href: element.tagName === "A" ? element.getAttribute("href") : null,
      time: new Date().toISOString()
    };

    trackButtonClick(elementData.text, window.location.pathname);
  }
});
