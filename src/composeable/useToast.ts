import { toast } from "vue-sonner";
import { h } from "vue";

export function useToast() {
  const showToast = (message: string, description: string, variant: "success" | "error" | "info" = "info") => {
    let backgroundColor: string;
    let textColor: string;

    switch (variant) {
      case "success":
        backgroundColor = "green";
        textColor = "white";
        break;
      case "error":
        backgroundColor = "red";
        textColor = "white";
        break;
      case "info":
      default:
        backgroundColor = "blue";
        textColor = "white";
        break;
    }

    toast(message, {
      description: h("p", { style: { color: textColor } }, description),
      style: {
        background: backgroundColor,
        color: textColor,
      },
      action: {
        label: "Undo",
        onClick: () => console.log("Undo"),
      },
    });
  };

  return { showToast };
}
