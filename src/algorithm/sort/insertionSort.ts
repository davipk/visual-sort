import { Action, Sortable } from '../algorithm';
import { Color } from '../animation';

/**
 * @author Davi
 */

class InsertionSort implements Sortable {

    public getName() { return 'Insertion Sort' }

    public sort(array: Array<number>): Action {

        const arr = [...array];
        const action = new Action();

        for (let i = 1; i < arr.length; i++) {
            const key = arr[i];
            let j = i - 1;
            while (j >= 0 && arr[j] > key) {
                action.addColorChange(Color.GREEN, j + 1);
                action.addSetValue(j + 1, arr[j]);
                action.addColorChange(Color.RED, j + 1);
                arr[j + 1] = arr[j];
                j--;
            }
            action.addColorChange(Color.GREEN, j + 1);
            action.addSetValue(j + 1, key);
            action.addColorChange(Color.RED, j + 1);
            arr[j + 1] = key;
        }
        return action;
    }
}

export default InsertionSort;