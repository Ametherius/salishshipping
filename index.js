import { testimonials } from "./testimonials.js";
import { faq } from "./faq.js";
var date = new Date();
let year = date.getFullYear();
var birthYear = 1989;

var age = year - birthYear;

document.getElementById("age").innerHTML = age;
document.getElementById("year").innerHTML = year;

// English form submission
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".contact-form");

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      e.stopPropagation();

      const formData = {
        senderOrReceiver: form.querySelector(
          'input[name="senderOrReceiver"]:checked'
        ).value,
        senderName: form.senderName.value,
        pickupAddress: form.pickupAddress.value,
        pickupInstructions: form.pickupInstructions.value,
        senderEmail: form.senderEmail.value,
        dimensions: form.dimensions.value,
        weight: form.weight.value,
        senderPhone: form.senderPhone.value,
        recipientName: form.recipientName.value,
        deliveryAddress: form.deliveryAddress.value,
        deliveryInstructions: form.deliveryInstructions.value,
        cadValue: form.cadvalue.value,
        recipientPhone: form.recipientPhone.value,
        discountCode: form.discountCode.value,
      };
      console.log("Form Data:", formData);

      fetch("/api/submitQuote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Response received", data);
          const modalEl = document.getElementById("modalEl");
          const modalOverlay = document.getElementById("modalOverlay");
          const modalMessage = document.getElementById("modalMessage");
          const modalTitle = document.getElementById("modalTitle");
          const closeModal = document.getElementById("closeModal");

          if (
            modalEl &&
            modalOverlay &&
            modalMessage &&
            modalTitle &&
            closeModal
          ) {
            modalEl.classList.remove("hidden");
            modalOverlay.classList.remove("hidden");
            modalMessage.innerHTML =
              data.message ||
              "Your quote has been submitted successfully. We will get back to you shortly.";
            modalTitle.innerHTML = "Quote Submitted";
            closeModal.addEventListener("click", () => {
              modalEl.classList.add("hidden");
              modalOverlay.classList.add("hidden");
            });
            if (data.success) {
              form.reset();
            }
          } else {
            console.error("Modal elements not found");
          }
        })
        .catch((error) => {
          console.error("Error submitting quote:", error);
          const modalEl = document.getElementById("modalEl");
          const modalOverlay = document.getElementById("modalOverlay");
          const modalMessage = document.getElementById("modalMessage");
          const modalTitle = document.getElementById("modalTitle");
          const closeModal = document.getElementById("closeModal");
          if (
            modalEl &&
            modalOverlay &&
            modalMessage &&
            modalTitle &&
            closeModal
          ) {
            modalEl.classList.remove("hidden");
            modalOverlay.classList.remove("hidden");
            modalMessage.innerHTML =
              "An error occurred while submitting your quote. Please try again.";
            modalTitle.innerHTML = "Error";
            closeModal.addEventListener("click", () => {
              modalEl.classList.add("hidden");
              modalOverlay.classList.add("hidden");
            });
          } else {
            console.error("Modal elements not found");
          }
        });
    });
  }
});

