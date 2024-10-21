import html2canvas from 'html2canvas'
import jsPdf from 'jspdf'

export const getPdf = async (containerId: string) => {
  const domElement = document.getElementById(containerId)

  if (!domElement) return

  const canvas = await html2canvas(domElement, {
    scale: 2,
    scrollX: 0,
    scrollY: 0,
    windowWidth: domElement.scrollWidth,
    windowHeight: domElement.scrollHeight,
  })

  const pdf = new jsPdf('p', 'mm', 'a4')
  const pageHeight = pdf.internal.pageSize.height
  const pageWidth = pdf.internal.pageSize.width
  const padding = 10

  const imgData = canvas.toDataURL('image/png')
  const imgWidth = pageWidth - padding * 2
  const imgHeight = (canvas.height * imgWidth) / canvas.width

  let position = 0
  let heightLeft = imgHeight

  pdf.addImage(imgData, 'PNG', padding, position, imgWidth, imgHeight)
  heightLeft -= pageHeight

  while (heightLeft > 0) {
    position = heightLeft - imgHeight
    pdf.addPage()
    pdf.addImage(imgData, 'PNG', padding, position, imgWidth, imgHeight)
    heightLeft -= pageHeight
  }

  return pdf
}
