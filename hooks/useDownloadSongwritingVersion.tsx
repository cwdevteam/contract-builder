import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import { useState } from 'react'

const useDownloadSongwritingVersion = (
  splitType: string,
  governanceType: string,
  adminName: string,
  votePercentage: number,
  songName: string,
  collaborators: any[],
  collaboratorsAmount: number,
) => {
  const [downloading, setDownloading] = useState(false)

  console.log('governanceType', governanceType)
  const downloadSongwritingVersion = async () => {
    setDownloading(true)

    const domElement = document.getElementById('unsigned-songwriting')
    const doc = new jsPDF()

    doc.setFont('Rubik', 'bold')
    doc.setFontSize(16)
    doc.text(
      [
        'Copyright ownership agreement for music composition,',
        'made as a joint work.',
      ],
      105,
      20,
      { align: 'center' },
    )

    doc.setFont('Rubik', 'normal')
    doc.setFontSize(14)
    doc.text(
      'This agreement is entered into on _____________ between the following parties:',
      100,
      60,
      { align: 'center' },
    )

    doc.setFont('Rubik', 'bold')
    doc.setFontSize(14)
    doc.text('1. Musical Work Identification', 20, 80)

    doc.setFont('Rubik', 'light')
    doc.setFontSize(14)
    doc.text(
      [
        'The contracting parties have collaborated in the authorship and composition',
        'of the Musical Work titled _________________',
      ],
      10,
      95,
    )
    doc.setFont('Rubik', 'light')
    doc.setFontSize(14)
    doc.text(
      [
        'The parties acknowledge and accept their contribution to the authorship or composition of',
        'the Musical Work and agree to the distribution of copyright ownership as follows:',
      ],
      10,
      110,
    )

    // Title
    doc.setFontSize(14)
    doc.text('Collaborators List', 10, 130)

    const baseYPosition = 140
    const collaboratorSpacing = 10
    const sectionHeight = 40
    const pageHeight = 295
    const paddingBottom = 20

    let yPosition = baseYPosition

    collaborators.forEach((collaborator, index) => {
      if (yPosition + sectionHeight + paddingBottom > pageHeight) {
        doc.addPage()
        yPosition = baseYPosition - 120
      }

      doc.setFontSize(12)
      doc.text(`Collaborator ${index + 1}:`, 14, yPosition + 5)

      doc.text(`Legal Name: ${collaborator.legalName}`, 14, yPosition + 10)
      doc.line(37, yPosition + 10, 150, yPosition + 10)

      if (governanceType === 'Vote') {
        doc.text(`Artist Name: ${collaborator.legalName}`, 14, yPosition + 20)
        doc.line(37, yPosition + 20, 150, yPosition + 20)
      }

      if (governanceType === 'Designate Administrator') {
        doc.text(`Email Address: ${collaborator.email}`, 14, yPosition + 20)
      }

      doc.text(
        `Contribution: ${collaborator.typeOfSongWritingContribution}`,
        14,
        yPosition + 30,
      )
      doc.line(37, yPosition + 30, 150, yPosition + 30)

      doc.text(
        `Ownership Percentage: ${collaborator.split}%`,
        14,
        yPosition + 40,
      )
      doc.line(55, yPosition + 40, 150, yPosition + 40)

      yPosition += sectionHeight + collaboratorSpacing
    })

    if (yPosition + 20 + paddingBottom > pageHeight) {
      doc.addPage()
      yPosition = baseYPosition - 120
    }

    doc.setFont('Share', 'bold')
    doc.setFontSize(14)
    doc.text('2. Rights and duties of the parties.', 20, yPosition)

    doc.setFont('Rubik', 'light')
    doc.setFontSize(14)

    const contentRightsBoth = [
      {
        label: 'a',
        text: `The parties agree and accept the mutual assignment of copyright ownership for the Musical Work in the proportions set forth in clause 1 of this agreement. Consequently, each of the parties receives for itself, in its patrimony, in perpetuity, and for the whole territory, all the rights, interests, and prerogatives granted by copyright ownership of the mentioned work, according to the law and to the present agreement.`,
      },
      {
        label: 'b',
        text: `The parties agree that the Musical Work is a Joint Work whose contributions either cannot be separated, or if they can be separated, they are interdependent and generate a single work. The ownership of the Musical Work in Collaboration is divided between the Contracting Parties in the percentages established in clause 1 of the present contract.`,
      },
    ]
    const contentRightsAdmin = [
      {
        label: 'c',
        text: `By means of the present contract, the parties recognize, accept, and declare that they designate _______ as the representative in charge of making the decisions related to the commercial exploitation of the Musical Work. The designated person will make their best effort to achieve the greatest commercial benefit of the work, which includes but is not limited to: offering licenses, working with publishing companies, music distributors, record labels or synchronizations. The representative is NOT authorized to sell or dispose of the copyright ownership of the Musical Work and the recording; they can only offer licenses of use. The sale of copyrights is an exclusive faculty of each owner`,
      },
    ]
    const contentRightsVoting = [
      {
        label: 'c',
        text: `The parties co-owning the Musical Work shall refrain from performing legally relevant acts without the written authorization of the XXX% of the ownership interest, such as but not limited to the following.`,
      },
    ]
    const subcontentRightsVoting = [
      {
        label: 'i',
        text: `Authorizing derivative works, granting licenses, or licensing different kinds of uses.`,
      },
      {
        label: 'ii',
        text: `Edit, alter or modify the Musical Work, especially the contributions of the other parties, in uses or sound recordings other than the one produced under this agreement, unless authorized verbally or in writing by the co-author.`,
      },
      {
        label: 'iii',
        text: `Exploiting the name of other parties in a manner that suggests approval or endorsement of a third-party product or service other than the Musical Work itself.`,
      },
    ]

    // Set Font Size for List
    doc.setFontSize(12)
    yPosition + 5

    contentRightsBoth.forEach((item) => {
      doc.text(`${item.label})`, 14, yPosition + 10)
      doc.text(item.text, 20, yPosition + 10, { maxWidth: 180 })
      yPosition += 25
    })

    if (governanceType === 'Designate Administrator') {
      contentRightsAdmin.forEach((item) => {
        doc.text(`${item.label})`, 14, yPosition + 10)
        doc.text(item.text, 20, yPosition + 10, { maxWidth: 180 })
        yPosition += 25
      })
      if (yPosition + 20 + paddingBottom > pageHeight) {
        doc.addPage()
        yPosition = baseYPosition - 120
      }
    } else if (governanceType === 'Vote') {
      contentRightsVoting.forEach((item) => {
        doc.text(`${item.label})`, 14, yPosition + 10)
        doc.text(item.text, 20, yPosition + 10, { maxWidth: 180 })
        yPosition += 25
      })
      if (yPosition + 20 + paddingBottom > pageHeight) {
        doc.addPage()
        yPosition = baseYPosition - 120
      }
      subcontentRightsVoting.forEach((item, index) => {
        doc.text(`${item.label})`, 24, yPosition)
        doc.text(item.text, 30, yPosition, { maxWidth: 150 })
        yPosition += 20
      })
    }

    // Next Section

    doc.setFont('Share', 'bold')
    doc.setFontSize(14)
    doc.text('3. Distribution and monetization of works', 20, yPosition)

    doc.setFont('Rubik', 'light')
    doc.setFontSize(14)

    const contentMonetization = [
      {
        label: 'a',
        text: `Parties agree and accept that they shall seek and select a competitive distributor or aggregator, which shall be responsible for making the Musical Work available to the public and shall collect and pay the respective royalties to each of the Musical Work copyright owners according to the proportions indicated in clause 1 of this contract.`,
      },
      {
        label: 'b',
        text: `The parties agree that they will seek a distributor who will professionally and responsibly collect royalties for commercial exploitation of the Musical Work in the respective known and unknown uses. Such a distributor will pay each copyright owner in the proportions agreed upon in clause 1 of this contract. In the event that the works have not been distributed with an aggregator that offers the service of direct payments to each of the copyright owners, the party that receives any sum of money for royalties belonging to another of the parties, must pay them within 14 days in the respective bank account.`,
      },
      {
        label: 'c',
        text: `In the event that any of the parties receives money from any third party attributable to the commercial exploitation of the Musical Work, such as synchronization licenses, or of any other type, the party receiving the money shall pay to the other parties the royalties corresponding to the pro rata of its participation in the copyright ownership, no later than fourteen days after receiving the money. `,
      },
    ]

    doc.setFontSize(12)
    yPosition + 5

    contentMonetization.forEach((item) => {
      doc.text(`${item.label})`, 14, yPosition + 10)
      doc.text(item.text, 20, yPosition + 10, { maxWidth: 180 })
      yPosition += 35
    })
    if (yPosition + 20 + paddingBottom > pageHeight) {
      doc.addPage()
      yPosition = baseYPosition - 120
    }
    // Next Section
    doc.setFont('Share', 'bold')
    doc.setFontSize(14)
    doc.text('4. Credits ', 20, yPosition)

    doc.setFont('Rubik', 'light')
    doc.setFontSize(14)

    const contentCredits = [
      {
        label: 'a',
        text: `The credits of each co-owner or collaborator shall be presented according to their corresponding role in the Musical Work, whether as author, composer, producer, etc., and mentioning their legal or artistic name, as decided.`,
      },
    ]

    doc.setFontSize(12)
    yPosition + 5

    contentCredits.forEach((item) => {
      doc.text(`${item.label})`, 14, yPosition + 10)
      doc.text(item.text, 20, yPosition + 10, { maxWidth: 180 })
      yPosition += 35
    })
    if (yPosition + 20 + paddingBottom > pageHeight) {
      doc.addPage()
      yPosition = baseYPosition - 120
    }
    // Next Section
    doc.setFont('Share', 'bold')
    doc.setFontSize(14)
    doc.text('5. License for artists', 20, yPosition)

    doc.setFont('Rubik', 'light')
    doc.setFontSize(14)

    const contentLiscence = [
      {
        label: 'a',
        text: `Each of the co owners is hereby granted a license to use the names of artists, approved portraits, and biographical material approved by each of the parties for the exclusive purpose of promoting and commercially exploiting the Musical Work. Each party shall have the right to approve any biographical or identification materials selected or commissioned by the other, provided that such consent to the Biographical Materials is not unreasonably withheld or delayed. In the event of unreasonable delay, approval shall be deemed granted within five (5) business days of the date such Biographical Materials are received by the party required to grant approval.`,
      },
    ]

    doc.setFontSize(12)
    yPosition + 5

    contentLiscence.forEach((item) => {
      doc.text(`${item.label})`, 14, yPosition + 10)
      doc.text(item.text, 20, yPosition + 10, { maxWidth: 180 })
      yPosition += 45
    })
    if (yPosition + 20 + paddingBottom > pageHeight) {
      doc.addPage()
      yPosition = baseYPosition - 120
    }
    // Next Section
    doc.setFont('Share', 'bold')
    doc.setFontSize(14)
    doc.text('6. Accounting', 20, yPosition + 10)

    doc.setFont('Rubik', 'light')
    doc.setFontSize(14)

    const contentAccounting = [
      {
        label: 'a',
        text: `Each party has the right to engage a certified public accountant to audit the books and records of the other parties solely to verify the receipt and payment of monies derived from the musical work. This audit right may be exercised to verify the accuracy of such statements twice a year, at the sole expense of the party concerned and upon at least thirty (30) days prior written notice. Any objection relating to any financial statement must be filed no later than three years from the date of inspection.`,
      },
    ]

    doc.setFontSize(12)
    yPosition + 25

    contentAccounting.forEach((item) => {
      doc.text(`${item.label})`, 14, yPosition + 20)
      doc.text(item.text, 20, yPosition + 20, { maxWidth: 180 })
      yPosition += 45
    })
    if (yPosition + 20 + paddingBottom > pageHeight) {
      doc.addPage()
      yPosition = baseYPosition - 120
    }
    // Next Section
    doc.setFont('Share', 'bold')
    doc.setFontSize(14)
    doc.text(
      '7. Full capacity and indemnity against third parties.',
      20,
      yPosition + 8,
    )

    doc.setFont('Rubik', 'light')
    doc.setFontSize(14)

    const contentCapacity = [
      {
        label: 'a',
        text: `The parties acknowledge and declare that each of them has the capacity to contract and does so freely, without any restriction or prohibition whatsoever, including restrictions derived from record, publishing or representation agreements with any third party.
`,
      },
      {
        label: 'b',
        text: `The parties also declare that all their contributions to the Musical Work are original and do not infringe on the economic or moral rights or interests of third parties.`,
      },
      {
        label: 'c',
        text: `The parties agree that in the event of any claim by third parties for copyright or otherwise, the responsible party shall hold harmless the non-responsible parties from any judicial or extrajudicial claim arising out of its contribution to the Musical Work, or out of its participation in or performance of this contract.`,
      },
    ]

    doc.setFontSize(12)
    yPosition + 5

    contentCapacity.forEach((item) => {
      doc.text(`${item.label})`, 14, yPosition + 20)
      doc.text(item.text, 20, yPosition + 20, { maxWidth: 180 })
      yPosition += 20
    })
    if (yPosition + 20 + paddingBottom > pageHeight) {
      doc.addPage()
      yPosition = baseYPosition - 120
    }
    // Next Section
    doc.setFont('Share', 'bold')
    doc.setFontSize(14)
    doc.text(
      '8. Full autonomy and no employment relationship',
      20,
      yPosition + 20,
    )

    doc.setFont('Rubik', 'light')
    doc.setFontSize(14)

    const contentAutonomy = [
      {
        text: `The parties understand, acknowledge, and declare that no employment relationship exists between them. They act as independent artists with full administrative and artistic autonomy. Nothing in this contract shall be construed as an employment, partnership or business relationship other than collaboration between artists for the production of a joint artistic work.`,
      },
    ]

    doc.setFontSize(12)
    yPosition + 5

    contentAutonomy.forEach((item) => {
      doc.text(item.text, 20, yPosition + 30, { maxWidth: 180 })
      yPosition += 30
    })
    if (yPosition + 20 + paddingBottom > pageHeight) {
      doc.addPage()
      yPosition = baseYPosition - 120
    }
    // Next Section
    doc.setFont('Share', 'bold')
    doc.setFontSize(14)
    doc.text('9. Right of first refusal', 20, yPosition + 25)

    doc.setFont('Rubik', 'light')
    doc.setFontSize(14)

    const contentRights = [
      {
        text: `Parties agree that in the event they wish to sell or otherwise dispose of or transfer their ownership  in the copyrights of the Musical Work, they shall grant to the other parties a right of first refusal or first option to purchase to the other parties to the contract, first on a pro rata basis, and secondly on an individual basis. In the event that the purchase option is not exercised by the other parties, the seller may freely offer its share to the market.`,
      },
    ]

    doc.setFontSize(12)
    yPosition + 5

    contentRights.forEach((item) => {
      doc.text(item.text, 20, yPosition + 35, { maxWidth: 180 })
      yPosition += 30
    })
    if (yPosition + 20 + paddingBottom > pageHeight) {
      doc.addPage()
      yPosition = baseYPosition - 120
    }

    // Next Section

    doc.setFont('Share', 'bold')
    doc.setFontSize(14)
    doc.text('10. Notices', 20, yPosition + 35)

    doc.setFont('Rubik', 'light')
    doc.setFontSize(14)

    const contentNotices = [
      {
        text: `The parties will be notified of any decision, controversy, negotiation or relevant matter related to this contract, via email or certified physical mail at the physical and electronic addresses that appear at the bottom of their signature. `,
      },
    ]

    doc.setFontSize(12)
    yPosition + 5

    contentNotices.forEach((item) => {
      doc.text(item.text, 20, yPosition + 45, { maxWidth: 180 })
      yPosition += 30
    })
    if (yPosition + 20 + paddingBottom > pageHeight) {
      doc.addPage()
      yPosition = baseYPosition - 120
    }

    // Next Section

    doc.setFont('Share', 'bold')
    doc.setFontSize(14)
    doc.text('11. Dispute settlement', 20, yPosition + 35)

    doc.setFont('Rubik', 'light')
    doc.setFontSize(14)

    const contentDisputeSettlement = [
      {
        text: `Any controversy will be dealt with through dialogue between the parties. Failing this, they will seek to exhaust an alternative dispute resolution mechanism, and failing this, they will submit it to the competent judges under the laws of the United States of America.If any provision of this Agreement is invalid, void or unenforceable, the remainder of the Agreement shall remain in full force and effect. This Agreement may not be modified in any way except by an instrument signed by the parties. This Agreement may be signed in duplicate (and/or facsimile and/or PDF), each of which shall be deemed an original, but all of which together shall constitute the Agreement.`,
      },
    ]

    doc.setFontSize(12)
    yPosition + 5

    contentDisputeSettlement.forEach((item) => {
      doc.text(item.text, 20, yPosition + 45, { maxWidth: 180 })
      yPosition += 30
    })
    if (yPosition + 20 + paddingBottom > pageHeight) {
      doc.addPage()
      yPosition = baseYPosition - 120
    }

    // Next Section
    doc.setFontSize(14)
    doc.text('Collaborators List', 10, yPosition + 70)
    if (yPosition + 20 + paddingBottom > pageHeight) {
      doc.addPage()
      yPosition = baseYPosition - 120
    }

    collaborators.forEach((collaborator, index) => {
      if (yPosition + sectionHeight + paddingBottom > pageHeight) {
        doc.addPage()
        yPosition = baseYPosition - 120
      }

      doc.setFontSize(12)
      doc.text(`Collaborator ${index + 1}:`, 14, yPosition + 5)

      doc.text(`Legal Name: ${collaborator.legalName}`, 14, yPosition + 10)
      doc.line(37, yPosition + 10, 150, yPosition + 10)

      doc.text(`Artist Name: ${collaborator.legalName}`, 14, yPosition + 20)
      doc.line(37, yPosition + 20, 150, yPosition + 20)

      doc.text(`Home Address: ${collaborator.email}`, 14, yPosition + 30)
      doc.line(37, yPosition + 30, 150, yPosition + 30)

      doc.text(`Signature: `, 14, yPosition + 40)
      doc.line(37, yPosition + 40, 93.5, yPosition + 40)
      doc.text(`Date:`, 100, yPosition + 40)
      doc.line(112, yPosition + 40, 170, yPosition + 40)

      yPosition += sectionHeight + collaboratorSpacing
    })

    if (yPosition + 20 + paddingBottom > pageHeight) {
      doc.addPage()
      yPosition = baseYPosition - 120
    }
    doc.save('copyright_ownership_agreement.pdf')

    setDownloading(false)
  }

  return {
    downloadSongwritingVersion,
    downloading,
  }
}

export default useDownloadSongwritingVersion