// French form submission
document.addEventListener("DOMContentLoaded", () => {
  const frForm = document.getElementById("quote-form-fr");
  if (frForm) {
    console.log("French form found, attaching event listener");
    frForm.addEventListener("submit", (e) => {
      try {
        e.preventDefault();
        e.stopPropagation();
        console.log("Form submission prevented");

        const frFormData = {
          name: frForm.querySelector('[name="frSenderName"]')?.value || "",
          pickupAddress:
            frForm.querySelector('[name="frPickupAddress"]')?.value || "",
          pickupInstructions:
            frForm.querySelector('[name="frPickupInstructions"]')?.value || "",
          senderEmail:
            frForm.querySelector('[name="frSenderEmail"]')?.value || "",
          dimensions:
            frForm.querySelector('[name="frDimensions"]')?.value || "",
          weight: frForm.querySelector('[name="frWeight"]')?.value || "",
          senderPhone:
            frForm.querySelector('[name="frSenderPhone"]')?.value || "",
          recipientName:
            frForm.querySelector('[name="frRecipientName"]')?.value || "",
          deliveryAddress:
            frForm.querySelector('[name="frDeliveryAddress"]')?.value || "",
          deliveryInstructions:
            frForm.querySelector('[name="frDeliveryInstructions"]')?.value ||
            "",
          recipientPhone:
            frForm.querySelector('[name="frRecipientPhone"]')?.value || "",
          discountCode:
            frForm.querySelector('[name="frDiscountCode"]')?.value || "",
        };
        console.log("Form Data:", frFormData);

        fetch("/api/submitfrForm", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(frFormData),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
          })
          .then((data) => {
            console.log("Response received", data);
            const modalElFr = document.getElementById("modalElFr");
            const modalOverlayFr = document.getElementById("modalOverlayFr");
            const modalMessageFr = document.getElementById("modalMessageFr");
            const modalTitleFr = document.getElementById("modalTitleFr");
            const closeModalFr = document.getElementById("closeModalFr");

            if (
              modalElFr &&
              modalOverlayFr &&
              modalMessageFr &&
              modalTitleFr &&
              closeModalFr
            ) {
              modalElFr.classList.remove("hidden");
              modalOverlayFr.classList.remove("hidden");
              modalMessageFr.innerHTML =
                data.message ||
                "Votre devis a été soumis avec succès. Nous vous répondrons sous peu.";
              modalTitleFr.innerHTML = "Devis soumis";
              closeModalFr.addEventListener("click", () => {
                modalElFr.classList.add("hidden");
                modalOverlayFr.classList.add("hidden");
              });
              if (data.success) {
                frForm.reset();
              }
            } else {
              console.error("Modal elements not found");
            }
          })
          .catch((error) => {
            console.error("Error submitting quote:", error);
            const modalElFr = document.getElementById("modalElFr");
            const modalOverlayFr = document.getElementById("modalOverlayFr");
            const modalMessageFr = document.getElementById("modalMessageFr");
            const modalTitleFr = document.getElementById("modalTitleFr");
            const closeModalFr = document.getElementById("closeModalFr");
            if (
              modalElFr &&
              modalOverlayFr &&
              modalMessageFr &&
              modalTitleFr &&
              closeModalFr
            ) {
              modalElFr.classList.remove("hidden");
              modalOverlayFr.classList.remove("hidden");
              modalMessageFr.innerHTML =
                "Une erreur s'est produite lors de la soumission de votre devis. Veuillez réessayer.";
              modalTitleFr.innerHTML = "Erreur";
              closeModalFr.addEventListener("click", () => {
                modalElFr.classList.add("hidden");
                modalOverlayFr.classList.add("hidden");
              });
            } else {
              console.error("Modal elements not found");
            }
          });
      } catch (error) {
        console.error("Error in form submission handler:", error);
        e.preventDefault();
        e.stopPropagation();
      }
    });
  } else {
    console.error("French form not found!");
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const testimonialsContainer = document.querySelector(
    ".testimonials-container"
  );

  const displayTestimonials = function (testimonials) {
    testimonialsContainer.textContent = "";
    testimonials.forEach(function (testimonial) {
      const html = `
      <div class="card mb-0 p-0 testimonial-card">
          <div class="card-header p-0 py-2">
            <div class="row">
              <div class="col-md-9 col-sm-8">
                <h6 class="card-title person ps-3">
                  ${testimonial.name} - <span class="position">${testimonial.position}</span> ${testimonial.company}
                </h6>
              </div>
              <div class="col-md-3 col-sm-4">
                <p class="card-title text-end city">${testimonial.city}</p>
              </div>
            </div>
            <div class="card-body">
              <p class="card-text testimonial">
                ${testimonial.testimonial}
              </p>
            </div>
            <div class="card-footer">
              <div class="row d-flex">
                <div class="col-md-6 col-sm-3 d-flex mt-auto mb-auto">
                  <i class="fa fa-star checked"></i>
                  <i class="fa fa-star checked"></i>
                  <i class="fa fa-star checked"></i>
                  <i class="fa fa-star checked"></i>
                  <i class="fa fa-star checked"></i>
                </div>
                <div class="col-md-6 col-sm-9 d-flex justify-content-end">
                  <a href="${testimonial.website}" class="btn btn-primary"
                    ><i class="fa fa-link me-2"></i>Visit Site</a
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
      testimonialsContainer.insertAdjacentHTML("beforeend", html);
    });
  };
  displayTestimonials(testimonials);
});

document.addEventListener("DOMContentLoaded", function () {
  const faqContainer = document.querySelector(".faq-container");

  const displayFAQ = function (faq) {
    faqContainer.textContent = "";
    faq.forEach(function (faqs) {
      const html = `
      <div class="card faq-card">
          <div class="card-header">
            <h5 class="card-title question">${faqs.question}</h5>
          </div>
          <div class="card-body">
            <p class="card-text">
              ${faqs.answer}
            </p>
          </div>
        </div>
      `;
      faqContainer.insertAdjacentHTML("beforeend", html);
    });
  };
  displayFAQ(faq);
});
