const R = require("ramda")
const pipe = require("popipe")

const PDF = require("pdfmake/build/pdfmake")

const A4 = [595.28, 841.89]

const getDataUrl = monthPage =>
  monthPage.toDataURL()

const isLastPage = (index, pages) =>
  index === pages.length - 1

const getPageDefinition = (page, index, pages) => ({
  image: page,
  fit: A4,
  pageBreak: !isLastPage(index, pages) ? "after" : ""
})

const createPDF = pages =>
  PDF.createPdf({
    pageSize: "A4",
    pageOrientation: "portrait",
    pageMargins: [0, 0, 0, 0],
    content: pages.map(getPageDefinition)
  })

const makePDF = settings => months =>
  pipe(
    R.reverse(months),
    R.map(getDataUrl),
    createPDF
  )

module.exports = makePDF
