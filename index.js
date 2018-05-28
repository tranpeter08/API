const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';

function getDataFromApi(searchTerm, callback) {
  const query = {
    part: 'snippet',
    key: 'AIzaSyAcOFs5FP6pEGqqItl19EOu0GOW94tdAk4',
    q: `${searchTerm}`,
    type: 'video'
  }
  $.getJSON(YOUTUBE_SEARCH_URL, query, callback);
}

function renderResult(result) {
    console.log(result);
  return `
    <div>
    <a href="https://www.youtube.com/watch?v=${result.id.videoId}" target= '_blank'><input type="image" src="${result.snippet.thumbnails.medium.url}"></a>
    </div>
  `;
}

function displayYouTubeSearchData(data) {
    console.log(data);
  const results = data.items.map((item, index) => renderResult(item));
  $('.js-search-results').html(results);
}

function watchSubmit() {
  $('.js-search-form').submit(event => {
    event.preventDefault();
    const queryTarget = $(event.currentTarget).find('.js-query');
    const query = queryTarget.val();
    // clear out the input
    queryTarget.val("");
    getDataFromApi(query, displayYouTubeSearchData);
  });
}

$(watchSubmit);
