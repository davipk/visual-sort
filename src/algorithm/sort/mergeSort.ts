import { Action, Sortable } from '../algorithm';
import { Color } from '../animation';

/**
 * @author Davi
 */

class MergeSort implements Sortable {

    public getName() { return 'Merge Sort' }

    public sort(array: Array<number>): Action {

        const arr = [...array];
        const action = new Action();

        if (arr.length <= 1) {
            return action;
        }
        const auxiliaryArr = [...arr];
        this.helper(arr, 0, arr.length - 1, auxiliaryArr, action);
        return action;
    }

    private helper(mainArr: Array<number>, startIndex: number, endIndex: number, auxiliaryArr: Array<number>, action: Action): void {
        if (startIndex === endIndex) {
            return;
        }
        const middleIndex = Math.floor(startIndex + (endIndex - startIndex) / 2);
        this.helper(auxiliaryArr, startIndex, middleIndex, mainArr, action);
        this.helper(auxiliaryArr, middleIndex + 1, endIndex, mainArr, action);
        this.merge(mainArr, startIndex, middleIndex, endIndex, auxiliaryArr, action);
    }

    private merge(mainArr: Array<number>, startIndex: number, middleIndex: number, endIndex: number, auxiliaryArr: Array<number>, action: Action): void {
        let i = startIndex
        let j = middleIndex + 1;
        let k = startIndex;
        while (i <= middleIndex && j <= endIndex) {
            action.addColorChange(Color.YELLOW, i, j);
            action.addColorChange(Color.RED, i, j);
            if (auxiliaryArr[i] <= auxiliaryArr[j]) {
                action.addColorChange(Color.GREEN, k);
                action.addSetValue(k, auxiliaryArr[i]);
                action.addColorChange(Color.RED, k);
                mainArr[k++] = auxiliaryArr[i++];
            } else {
                action.addColorChange(Color.GREEN, k);
                action.addSetValue(k, auxiliaryArr[j]);
                action.addColorChange(Color.RED, k);
                mainArr[k++] = auxiliaryArr[j++];
            }
        }
        while (i <= middleIndex) {
            action.addColorChange(Color.GREEN, k);
            action.addSetValue(k, auxiliaryArr[i]);
            action.addColorChange(Color.RED, k);
            mainArr[k++] = auxiliaryArr[i++];
        }
        while (j <= endIndex) {
            action.addColorChange(Color.GREEN, k);
            action.addSetValue(k, auxiliaryArr[j]);
            action.addColorChange(Color.RED, k);
            mainArr[k++] = auxiliaryArr[j++];
        }
    }
}

export default MergeSort;