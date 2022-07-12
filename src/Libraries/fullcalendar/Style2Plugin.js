/*!
FullCalendar v5.10.2
Docs & License: https://fullcalendar.io/
(c) 2021 Adam Shaw
*/
//import './main.css';

import { __extends } from 'tslib';
import { Theme, createPlugin, memoize, createRef, createElement, DayHeader, DaySeriesModel, DayTableModel } from '@fullcalendar/common';
import { DayTable, TableView, buildDayTableModel, DayGridView } from '@fullcalendar/daygrid';

var LunarStyle2Theme = /** @class */ (function (_super) {
    __extends(LunarStyle2Theme, _super);
    function LunarStyle2Theme() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return LunarStyle2Theme;
}(Theme));

LunarStyle2Theme.prototype.classes = {
    root: 'fc-theme-lunar-style2',
    tableCellShaded: 'fc-theme-bootstrap5-shaded',
    buttonGroup: 'btn-group',
    button: 'btn btn-primary',
    buttonActive: 'active',
    popover: 'popover',
    popoverHeader: 'popover-header',
    popoverContent: 'popover-body',
};
LunarStyle2Theme.prototype.baseIconClass = 'bi';

LunarStyle2Theme.prototype.iconClasses = {
    close: 'bi-x-lg',
    prev: 'bi-chevron-left',
    next: 'bi-chevron-right',
    prevYear: 'bi-chevron-double-left',
    nextYear: 'bi-chevron-double-right',
};

LunarStyle2Theme.prototype.rtlIconClasses = {
    prev: 'bi-chevron-right',
    next: 'bi-chevron-left',
    prevYear: 'bi-chevron-double-right',
    nextYear: 'bi-chevron-double-left',
};
// wtf
LunarStyle2Theme.prototype.iconOverrideOption = 'buttonIcons'; // TODO: make TS-friendly
LunarStyle2Theme.prototype.iconOverrideCustomButtonOption = 'icon';
LunarStyle2Theme.prototype.iconOverridePrefix = 'bi-';


DayGridView.prototype.render = function(){
    var _this = this;
    var _a = this.context, options = _a.options, dateProfileGenerator = _a.dateProfileGenerator;
    var props = this.props;
    var dayTableModel = this.buildDayTableModel(props.dateProfile, dateProfileGenerator);
    var headerContent = options.dayHeaders && (createElement(DayHeader, { ref: this.headerRef, dateProfile: props.dateProfile, dates: dayTableModel.headerDates, datesRepDistinctDays: dayTableModel.rowCnt === 1 }));
    var bodyContent = function (contentArg) { return (createElement(DayTable, { ref: _this.tableRef, dateProfile: props.dateProfile, dayTableModel: dayTableModel, businessHours: props.businessHours, dateSelection: props.dateSelection, eventStore: props.eventStore, eventUiBases: props.eventUiBases, eventSelection: props.eventSelection, eventDrag: props.eventDrag, eventResize: props.eventResize, nextDayThreshold: options.nextDayThreshold, colGroupNode: contentArg.tableColGroupNode, tableMinWidth: contentArg.tableMinWidth, dayMaxEvents: options.dayMaxEvents, dayMaxEventRows: options.dayMaxEventRows, showWeekNumbers: options.weekNumbers, expandRows: !props.isHeightAuto, headerAlignElRef: _this.headerElRef, clientWidth: contentArg.clientWidth, clientHeight: contentArg.clientHeight, forPrint: props.forPrint })); };
    return options.dayMinWidth
        ? this.renderHScrollLayout(headerContent, bodyContent, dayTableModel.colCnt, options.dayMinWidth)
        : this.renderSimpleLayout(headerContent, bodyContent);

}
var plugin = createPlugin({
    themeClasses: {
        lunar_style2: LunarStyle2Theme,
    }
});

export default plugin;
export { LunarStyle2Theme };
//# sourceMappingURL=main.js.map
