// 이제 장르별 국가별로 세부 라인 작성.

// <!-- <option value="22041011" >한국</option>
// 					<option value="22042002" >미국</option>
// 					<option value="22044010" >영국</option>
// 					<option value="22041007" >인도</option>
// 					<option value="22041008" >일본</option>
// 					<option value="22041009" >중국</option> -->


let list_url = "http://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieList.json?key=f5eef3421c602c6cb7ea224104795888";
let info_url = "http://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieInfo.json?key=f5eef3421c602c6cb7ea224104795888";

let standards=[]; // 이건 연도 저장
let label=[]; // 이건 국가명 or 장르명
let result; // 이건 이제 영화 수 저장될 배열

let first_time = true;

let def_nationNm = ['한국','미국','영국','일본','중국','전체'];
let def_nationCd = ['22041011','22042002','22044010','22041008','22041009'];

let nationNm;
let nationCd;

let myChart;

function nation(start_year,end_year,nNm,nCd){ 
  
  let check_cnt=0;
  let totalcnt;

  if(nNm == '전체'){
    label = def_nationNm;
    nCd = def_nationCd;
  }
  else{
    label=nNm;
    label.push('전체');
  }

  totalcnt = nCd.length * (end_year-start_year+1)

  // standards에 연도 넣기
  for(let j=start_year; j<=end_year; j++) {
    standards[j-start_year] = j;
  }

  // result[국가 수+전체][연도 수]
  result = new Array(label.length);
  for (var i = 0; i < result.length; i++) {
    result[i] = new Array(end_year-start_year+1);
    for (let j = 0; j <= end_year-start_year; j++) {
      result[i][j]=0; // 0으로 초기화      
    }
  }

  for(let i=0; i<nCd.length; i++) { // 각 나라 마다
    for(let j=start_year; j<=end_year; j++) { // 각 연도 마다
      $.ajax({
        method: "GET",
        url: list_url+"&openStartDt="+ j +"&openEndDt="+j+"&repNationCd="+nCd[i],
        dataType:"json",
        success:function(data) {
          console.log(data);
          result[i][j-start_year] = data.movieListResult.totCnt;
          result[nCd.length][j-start_year] += data.movieListResult.totCnt;
          check_cnt++;
          if(check_cnt == totalcnt) {
            console.log(check_cnt);
            draw('line');
          }
        }
      })
    }  
  }
}


function genre(start_year,end_year,sel_genre) {
  console.log('genre');
 
  let total_cnt=[]; // 각 연도별 총 개수
  let total_sum=0; // 장르에 해당하는 영화 모든 연도 전체 개수
  let check_cnt=0; // 하나 검사할 때마다 하나씩 증가
  //let genres = ['애니메이션','스릴러','코미디','SF','드라마','전체']; // 나중에 sel_genre으로 그냥 쓰면 될듯.

  if(sel_genre[0] == '전체'){
    label = ['애니메이션','스릴러','코미디','SF','드라마','전체'];
  }
  else{
    label=sel_genre;
    label.push('전체');
  }

  // standards에 연도 넣기
  standards=[];
  for(let j=start_year; j<=end_year; j++) {
    standards[j-start_year] = j;
  }
 
  // result[장르+전체][연도 수] 
  result = new Array(label.length);
  for (var i = 0; i < label.length; i++) {
    result[i] = new Array(end_year-start_year+1);
    for (let j = 0; j <= end_year-start_year; j++) {
      result[i][j]=0; // 0으로 초기화      
    }
  }

  // 각 연도 마다 총 개수 세기
  for(let j=start_year; j<=end_year; j++) { 
    $.ajax({
      method: "GET",
      url: list_url+"&openStartDt="+ j +"&openEndDt="+j,
      dataType:"json",
      async: false,
      success:function(data) {
        total_cnt[j-start_year] = data.movieListResult.totCnt;
        total_sum += data.movieListResult.totCnt;
      }
    })
  }

  for(let j=start_year; j<=end_year; j++) { // 각 연도 마다
    for(let i=1; i < Math.floor((total_cnt[j-start_year]-1)/10)+2; i++){ // 각 페이지 마다
      $.ajax({
        method: "GET",
        url: list_url+"&openStartDt="+ j +"&openEndDt="+j + "&curPage" + i,
        dataType:"json",
        success:function(data) {
          for(let k=0; k < data.movieListResult.movieList.length; k++) {
            if(label.includes(data.movieListResult.movieList[k].repGenreNm)){ // 이거의 장르
              result[label.indexOf(data.movieListResult.movieList[k].repGenreNm)][j-start_year] += 1; // 드라마면 드라마 위치에 1 증가
              result[label.length-1][j-start_year] += 1; // 전체도 증가 시켜줘야졍
            }

            // 전체 개수 다 검사했으면 그래프 출력하기.
            if(++check_cnt == total_sum) {
              console.log(total_sum + "&"+check_cnt);
              draw('line');
            }
          } 
        }
      })
    }
  }
}

function draw(type) {
  console.log("draw! is first?" + first_time);
  let my_datasets=[];

  if(first_time){
      first_time = false;
  }
  else{
      myChart.destroy();
  }

  // dataset 설정하기. 랜덤 색
  for(let i=0; i<label.length; i++){
    let color = '#'+Math.round(Math.random()*0xffffff).toString(16);
    my_datasets[i] = {  
      label: label[i],
      data: result[i],
      borderColor: color,
      backgroundColor: color,
      yAxisID: 'y'}
  }
  
  myChart = new Chart(document.getElementById('line-chart').getContext('2d'),{
      type : type,
      data :  {
        labels: standards,
        datasets: my_datasets
      },
  });
} 
   
// 그래프 모양 바뀔 때마다 바꿔주기
function shape(nothing) {
    if (first_time){
        return;
    }
    let graph = $("input[name='chart']:checked").val(); // 그래프 모양
    draw(graph);
}
