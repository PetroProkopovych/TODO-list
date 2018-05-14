function isToday(date) {
    /*
     * check if date equals today date
     * @param {Event} taskDescription - description of the task
     */
    const today = new Date();
    date = new Date(date);
    return today.setHours(0, 0, 0, 0) === date.setHours(0, 0, 0, 0);
}

export { isToday };