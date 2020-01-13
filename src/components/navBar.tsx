import * as React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, NavDropdown, Button, ButtonToolbar } from 'react-bootstrap';
import { Sortable } from '../algorithm/algorithm';

import BubbleSort from '../algorithm/sort/bubbleSort';
import InsertionSort from '../algorithm/sort/insertionSort';
import MergeSort from '../algorithm/sort/mergeSort';
import QuickSort from '../algorithm/sort/quickSort';
import SelectionSort from '../algorithm/sort/selectionSort';
import StalinSort from '../algorithm/sort/stalinSort';

interface NavBarProps {
    algorithm: Sortable,
    setAlgo(algo: Sortable): void,
    doReset(): void,
    doSort(): void
}

interface NavBarState {
    selectedAlgorithm: Sortable;
}

class NavBar extends React.Component<NavBarProps, NavBarState> {

    private algorithms: Array<Sortable>;

    constructor(props: NavBarProps) {
        super(props);
        this.state = {
            selectedAlgorithm: props.algorithm
        }

        this.algorithms = [];
        //Define menu items here
        this.algorithms.push(new BubbleSort());
        this.algorithms.push(new InsertionSort());
        this.algorithms.push(new MergeSort());
        this.algorithms.push(new QuickSort());
        this.algorithms.push(new SelectionSort());
        this.algorithms.push(new StalinSort());

    }

    private changeAlgorithm(algo: Sortable): void {
        this.props.setAlgo(algo);
        this.setState({ selectedAlgorithm: algo });
    }

    public render() {
        return (
            <Navbar bg="primary" variant="dark" expand="lg">
                <Navbar.Brand>Visual Sort</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <NavDropdown title="Algorithms" id="basic-nav-dropdown">
                            {this.algorithms.map((s, index) => (
                                <NavDropdown.Item
                                    onClick={() => this.changeAlgorithm(s)}
                                    key={index}
                                >
                                    {s.getName()}
                                </NavDropdown.Item>
                            ))}
                        </NavDropdown>
                        <ButtonToolbar>
                            <Button onClick={this.props.doReset}>
                                Shuffle
                            </Button>
                            <Button onClick={this.props.doSort}>
                                Sort
                            </Button>
                        </ButtonToolbar>
                    </Nav>
                    <Navbar.Brand>{this.state.selectedAlgorithm.getName()}</Navbar.Brand>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default NavBar;