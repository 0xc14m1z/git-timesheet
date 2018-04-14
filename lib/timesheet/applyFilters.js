const pipe = require("popipe")
const Filters = require("./../filters")


const filterBy = authors => commits =>
  authors ? Filters.by(authors)(commits) : commits

const filterFrom = from => commits =>
  from ? Filters.from(from)(commits) : commits

const filterTo = to => commits =>
  to ? Filters.to(to)(commits) : commits

const applyFilters = (authors, from, to) => commits =>
  pipe(
    commits,
    filterBy(authors),
    filterFrom(from),
    filterTo(to)
  )


module.exports = applyFilters
