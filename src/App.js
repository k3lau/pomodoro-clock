import "./App.css";
import React, { Component } from "react";
import { TimerControl } from "./Component/TimerControl";
import { DisplayTimer } from "./Component/DisplayTimer";
import AddSetting from "./Component/AddSetting";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Layout,
  StyledRow,
  StyledCol,
  Paragraph,
  SettingWrapper,
  DisplayWrapper,
  StyledDragDropContext,
  StyledDroppable
} from "./Component/TimerSetting.elements";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import uniqueId from "lodash.uniqueid";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.defaultTimerList = [
      {
        id: uniqueId(),
        name: "Session",
        order: 1,
        length: 25 * 60,
        edit: false,
      },
      {
        id: uniqueId(),
        name: "Break",
        order: 2,
        length: 5 * 60,
        edit: false,
      },
    ]

    this.state = {
      timeLeft: 1500,
      breakLength: 300,
      sessionLength: 1500,
      timerStatus: 0,
      timerType: 1,
      timerID: 0,
      timerList: this.defaultTimerList,
      dragID: 0,
      addStatus: 0,
    };

    this.setBreak = this.setBreak.bind(this);
    this.setSession = this.setSession.bind(this);
    this.setTimeLeft = this.setTimeLeft.bind(this);
    this.setTimerStatus = this.setTimerStatus.bind(this);
    this.setTimerType = this.setTimerType.bind(this);
    this.setTimerID = this.setTimerID.bind(this);
    this.setLength = this.setLength.bind(this);
    this.setTimerList = this.setTimerList.bind(this);
    this.handleDrag = this.handleDrag.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
    this.setTimerItem = this.setTimerItem.bind(this);
    this.setAddStatus = this.setAddStatus.bind(this);
    this.setEdit = this.setEdit.bind(this);
  }

  componentDidMount() {
    let timerList = JSON.parse(localStorage.getItem('timerList'))
    if (timerList === null) {
      timerList = this.defaultTimerList
    } else {

    }
    this.setState({ timerList : timerList});
  }

  setAddStatus() {
    const defaultNewSetting = {
      id: uniqueId(),
      name: "Session",
      order: this.state.timerList.length + 1,
      length: 5 * 60,
      edit: true,
    };
    const newList = [...this.state.timerList, defaultNewSetting]
    this.setState((state) => ({
      timerList: newList,
    }));
    localStorage.setItem('timerList', JSON.stringify(newList))
  }

  setEdit(item) {
    let timers = [...this.state.timerList];
    let index = timers.findIndex((x) => x.id === item.id);
    let newTimer = { ...timers[index] };
    newTimer.edit = !item.edit;
    timers[index] = newTimer;
    this.setState({
      timerList: timers,
    });
    localStorage.setItem('timerList', JSON.stringify(timers))
  }

  handleDrag(e) {
    this.setState({
      dragID: e.currentTarget.id,
    });
  }

  handleDrop(e) {
    let timers = [...this.state.timerList];
    if (
      typeof this.state.dragID === "undefined" ||
      typeof e.currentTarget.id === "undefined"
    ) {
      return null;
    }

    const dragBox = timers.find(
      (item) => item.order.toString() === this.state.dragID
    );
    const dropBox = timers.find(
      (item) => item.order.toString() === e.currentTarget.id
    );
    const dragBoxOrder = dragBox.order;
    const dropBoxOrder = dropBox.order;

    const newBoxState = timers.map((item) => {
      if (item.order.toString() === this.state.dragID) {
        item.order = dropBoxOrder;
      } else {
        if (item.order.toString() === e.currentTarget.id) {
          item.order = dragBoxOrder;
        }
      }
      return item;
    });
    const newTimerType = () => {
      if (
        this.state.timerType === dragBoxOrder ||
        this.state.timerType === dropBoxOrder
      ) {
        return this.state.timerType === dragBoxOrder
          ? dropBoxOrder
          : dragBoxOrder;
      } else {
        return null;
      }
    };

    newTimerType === null
      ? this.setState({
          timerList: newBoxState,
        })
      : this.setState({
          timerList: newBoxState,
          timerType: newTimerType,
        });
        localStorage.setItem('timerList', JSON.stringify(newBoxState))
  }

  setTimerItem(modifiedItem) {
    let timers = [...this.state.timerList];
    const newBoxState = timers.map((item) => {
      if (item.id === modifiedItem.id) {
        item = { ...modifiedItem };
      }
      return item;
    });
    this.setState({
      timerList: newBoxState,
    });
    localStorage.setItem('timerList', JSON.stringify(newBoxState))
  }

  setLength(id, time) {
    let timers = [...this.state.timerList];
    let index = timers.findIndex((item) => item.id === id);
    let timer = { ...timers[index] };
    timer.length = time;
    timers[index] = timer;
    this.setState({
      timerList: timers,
    });
    localStorage.setItem('timerList', JSON.stringify(timers))
  }

  setBreak(e) {
    this.setState({
      breakLength: e,
    });
  }

  setTimerList(e) {
    this.setState({
      timerList: e,
    });
    localStorage.setItem('timerList', JSON.stringify(e))
  }

  setSession(e) {
    this.setState({
      sessionLength: e,
    });
  }

  setTimeLeft(e) {
    this.setState((state, props) => ({
      timeLeft: e,
    }));
  }

  setTimerStatus(e) {
    this.setState({
      timerStatus: e,
    });
  }

  setTimerType(e) {
    this.setState({
      timerType: e,
    });
  }

  setTimerID(e) {
    this.setState({
      timerID: e,
    });
  }

  onDragEnd(result) {
    const { source, destination } = result;
    // dropped outside the list
    if (!destination) {
      return;
    }
    // reordering the list
    const items = Array.from(this.state.timerList);
    const [reorderedItem] = items.splice(source.index, 1);
    items.splice(destination.index, 0, reorderedItem);
    // update time left
    const timeLeft = items.find((item) => item.order === this.state.timerType);

    this.setState({
      timerList: items,
      timeLeft: timeLeft.length,
    });
  }

  render() {
    return (
      <Layout>
        <StyledRow>
          <h1>Pomodoro</h1>
        </StyledRow>
        <StyledRow>
          <Paragraph>- Kiet Lau -</Paragraph>
        </StyledRow>
        <StyledRow>
          <Paragraph>
            Podomoro timer built with ReactJS and styled-component
          </Paragraph>
        </StyledRow>
        <StyledRow>
          <AddSetting setAddStatus={this.setAddStatus}></AddSetting>
        </StyledRow>

        <StyledRow>
          <DragDropContext onDragEnd={this.onDragEnd}>
            <Droppable droppableId="timerSettings" direction="vertical">
              {(provided) => (
                <SettingWrapper
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {this.state.timerList.length > 0 ? (
                    this.state.timerList.map((item, index) => (
                      <Draggable
                        key={item.id}
                        draggableId={item.id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <TimerControl
                              item={item}
                              setTimeLeft={this.setTimeLeft}
                              setLength={this.setLength}
                              setTimerStatus={this.setTimerStatus}
                              setTimerType={this.setTimerType}
                              setTimerID={this.setTimerID}
                              setTimerList={this.setTimerList}
                              setTimerItem={this.setTimerItem}
                              timerList={this.state.timerList}
                              timerStatus={this.state.timerStatus}
                              timeLeft={this.state.timeLeft}
                              timerType={this.state.timerType}
                              timerID={this.state.timerID}
                              setEdit={this.setEdit}
                            ></TimerControl>
                          </div>
                        )}
                      </Draggable>
                    ))
                  ) : (
                    <div>Let's start adding timer</div>
                  )}
                  {provided.placeholder}
                </SettingWrapper>
              )}
            </Droppable>
          </DragDropContext>
        </StyledRow>
        <DisplayWrapper>
          <DisplayTimer
            setTimeLeft={this.setTimeLeft}
            setLength={this.setLength}
            setTimerStatus={this.setTimerStatus}
            setTimerType={this.setTimerType}
            setTimerID={this.setTimerID}
            setTimerList={this.setTimerList}
            timerList={this.state.timerList}
            timerStatus={this.state.timerStatus}
            timeLeft={this.state.timeLeft}
            timerType={this.state.timerType}
            timerID={this.state.timerID}
          ></DisplayTimer>
        </DisplayWrapper>
      </Layout>
    );
  }
}
