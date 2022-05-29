/*=================================================*/
/* Load the filters section dynamically, and store
/* the checked filters for the user
/*=================================================*/
const amenities = {}

function getPoints(text, limit) {
  if (text.length > limit)
    text = text.slice(0, limit - 3) + '...';
  return text;
}

$('.filters_item .checkbox').on('change', (e) => {
  const checkbox = e.target;
  const elmToWrite = $('#amenities_checked-filters');

  checkbox.checked === true
    ? amenities[$(checkbox).data('id')] = $(checkbox).data('name')
    : delete amenities[$(checkbox).data('id')];

  const amenities_ids = Object.values(amenities)
  const text = amenities_ids.join(', ');

  text.length > 0
    ? elmToWrite.text(getPoints(text, 25))
    : elmToWrite.text('...');
})

/*========================================*/
/* Retrieve API state
/*========================================*/
const apiStatus = $('div#api_status');
$.ajax('http://127.0.0.1:5001/api/v1/status/')
  .then(({ status }) =>  status === 'OK' && apiStatus.addClass('available'))
  .catch(() => apiStatus.removeClass('available'));

/*======================================================*/
/* Load the place section dynamically, from the frontend
/*======================================================*/
/**
 * Generate a element for the DOM
 * @param (object) props - Base object for the content of the element to form
 */
function place(props) {
  const elm = $(`
    <article class="places_item grid_ctn">
      <h2 class='grid_item'>${props.name}</h2>
      <div class='price_by_night grid_item'>${props.price_by_night}</div>
      <div class="information grid_item">
        <div class='max_guest'>
          <div class="icon"></div>
          ${props.max_guest}
        </div>
        <div class='number_rooms'>
          <div class="icon"></div>
          ${props.number_rooms}
        </div>
        <div class='number_bathrooms'>
          <div class="icon"></div>
          ${props.number_bathrooms}
        </div>
      </div>
      <div class="description grid_item">
        ${props.description}
      </div>
    </article>
  `);

  return elm;
}
/**
 * Generate a list of elements (nodes of the DOM)
 */
async function Places(data={}) {
  const placesList = await $.ajax('http://127.0.0.1:5001/api/v1/places_search/',{
    type: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: JSON.stringify(data),
  })

  elmList = placesList.map(obj => place(obj))
  return elmList;
}
/**
 * Load and element in a specific part of the DOM
 * @param (cb) component - Callback that generate a list of element to insert
 * @param (node) root - element in the DOM
 */
async function render(component, filters={}, root) {
  const elms = await component(filters);
  // console.log(root);
  root.empty()
  console.log("elms: " + elms.length);
  elms.forEach(e => root.append(e));
}

render(Places, filters={},$('.places .places_main'))

/*================================*/
/* Implementation our first filter
/*================================*/
$('#filters-btn').on('click', () => {
  filterBy = {amenities: Object.keys(amenities)};
  render(Places, filterBy, $('.places .places_main'));
})
