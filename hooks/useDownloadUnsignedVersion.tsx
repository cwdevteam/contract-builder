import html2canvas from 'html2canvas'
import jsPdf from 'jspdf'
import { useState } from 'react'

const useDownloadUnsignedVersion = () => {
  const [downloading, setDownloading] = useState(false)

  const downloadUnsignedVersion = async () => {
    setDownloading(true)

    const domElement = document.getElementById('unsigned-version')

    if (!domElement) return

    const canvas = await html2canvas(domElement)
    const img = canvas.toDataURL('image/png')
    const pdf = new jsPdf()

    pdf.addImage(img, 'JPEG', 0, 0, 200, 150)
    pdf.save('unsigned-version.pdf')

    setDownloading(false)
  }

  return {
    downloadUnsignedVersion,
    downloading,
  }
}

export default useDownloadUnsignedVersion
