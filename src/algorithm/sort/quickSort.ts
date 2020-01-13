import { Action, Sortable } from '../algorithm';
import { Color } from '../animation';

/**
 * @author Davi
 */

class QuickSort implements Sortable {

    public getName() { return 'Quick Sort' }

    public sort(array: Array<number>): Action {

        const arr = [...array];
        const action = new Action();
        this.quickSort(arr, 0, arr.length - 1, action);

        return action;
    }

    private quickSort(arr: Array<number>, leftIndex: number, rightIndex: number, action: Action): void {
        if (arr.length > 1) {
            const index = this.partition(arr, leftIndex, rightIndex, action);
            if (leftIndex < index - 1) {
                this.quickSort(arr, leftIndex, index - 1, action);
            }
            if (index < rightIndex) {
                this.quickSort(arr, index, rightIndex, action);
            }
        }
    }

    private partition(arr: Array<number>, leftIndex: number, rightIndex: number, action: Action): number {
        const pivot = arr[this.getMiddle(leftIndex, rightIndex)];
        let i = leftIndex;
        let j = rightIndex;
        while (i <= j) {
            while (arr[i] < pivot) {
                const mid = this.getMiddle(leftIndex, rightIndex);
                action.addColorChange(Color.YELLOW, i, mid);
                action.addColorChange(Color.RED, i, mid);
                i++;
            }
            while (arr[j] > pivot) {
                const mid = this.getMiddle(leftIndex, rightIndex);
                action.addColorChange(Color.YELLOW, i, mid);
                action.addColorChange(Color.RED, i, mid);
                j--;
            }
            if (i <= j) {
                action.addColorChange(Color.BLUE, i, j);
                action.addSwap(i, j);
                action.addColorChange(Color.RED, i, j);
                const temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
                i++;
                j--;
            }
        }
        return i;
    }

    private getMiddle(low: number, high: number): number {
        // Returns overflow-safe version of middle number.
        return Math.floor(low + (high - low) / 2);
    }
}

export default QuickSort;