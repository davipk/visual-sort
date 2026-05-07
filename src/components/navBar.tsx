import * as React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, NavDropdown, Button, Form } from 'react-bootstrap';
import { Sortable } from '../algorithm/algorithm';

import BubbleSort from '../algorithm/sort/bubbleSort';
import BubbleSortOptimized from '../algorithm/sort/bubbleSortOptimized';
import InsertionSort from '../algorithm/sort/insertionSort';
import MergeSort from '../algorithm/sort/mergeSort';
import QuickSort from '../algorithm/sort/quickSort';
import SelectionSort from '../algorithm/sort/selectionSort';
import StalinSort from '../algorithm/sort/stalinSort';

interface NavBarProps {
    algorithm: Sortable,
    elements: number,
    speed: number,
    setAlgo(algo: Sortable): void,
    setElements(elements: number): void,
    setSpeed(speed: number): void,
    doReset(): void,
    doSort(): void
}

class NavBar extends React.Component<NavBarProps> {

    private algorithms: Array<Sortable>;

    constructor(props: NavBarProps) {
        super(props);

        this.algorithms = [];
        //Define menu items here
        this.algorithms.push(new BubbleSort());
        this.algorithms.push(new BubbleSortOptimized());
        this.algorithms.push(new InsertionSort());
        this.algorithms.push(new MergeSort());
        this.algorithms.push(new QuickSort());
        this.algorithms.push(new SelectionSort());
        this.algorithms.push(new StalinSort());

    }

    private changeAlgorithm(algo: Sortable): void {
        this.props.setAlgo(algo);
    }

    public render() {
        const { elements, speed, algorithm } = this.props;
        const currentName = algorithm.getName();
        return (
            <Navbar expand="lg" className="vs-navbar" variant="dark">
                <div className="vs-navbar-inner">
                    <Navbar.Brand className="vs-brand">
                        <span className="vs-brand-mark" aria-hidden="true" />
                        Visual&nbsp;Sort
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto vs-nav">
                            <NavDropdown
                                title={<span>Algorithm: <strong>{currentName}</strong></span>}
                                id="basic-nav-dropdown"
                                className="vs-dropdown"
                            >
                                {this.algorithms.map((s, index) => (
                                    <NavDropdown.Item
                                        onClick={() => this.changeAlgorithm(s)}
                                        key={index}
                                        active={s.getName() === currentName}
                                    >
                                        {s.getName()}
                                    </NavDropdown.Item>
                                ))}
                            </NavDropdown>

                            <Form.Group className="vs-control" controlId="vs-elements">
                                <Form.Label className="vs-control-label">
                                    Elements <span className="vs-control-value">{elements}</span>
                                </Form.Label>
                                <Form.Range
                                    min={5}
                                    max={250}
                                    step={1}
                                    value={elements}
                                    onChange={(e) => this.props.setElements(parseInt(e.target.value, 10))}
                                />
                            </Form.Group>

                            <Form.Group className="vs-control" controlId="vs-speed">
                                <Form.Label className="vs-control-label">
                                    Speed <span className="vs-control-value">{speed}x</span>
                                </Form.Label>
                                <Form.Range
                                    min={1}
                                    max={10}
                                    step={1}
                                    value={speed}
                                    onChange={(e) => this.props.setSpeed(parseInt(e.target.value, 10))}
                                />
                            </Form.Group>

                            <div className="vs-actions">
                                <Button className="vs-btn vs-btn-ghost" onClick={this.props.doReset}>
                                    Shuffle
                                </Button>
                                <Button className="vs-btn vs-btn-primary" onClick={this.props.doSort}>
                                    Sort
                                </Button>
                            </div>
                        </Nav>
                    </Navbar.Collapse>
                </div>
            </Navbar>
        );
    }
}

export default NavBar;
