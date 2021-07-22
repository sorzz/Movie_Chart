// 이제 장르별 국가별로 세부 라인 작성.

// <!-- <option value="22041011" >한국</option>
// 					<option value="22042002" >미국</option>
// 					<option value="22044010" >영국</option>
// 					<option value="22041007" >인도</option>
// 					<option value="22041008" >일본</option>
// 					<option value="22041009" >중국</option> -->


let list_url = "http://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieList.json?key=f5eef3421c602c6cb7ea224104795888";
let info_url = "http://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieInfo.json?key=f5eef3421c602c6cb7ea224104795888";

let label_str;
let standards=[];
let result;

let first_time = true;
let totalcnt;
var check_cnt=0;

let alert_err = false;

let def_nationNm = ['한국','미국','영국','일본','중국'];
let def_nationCd = ['22041011','22042002','22044010','22041008','22041009'];

let nationNm;
let nationCd;


let myLineChart;

function nation(start_year,end_year,nNm,nCd,sel_genre){ 
  if(nNm == '전체'){
    nationNm = def_nationNm;
    nationCd=def_nationCd;
  }
  else{
    nationNm=nNm;
    nationCd=nCd;
  }
  nationNm.push('전체');

  console.log('국가별 시작이라구요~' + nationCd.length * (end_year-start_year+1));

  // standards에 연도 넣기
  for(let j=start_year; j<=end_year; j++) {

    standards[j-start_year] = j;
  }

  // arr[국가 수+전체][연도 수]
  result = new Array(nationCd.length+1);

  for (var i = 0; i < result.length; i++) {
    result[i] = new Array(end_year-start_year+1);
    for (let j = 0; j <= end_year-start_year; j++) {
      result[i][j]=0; // 0으로 초기화      
    }
  }


  label_str = '연도별 영화 수';
  check_cnt=0;
  totalcnt=[];
  console.log('국가별 중간이라구요~');

  for(let i=0; i<nationCd.length; i++) { // 각 나라 마다
    console.log(nationNm[i]+'의 개수를 세보겟습니다.');

    for(let j=start_year; j<=end_year; j++) { // 각 연도 마다
       
      $.ajax({
        method: "GET",
        url: list_url+"&openStartDt="+ j +"&openEndDt="+j+"&repNationCd="+nationCd[i],
        dataType:"json",
        success:function(data) {
          console.log(data);
          result[i][j-start_year] = data.movieListResult.totCnt;
          result[nationCd.length][j-start_year] += data.movieListResult.totCnt;
          check_cnt++;
          if(check_cnt == nationCd.length * (end_year-start_year+1)) {
              draw(label_str,'line');
          }
        }
      })
    }  
  }
}

function genre(start_year,end_year,sel_genre) {
}


// 이거 hover했을때 2016 숫자 안뜨고 그냥 원소값만 뜨게 하기!!
function draw(label_str,shape) {
    // 그래프로 표현 하기.
    console.log("draw! is first?" + first_time);
    my_datasets=[];

    if(first_time){
        first_time = false;
    }
    else{
        myLineChart.destroy();
    }

    for(let i=0; i<=nationCd.length; i++){
      let color = '#'+Math.round(Math.random()*0xffffff).toString(16);
      my_datasets[i] = {
        label: nationNm[i],
        data: result[i],
        borderColor: color,
        backgroundColor: color,
        yAxisID: 'y'}
    }
    
    myLineChart = new Chart(document.getElementById('line-chart').getContext('2d'),{
        type : shape,
        data :  {
          labels: standards,
          datasets: my_datasets
        },
        options : {
            maintainAspectRatio : false, // 기본 비율 유지
            bezierCurve: true
        },
        tooltips:{
          displayColors: false, // 툴팁 바 컬러 표시 여부
          backgroundColor: '#0a6dff', // 툴팁 배경
          titleFontColor: '#fff', //여기부터 툴팁 폰트 관련
          titleAlign: 'center', 
          bodySpacing: 2,
          bodyFontColor: '#fff',
          bodyAlign: 'center',
          footerFontStyle: 'bold', 
          footerFontColor: '#fff',
          footerAlign: 'center',
          callbaks: {
            label: function(tooltipitem, data){
              return data['labels'][tooltipitem['index']] + ": " + data['datasets'][0]['data'][tooltipitem['index']];
            }
          }
        }, 
    });

    
} 
   
// 그래프 모양 바뀔 때마다 바꿔주기
function shape(nothing) {
    if (first_time){
        return;
    }
    let graph = $("input[name='chart']:checked").val(); // 그래프 모양
    draw(label_str,graph);
}
