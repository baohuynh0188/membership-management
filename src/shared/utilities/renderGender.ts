const renderGender = (gender: number): string => {
    if (gender === 1) {
        return '👨';
    } else if (gender === 2) {
        return '👩';
    }
    return '💅';
};

export default renderGender;
