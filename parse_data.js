// 이제 장르별 국가별로 세부 라인 작성.



let list_url = "http://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieList.json?key=f5eef3421c602c6cb7ea224104795888";
let info_url = "http://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieInfo.json?key=f5eef3421c602c6cb7ea224104795888";

var result;
let standards;
let label_str;

let first_time = true;
let totalcnt;
var check_cnt=0;

let alert_err = false;


function year(start_year,end_year,country) { // 연도 기준에 기간이랑 국가 장르 다 적용했음!
    result=[0,0,0,0,0,0,0,0,0,0,0,0,0];
    standards=[];
    label_str = '연도별 영화 수';
    check_cnt=0;
    totalcnt=[];
    let sum_cnt=0;

    result.length = end_year-start_year+1;
    for(let i=start_year; i<=end_year; i++) {
        $.ajax({
            method: "GET",
            url: list_url+"&openStartDt="+ i +"&openEndDt="+i,
            dataType:"json",
            success:function(data) {
                console.log(data);

                // 순서대로 들어가게 하기 위해서 이렇게 함.. 
                result[i-start_year] = data.movieListResult.totCnt;
                standards[i-start_year] = i;
                check_cnt++;
                console.log(i+"년 영화 수 : "+result[i-start_year]);
                if(check_cnt == end_year-start_year+1) {
                    // 이렇게 막무가내로 다 채워졌는지 체크해야할까..?
                    draw(label_str,'bar');
                }
            }
        })
    }
}

function nation(start_year,end_year,sel_genre){  // 국가별 분류는 나라 필요없음 인자로. 항상 전체로 설정되게 함.
    year(start_year,end_year,sel_genre);

    for(let i=0; i<result.length; i++) {
        result[i] = 100;
    }
    draw2();
}

function genre(start_year,end_year,sel_genre) {
    year(start_year,end_year,sel_genre);
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
        data : {
            labels : standards,
            datasets : [
                {
                    label :label_str,
                    data: result,
                    backgroundColor: 'rgba(255,255,255, 0.335)',
                    borderColor: 'rgba(255, 192, 56, 0.335)',
                    borderWidth : 2
                }]
            },
        options : {
            maintainAspectRatio : false, // 기본 비율 유지
            bezierCurve: true
        }
    });

    
}
const DATA_COUNT = 7;
const NUMBER_CFG = {count: DATA_COUNT, min: -100, max: 100};

const labels = Utils.months({count: 7});
const data = {
  labels: labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: Utils.numbers(NUMBER_CFG),
      borderColor: Utils.CHART_COLORS.red,
      backgroundColor: Utils.transparentize(Utils.CHART_COLORS.red, 0.5),
    },
    {
      label: 'Dataset 2',
      data: Utils.numbers(NUMBER_CFG),
      borderColor: Utils.CHART_COLORS.blue,
      backgroundColor: Utils.transparentize(Utils.CHART_COLORS.blue, 0.5),
    }
  ]
};

const actions = [
    {
      name: 'Randomize',
      handler(chart) {
        chart.data.datasets.forEach(dataset => {
          dataset.data = Utils.numbers({count: chart.data.labels.length, min: -100, max: 100});
        });
        chart.update();
      }
    },
    {
      name: 'Add Dataset',
      handler(chart) {
        const data = chart.data;
        const dsColor = Utils.namedColor(chart.data.datasets.length);
        const newDataset = {
          label: 'Dataset ' + (data.datasets.length + 1),
          backgroundColor: Utils.transparentize(dsColor, 0.5),
          borderColor: dsColor,
          data: Utils.numbers({count: data.labels.length, min: -100, max: 100}),
        };
        chart.data.datasets.push(newDataset);
        chart.update();
      }
    },
    {
      name: 'Add Data',
      handler(chart) {
        const data = chart.data;
        if (data.datasets.length > 0) {
          data.labels = Utils.months({count: data.labels.length + 1});
  
          for (var index = 0; index < data.datasets.length; ++index) {
            data.datasets[index].data.push(Utils.rand(-100, 100));
          }
  
          chart.update();
        }
      }
    },
    {
      name: 'Remove Dataset',
      handler(chart) {
        chart.data.datasets.pop();
        chart.update();
      }
    },
    {
      name: 'Remove Data',
      handler(chart) {
        chart.data.labels.splice(-1, 1); // remove the label first
  
        chart.data.datasets.forEach(dataset => {
          dataset.data.pop();
        });
  
        chart.update();
      }
    }
  ];
  
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
