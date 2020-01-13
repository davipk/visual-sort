import React, { RefObject } from 'react';
import './App.css';
import SortPanel from './components/sortPanel';
import BubbleSort from './algorithm/sort/bubbleSort';
import NavBar from './components/navBar';
import { Sortable } from './algorithm/algorithm';

const globalProps: any = {
  algorithm: new BubbleSort(),
  elements: 100,
  speed: 1
};

class App extends React.Component {

  private sortPanel: RefObject<SortPanel> = React.createRef();

  /**
   * Selects the algorithm to use.
   * @param algo Selected algorithm.
   */
  public selectAlgorithm(algo: Sortable): void {
    const panel: SortPanel | null = this.sortPanel.current;
    if (panel) {
      panel.setAlgorithm(algo);
    } else {
      alert('Cannot find the panel.');
    }
  }

  /**
   * Resets the array.
   */
  public onReset(): void {
    const panel: SortPanel | null = this.sortPanel.current;
    if (panel) {
      panel.shuffleArray();
    } else {
      alert('Cannot find the panel.');
    }
  }

  /**
   * Sorts the array.
   */
  public onSort(): void {
    const panel: SortPanel | null = this.sortPanel.current;
    if (panel) {
      panel.doSort();
    } else {
      alert('Cannot find the panel.');
    }
  }

  public render() {
    return (
      <div className="App">
        <NavBar {...globalProps} doReset={this.onReset.bind(this)} doSort={this.onSort.bind(this)} setAlgo={this.selectAlgorithm.bind(this)} />
        <SortPanel ref={this.sortPanel} {...globalProps} />
      </div>
    );
  }
}

export default App;
