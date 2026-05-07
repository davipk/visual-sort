import React, { RefObject } from 'react';
import './App.css';
import SortPanel from './components/sortPanel';
import BubbleSort from './algorithm/sort/bubbleSort';
import NavBar from './components/navBar';
import { Sortable } from './algorithm/algorithm';

interface AppState {
  algorithm: Sortable;
  elements: number;
  speed: number;
}

class App extends React.Component<{}, AppState> {

  private sortPanel: RefObject<SortPanel | null> = React.createRef();

  constructor(props: {}) {
    super(props);
    this.state = {
      algorithm: new BubbleSort(),
      elements: 100,
      speed: 5
    };
  }

  /**
   * Selects the algorithm to use.
   * @param algo Selected algorithm.
   */
  public selectAlgorithm(algo: Sortable): void {
    this.setState({ algorithm: algo });
    const panel: SortPanel | null = this.sortPanel.current;
    if (panel) {
      panel.setAlgorithm(algo);
    }
  }

  /**
   * Resets the array.
   */
  public onReset(): void {
    const panel: SortPanel | null = this.sortPanel.current;
    if (panel) {
      panel.shuffleArray();
    }
  }

  /**
   * Sorts the array.
   */
  public onSort(): void {
    const panel: SortPanel | null = this.sortPanel.current;
    if (panel) {
      panel.doSort();
    }
  }

  /**
   * Updates the number of elements to sort.
   */
  public onElementsChange(elements: number): void {
    this.setState({ elements });
  }

  /**
   * Updates the animation speed (1 = slowest, 10 = fastest).
   */
  public onSpeedChange(speed: number): void {
    this.setState({ speed });
  }

  public render() {
    const { algorithm, elements, speed } = this.state;
    return (
      <div className="App">
        <NavBar
          algorithm={algorithm}
          elements={elements}
          speed={speed}
          doReset={this.onReset.bind(this)}
          doSort={this.onSort.bind(this)}
          setAlgo={this.selectAlgorithm.bind(this)}
          setElements={this.onElementsChange.bind(this)}
          setSpeed={this.onSpeedChange.bind(this)}
        />
        <SortPanel
          ref={this.sortPanel}
          algorithm={algorithm}
          elements={elements}
          speed={speed}
        />
      </div>
    );
  }
}

export default App;
