import html2canvas from 'html2canvas'
import jsPdf from 'jspdf'

export const getPdf = async (containerId: string) => {
  const domElement = document.getElementById(containerId)

  if (!domElement) return

  const canvas = await html2canvas(domElement)
  const img = canvas.toDataURL('image/png')
  const pdf = new jsPdf()

  pdf.addImage(img, 'JPEG', 0, 0, 200, 150)

  return pdf
}
