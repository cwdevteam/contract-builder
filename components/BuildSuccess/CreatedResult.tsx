import { useContractBuilderProvider } from '@/providers/ContractBuilderProvider'
import { isPdfDownloaded } from '@/lib/supabase/isPdfDownloaded'
import Button from '../Button'
import PassedQuestions from '../PassedQuestions'
import { getPdf } from '@/utils/getPdf'
import { uploadFile } from '@/lib/ipfs/uploadToIpfs'
import { addCid } from '@/lib/supabase/cid'
import { useMemo, useState } from 'react'
import { Loader2 } from 'lucide-react'

const CreatedResult = () => {
  const { splitType } = useContractBuilderProvider()
  const { collaboratorDbId } = useContractBuilderProvider()
  const [uploadingPdf, setUploadingPdf] = useState(false)

  const pdfContainerId = useMemo(() => {
    if (splitType === 'Song Writing') {
      return 'unsigned-songwriting'
    } else if (splitType === 'Master Recording') {
      return 'unsigned-version'
    } else if (splitType === 'Both') {
      return 'unsigned-version'
    }

    return 'unsigned-version'
  }, [splitType])

  const downloadPdf = async () => {
    const pdf = await getPdf(pdfContainerId)

    if (!collaboratorDbId || !pdf) return

    pdf.save('unsigned-version.pdf')

    await isPdfDownloaded(collaboratorDbId)
  }

  const uploadPdf = async () => {
    setUploadingPdf(true)

    const pdf = await getPdf('unsigned-version')

    if (!collaboratorDbId || !pdf) return

    const file = new File([pdf.output('blob')], 'unsigned-version')

    const { cid } = await uploadFile(file)

    await addCid(collaboratorDbId, cid)

    setUploadingPdf(false)
  }

  return (
    <section className="flex flex-col">
      <div className="md:block hidden">
        <PassedQuestions />
      </div>

      <div className="order-1 md:order-2 flex flex-col">
        <p className="text-white font-share md:text-[32px] text-[16px] md:pt-6 tracking-[-0.05rem] md:order-1 order-2">
          Congrats! You’re protecting your art.
        </p>
        <p className="text-white font-rubik  md:text-[32px] text-[19px] pt-4 tracking-[-0.05rem] md:order-2 order-1 ">
          DRAFT Contract Created!
        </p>
      </div>

      <div className="md:pt-16 pt-8 flex flex-col gap-8 order-2 md:order-3 md:justify-start justify-center md:items-start items-center mb-5">
        <Button
          className="py-1 md:px-[16px] px-[10px] md:text-md text-[11px] md:min-w-[540px]  min-w-[312px] min-h-[41px]"
          onClick={() => {}}
        >
          View Contract
        </Button>
        <Button
          className="py-1 md:text-md text-[11px] md:min-w-[540px] min-w-[312px] min-h-[41px]"
          onClick={downloadPdf}
        >
          Download unsigned version
        </Button>
        <Button
          className="py-1 md:text-md text-[11px] md:min-w-[540px] min-w-[312px] min-h-[41px]"
          onClick={uploadPdf}
          disabled={uploadingPdf}
        >
          {uploadingPdf ? (
            <div className="flex justify-center">
              <Loader2 className="mr-2 size-4 animate-spin" />
              Loading...
            </div>
          ) : (
            ' Send DocuSign to collaborators'
          )}
        </Button>
      </div>
    </section>
  )
}

export default CreatedResult
