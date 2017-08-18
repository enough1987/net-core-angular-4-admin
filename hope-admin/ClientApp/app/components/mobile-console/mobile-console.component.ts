import { Component } from '@angular/core';


@Component({
  templateUrl: './mobile-console.component.html'
})
export class MobileConsoleComponent {

  socket:any;
  sessions:any = [];
  activeSession:any;
  sessionSearch: string = "";
  tabSearch: string = "";
  activeConsoleTab: string;
  private consoleServer: string = "http://ec2-52-59-169-152.eu-central-1.compute.amazonaws.com:3001";
  private consoleServerLocal: string = "http://localhost:3001";

  ngOnInit() {
    this.connectConsole();
  }

  ngOnDestroy() {
    this.socket.disconnect();
  }

  // init websocket connection 
  private connectConsole(): void {

    let _window:any = window;
    this.socket = _window.io(this.consoleServerLocal, {
      path: '/api/mobile-console'
    });

    this.socket.on('update', (msg:any) => {
      console.log(' update: ', msg, this.activeSession);
      if (!msg) return;
      if (msg.update === 'sessions' && Array.isArray(msg.items)) {
        msg.items.forEach((item:any) => {
          this.sessions.forEach((session:any) => {
            if (session.sessionId === item.sessionId && session.type === 'active') session.type = 'closed';
          });
        });
        this.addToList(this.sessions, msg.items);
      }
      if (msg.update === 'logs' && this.activeSession && this.activeSession.sessionId == msg.sessionId &&
        Array.isArray(msg.items)) {
        if (!this.activeSession.logs) this.activeSession.logs = [];
        this.addToList(this.activeSession.logs, msg.items);
      }
      if (msg.update === 'states' && this.activeSession && this.activeSession.sessionId == msg.sessionId &&
        Array.isArray(msg.items)) {
        if (!this.activeSession.states) this.activeSession.states = [];
        this.addToList(this.activeSession.states, msg.items);
      }
    });

    this.socket.on('close-session', (msg:any) => {
      if (!msg) return;
      this.sessions.filter((session:any) => {
        if (session.sessionId === msg.sessionId && session.type === 'active') session.type = 'closed';
      });
    });

    this.socket.on('sessions', (msg:any) => {
      console.log('sessions : ', msg);
      if (!msg || !Array.isArray(msg.sessions)) return;
      this.removeOldFromList(this.sessions, msg.date);
      this.sessions.length = 0;
      this.sessions.unshift(...msg.sessions);
    });

    this.socket.on('logs', (msg:any) => {
      console.log('logs : ', msg);
      this.addToActiveSession(msg, 'logs');
    });

    this.socket.on('states', (msg:any) => {
      console.log('states : ', msg);
      this.addToActiveSession(msg, 'states');
    });

  }

  // 
  private removeOldFromList(list:any, date:any ):void {
    for (let i = list.length - 1; 0 < i; i--) {
      //if( list[i].timeStamp + 1000*10 < + new Date() ) list.splice(i, 1);
      if (list[i].timeStamp + 1000*60*60*20 < date ) list.splice(i, 1);
    }
  };

  // add new items to active session logs, states ...
  private addToActiveSession(msg:any, propName: string): void {
    if (!this.activeSession || !msg || !Array.isArray(msg[propName])) return;
    if (!this.activeSession[propName]) this.activeSession[propName] = [];
    this.activeSession[propName].length = 0;
    this.activeSession[propName].unshift(...msg[propName]);
    console.log(propName + ' : ', this.activeSession[propName].length);
  }

  // add items to array
  private addToList(list: Array<any>, items: Array<any>): void {
    console.log(items);
    list.unshift(...items);
  }

  // filter lists before showing
  filter(arr: Array<any>, targ: string, search: string): Array<any> {
    if (!search || !Array.isArray(arr)) return arr || [];
    let newArr = arr.filter((item) => {
      return item[targ] && item[targ].toLowerCase().indexOf(search.toLowerCase()) != -1;
    });
    return newArr;
  }

  // activate tab of active session
  activateConsoleTab(activeConsoleTab: string): void {
    console.log(" activeConsoleTab ", activeConsoleTab);
    this.activeConsoleTab = activeConsoleTab;
  }

  // test function / for adding value
  addToConsoleList(targetEmit: string, value:any): void {
    console.log(' addToConsoleList ', targetEmit, this.activeSession);
    if (targetEmit === 'session') this.socket.emit(targetEmit, [{ sessionId: value, type: 'active' }]); // active, closed, exception
    if (targetEmit === 'log' || targetEmit == 'state') this.socket.emit(targetEmit, [
      { sessionId: this.activeSession ? this.activeSession.sessionId : null, value: value }
    ]);
  }

  // select session
  selectSession(selectSession:any): void {
    this.sessions.forEach((session:any) => session.isActive = false);
    selectSession.isActive = true;
    this.activeSession = selectSession;
  }

  // init searcg for session
  setSessionSearch(val: string): void {
    this.sessionSearch = val;
  }

  // init searcg for logs, states ...
  setTabSearch(val: string): void {
    this.tabSearch = val;
  }

}
