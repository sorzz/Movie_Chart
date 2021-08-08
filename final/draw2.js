
// function draw_line() {
//     close();
//     console.log("draw! is first?" + first_time);
//     let my_datasets = [];
  
//     if (first_time) {
//       first_time = false;
//     }
//     else {
//       myChart.destroy();
//     }
  

//     // 색상 리스트
//     let color_list = ['#F8CB25', '#E04622', '#AB31F7', '#229DE0', '#0CFF19', '#FAEA99', '#E69077', '#C45FFA', '#4BAFE3', '#93FF91'];

//     // dataset 설정하기. 랜덤 색
//     for (let i = 0; i < label.length; i++) {
//       if(i==label.length-1){ // 전체일땐 색 검정으로 해줄랭.
//         my_datasets[i] = {
//           label: label[i],
//           data: result[i],
//           borderColor: '#333333',
//           borderWidth: '2',
//           backgroundColor: 'white',
//           hoverBackgroundColor: '#333333',
//         }  
//       }
//       else {
//         my_datasets[i] = {
//           label: label[i],
//           data: result[i],
//           borderColor: color_list[i],
//           borderWidth: '2',
//           backgroundColor: 'white',
//           hoverBackgroundColor: color_list[i],
//         }
//       }
//     }

//     var ctx = document.getElementById('line-chart').getContext('2d');
  
//     myChart = new Chart(ctx, {
//         type: 'line',
// 	    data: {
// 			labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
// 			datasets: [{
// 				label: '# of Votes',
// 				data: [12, 19, 3, 5, 2, 3],
// 				backgroundColor: [
// 						'rgba(0, 0, 0, 0)'
// 				],
// 				borderColor: [
// 						'rgba(255, 99, 132, 1)',
// 						'rgba(54, 162, 235, 1)',
// 						'rgba(255, 206, 86, 1)',
// 						'rgba(75, 192, 192, 1)',
// 						'rgba(153, 102, 255, 1)',
// 						'rgba(255, 159, 64, 1)'
// 				],
// 				borderWidth: 2
// 			}]
// 		},
// 		options: {
// 			responsive: false,
// 			tooltips: {
// 				enabled: false
// 			},
// 			hover: {
// 				animationDuration: 0
// 			},
// 			animation: {
// 				duration: 1,
// 				onComplete: function () {
// 					// ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, Chart.defaults.global.defaultFontStyle, Chart.defaults.global.defaultFontFamily);
// 					ctx.fillStyle = 'purple';
// 					ctx.textAlign = 'center';
// 					ctx.textBaseline = 'bottom';

// 					this.data.datasets.forEach(function (dataset, i) {
// 						var meta = ctx.controller.getDatasetMeta(i);
// 						meta.data.forEach(function (bar, index) {
// 							var data = dataset.data[index];							
// 							ctx.fillText(data, bar._model.x, bar._model.y - 5);
// 						});
// 					});
// 				}
// 			},
// 			scales: {
// 				yAxes: [{
// 					ticks: {
// 						beginAtZero: true,
// 						stepSize : 2,
// 						fontSize : 14,
// 					}
// 				}]
// 			}
// 		}
// 	});
// }
  
// function draw_bar() {
//     close();
//     console.log("draw! is first?" + first_time);
//     let my_datasets = [];
  
//     if (first_time) {
//       first_time = false;
//     }
//     else {
//       myChart.destroy();
//     }
  
//     // dataset 설정하기. 랜덤 색
//     for (let i = 0; i < label.length; i++) {
//       let color = '#' + Math.round(Math.random() * 0xffffff).toString(16);
//       my_datasets[i] = {
//         label: label[i],
//         data: result[i],
//         borderColor: color,
//         borderWidth: '2',
//         backgroundColor: 'white',
//         hoverBackgroundColor: color,
//       }
//     }
  
//     myChart = new Chart(document.getElementById('line-chart').getContext('2d'), {
//       type: 'bar',
//       data: {
//         labels: standards,
//         datasets: my_datasets
//       },
//       options: {
//         plugins: {
//           tooltip: {
            
//           }
//         }
//       },
//     });
// }

// function draw_doughnut() {
//     console.log("draw! is first?" + first_time);
//     let my_datasets = [];
//     let percent =[];

//     // 배열 돌리기
//     let reverse = new Array( end_year - start_year +1 );
//     for (var i = 0; i <  end_year - start_year +1; i++) {
//         reverse[i] = new Array(label.length);

//         for (let j = 0; j < label.length; j++) {
//             reverse[i][j] = result[j][i]; // 0으로 초기화
//         }
//     }

//     for (var i = 0; i <  end_year - start_year +1; i++) {
//         percent[i] = new Array(label.length);

//         for (let j = 0; j < label.length; j++) {
//             percent[i][j] = ( parseFloat(reverse[i][j]) /  parseFloat(reverse[i][label.length-1]) * 100).toFixed(2);       
//         }
//     }
 

//     if (first_time) {
//         first_time = false;
//     }
//     else {
//         myChart.destroy();
//     }

//     // 랜덤 색 배열 만들어놓기.
//     let bckColor = [];
//     let hvbckColor = [];
//     for (let i = 0; i < label.length; i++) {
//         let r = getRand(0, 255),
//         g = getRand(0, 255),
//         b = getRand(0, 255),
//         a = 0.1;

//         let rgba = 'rgba' + '(' + r + ',' + g + ',' + b + ',' + a + ')';
//         let rgb = 'rgb' + '(' + r + ',' + g + ',' + b + ')';

//         bckColor.push(rgba);
//         hvbckColor.push(rgb);
//     }

//     // dataset 설정하기
//     for (let i = 0; i <  end_year - start_year +1 ; i++) {
//         my_datasets[i] = {
//             label: standards[standards.length-1-i],
//             data: reverse[standards.length-1-i],
//             borderColor: hvbckColor,
//             borderWidth: '1',
//             backgroundColor: bckColor,
//             hoverBackgroundColor: hvbckColor,
//             footer: percent[standards.length-1-i]
//         }
//     }

//     myChart = new Chart(document.getElementById('line-chart').getContext('2d'), {
//         type: 'doughnut',
//         data: {
//             labels: label,
//             datasets: my_datasets
//         },
//         options: {
//             plugins: {
//                 tooltip: {
//                     callbacks: {
//                         // 기존 상태에선 연도가 안떠서 연도 띄워주기.
//                         title: function(context) {
//                             return context[0].dataset.label;
//                         },
//                         label: function(context) {
//                             return context.label + ':' + context.formattedValue;
//                         },
//                         footer: function(context) {
//                             console.log(context);
//                             return context[0].dataset.footer[context[0].dataIndex] + '%';
//                         }
//                     } 
//                 },
//             }
//         }
//     });
// }

// function getRand(min, max) {
//     if (min >= max) return false;
//     return ~~(Math.random() * (max - min + 1)) + min;
// };

// // 그래프 모양 바뀔 때마다 바꿔주기
// function shape(nothing) {
//     if (first_time) {
//         return;
//     }
//     let graph = $("input[name='chart']:checked").val(); // 그래프 모양

//     switch(graph) {
//         case 'line':
//             draw_line();
//             break;
//         case 'bar':
//             draw_bar();
//             break;
//         case 'pie':
//             draw_doughnut();
//             break;
//     }
// }
