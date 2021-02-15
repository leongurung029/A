import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import { Responsive, WidthProvider } from "react-grid-layout";
const ResponsiveReactGridLayout = WidthProvider(Responsive);

export default class ShowcaseLayout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentBreakpoint: "lg",
            compactType: "vertical",
            mounted: false,
            layouts: { lg: props.initialLayout }
        };

        this.onBreakpointChange = this.onBreakpointChange.bind(this);
        this.onCompactTypeChange = this.onCompactTypeChange.bind(this);
        this.onLayoutChange = this.onLayoutChange.bind(this);
        this.onNewLayout = this.onNewLayout.bind(this);
    }

    componentDidMount() {
        this.setState({ mounted: true });
    }

    generateDOM() {
        return _.map(this.state.layouts.lg, function(l, i) {
            return (
                <div key={i} className={l.static ? "static" : ""}>
                    {l.static ? (
                        <span
                            className="text"
                            title="This item is static and cannot be removed or resized."
                        >
              Static - {i}
            </span>
                    ) : (
                        <span className="text">picture</span>
                    )}
                </div>
            );
        });
    }

    onBreakpointChange(breakpoint) {
        this.setState({
            currentBreakpoint: breakpoint
        });
    }

    onCompactTypeChange() {
        const { compactType: oldCompactType } = this.state;
        const compactType =
            oldCompactType === "horizontal"
                ? "vertical"
                : oldCompactType === "vertical"
                ? null
                : "horizontal";
        this.setState({ compactType });
    }

    onLayoutChange(layout, layouts) {
        this.props.onLayoutChange(layout, layouts);
    }

    onNewLayout() {
        this.setState({
            layouts: { lg: generateLayout() }
        });
    }

    render() {
        return (
            <div>
                <ResponsiveReactGridLayout
                    {...this.props}
                    layouts={this.state.layouts}
                    onBreakpointChange={this.onBreakpointChange}
                    onLayoutChange={this.onLayoutChange}
                    // WidthProvider option
                    measureBeforeMount={false}
                    // I like to have it animate on mount. If you don't, delete `useCSSTransforms` (it's default `true`)
                    // and set `measureBeforeMount={true}`.
                    useCSSTransforms={this.state.mounted}
                    compactType={this.state.compactType}
                    preventCollision={!this.state.compactType}
                >
                    {this.generateDOM()}
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
    onLayoutChange: function() {},
    cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
    initialLayout: generateLayout()
};

function generateLayout() {
    let data =  _.map(_.range(0, 2), function(item, i) {
        var y = Math.ceil(Math.random() * 4) + 1;
        return {
            x: 0,
            y: 0,
            w: 2,
            h: 4,
            i: i.toString(),
            static: Math.random() < 0.05
        };
    });
    return data
}
