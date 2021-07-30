
function draw_line() {
    close();
    console.log("draw! is first?" + first_time);
    let my_datasets = [];
  
    if (first_time) {
      first_time = false;
    }
    else {
      myChart.destroy();
    }
  
    // dataset 설정하기. 랜덤 색
    for (let i = 0; i < label.length; i++) {
      let color = '#' + Math.round(Math.random() * 0xffffff).toString(16);
      my_datasets[i] = {
        label: label[i],
        data: result[i],
        borderColor: color,
        borderWidth: '2',
        backgroundColor: 'white',
        hoverBackgroundColor: color,
      }
    }
  
    myChart = new Chart(document.getElementById('line-chart').getContext('2d'), {
      type: 'line',
      data: {
        labels: standards,
        datasets: my_datasets
      },
      options: {
        // hover: {
        //     animationDuration: 0
        // },
        // animation: {
        //     duration: 1,
        //     onComplete: function () {
        //         console.log(this);
        //         // var chartInstance = this.chart;
        //         var ctx = this.ctx;
        //         // ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, Chart.defaults.global.defaultFontStyle, Chart.defaults.global.defaultFontFamily);
        //         ctx.fillStyle = 'purple';
        //         ctx.textAlign = 'center';
        //         ctx.textBaseline = 'bottom';

        //         this.data.datasets.forEach(function (dataset, i) {
        //             console.log(dataset);
        //             console.log(+i);

        //             console.log(dataset);
        //             ctx.fillText(dataset.label + ':' + dataset.data[i] , 10+10*i, 20+5*i);

        //             // var meta = this.chart.getDatasetMeta(i);
        //             // meta.data.forEach(function (bar, index) {
        //             //     var data = dataset.data[index];							
        //             //     ctx.fillText(data, bar._model.x, bar._model.y - 5);
        //             // });

        //         });
        //     }
        //   },
        plugins: {
          tooltip: {
            enabled: false,
            external: function (context) {
              // Tooltip Element
              var tooltipEl = document.getElementById('chartjs-tooltip');
  
              // Create element on first render
              if (!tooltipEl) {
                tooltipEl = document.createElement('div');
                tooltipEl.id = 'chartjs-tooltip';
                tooltipEl.innerHTML = '<table class="ddd"></table>';
                document.body.appendChild(tooltipEl);
              }
  
              // Hide if no tooltip
              var tooltipModel = context.tooltip;
              if (tooltipModel.opacity === 0) {
                tooltipEl.style.opacity = 1;
  
                setTimeout(function () {
                  tooltipEl.style.opacity = 0;
                }, 3000);
                return;
              }
  
              // Set caret Position
              tooltipEl.classList.remove('above', 'below', 'no-transform');
              if (tooltipModel.yAlign) {
                tooltipEl.classList.add(tooltipModel.yAlign);
              } else {
                tooltipEl.classList.add('no-transform');
              }
  
              function getBody(bodyItem) {
                return bodyItem.lines;
              }
  
              // Set Text
              if (tooltipModel.body) {
                var bodyLines = tooltipModel.body.map(getBody);
  
                var innerHtml = '<thead>';
  
                bodyLines.forEach(function (body, i) {
                  var colors = tooltipModel.labelColors[i];
                  var style = 'background:' + colors.backgroundColor;
                  style += '; border-color:' + colors.borderColor;
                  style += '; border-width: 2px';
                  var span = '<span style="' + style + '"></span>';
                  innerHtml += '<tr><td>' + span + body + '</td></tr>';
                });
                innerHtml += '</tbody>';
  
                var tableRoot = tooltipEl.querySelector('table');
                tableRoot.innerHTML = innerHtml;
              }
  
              var position = context.chart.canvas.getBoundingClientRect();
              var bodyFont = Chart.helpers.toFont(tooltipModel.options.bodyFont);
  
              // Display, position, and set styles for font
              tooltipEl.style.opacity = 1;
              tooltipEl.style.color = 'white';
              tooltipEl.style.position = 'absolute';
              tooltipEl.style.left = position.left + window.pageXOffset + tooltipModel.caretX + 'px';
              tooltipEl.style.top = position.top + window.pageYOffset + tooltipModel.caretY + 'px';
              tooltipEl.style.font = bodyFont.string;
              //tooltipEl.style.padding = tooltipModel.padding + '10px ' + tooltipModel.padding + '10px';
              tooltipEl.style.pointerEvents = 'none';
            }
          }
        }
      },
    });
}
  
