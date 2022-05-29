const amenities = {}

function getPoints(text, limit) {
  if (text.length > limit)
    text = text.slice(0, limit - 3) + "...";
  return text;
}

$('.filters_item .checkbox').on('change', (e) => {
  const elm = e.target;
  const elmToWrite = $('#amenities_checked-filters');

  elm.checked === true
    ? amenities[$(elm).data('id')] = $(elm).data('name')
    : delete amenities[$(elm).data('id')];

  const amenities_ids = Object.values(amenities)
  const text = amenities_ids.join(', ');

  text.length > 0
    ? elmToWrite.text(getPoints(text, 25))
    : elmToWrite.text('...');
})
