import SortPanel from "../components/sortPanel";
import { AnimationFragment, ColorChange, ValueChange, IndexSwap, IndexRemove, Color } from "./animation";

/**
 * @author Davi
 */

/**
 * This requires a necessary interface to make the object sortable.
 */
export interface Sortable {
    /**
     * Retrieves the name of the sortable object.
     */
    getName(): string;
    /**
     * Sorts the array and returns an object that can be animated.
     * @param array Initial array.
     */
    sort(array: Array<number>): Action;
}

/**
 * Deals with encoding and decoding animations.
 */
export class Action {

    private actions: Array<AnimationFragment>;

    constructor() {
        this.actions = [];
    }

    /**
     * Animate the panel with current animation fragments.
     * @param panel Target panel.
     */
    public animate(panel: SortPanel): void {
        const { array } = panel.state;
        for (let i = 0; i < this.actions.length; i++) {
            setTimeout(() => {
                const operation = this.actions[i];
                operation.decode(array);
                panel.setState({ array });
            }, (i + 1) * panel.getSpeed());
        }
    }

    /**
     * Pushes a color change to the animation.
     * @param color Color to change.
     * @param index1 Index of a target array.
     * @param index2 Index of a target array.
     */
    public addColorChange(color: Color, index1: number, index2?: number): void {
        this.actions.push(new ColorChange(color, index1, index2));
    }

    /**
     * Pushes a value declaration to the animation.
     * @param index Index of a target array.
     * @param value Value to change into for that index.
     */
    public addSetValue(index: number, value: number): void {
        this.actions.push(new ValueChange(index, value));
    }

    /**
     * Pushes a swap change for specified index.
     * @param index1 Index of a primary array.
     * @param index2 Index of a secondary array.
     */
    public addSwap(index1: number, index2: number): void {
        this.actions.push(new IndexSwap(index1, index2));
    }

    /**
     * Removes an element at a specified index.
     * @param index Index of a target array.
     */
    public addRemoveIndex(index: number): void {
        this.actions.push(new IndexRemove(index));
    }

}