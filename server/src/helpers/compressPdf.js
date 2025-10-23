import { PDFDocument } from "pdf-lib";
import fs from "fs";
import path from "path";

export const compressPdf = async (inputBuffer, folder = "common") => {
  const uploadDir = path.join(process.cwd(), "uploads", folder);
  if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

  const baseName = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
  const finalPath = path.join(uploadDir, `${baseName}.pdf`);

  const pdfDoc = await PDFDocument.load(inputBuffer);
  const newPdf = await PDFDocument.create();
  const pages = await newPdf.copyPages(pdfDoc, pdfDoc.getPageIndices());
  pages.forEach((page) => newPdf.addPage(page));

  const pdfBytes = await newPdf.save();
  fs.writeFileSync(finalPath, pdfBytes);
  return `uploads/${folder}/${baseName}.pdf`;
};

export default compressPdf;
