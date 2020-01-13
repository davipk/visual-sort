import { Action, Sortable } from '../algorithm';
import { Color } from '../animation';

/**
 * @author Davi
 */

class BubbleSort implements Sortable {

    public getName() { return 'Bubble Sort' }

    public sort(array: Array<number>): Action {

        const arr = [...array];
        const action = new Action();

        for (let i = 0; i < arr.length - 1; i++) {
            for (let j = 0; j < arr.length - i - 1; j++) {
                action.addColorChange(Color.YELLOW, j, j + 1);
                action.addColorChange(Color.RED, j, j + 1);
                if (arr[j] > arr[j + 1]) {
                    action.addColorChange(Color.BLUE, j, j + 1);
                    action.addSwap(j, j + 1);
                    action.addColorChange(Color.RED, j, j + 1);
                    const temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                }
            }
        }
        return action;
    }
}

export default BubbleSort;