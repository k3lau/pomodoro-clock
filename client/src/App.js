import "./App.css";
import React, { Component } from "react";
import { TimerControl } from "./Component/TimerControl";
import { DisplayTimer } from "./Component/DisplayTimer";
import AddSetting from "./Component/AddSetting";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Layout,
  StyledRow,
  Paragraph,
  SettingWrapper,
  DisplayWrapper,
} from "./Component/TimerSetting.elements";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import uniqueId from "lodash.uniqueid";
import * as api from './api';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.defaultTimerList = [
      {
        id: uniqueId("id-"),
        name: "Session",
        order: 1,
        length: 25 * 60,
        edit: false,
      },
      {
        id: uniqueId("id-"),
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
    this.onDragEnd = this.onDragEnd.bind(this);
    this.setTimerItem = this.setTimerItem.bind(this);
    this.addTimer = this.addTimer.bind(this);
    this.setEdit = this.setEdit.bind(this);
    this.resetTimerSetting = this.resetTimerSetting.bind(this);
    this.loadProfile = this.loadProfile.bind(this);
  }


  componentDidMount() {
    let timerList = JSON.parse(localStorage.getItem('timerList'))
    if (timerList === null) {
      timerList = this.defaultTimerList
    }
    this.setState({
      timeLeft: timerList[0].length,
      timerList: timerList
    })
  }

  addTimer() {
    let defaultNewSetting = {
      id: uniqueId("id-"),
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

  resetTimerSetting() {
    const timerList = this.defaultTimerList
    this.setState({
      timeLeft: timerList[0].length,
      timerList: timerList
    })
    localStorage.clear();
  }

  loadProfile() {
    console.log("What")
    api.fetchTimerProfiles().then((res) => {
      console.log(res.data)
      const timers = res.data[0].timerList;
      console.log(timers)
      this.setState({
        timerList: timers,
      });
      localStorage.setItem('timerList', JSON.stringify(timers))
    })
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
    let items = Array.from(this.state.timerList);

    // update current time left
    let order = 0;
    if (destination.index + 1 === this.state.timerType) {
      order = source.index + 1
    }
    if (source.index + 1 === this.state.timerType) {
      order = destination.index + 1
    }

    if (order !== 0) {
      this.setState({
        timerType: order,
      })
    }

    const [reorderedItem] = items.splice(source.index, 1);
    items.splice(destination.index, 0, reorderedItem);
    items = items.map((item, index) => {
      let newItem = { ...item };
      newItem.order = index + 1
      return newItem
    })

    this.setState({
      timerList: items,
    });
    localStorage.setItem('timerList', JSON.stringify(items))
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
        <StyledRow>
          <AddSetting label="Add Setting" handleOnclick={this.addTimer} icon="fas fa-plus fa-sm"></AddSetting>
          <AddSetting label="Reset Setting" handleOnclick={this.resetTimerSetting} icon="fas fa-edit fa-sx"></AddSetting>
          <AddSetting label="Load Profile" handleOnclick={this.loadProfile} icon="fas fa-cloud-download-alt fa-sx"></AddSetting>
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
      </Layout>
    );
  }
}
