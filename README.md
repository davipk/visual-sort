## Visual Sort

Visualizer for common sorting algorithms using ReactJS TypeScript.

### Features
- Flexible and easy to implement new sorting algorithms.
- Supports basic algorithms (ex. quick, merge, bubble, select, insertion) and an algorithm for funsies (stalin sort).
- Utilizes components for better organization.

### How to add a new algorithm

In ``\src\algorithm\sort``, add a new class with implementing a new interface as shown:
```TypeScript
class SomeSort implements Sortable {

    // Name of the sorting algorithm
    public getName() { return 'Some Sort' }
    
    // How you would like the algorithm to sort
    public sort(array: Array<number>): Action {
        const arr = [...array];
        const action = new Action();
        ...
        return action;
    }
    
}
```
Then import that algorithm and add it into the menu in ``\src\components\navBar.tsx``
And yup, that's it. It's as simple as that! Feel free to refer to the ones I wrote if still curious.

### Dependencies
- NodeJS with typescript extension(duh)
- React and react-bootstrap module for navigation component

### Todo list
- Dynamically adjust the height when window size changes
- Add more methods to shuffle the array (ex. almost sorted, ascending order, etc...)
- Add an option to adjust the speed and size of an element
- Add more algorithms

Be aware that this is still far away from being polished, meaning there are still quite a bit of bugs. Though expect for most of issues to be ironed out in coming months.

### Example
![Alt Text](https://media.giphy.com/media/fwEIDMONVFnPNeg8Up/giphy.gif)
