import Swal from "sweetalert2";

export const showSwal = (
  title,
  text = "",
  icon = "info",
  confirmText = "باشه",
  onConfirm = null,
  cancelText = null,
  onCancel = null,
) => {
  Swal.fire({
    title,
    text,
    icon,
    confirmButtonText: confirmText,
    showCancelButton: !!cancelText,
    cancelButtonText: cancelText || "",

    // اعمال مستقیم استایل‌های سفارشی
    buttonsStyling: false,
    customClass: {
      popup: "swal-glass",
      title: "swal-glass__title",
      htmlContainer: "swal-glass__text",
      confirmButton: "swal-glass__btn swal-glass__btn--confirm",
      cancelButton: "swal-glass__btn swal-glass__btn--cancel",
      icon: "swal-glass__icon",
    },
  }).then((result) => {
    if (result.isConfirmed && onConfirm) onConfirm();
    if (result.isDismissed && onCancel) onCancel();
  });
};
