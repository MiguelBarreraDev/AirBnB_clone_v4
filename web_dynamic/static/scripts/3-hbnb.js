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

const apiStatus = $('div#api_status');
$.ajax('http://172.17.45.196:5001/api/v1/status/')
  .then(({ status }) =>  status === 'OK' && apiStatus.addClass('available'))
  .catch(() => apiStatus.removeClass('available'));
