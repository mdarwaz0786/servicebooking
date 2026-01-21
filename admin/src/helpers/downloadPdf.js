import html2pdf from "html2pdf.js";

export const downloadPdf = async ({ elementId, fileName = "document.pdf" }) => {
  const element = document.getElementById(elementId);

  if (!element) {
    alert("Unable to download invoice. Please try again.");
    return;
  };

  const originalWidth = element.style.width;
  const originalMaxWidth = element.style.maxWidth;

  element.style.width = "1050px";
  element.style.maxWidth = "1050px";

  await new Promise((resolve) => setTimeout(resolve, 100));

  const options = {
    margin: 0,
    filename: fileName,
    image: { type: "jpeg", quality: 1 },
    html2canvas: {
      scale: 4,
      useCORS: true,
      backgroundColor: "#ffffff",
    },
    jsPDF: {
      unit: "px",
      format: [1050, 1485],
      orientation: "portrait",
    },
  };

  await html2pdf().set(options).from(element).save();

  element.style.width = originalWidth;
  element.style.maxWidth = originalMaxWidth;
};
