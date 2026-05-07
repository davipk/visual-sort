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

class SortPanel extends React.Component<SortPanelProps, SortPanelState> {

    private selectedAlgorithm: Sortable;

    constructor(props: SortPanelProps) {
        super(props);

        this.selectedAlgorithm = props.algorithm;

        this.state = {
            array: [],
            width: window.innerWidth,
            height: window.innerHeight
        };
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    public setAlgorithm(algo: Sortable): void {
        this.selectedAlgorithm = algo;
    }

    /**
     * Returns the per-step delay in milliseconds, derived from the speed prop
     * (1 = slowest, 10 = fastest).
     */
    public getSpeed(): number {
        const speed = this.props.speed;
        const clamped = Math.max(1, Math.min(10, speed));
        // Map 1..10 to 60ms..3ms (higher speed -> shorter delay)
        return Math.max(1, Math.round(63 - clamped * 6));
    }

    public componentDidMount(): void {
        window.addEventListener('resize', this.updateWindowDimensions);
        this.shuffleArray();
    }

    public componentWillUnmount(): void {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    public componentDidUpdate(prevProps: SortPanelProps): void {
        if (prevProps.elements !== this.props.elements) {
            this.shuffleArray();
        }
        if (prevProps.algorithm !== this.props.algorithm) {
            this.selectedAlgorithm = this.props.algorithm;
        }
    }

    private updateWindowDimensions(): void {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }

    public shuffleArray(): void {
        const { height } = this.state;
        const elements = this.props.elements;
        const array: Array<number> = [];
        // Reserve vertical space for the navbar, container padding, and a top margin.
        const RESERVED_VERTICAL_PX = 160;
        const step: number = Math.max(1, Math.floor((height - RESERVED_VERTICAL_PX) / elements));
        for (let i = 1; i <= elements; i++) {
            array.push(i * step);
        }
        array.sort(() => Math.random() - 0.5);
        this.setState({ array });
    }

    public doSort(): void {
        const action: Action = this.selectedAlgorithm.sort(this.state.array);
        action.animate(this);
    }

    public render() {
        const { array, width } = this.state;
        const gap = 2;
        const adjustedWidth = Math.max(1, (width - 40 - array.length * gap) / Math.max(1, array.length));
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

export default SortPanel;
