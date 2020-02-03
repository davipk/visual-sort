import { Action, Sortable } from '../algorithm';
import { Color } from '../animation';

/**
 * @author Davi
 */

class BubbleSortOptimized implements Sortable {

    public getName() { return 'Bubble Sort Optimized' }

    public sort(array: Array<number>): Action {

        const arr = [...array];
        const action = new Action();

        let i = arr.length - 1;
        while (i > 0) {
            let t = 1;
            for (let j = 1; j <= i; j++) {
                action.addColorChange(Color.YELLOW, j, j - 1);
                action.addColorChange(Color.RED, j, j - 1);
                if (arr[j - 1] > arr[j]) {
                    action.addColorChange(Color.BLUE, j, j - 1);
                    action.addSwap(j, j - 1);
                    action.addColorChange(Color.RED, j, j - 1);
                    const temp = arr[j - 1];
                    arr[j - 1] = arr[j];
                    arr[j] = temp;
                    t = j;
                }
            }
            i = t - 1;
        }
        return action;
    }
}

export default BubbleSortOptimized;