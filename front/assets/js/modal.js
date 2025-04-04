const modal = {
  init() {
      document.querySelectorAll(".close").forEach(element => {
          element.addEventListener("click", () => modal.close());
      });
  },

  open(selector) {
    const modalElement = document.querySelector(selector);
    if (modalElement) {
        modalElement.classList.add('is-active');
    } else {
        console.error("L'élément modal n'a pas été trouvé");
    }
},

  close() {
    const activeModal = document.querySelector('.modal.is-active');
    if (activeModal) {
        activeModal.classList.remove('is-active');
    }
  }
};

export default modal;