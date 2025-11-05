var date = new Date();
let year = date.getFullYear();
var birthYear = 1989;

var age = year - birthYear;

document.getElementById("age").innerHTML = age;
document.getElementById("year").innerHTML = year;

const form = document.querySelector("quote-form");

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    e.stopPropagation();

    const formData = {
      senderOrReceiver: form.querySelector(
        'input[name="Sender or Receiver"]:checked'
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
