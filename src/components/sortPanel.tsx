import React from 'react';
import { Sortable, Action } from '../algorithm/algorithm';
import './sortPanel.css';

export interface SortPanelProps {
    algorithm: Sortable,
    elements: number,
    speed: number
}

interface SortPanelState {
    array: Array<number>,
    width: number,
    height: number
}

class SortPanel extends React.Component<{}, SortPanelState> {

    private selectedAlgorithm: Sortable;
    private elements: number;
    private speed: number;

    constructor(props: SortPanelProps) {
        super(props);

        this.selectedAlgorithm = props.algorithm;
        this.elements = props.elements;
        this.speed = props.speed;

        this.state = {
            array: [],
            width: window.innerWidth,
            height: window.innerHeight
        };
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    public setAlgorithm(algo: Sortable): void {
        console.log(algo.getName())
        this.selectedAlgorithm = algo;
    }

    public getSpeed(): number {
        return this.speed;
    }

    public componentDidMount(): void {
        window.addEventListener('resize', this.updateWindowDimensions);
        this.shuffleArray();
    }

    public componentWillUnmount(): void {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    private updateWindowDimensions(): void {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }

    public shuffleArray(): void {
        const { height } = this.state;
        const array: Array<number> = [];
        const step: number = Math.floor((height - 100) / this.elements);
        for (let i = 1; i <= this.elements; i++) {
            array.push(i * step);
        }
        array.sort(() => Math.random() - 0.5);
        /*for (let i = 0; i < this.elements; i++) {
            array.push(randomIntFromInterval(10, this.state.height - 100));
        }*/
        this.setState({ array });
    }

    public doSort(): void {
        const action: Action = this.selectedAlgorithm.sort(this.state.array);
        action.animate(this);
    }

    public render() {
        const { array, width } = this.state;
        const adjustedWidth = (width - array.length * 3) / array.length;
        return (
            <div className="array-container">
                {array.map((value, index) => (
                    <div
                        className="array-bar"
                        key={index}
                        style={{ width: `${adjustedWidth}px`, height: `${value}px` }}
                    >
                    </div>
                ))}
            </div>
        );
    }
}

function randomIntFromInterval(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export default SortPanel;