function draw_bar() {
    close();
    console.log("draw! is first?" + first_time);
    let my_datasets = [];
  
    if (first_time) {
      first_time = false;
    }
    else {
      myChart.destroy();
    }
  
    // dataset 설정하기. 랜덤 색
    for (let i = 0; i < label.length; i++) {
      let color = '#' + Math.round(Math.random() * 0xffffff).toString(16);
      my_datasets[i] = {
        label: label[i],
        data: result[i],
        borderColor: color,
        borderWidth: '2',
        backgroundColor: 'white',
        hoverBackgroundColor: color,
      }
    }
  
    myChart = new Chart(document.getElementById('line-chart').getContext('2d'), {
      type: 'bar',
      data: {
        labels: standards,
        datasets: my_datasets
      },
      options: {
        plugins: {
          tooltip: {
            // enabled: false,
            // external: function (context) {
            //   // Tooltip Element
            //   var tooltipEl = document.getElementById('chartjs-tooltip');
  
            //   // Create element on first render
            //   if (!tooltipEl) {
            //     tooltipEl = document.createElement('div');
            //     tooltipEl.id = 'chartjs-tooltip';
            //     tooltipEl.innerHTML = '<table class="ddd"></table>';
            //     document.body.appendChild(tooltipEl);
            //   }
  
            //   // Hide if no tooltip
            //   var tooltipModel = context.tooltip;
            //   if (tooltipModel.opacity === 0) {
            //     tooltipEl.style.opacity = 1;
  
            //     setTimeout(function () {
            //       tooltipEl.style.opacity = 0;
            //     }, 3000);
            //     return;
            //   }
  
            //   // Set caret Position
            //   tooltipEl.classList.remove('above', 'below', 'no-transform');
            //   if (tooltipModel.yAlign) {
            //     tooltipEl.classList.add(tooltipModel.yAlign);
            //   } else {
            //     tooltipEl.classList.add('no-transform');
            //   }
  
            //   function getBody(bodyItem) {
            //     return bodyItem.lines;
            //   }
  
            //   // Set Text
            //   if (tooltipModel.body) {
            //     var bodyLines = tooltipModel.body.map(getBody);
  
            //     var innerHtml = '<thead>';
  
            //     bodyLines.forEach(function (body, i) {
            //       var colors = tooltipModel.labelColors[i];
            //       var style = 'background:' + colors.backgroundColor;
            //       style += '; border-color:' + colors.borderColor;
            //       style += '; border-width: 2px';
            //       var span = '<span style="' + style + '"></span>';
            //       innerHtml += '<tr><td>' + span + body + '</td></tr>';
            //     });
            //     innerHtml += '</tbody>';
  
            //     var tableRoot = tooltipEl.querySelector('table');
            //     tableRoot.innerHTML = innerHtml;
            //   }
  
            //   var position = context.chart.canvas.getBoundingClientRect();
            //   var bodyFont = Chart.helpers.toFont(tooltipModel.options.bodyFont);
  
            //   // Display, position, and set styles for font
            //   tooltipEl.style.opacity = 1;
            //   tooltipEl.style.color = 'white';
            //   tooltipEl.style.position = 'absolute';
            //   tooltipEl.style.left = position.left + window.pageXOffset + tooltipModel.caretX + 'px';
            //   tooltipEl.style.top = position.top + window.pageYOffset + tooltipModel.caretY + 'px';
            //   tooltipEl.style.font = bodyFont.string;
            //   //tooltipEl.style.padding = tooltipModel.padding + '10px ' + tooltipModel.padding + '10px';
            //   tooltipEl.style.pointerEvents = 'none';
            // }
          }
        }
      },
    });
}

function draw_doughnut() {
    console.log("draw! is first?" + first_time);
    let my_datasets = [];
    let percent =[];

    // 배열 돌리기
    let reverse = new Array( end_year - start_year +1 );
    for (var i = 0; i <  end_year - start_year +1; i++) {
        reverse[i] = new Array(label.length);

        for (let j = 0; j < label.length; j++) {
            reverse[i][j] = result[j][i]; // 0으로 초기화
        }
    }

    for (var i = 0; i <  end_year - start_year +1; i++) {
        percent[i] = new Array(label.length);

        for (let j = 0; j < label.length; j++) {
            percent[i][j] = ( parseFloat(reverse[i][j]) /  parseFloat(reverse[i][label.length-1]) * 100).toFixed(2);       
        }
    }
 

    if (first_time) {
        first_time = false;
    }
    else {
        myChart.destroy();
    }

    // 랜덤 색 배열 만들어놓기.
    let bckColor = [];
    let hvbckColor = [];
    for (let i = 0; i < label.length; i++) {
        let r = getRand(0, 255),
        g = getRand(0, 255),
        b = getRand(0, 255),
        a = 0.1;

        let rgba = 'rgba' + '(' + r + ',' + g + ',' + b + ',' + a + ')';
        let rgb = 'rgb' + '(' + r + ',' + g + ',' + b + ')';

        bckColor.push(rgba);
        hvbckColor.push(rgb);
    }

    // dataset 설정하기
    for (let i = 0; i <  end_year - start_year +1 ; i++) {
        my_datasets[i] = {
            label: standards[standards.length-1-i],
            data: reverse[standards.length-1-i],
            borderColor: hvbckColor,
            borderWidth: '1',
            backgroundColor: bckColor,
            hoverBackgroundColor: hvbckColor,
            footer: percent[standards.length-1-i]
        }
    }

    myChart = new Chart(document.getElementById('line-chart').getContext('2d'), {
        type: 'doughnut',
        data: {
            labels: label,
            datasets: my_datasets
        },
        options: {
            plugins: {
                tooltip: {
                    callbacks: {
                        // 기존 상태에선 연도가 안떠서 연도 띄워주기.
                        title: function(context) {
                            return context[0].dataset.label;
                        },
                        label: function(context) {
                            return context.label + ':' + context.formattedValue;
                        },
                        footer: function(context) {
                            console.log(context);
                            return context[0].dataset.footer[context[0].dataIndex] + '%';
                        }
                    } 
                },
            }
        }
    });
}

function getRand(min, max) {
    if (min >= max) return false;
    return ~~(Math.random() * (max - min + 1)) + min;
};

// 그래프 모양 바뀔 때마다 바꿔주기
function shape(nothing) {
    if (first_time) {
        return;
    }
    let graph = $("input[name='chart']:checked").val(); // 그래프 모양

    switch(graph) {
        case 'line':
            draw_line();
            break;
        case 'bar':
            draw_bar();
            break;
        case 'pie':
            draw_doughnut();
            break;
    }
}
