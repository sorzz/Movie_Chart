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

let first_time = true;
let totalcnt;
var check_cnt=0;

let alert_err = false;

let nationNm = ['한국','미국','영국','인도','일본','중국'];
let nationCd = ['22041011','22042002','22044010','22041007','22041008'];

function nation(start_year,end_year,sel_genre){ 

  // arr[5][2]
  var result = new Array(nationCd.length);

  for (var i = 0; i < result.length; i++) {
    result[i] = new Array(end_year-start_year+1);
  }

  label_str = '연도별 영화 수';
  check_cnt=0;
  totalcnt=[];

  for(let i=0; i<nationCd.length; i++) {
    for(let j=start_year; j<end_year+1; j++) {
      $.ajax({
        method: "GET",
        url: list_url+"&openStartDt="+ j +"&openEndDt="+j+"&repNationCd="+nationCd[i],
        dataType:"json",
        success:function(data) {
            console.log(data);
            check_cnt++;
            console.log(j+"년 영화 수 : "+result[i-start_year]);
            if(check_cnt == nationCd.length * (end_year-start_year+1)) {
                draw(label_str,'line');
            }
            result[i][j] = data.movieListResult.totCnt;
            
        }
      })
    }  
    
  }
 
 
}

function genre(start_year,end_year,sel_genre) {
}

function draw(label_str,shape) {
    // 그래프로 표현 하기.
    if(first_time){
        first_time = false;
        console.log(first_time);
    }
    else{
        myLineChart.destroy();
        console.log(first_time);
    }

    myLineChart = new Chart(document.getElementById('line-chart').getContext('2d'),{
        type : shape,
        data :  {
          labels: standards,
          datasets: [
            {
              label: 'Dataset 1',
              data: result[0],
              borderColor: 'red',
              yAxisID: 'y',
            },
            {
              label: 'Dataset 2',
              data: result[1],
              borderColor: 'blue',
              yAxisID: 'y',
            },
            {
              label: 'Dataset 2',
              data: result[3],
              borderColor: 'blue',
              yAxisID: 'y',
            },
            {
              label: 'Dataset 2',
              data: result[4],
              borderColor: 'blue',
              yAxisID: 'y',
            }
          ]
        },
        options : {
            maintainAspectRatio : false, // 기본 비율 유지
            bezierCurve: true
        }
    });

    
} 
  
function draw2() {
    const config = {
        type: 'line',
        data: data,
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Chart.js Line Chart'
            }
          }
        },
      };

}
// 그래프 모양 바뀔 때마다 바꿔주기
function shape(nothing) {
    if (first_time){
        return;
    }
    let graph = $("input[name='chart']:checked").val(); // 그래프 모양
    draw(label_str,graph);
}
