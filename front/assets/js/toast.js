import "izitoast/dist/css/iziToast.min.css";
import iziToast from "izitoast";

const toast = {
    init() {
        iziToast.settings({
            timeout: 5000,
            position: "topRight",
            zindex: 9999999
        });
    },

    success(message) {
        iziToast.success({ message });
    },

    error(message) {
        iziToast.error({ message });
    },

    warning(message) {
        iziToast.warning({ message });
    },

    info(message) {
        iziToast.info({ message });
    },
};

export default toast;