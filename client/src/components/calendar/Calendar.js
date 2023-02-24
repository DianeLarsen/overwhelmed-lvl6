import React, { Component } from "react";
import {
  DayPilot,
  DayPilotCalendar,
  DayPilotNavigator,
} from "@daypilot/daypilot-lite-react";
// import "./calendar.scss";

const styles = {
  wrap: {
    display: "flex",
  },
  left: {
    marginRight: "10px",
  },
  main: {
    flexGrow: "1",
  },
};

class Calendar extends Component {
  constructor(props) {
    super(props);

    this.calendarRef = React.createRef();
    this.state = {
      viewType: "Week",
      durationBarVisible: false,
      timeRangeSelectedHandling: "Enabled",
      onEventMoved: (args) => {
        
        console.log(args.e.data);
        this.props.setUpdateEvents(prev => ([...prev,{
          _id: args.e.data._id,
          
          start: args.e.data.start,
          end: args.e.data.end
        }]))
      },
      onTimeRangeSelected: async (args) => {
        
        const dp = this.calendar;
        const modal = await DayPilot.Modal.prompt(
          "Create a new event:",
          "Event 1"
        );
        dp.clearSelection();
        if (!modal.result) {
          return;
        }
   

        const start = args.start.value
        console.log(start)
        const end = args.end.value
          this.props.setNewEvents(        
            
              {id: DayPilot.guid(),
              text: modal.result,
              start: start,
              end: end,}
             );
             dp.events.add({
              start: args.start,
              end: args.end,
              id: DayPilot.guid(),
              text: modal.result
            });
          
    //  console.log(args.start.value)          
      },
      eventDeleteHandling: "Update",
      onEventClick: async (args) => {
        const dp = this.calendar;
        const colors = [
          { name: "Blue", id: "#3c78d8" },
          { name: "Green", id: "#6aa84f" },
          { name: "Yellow", id: "#f1c232" },
          { name: "Red", id: "#cc0000" },
        ];

        const form = [
          { name: "Text", id: "text" },
          { name: "Start", id: "start", type: "datetime" },
          { name: "End", id: "end", type: "datetime" },
          { name: "Color", id: "backColor", type: "select", options: colors },
        ];
        const modal = await DayPilot.Modal.form(form, args.e.data);
        if (modal.canceled) {
          return;
        }

this.props.setUpdateEvents(prev => ([...prev,{
  _id: modal.result._id,
  backColor: modal.result.backColor,
  text: modal.result.text,
  start: modal.result.start,
  end: modal.result.end
}]))

        dp.events.update(modal.result);
      },
    };
  }

  get calendar() {
    return this.calendarRef.current.control;
  }

  componentDidMount() {
    const events = this.props.events;
    console.log(this.props.events)
    const startDate = "2023-03-07";

    this.calendar.update({ startDate, events });
  }
  componentDidUpdate(){
    const events = this.props.events;
    console.log(this.props.events)
    const startDate = "2023-03-07";
    this.calendar.update({  startDate, events  })  
  }

  render() {
    return (
      <div className="calendar" style={styles.wrap}>
        <div style={styles.left}>
          <DayPilotNavigator
            selectMode={"week"}
            showMonths={2}
            skipMonths={2}
            startDate={"2023-03-07"}
            selectionDay={"2023-02-04"}
            onTimeRangeSelected={(args) => {
              this.calendar.update({
                startDate: args.day,
              });
            }}
          />
        </div>
        <div style={styles.main}>
          <DayPilotCalendar startDate={"2023-03-07"}{...this.state} ref={this.calendarRef} />
        </div>
      </div>
    );
  }
}

export default Calendar;
