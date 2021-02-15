import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import {Responsive, WidthProvider} from "react-grid-layout";
import {Line} from 'react-chartjs-2'

const ResponsiveReactGridLayout = WidthProvider(Responsive);


const options = {
    scales: {
        xAxes: [{
            type: 'time',
            distribution: 'series'
        }]
    },
    maintainAspectRatio: false
}


export default class ShowcaseLayout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentBreakpoint: "lg",
            compactType: "vertical",
            mounted: false,
            layouts: {},
            data: [{
                x: new Date(),
                y: 11
            }, {
                x: new Date(),
                y: 10
            }],
            charts: ['apple', 'banana']
        };
        this.onBreakpointChange = this.onBreakpointChange.bind(this);
        this.onCompactTypeChange = this.onCompactTypeChange.bind(this);
        this.onLayoutChange = this.onLayoutChange.bind(this);
        this.onNewLayout = this.onNewLayout.bind(this);
        this.onAddDataClick = this.onAddDataClick.bind(this)
        this.onRemoveChart = this.onRemoveChart.bind(this)
        this.removeAtWill = this.removeAtWill.bind(this)
    }

    componentDidMount() {
        this.setState({mounted: true});
    }

    onRemoveChart(i) {
        console.log(i)
    }

    generateDOM() {
        let dataHere = this.state.data
        let lt = _.map(_.range(0, this.state.charts.length), function (item, i) {
            return {
                x: 0,
                y: 0,
                w: 10,
                h: 10,
                i: i.toString(),
                static: false
            };
        });
        this.state.layouts = {lg: lt}
        return this.state.layouts.lg.map((l, i) => {
            return (
                <div key={i} className={l.static ? "static" : ""}>
                    <Line
                        data={{
                            datasets: [{
                                type: 'line',
                                label: ['Temperature per time'],
                                data: dataHere,
                                backgroundColor: 'rgb(255, 99, 132)',
                                borderColor: 'rgb(255, 99, 132)',
                                borderWidth: 1
                            }]
                        }
                        }
                        width={400}
                        height={400}
                        options={options}
                        responsive={true}
                    />
                </div>
            )
        })
        // return _.map(this.state.layouts.lg, function(l, i) {
        //     return (
        //         <div key={i} className={l.static ? "static" : ""}>
        //             {l.static ? (
        //                 <span
        //                     className="text"
        //                     title="This item is static and cannot be removed or resized."
        //                 >
        //       Static - {i}
        //     </span>
        //             ) : (
        //                 <Line
        //                     data={{
        //                         datasets: [{
        //                             type: 'line',
        //                             label: ['Temperature per time'],
        //                             data: dataHere,
        //                             backgroundColor: 'rgb(255, 99, 132)',
        //                             borderColor: 'rgb(255, 99, 132)',
        //                             borderWidth: 1
        //                         }]
        //                     }
        //                     }
        //                     width={400}
        //                     height={400}
        //                     options={options}
        //                     responsive={true}
        //                 />
        //             )}
        //         </div>
        //     );
        // });

    }


    onBreakpointChange(breakpoint) {
        this.setState({
            currentBreakpoint: breakpoint
        });
    }

    removeAtWill() {
        console.log(1)
    }

    onCompactTypeChange() {
        const {compactType: oldCompactType} = this.state;
        const compactType =
            oldCompactType === "horizontal"
                ? "vertical"
                : oldCompactType === "vertical"
                ? null
                : "horizontal";
        this.setState({compactType});
    }

    onLayoutChange(layout, layouts) {
        this.props.onLayoutChange(layout, layouts);
    }

    onNewLayout() {
        // this.setState({
        //     layouts: {lg: this.generateLayout()}
        // });
    }

    onAddDataClick() {
        // this.setState({
        //     data: [...this.state.data, {
        //         x: new Date(),
        //         y: Math.ceil(Math.random() * 2) === 1 ? Math.floor(Math.random()  * 10) : undefined
        //     }]
        // })
        this.setState({
            charts: [...this.state.charts, "mango"]
        })
    }

    // generateLayout() {
    //     let data =
    //     return data
    // }

    render() {
        return (
            <div>
                <button onClick={this.onAddDataClick}>
                    Add Charts
                </button>
                <ResponsiveReactGridLayout
                    {...this.props}
                    layouts={this.state.layouts}
                    onBreakpointChange={this.onBreakpointChange}
                    onLayoutChange={this.onLayoutChange}
                    measureBeforeMount={false}
                    useCSSTransforms={this.state.mounted}
                    compactType={this.state.compactType}
                    preventCollision={!this.state.compactType}
                >
                    {this.generateDOM(this.removeAtWill)}
                </ResponsiveReactGridLayout>
            </div>
        );
    }


}

ShowcaseLayout.propTypes = {
    onLayoutChange: PropTypes.func.isRequired
};

ShowcaseLayout.defaultProps = {
    className: "layout",
    rowHeight: 30,
    onLayoutChange: function () {
    },
    cols: {lg: 12, md: 10, sm: 6, xs: 4, xxs: 2},
    initialLayout: null
};

