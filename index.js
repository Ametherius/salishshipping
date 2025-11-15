var date = new Date();
let year = date.getFullYear();
var birthYear = 1989;

var age = year - birthYear;

document.getElementById("age").innerHTML = age;
document.getElementById("year").innerHTML = year;

// English form submission
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
      cadValue: form.cadValue.value,
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
// French form submission
const frForm = document.getElementById("quote-form-fr");
if (frForm) {
  frForm.addEventListener("submit", (e) => {
    e.preventDefault();
    e.stopPropagation();

    const frFormData = {
      name: frForm.frSenderName.value,
      pickupAddress: frForm.frPickupAddress.value,
      pickupInstructions: frForm.frPickupInstructions.value,
      senderEmail: frForm.frSenderEmail.value,
      dimensions: frForm.frDimensions.value,
      weight: frForm.frWeight.value,
      senderPhone: frForm.frSenderPhone.value,
      recipientName: frForm.frRecipientName.value,
      deliveryAddress: frForm.frDeliveryAddress.value,
      deliveryInstructions: frForm.frDeliveryInstructions.value,
      recipientPhone: frForm.frRecipientPhone.value,
      discountCode: frForm.frDiscountCode.value,
    };
    console.log("Form Data:", frFormData);

    fetch("/api/submitfrForm", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(frFormData),
    })
      .then((response) => response.json())
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
  });
}
