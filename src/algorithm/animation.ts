
/**
 * @author Davi
 */

 /**
  * Colors that an array may use.
  */
export enum Color {
    BLUE = 'blue',
    RED = 'red',
    YELLOW = 'yellow',
    GREEN = 'green'
}

/**
 * Fragment of animation that can be used to animate.
 */
export interface AnimationFragment {
    /**
     * Decodes the specified fragment into viewable animation.
     * @param array Original array.
     */
    decode(array: Array<number>): void;
}

/**
 * Deals with changing a color of an array.
 */
export class ColorChange implements AnimationFragment {

    private color: Color;
    private index1: number;
    private index2?: number;

    constructor(color: Color, index1: number, index2?: number) {
        this.color = color;
        this.index1 = index1;
        this.index2 = index2;
    }

    public decode(array: Array<number>): void {
        this.changeColor(this.color, this.index1);
        if (this.index2 !== undefined) {
            this.changeColor(this.color, this.index2);
        }
    }

    private changeColor(color: Color, index: number): void {
        const arrayBars = document.getElementsByClassName('array-bar') as HTMLCollectionOf<HTMLElement>;
        if (arrayBars[index] === undefined) {
            console.debug(`${index} ${color} was undefined for some reason`);
            return;
        }
        arrayBars[index].style.backgroundColor = color;
    }

}
/**
 * Deals with swapping index of an array.
 */
export class IndexSwap implements AnimationFragment {

    private index1: number;
    private index2: number;

    constructor(index1: number, index2: number) {
        this.index1 = index1;
        this.index2 = index2;
    }

    public decode(array: Array<number>): void {
        const temp = array[this.index1];
        array[this.index1] = array[this.index2];
        array[this.index2] = temp;
    }

}

/**
 * Deals with changing the value of an array.
 */
export class ValueChange implements AnimationFragment {

    private index: number;
    private value: number;

    constructor(index: number, value: number) {
        this.index = index;
        this.value = value;
    }

    public decode(array: Array<number>): void {
        array[this.index] = this.value;
    }

}

/**
 * Deals with removing an array at specified index.
 */
export class IndexRemove implements AnimationFragment {

    private index: number;

    constructor(index: number) {
        this.index = index;
    }

    public decode(array: Array<number>): void {
        array.splice(this.index, 1);
    }
    
}