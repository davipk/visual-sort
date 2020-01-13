import { Action, Sortable } from '../algorithm';
import { Color } from '../animation';

/**
 * @author Davi
 */

class SelectionSort implements Sortable {

    public getName() { return 'Selection Sort' }

    public sort(array: Array<number>): Action {

        const arr = [...array];
        const action = new Action();

        for (let i = 0; i < arr.length - 1; i++) {
            let minIndex = i;
            for (let j = i + 1; j < arr.length; j++) {
                action.addColorChange(Color.YELLOW, j, minIndex);
                action.addColorChange(Color.RED, j, minIndex);
                if (arr[j] < arr[minIndex]) {
                    minIndex = j;
                }
            }
            action.addColorChange(Color.BLUE, i, minIndex);
            action.addSwap(i, minIndex);
            action.addColorChange(Color.RED, i, minIndex);
            const temp = arr[minIndex];
            arr[minIndex] = arr[i];
            arr[i] = temp;
        }
        return action;
    }
}

export default SelectionSort;