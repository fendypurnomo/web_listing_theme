// Resize observer
const ro = new ResizeObserver((entries) => {
  const calcBorderRadius = (size1, size2) =>
    `${Math.min(100, size1 / 10 + size2 / 10)}px`

  for (const e of entries) {
    if (e.borderBoxSize) {
      e.target.style.borderRadius = calcBorderRadius(
        e.borderBoxSize[0].inlineSize,
        e.borderBoxSize[0].blockSize
      )
    } else {
      e.target.style.borderRadius = calcBorderRadius(
        e.contentRect.width,
        e.contentRect.height
      )
    }
  }

  ps.update()
})

ro.observe(document.querySelector('.ps-observe'))


// Window on load
window.onload = () => {
  document.querySelector('.loading').classList.remove('loading')
  let loader = document.querySelector('.loader')
  loader.classList.remove('d-block')
  loader.classList.add('d-none')
  document.querySelector('.content').classList.remove('d-none')
}


// Get Pathname array
let pathname = location.pathname.split('/')

// Removing empty strings from lacotion pathname
for (i = 0; i < pathname.length; ) {
  if (pathname[i]) i++
  else pathname.splice(i, 1)
}


/* Title */
// Add title document
const title = document.querySelector('title')
if (pathname.length > 0) {
  title.innerHTML = 'Index of /' + pathname.join(' /')
} else {
  title.innerHTML = 'Index'
}

function joinUntil(array, index, separator) {
  let result = []
  for (i = 0; i <= index; i++) result.push(array[i])
  return result.join(separator)
}

// Loop for breadcrumb items
let breadcrumbItems = []
if (pathname.length === 0) {
  breadcrumbItems = ['<li class="breadcrumb-item active ps-0 pe-2" aria-current="page">Home</li>']
} else {
  pathname.forEach((part, index) => {
    breadcrumbItems.push(
      '<li class="breadcrumb-item ps-0 pe-2"> \
        <a class="text-capitalize" href="/' + joinUntil(pathname, index, '/') + '">' + decodeURI(part) + '</a> \
      </li>'
    )
  })
  breadcrumbItems.unshift('<li class="breadcrumb-item ps-0 pe-2"><a href="/">Home</a></li>')
  breadcrumbItems[breadcrumbItems.length - 1 ] = '<li class="breadcrumb-item text-capitalize ps-0 pe-2 active" aria-current="page">' + pathname[pathname.length - 1] + '</li>'
}

// Add breadcrumb items to breadcrumb selector
document.querySelector('ol.breadcrumb').innerHTML = breadcrumbItems.join('')


/* Table */
// Add class to table tag
const table  = document.querySelector('table')
let thead = document.querySelector('thead')
const tbody = document.querySelector('tbody')

table.classList.add('table', 'table-hover', 'table-sm', 'table-striped', 'border', 'rounded-3', 'mb-4')

if (thead === null) {
  thead = document.createElement('thead')
  table.insertBefore(thead, table.children[0])
  thead.classList.add('sticky-top')
  thead.appendChild(tbody.children[0])
}

// Remove first child of tbody tag
if (pathname.length > 0 && tbody.children.length > 0) {
  tbody.children[0].remove()
}

scroller.addEventListener('ps-scroll-y', () => {
  if (thead.offsetTop > (table.offsetTop + 1)) {
    thead.style.backgroundColor = 'rgba(255, 255, 255, .85)'
    thead.style.backdropFilter = 'saturate(180%) blur(12px)'
    thead.style.top = '48px'
  }
  else {
    thead.style.backgroundColor = ''
    thead.style.backdropFilter = ''
  }
})


/* Search Bar */
const searchContainer = document.querySelector('.search-container')
const searchInput = document.querySelector('.search-input')
const biSearch = document.querySelector('.search-i-box')
const toggleSearchInput = () => {
    searchContainer.classList.toggle('show')
    setTimeout(() => {
        searchInput.focus()
    }, 275)
}
biSearch.addEventListener('click', toggleSearchInput)


/* Search */
function search() {
  let search_input, filter, table, tbody, tr, i, txtValue
  search_input = document.getElementById('search-input')
  filter = search_input.value.toUpperCase()
  table = document.getElementById('table')
  tbody = document.getElementsByTagName('tbody')[0]
  tr = tbody.getElementsByTagName('tr')
  for (i = 0; i < tr.length; i++) {
      if (tr[i]) {
          txtValue = tr[i].textContent || tr[i].innerText;
          if (txtValue.toUpperCase().indexOf(filter) > -1) {
              tr[i].style.display = "";
          } else {
              tr[i].style.display = "none";
          }
      }
  }
}