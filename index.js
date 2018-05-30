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

function toggleLightBox(){
  $(`.js-lightBox`).toggleClass('hidden');
}

function clickLightBox(){
  $('.js-lightBox').on('click', event =>{
    toggleLightBox();
  })
}

function renderLightBox(string){
  return `
    <div class = 'js-lightBoxContainer'>
      <iframe src='https://www.youtube.com/embed/${string}' style="height:400px;width:600px" aria-live='assertive' name='lightbox' class='' id='iframe1'></iframe>
    </div>
  `
}

function thumbnailClick(){
  $('.js-search-results').on('click','.js-thumbnail', function(event){
      event.preventDefault();
      toggleLightBox();
      const vidID = $(this).attr('id');
      const htmlString = renderLightBox(vidID);
      $('.js-lightBox').html(htmlString);
  })
}

function renderResultsCount(result){
  return `
  <h3>Total Results Found: ${result.pageInfo.totalResults}</h3>
  <h3>Results Shown: ${result.pageInfo.resultsPerPage}</h3>
  `
}

function renderResult(result) {
  return `
    <div class='js-results'>
      <a href="https://www.youtube.com/embed/${result.id.videoId}" target='lightbox'><img src="${result.snippet.thumbnails.medium.url}"  id='${result.id.videoId}' class ='js-thumbnail'></a>
    </div>
  `;
}

function displayYouTubeSearchData(data) {
    console.log(data);
    const resultCount = renderResultsCount(data);
  $('.js-result-count').html(resultCount);
  const results = data.items.map((item, index) => renderResult(item));
  $('.js-search-results').html(results);
}

function watchSubmit() {
  $('.js-search-form').on('submit',event => {
    event.preventDefault();
    const queryTarget = $(event.currentTarget).find('.js-query');
    const query = queryTarget.val();
    // clear out the input
    queryTarget.val("");
    getDataFromApi(query, displayYouTubeSearchData);
    thumbnailClick();
    clickLightBox();
  });
}

$(watchSubmit);
