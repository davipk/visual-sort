import { Action, Sortable } from '../algorithm';
import { Color } from '../animation';

/**
 * @author Davi
 */

class StalinSort implements Sortable {

    public getName() { return 'Stalin Sort' }

    public sort(array: Array<number>): Action {

        const arr = [...array];
        const action = new Action();

        const indexToGulag: Array<number> = [];
        let bigger: number = 0;
        for (let i = 0; i < arr.length; i++) {
            action.addColorChange(Color.YELLOW, i);
            action.addColorChange(Color.RED, i);
            if (arr[i] >= bigger) {
                bigger = arr[i];
            } else {
                action.addColorChange(Color.BLUE, i);
                indexToGulag.push(i);
            }
        }
        for (let i = indexToGulag.length - 1; i >= 0; i--) {
            action.addColorChange(Color.RED, indexToGulag[i]);
            action.addRemoveIndex(indexToGulag[i]);
        }
        return action;
    }

}

export default StalinSort;