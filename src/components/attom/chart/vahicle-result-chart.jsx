import ReactApexCharts from 'react-apexcharts'

const VahicleResultChart = ({ scoreData }) => {
    const options = {
        plotOptions: {
            radialBar: {
                startAngle: -135,
                endAngle: 135,
                dataLabels: {
                    name: {
                        fontSize: '16px',
                        color: scoreData < 40 ? "#DF2040" : scoreData < 60 ? "#F87F06" : scoreData < 80 ? "#57A8FF" : "#0AA643",
                        offsetY: 10
                    },
                    value: {
                        offsetY: 45,
                        fontSize: '16px',
                        color: undefined,
                        formatter: function (val) {
                            return '100' + '/' + val;
                        }
                    }
                }
            }
        },

        fill: {
            colors: [scoreData < 40 ? "#DF2040" : scoreData < 60 ? "#F87F06" : scoreData < 80 ? "#57A8FF" : "#0AA643"]
        },

        labels: [scoreData < 40 ? "ضعیف" : scoreData < 60 ? "متوسط" : scoreData < 80 ? "خوب" : "عالی"],

        chart: {
            width: '250',
            fontFamily: 'IranSans'
        }
    };


    return (
        <ReactApexCharts
            type="radialBar"
            series={scoreData}
            options={options}
            width='250'
        />
    )

};

export default VahicleResultChart